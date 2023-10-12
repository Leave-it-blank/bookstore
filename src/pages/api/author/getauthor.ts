// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {  author } from '../../../data';

type Data = {
    name: string
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
   // console.log(author)
  

    if (!author) {
        return res.status(404).json({ error: 'Books not found' });
    }
    res.status(200).json(author);
};