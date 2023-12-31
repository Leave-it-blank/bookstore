import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma';
import { authenticated } from '@/libs/auth';
import {createOrder} from '@/utils/backend/handleOrder';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req :NextApiRequest , res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
}
    const { cart } = req.body;
    const auth  = await authenticated(req);
    if(!auth || (typeof auth === 'string')){
      return res.status(401).json({message: "Unauthorized"});
    }

    const customer = {
      email: auth.email,
      uuid: auth.id
    }
    
    try {
       const getCart = await prisma.cart.findUnique({
        where: {
          userId: auth.id
        },
        include: {
          CartItems: {
            include: {
              product: true,
              chapter: true,
            }
          }
        }
       })
      if(!getCart){
        return res.status(400).json({message: "Invalid request"});
      }
      if(getCart.CartItems.length == 0){
        return res.status(400).json({message: "Cart is empty"});
      }
      let total = getCart.total;
      if(getCart.discount && total > 500){
          total = Math.round( ((total - (total * getCart.discount / 100)) * 100 ));
      }else {
        total = total * 100;
      }
      
      let desc: String[] = [];
      getCart.CartItems.forEach((item : any) => {
        if(item.product){
        desc.push( " Book -" + item.product?.title  + "\n");
        }else {
        desc.push(  "Ch " + item.chapter?.number + " - " + item.chapter?.title + " \n"  ) ;
        }
      })
      console.log(desc);
      const orderID = await createOrder(getCart, total);
      if(orderID == null){
        return res.status(400).json({message: "Failed to create order request"});
      }
      // Now we Empty The cart
       await prisma.cart.update({
        where: {
          userId: auth.id
        },
        data: {
          CartItems: {
            deleteMany: {}
          },
          total: 0
        }
      })
      
       
    //  const price = await stripe.prices.retrieve('price_1O28xASA5qw7BfBsSf4P5DFv');
   
     const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required',
        customer_email: customer.email,
        line_items: [{
          price_data : {
            currency: 'inr',
            product_data: {
              'name': 'Shopping Cart',
              'description': desc.join(', '),
            },
            'unit_amount': total , //need to set this dynamically
          },
          
          'quantity': 1,
        }],
        allow_promotion_codes: "false",
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/orders?event=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/orders?event=cancelled`,
        metadata: {
          orderID: orderID, // Set your metadata at the session level
        },
      });
      //console.log(session);
      

    if (session) {
      await prisma.order.update(
        {
          where: {
            id: orderID
          },
          data: {
           pay_url: session.url
          }
        }
       )
      await prisma.sessions.create({
        data: {
          id: session.id,
          userId: auth.id,
          orderId: orderID,
        }
      })
       
      return res.status(200).json({ data: session  });
     
    } else {
      return res.status(500).json({  message: 'Session is not defined' });
   
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({  error: 'Session could not be generated' });
    
  }
}   
 
 