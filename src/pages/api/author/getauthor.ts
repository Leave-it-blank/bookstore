// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/libs/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
 

type Data = {
    name: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
   // console.log(author)
   const author = await prisma.author.findUnique({
    where: {
       name: "Ajay Garg"
    },
   })
  

    if (!author) {
        return res.status(404).json({ error: 'Books not found' });
    }
    res.status(200).json(author);
};