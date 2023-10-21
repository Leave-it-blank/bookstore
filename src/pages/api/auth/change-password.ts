// pages/api/register.js
import prisma from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import {authenticated} from '@/libs/auth';
import {hashPassword, comparePassword} from '@/libs/auth';
export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
 
  try {
    const authenticate = await authenticated(req);

    if (!authenticate || typeof authenticate === 'string') {
        return res.status(401).json({ error: 'Login required.'  });
    }
    const {password, newpass} = req.body;  
    const user = await prisma.user.findUnique({
      where: { id: authenticate.id },
    });
    const verify =  await comparePassword(password, user.password);
    if(!verify){
        return res.status(400).json({ error: 'old password did not match.' });
    }
    const hashnew  = await hashPassword(newpass);
    const usernew = await prisma.user.update({
      where: { id: authenticate.id },
      data: {
        password: hashnew,
      },
    });
    if(!usernew){
        return res.status(400).json({ error: 'Password change failed' });
    }
    res.status(200).json({ message: 'Password changed successfully' });
    

    
  } catch (error) {
    res.status(400).json({ error: 'User auth failed' });
  }
}
