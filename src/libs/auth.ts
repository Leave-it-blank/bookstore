import jwt , { Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const accessTokenSecret = process.env.JWTSECRET as Secret || "secret";
const refreshTokenSecret = process.env.JWTREFRESH_SECRET as Secret || "secret";
const salt_env = process.env.SALT;


const salt = typeof (salt_env) === "string" ? salt_env : "saltafa1$@/wfaw"; // salt for hashing password

export async function hashPassword(plaintextPassword: string) {
    const hash = await bcrypt.hash(plaintextPassword + salt, 10);
    return hash;
}
// compare password
export async function comparePassword(plaintextPassword: string, hash: string) {
    const result = await bcrypt.compare(plaintextPassword + salt, hash);
    return result;
}

export async function validateEmail(email: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;      
    return emailRegex.test(email);
}


export async function authenticated(req : any){
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        // No authorization header provided
        return false
      }
      const token = authorizationHeader.replace('Bearer ', '');
  
        const decoded = jwt.verify(token, accessTokenSecret);
         
        if(decoded){
           // console.log(decoded)
            return decoded;
        }
     
       
      } catch (err) {
        return false;
      }
    return false;
}