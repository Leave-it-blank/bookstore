// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma';
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    const data = req.body;

    if(!data){
        return res.status(400).json({ error: 'Please add all the required fields.' })
    }
    try {
        const preOrder = await prisma.PreOrder.create({
            data: {
                firstName:  String(data.userDetails.firstName),
                lastName:  String(data.userDetails.lastName),
                email:  String(data.userDetails.email),
                phone:  String(data.userDetails.phone),
                address:  String(data.userDetails.address),
                city:  String(data.userDetails.city),
                state:  String(data.userDetails.state),
                zip:  String(data.userDetails.zip),
                country:  String(data.userDetails.country),
                itemID:  String(data.form.itemID),
                itemName:  String(data.form.itemName),
                itemType:  String(data.form.itemType),
                type:  String(data.form.type),
                quantity: String(data.form.quantity),
                price:  String(data.form.price),
                message:  String(data.userDetails.message),

            }
        } );
       // console.log(preOrder);

        if(!preOrder){
            return res.status(500).json({ error: 'Order Failed.' })
        }
        return res.status(200).json({ message: 'Successfully placed Pre Order.', orderId: preOrder.id })
 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to save the order' })
    }
 
};