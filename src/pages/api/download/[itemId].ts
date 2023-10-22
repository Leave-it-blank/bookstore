import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { authenticated } from '@/libs/auth';
import prisma from '@/libs/prisma';
import { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try {
        const user = await authenticated(req);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const itemId = req.query.itemId;
        if(!itemId){
            return res.status(400).json({ error: 'Missing itemId' });
        }
        console.log(itemId);
        const item = await prisma.orderItem.findUnique({
            where: {
                id: Number(itemId)
            },
            select: {
                link: true,
                activedate: true,
                orderId: true
            }
        })
        const order = await prisma.order.findUnique({
            where: {
                id: item.orderId,
                customerId: (user as JwtPayload).id,
            },
            select: {
                status: true,
            },
        });
        console.log( item.orderId);

        if(!order){
            console.log('Order not found for this user.')
            return res.status(400).json({ error: 'Order not found for this user.' });
        }
        if(order.status == "PROCESSING"){
            console.log('Order no er.')
            return res.status(400).json({ error: 'Order pending completed.' });
        }

        if(order.status == "CREATED"){
            console.log(' is user.')
            return res.status(400).json({ error: 'Order not paid or completed.' });
        }
        if(!item.link){
            return res.status(400).json({ error: 'Please contact us via email.' });
        }
        const link = item.link;
        const date = new Date(item.activedate);
        const now = new Date();

        if(date < now){
            return res.status(400).json({ error: 'Time limit expired' });
        }
     
     //  return res.status(200).json({ itemId: itemId });
       // const zipFilePath = path.join(process.cwd(), 'books/Chapter_14.zip');
        const zipFilePath = path.join(process.cwd(), link);
        console.log(zipFilePath)

        // Check if the file exists
        if (fs.existsSync(zipFilePath)) {
          // Set the appropriate headers for the response
          res.setHeader('Content-Type', 'application/zip');
          res.setHeader('Content-Disposition', 'attachment; filename="data.zip"');
      
          // Stream the file to the response
          const fileStream = fs.createReadStream(zipFilePath);
          fileStream.pipe(res);
        }
        else {
            // If the file doesn't exist, return a 404 error
            return res.status(400).json({ error: 'File Not found. Contact support.' });
          }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).end('Internal Server Error');
    }
};

export default handler;
export const config = {
    api: {
      responseLimit: false,
    },
  }