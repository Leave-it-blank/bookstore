import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/store/user';
import { useRouter } from 'next/router';
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
            <h1 className="text-3xl font-semibold mb-4"> Your Cart</h1>
            <p className='text-[25px] flex justify-center h-[400px] items-center'>You need to login first.</p>
        </div>
    }
    if (cartLoading) return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-3xl font-semibold mb-4"> Your Cart</h1>
            <p className='text-[25px] flex justify-center h-[400px] items-center'>Loading...</p>
        </div>
    )

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-3xl font-semibold mb-4"> Your Cart</h1>
            {cart.length === 0 ? (
                <p className='text-[25px] flex justify-center h-[400px] items-center'>Your cart is empty.</p>
            ) : (
                <>{
                    cart.CartItems.length === 0 ? (
                        <p className='text-[25px] flex justify-center h-[400px] items-center'>Your cart is empty.</p>
                    ) : (

                        <div className='flex flex-col gap-5'>
                            {cart.CartItems.map((item: any) => (
                                <div
                                    key={item.id}
                                    className=" grid grid-cols-8 justify-center gap-10 items-center border-b border-gray-300 py-2"
                                >
                                    <div className='col-span-1 flex justify-center flex-col gap-1 items-center capitalize border-r'>
                                        <p className="text-lg font-semibold">{item.category}</p>
                                        <p className="text-lg font-semibold">{item.type}</p>


                                    </div>
                                    {
                                        item.category === 'BOOK' ? (
                                            <div className='col-start-2 col-span-3 border-r'>
                                                <p className="text-lg font-semibold">{item.product.title}</p>
                                            </div>
                                        ) : (
                                            <div className='col-start-2 col-span-3 border-r'>
                                                <p className="text-lg font-semibold">{item.chapter.title} - Chapter {item.chapter.number}</p>
                                            </div>

                                        )
                                    }
                                    <div className='col-start-5 border-r'>
                                        <p className="text-lg font-semibold">{item.quantity + " qty"}</p>
                                    </div>
                                    <div className='col-start-7 border-r'>
                                        <p className="text-gray-600">₹{item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item)}
                                        className="bg-neutral-800 text-white rounded-md py-2 col-start-8"
                                    >
                                        Remove from cart
                                    </button>
                                </div>
                            ))}

                            <div className="mt-4">
                                <p className="text-2xl  font-bold">
                                    Total: ₹ {cart.total}
                                </p>
                            </div>
                            <br />
                            <div className='w-full flex justify-center'>
                                <Link href={'/payment/checkout'} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">
                                    Checkout
                                </Link>
                            </div>

                        </div>
                    )}
                </>
            )
            }
        </div >
    );
};

export default Cart;

// Path: src/pages/payment/checkout.tsx




