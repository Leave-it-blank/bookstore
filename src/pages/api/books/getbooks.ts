// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prisma'
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
    try{
   // console.log(bookList)
    const  bookList = await prisma.product.findMany();

    if (!bookList) {
        return res.status(404).json({ error: 'Books not found' });
    }
    res.status(200).json(bookList);
}

catch (error) {
    console.log(error);
    res.status(500).json({ error: 'service down' });
  }
};