// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from '@/libs/auth';
import prisma from '@/libs/prisma'; 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
   // console.log(author)
    try {
        if(!req.body.id){
            return res.status(400).json({error: "Invalid request."});
        }
        const authenticate = await authenticated(req);

        if (!authenticate || typeof authenticate === 'string') {
            return res.status(401).json({ error: 'Login required.'  });
        }
        const { id } = authenticate;

        console.log(req.body);
        let cart = await prisma.cart.findUnique({
            where: {
                userId: id,
            },
        });
        if(!cart) {
          return res.status(400).json({error: "Cart not found."});
        }
        const cartItem = await prisma.CartItems.findUnique({
            where: {
                id: req.body.id,
            },
        });
        if(!cartItem) {
            return res.status(400).json({error: "Item not found."});
        }
             
            cart = await prisma.cart.update({
                where: {
                    userId: id,
                },
                data: {
                    total: cart.total - cartItem.price * cartItem.quantity,
                },
            });
            if(cart.total < 0 ){
                await prisma.cart.update({
                       where: {
                           id: cart.id
                       },
                       data: {
                            total: 0,
                       },
                   })
               }
            await prisma.CartItems.delete({
                where: {
                    id: req.body.id,
                },
            });
    

             console.log(cartItem);
          return  res.status(200).json({message: "Item removed from cart."}  );
        }
        catch (err : any) {
            console.log(err);
            return res.status(500).json( {error: "Unable to remove item from cart."});
        }
 
    
};