// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from '@/libs/auth';
import prisma from '@/libs/prisma'; 
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try{    const authenticate = await authenticated(req);

    if (!authenticate || typeof authenticate === 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email } = authenticate;
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user?.id,
        },
    });
    console.log(cart);
    if(!cart){
        const newcart = await prisma.cart.create({
            data: {
                userId: user.id,
                 
            },
        });
        return res.status(201).json({ cartId: newcart.id , message: "Cart created" });
    }

    
    return res.status(200).json({ cartId: cart.id , message: "Cart already exists"});
}

catch (error) {
    console.log(error);
    res.status(500).json({ error: 'service down' });
  }
};