// pages/api/register.js
import prisma from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import {hashPassword, validateEmail} from '@/libs/auth';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password, city } = req.body;
  console.log(email, password, city);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if(password.length < 8){
            return res.status(400).json({ error: 'Password too short' });
    }
   //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hash  = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        "name": name,
        "email" : email,
        "password": hash,
        "city" : city,  
      },
    });

    if(!user){
        return res.status(400).json({ error: 'User registration failed' });
    }
    const cart = await prisma.cart.findUnique({
      where: {
          userId: user?.id,
      },
  });
 
  if(!cart){
      const newcart = await prisma.cart.create({
          data: {
              userId: user.id,
               
          },
      });
  }

    res.status(200).json({ message: 'User registered successfully'  });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed',  errorLog: error  });
  }
}
