// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { booksData, bookList } from '../../../data';

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
    const { bookSlug } = req.query;
    console.log(req.query)
    // console.log(bookList)
    const book = booksData.find((book) => book.slug === bookSlug);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
};