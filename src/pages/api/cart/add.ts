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
        if(!req.body.quantity || !req.body.price || !req.body.itemType || !req.body.type) {
            return res.status(400).json({error: "Invalid request."});
        }
        if(!req.body.chapterId && !req.body.productId) {
            return res.status(400).json({error: "Invalid request."});
        }
        const authenticate = await authenticated(req);

        if (!authenticate || typeof authenticate === 'string') {
            return res.status(401).json({ error: 'Login required.'  });
        }
        const { id } = authenticate;

       // console.log(req.body);
        let cart = await prisma.cart.findUnique({
            where: {
                userId: id,
            },
        });

        if(!cart) {
           cart = await prisma.cart.create({
                data: {
                    userId: id,
                },
            });
        }
        let cartItem ;
        if(req.body.itemType == "BOOK"){
                const book = await prisma.product.findUnique({
                    where: {
                        id: req.body.productId,
                    },
                });
                let price = req.body.type == "DIGITAL" ? book.priceDigital : book.pricePhysical;

               cartItem = await prisma.CartItems.create({
                data: {
                    cartId: cart.id,
                    productId: req.body.productId,
                    quantity: req.body.quantity,
                    price: price,
                    category: req.body.itemType,
                    type: req.body.type,
                },
            });
        } else {
            const chapter = await prisma.chapter.findUnique({
                where: {
                    id: req.body.chapterId,
                },
            });
              cartItem = await prisma.CartItems.create({
                data: {
                    cartId: cart.id,
                    chapterId: req.body.chapterId,
                    quantity: req.body.quantity,
                    price: chapter.price,
                    category: req.body.itemType,
                    type: req.body.type,
                },
            });
        }
            
            cart = await prisma.cart.update({
                where: {
                    userId: id,
                },
                data: {
                    total: {
                        increment: cartItem.price * cartItem.quantity, // Increment the total by the specified amount.
                      },
                },
            });
    

           //  console.log(cartItem);
          return res.status(201).json({message: "Item added to cart."} );
        }
        catch (err : any) {
            console.log(err);
            return res.status(500).json( {error: "service down"});
        }
 
    
};