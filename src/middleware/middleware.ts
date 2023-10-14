import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
export const SECRET_KEY: Secret = process.env.JWTSECRET as Secret || 'secret';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

import type { NextApiRequest, NextApiResponse } from 'next'
 
const jwtSecretKey = process.env.JWT_SECRET;
const handler = async (  req: NextApiRequest,
    res: NextApiResponse) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }
 
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as unknown as CustomRequest).token = decoded;
 
    req.next();
  } catch (err : any) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;