// pages/api/register.js
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { email } = req.body;

  try {
    console.log(email);

    res.status(405).json({   error: "METHOD NOT IMPLEMENTED"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'service down' });
  }
}
