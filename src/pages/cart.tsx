import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/store/user';
import { useRouter } from 'next/router';
import CartItem from '@/components/cart/CartItem';
interface cart {
    itemID: number;
    itemName: string;
    price: number;
    itemType: string;
    quantity: number;
    type: string;
}

const Cart = () => {
    const { user, loading, token } = useUser();
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(false);
    const [cart, setCart] = useState<any>([]);
    const [cartLoading, setCartLoading] = useState<boolean>(true);
    useEffect(() => {
        const getCart = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cart/get`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

                    })
                if (res.ok) {
                    const { cart } = await res.json()

                    setCart(cart);
                    setCartLoading(false);

                } else {
                    toast.error("Something went wrong.")
                }

            } catch (err) {
                console.log(err)
                toast.error("Something went wrong.")
            }

        }
        if (!loading) {
            getCart()
        }
    }, [loading, reload, token])


    const removeItem = async (item: any) => {
        //just remove one item from cart with the id
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cart/remove`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ id: item.id })

                })
            if (res.ok) {
                const data = await res.json()
                if (data.message) {
                    toast.success(data.message);
                    setReload(!reload);
                } else {
                    toast.error(data.error);
                }

            } else {
                toast.error("Something went wrong.")
            }

        } catch (err) {
            console.log(err)
            toast.error("Something went wrong.")
        }

    };
    if (!user) {
        return <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-xl md:text-2xl  font-semibold mb-4"> Your Basket</h1>
            <p className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>You need to login first.</p>
        </div>
    }
    if (cartLoading) return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col">
            <h1 className="text-xl md:text-2xl  font-semibold mb-4"> Your Basket</h1>
            <div className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>
                <div className="animate-spin rounded-full border-t-4 border-neutral-700 border-solid h-12 w-12 ">

                </div>
            </div>

        </div>
    )

    return (
        <>   <h1 className="text-2xl md:text-3xl  font-semibold mb-4"> Shopping Basket</h1>
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col  py-4">

                {cart.length === 0 ? (
                    <p className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>Your basket is empty.</p>
                ) : (
                    <>{
                        cart.CartItems.length === 0 ? (
                            <p className='  text-xl md:text-2xl  flex justify-center h-[400px] items-center'>Your basket is empty.</p>
                        ) : (

                            <div className='flex flex-col gap-5'>
                                {cart.CartItems.map((item: any) => (
                                    <CartItem key={item.id} item={item} removeItem={removeItem} />
                                ))}

                                <div className="">
                                    <p className="text-2xl font-bold">
                                        Total: ₹ {cart.total}
                                    </p>
                                </div>

                                <div className='w-full flex justify-center items-center'>
                                    <Link href={'/payment/checkout'} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">


                                        Checkout
                                    </Link>
                                </div>

                            </div>
                        )
                    }
                    </>
                )
                }
            </div ></>
    );
};

export default Cart;

// Path: src/pages/payment/checkout.tsx




