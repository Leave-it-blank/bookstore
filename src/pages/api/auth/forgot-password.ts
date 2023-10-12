// pages/api/register.js
import prisma from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { email } = req.body;

  try {
    console.log(email);

    res.status(403).json({   error: "METHOD NOT IMPLEMENTED"  });
  } catch (error) {
    res.status(400).json({ error: "METHOD NOT IMPLEMENTED" });
  }
}
