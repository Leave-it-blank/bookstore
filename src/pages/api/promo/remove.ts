// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma';
import { authenticated } from '@/libs/auth';
import { JwtPayload } from 'jsonwebtoken';
 
 
export default async  function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
   // console.log(author)
       const auth = await authenticated(req)
        if(!auth){
            return res.status(401).json({ error: 'Not authenticated' })
        }

        const { cartId, token} = req.body;

        if( !cartId || !token){
            return res.status(400).json({ error: 'Invalid request' })
        }
        

        try {
                const cart = await prisma.cart.findUnique({
                    where: {
                        userId: (auth as JwtPayload).id
                    },
                })
                if(!cart){
                    return res.status(400).json({ error: 'Invalid request' })
                }
                await prisma.cart.update({
                    where: {
                        userId: (auth as JwtPayload).id
                    },
                    data: {
                        promo: null,
                        discount: 0
                    },
                })
               
                return res.status(200).json({
                    valid: true,
                    message: "Successfully removed promotion code",
                });
        }
        catch (err : any) {
            return res.status(500).json({  error: 'service down.' });
        }
 
    
};