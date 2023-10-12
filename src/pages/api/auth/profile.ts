// pages/api/register.js
import prisma from '@/libs/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt , { Secret, JwtPayload } from "jsonwebtoken";

const accessTokenSecret = process.env.JWTSECRET as Secret || "secret";
 
export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
 
  try {
        const authHeader = req.headers['authorization'];
       // console.log(authHeader)
        const token: string = typeof (authHeader) != "undefined" ? authHeader.split(' ')[1] : "";
        if (!token) {
            return res.status(401).json({ status: "error" , message: "Unauthorized."});
        }
        jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({ status: "error" , message: "Unauthorized."});
            }
            return res.json({
                message: "Profile fetched successfully.",
                status: "success",
                user: user
            });
        });
        
    
    

    res.status(200).json({ token: "" , refreshToken: "" , message: 'User registered successfully'   });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
}
