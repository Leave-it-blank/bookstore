// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
 
const promoList: String[] = ["earlybird"];
 
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }
   // console.log(author)
        const {promo , total} = req.body;
        if(promo.length ==0 || total ==0){ 
            return res.status(404).json({ error: 'Invalid promo code or amount' })
        }

        try {
            const discount =  total*0.1;
            console.log(discount)
            if(promoList.includes(promo)){
                return res.status(200).json({
                    valid: true,
                    message: "Successfully applied promotion code",
                    discount: discount 
                });
            }else {
                return res.status(200).json({
                    valid: false,
                    error: "Invalid promo code"
                });
            }
        }
        catch (err : any) {
            return res.status(500).json( {error: "Invalid promo code"});
        }
 
    
};