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
   // console.log(author)
    try {
        
        const authenticate = await authenticated(req);

        if (!authenticate || typeof authenticate === 'string') {
            return res.status(401).json({ error: 'Login required.'  });
        }
        const { id } = authenticate;

       // console.log(req.body);
        let orders = await prisma.Order.findMany({
            where: {
                customerId: id,
            },  
            include: {
       
                items: {
                    include: {
                        Product: true,
                        Chapter: true,
                       
                    }
                }

            },
        });
 
           //  console.log(cartItem);
          return  res.status(200).json( {orders: orders, message: "Succesfully Fetched Orders."} );
        }
        catch (err : any) {
            console.log(err);
            return res.status(500).json( {error: "Unable to fetch orders"  });
        }
 
    
};