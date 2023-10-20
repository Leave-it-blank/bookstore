// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma';
import { authenticated } from '@/libs/auth';
const promoList: String[] = ["earlybird"];

 
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

        const {promo , cartId, token} = req.body;

        if(!promo || !promoList || !cartId || !token){
            return res.status(400).json({ error: 'Invalid request' })
        }
        

        try {
            if(promoList.includes(promo.toLowerCase())){
                const cart = await prisma.cart.findUnique({
                    where: {
                        id: cartId
                    },
                })
                if(!cart){
                    return res.status(400).json({ error: 'Invalid request' })
                }
                if(cart.total < 500){
                    return res.status(400).json({ error: 'Cart total needs to be more than 500.' })
                }
                await prisma.cart.update({
                    where: {
                        id: cartId
                    },
                    data: {
                        promo: promo,
                        discount: 10
                    },
                })
                return res.status(200).json({
                    valid: true,
                    message: "Successfully applied promotion code",
                });
            }else {
                return res.status(200).json({
                    valid: false,
                    error: "Invalid promo code"
                });
            }
        }
        catch (err : any) {
            return res.status(500).json( {error: "Invalid promo code"});
        }
 
    
};