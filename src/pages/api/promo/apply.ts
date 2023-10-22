// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma';
import { authenticated } from '@/libs/auth';
import type { JwtPayload } from 'jsonwebtoken';

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

        const {promo} = req.body;

        if(!promo ){
            return res.status(400).json({ error: 'Invalid request' })
        }

        const regex = /[^a-zA-Z0-9]/g;
        const promoCode = promo.replace(regex, '');
       // console.log(promoCode)

        try {
                const getPromo = await prisma.promo_codes.findUnique(
                    {
                        where: {
                            code: String(promoCode.toLowerCase())
                        },
                    }
                )
                console.log(getPromo)
                if (!getPromo) {
                    return res.status(200).json({
                        valid: false,
                        error: "Invalid promo code"
                    });
                }
                const cart = await prisma.cart.findUnique({
                    where: {
                        userId: (auth as JwtPayload).id // add type assertion here
                    },
                })
                if (!cart) {
                    return res.status(400).json({ error: 'Invalid request' })
                }
                if(cart.total < 500){
                    return res.status(400).json({ error: 'Cart total needs to be more than 500.' })
                }
                await prisma.cart.update({
                    where: {
                        userId: (auth as JwtPayload).id
                    },
                    data: {
                        promo: getPromo.code,
                        discount: getPromo.discount
                    },
                })
                return res.status(200).json({
                    valid: true,
                    message: "Successfully applied promotion code",
                });
         
        }
        catch (err : any) {
            console.log(err);
            return res.status(500).json( {error: "Invalid promo code"});
        }
 
    
};