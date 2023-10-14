// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


import prisma from '@/libs/prisma'
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
    const { bookSlug } = req.query;
    // console.log(req.query)
    // console.log(bookList)
    const book = await prisma.product.findUnique({
        where: {
            titleSlug: String(bookSlug)
        },
        include: {
            Chapter: {
                orderBy: {
                    number: 'asc'
                }
            },

        }
    })
    if (!book) {
        return res.status(404).json({ error: "Book not found" })
    }
    const Author = await prisma.author.findUnique({
        where: {
            id: book.authorId
        }
    })
    if (!Author) {
        return res.status(404).json({ error: "Author not found" })
    }
    const bookData = {
        book: book,
        chapters: book.Chapter,
        author: Author
    }


    res.status(200).json(bookData);
};