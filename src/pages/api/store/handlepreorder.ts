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


    console.log(data);
    try {
        const preOrder = await prisma.PreOrder.create({
            data: {
                firstName: data.userDetails.firstName,
                lastName: data.userDetails.lastName,
                email: data.userDetails.email,
                phone: data.userDetails.phone,
                address: data.userDetails.address,
                city: data.userDetails.city,
                state: data.userDetails.state,
                zip: data.userDetails.zip,
                country: data.userDetails.country,
                itemID: data.form.itemID,
                itemName: data.form.itemName,
                itemType: data.form.itemType,
                type: data.form.type,
                quantity: String(data.form.quantity),
                price: data.form.price,
                message: data.userDetails.message,

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