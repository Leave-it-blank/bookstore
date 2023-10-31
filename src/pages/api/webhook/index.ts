// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from '@/libs/auth';
import prisma from '@/libs/prisma'; 
import Stripe from 'stripe';
import getRawBody from 'raw-body';
import { proccessOrder, completeOrder, cancelOrder } from '@/utils/backend/handleOrder';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

  const  body = await getRawBody(req);
 // console.log(body);
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
  let event: Stripe.Event;
 
  try {
    if (!sig || !webhookSecret) return res.status(404).json({ error: ' Webhook Error: Missing signatures' });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    const paymentObj = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentObj.metadata?.orderID;
   console.log(event);
    switch (event.type) {
      //checkout.session.completed //payment_intent.succeeded
      case 'checkout.session.completed' :
        console.log('checkout.session.completed')
        const paymentIntent = event.data.object;

        const sessionData = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ['line_items'],
          }
        );
        const lineItems = sessionData.line_items;
        const metadata = sessionData.metadata
       
        // Fulfill the purchase...
         completeOrder(Number(metadata.orderID));
     
        break;
      case 'payment_intent.processing': 
         console.log('payment_intent.processing')
          proccessOrder(Number(orderId));
        //fullfillOrder();
      case 'payment_intent.payment_failed':
        if(orderId){
          cancelOrder(Number(orderId));
        }
        break;
      // ... handle other event types
      case 'checkout.session.expired':
        if(orderId){
          cancelOrder(Number(orderId));
        }
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return res.status(200).json( {received: true} );
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return res.status(500).json( {error: `Webhook Error: ${err.message}`});
  } 
};


export const config = {
  api: {
    bodyParser: false,
  },
};