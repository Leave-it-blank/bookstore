// pages/api/register.js
import prisma from '@/libs/prisma';
import jwt , { Secret, JwtPayload } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next'
import { comparePassword, validateEmail } from '@/libs/auth';
const accessTokenSecret = process.env.JWTSECRET as Secret || "secret";
const refreshTokenSecret = process.env.JWTREFRESH_SECRET as Secret || "secret";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { email, password } = req.body;
  try {
    console.log(email, password)
    if(email === "" || password === ""){
      return res.status(400).json({ error: 'User login failed' });
    }
    if(!validateEmail(email)){
      return res.status(400).json({ error: 'Invalid Email' });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
     
    if(!user){
      return res.status(400).json({ error: 'Credentials did not match.' });
    }

    const verify = await comparePassword(password, user.password );

    if(verify){
      const accessToken = jwt.sign({ email: user?.email , role: user?.role }, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ email: user?.email, role: user?.role }, refreshTokenSecret);
     const data = {
        accessToken,
        refreshToken,
        message: "User logged in successfully."
      };

      res.status(200).json(data);
    }

    else {
      res.status(400).json({ error: 'Credentials did not match.' });
    }

    
  } catch (error) {
    res.status(400).json({ error: 'User login failed' });
  }
}
