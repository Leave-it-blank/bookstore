
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/store/user';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from '@/components/cart/CartItem';
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
) : null;
interface cart {
    itemID: number;
    itemName: string;
    price: number;
    itemType: string;
    quantity: number;
    type: string;
}

const Checkout = () => {
    const { user, loading, token } = useUser();
    const router = useRouter();
    const [reload, setReload] = useState<boolean>(false);
    const [cart, setCart] = useState<any>([]);
    const [cartLoading, setCartLoading] = useState<boolean>(true);
    const [promo, setPromo] = useState("");

    const [promoError, setPromoError] = useState("");
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

    const applyPromo = async (e: any) => {
        e.preventDefault();
        if (promo.length == 0) {
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/promo/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ promo, cartId: cart.id, token: token }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                if (data.valid) {

                    toast.success(data.message)
                    setReload(!reload)
                } else {
                    setPromoError(data.error)
                    toast.error(data.error)
                }


            } else {
                if (data.error) {
                    setPromoError(data.error)
                    toast.error(data.error)
                } else {
                    toast.error("Something went wrong. Please try again")
                }

            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
    }
    const removePromo = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/promo/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ cartId: cart.id, token: token }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                if (data.valid) {
                    toast.success(data.message)
                    setReload(!reload)
                } else {
                    setPromoError(data.error)
                    toast.error(data.error)
                }


            } else {
                if (data.error) {
                    setPromoError(data.error)
                    toast.error(data.error)
                } else {
                    toast.error("Something went wrong. Please try again")
                }

            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
        setReload(!reload)
        setPromo("")

    }

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            if (!stripe) {
                return;
            }

            await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/checkout_sessions`, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ cart: cart, token: token }),
            }).then(async (res) => {
                const checkoutSession = await res.json();
                if (res.ok) {
                    const result = await stripe.redirectToCheckout({
                        sessionId: checkoutSession.data.id,
                    });
                    if (result.error) {
                        toast.error(result.error.message || "Error redirecting to checkout")
                    }
                } else {
                    toast.error("Something went wrong. Please try again")

                }
            }).catch((err) => {
                console.log(err);
                toast.error("Something went wrong. Please try again")
            });


        } catch (error) {
            console.log(error);
        }
    };

    if (!user) {
        return <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-xl md:text-2xl  font-semibold mb-4"> Are you supposed to be here?</h1>
            <p className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>Who are you...?</p>
        </div>
    }
    if (cartLoading) return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col">
            <h1 className="text-xl md:text-2xl  font-semibold mb-4"> Your Checkout List</h1>
            <div className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>
                <div className="animate-spin rounded-full border-t-4 border-neutral-700 border-solid h-12 w-12 ">

                </div>
            </div>

        </div>
    )

    return (
        <>   <h1 className="text-2xl md:text-3xl  font-semibold mb-4"> Checkout Basket</h1>

            <div className='bg-red-100 text-red-500 p-5 md:p-6 rounded-md mb-3'>
                Download link will only be available for 15 min after purchase. Please download the file as soon as possible.
            </div>

            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col  py-4">



                {cart.length === 0 ? (
                    <p className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>Nothing to see.</p>
                ) : (
                    <>{
                        cart.CartItems.length === 0 ? (
                            <p className='  text-xl md:text-2xl  flex justify-center h-[400px] items-center'>Nothing to see.</p>
                        ) : (

                            <div className='flex flex-col gap-3 md:gap-5'>
                                {cart.CartItems.map((item: any) => (
                                    <CartItem key={item.id} item={item} />
                                ))}

                                <div className=" ">
                                    {
                                        cart.promo && cart.total > 500 && (<div className=" text-green-500 text-sm text-start px-4 py-2 bg-green-50 my-3 ">
                                            <div className="flex  w-full  items-center justify-between ">
                                                <div className="capitalize  " > {cart.promo}</div>

                                                <button className="capitalize text-xs text-red-500 justify-self-end self-end  items-end" onClick={removePromo} >remove</button>
                                            </div>
                                        </div>)
                                    }

                                    {

                                        !cart.promo &&
                                        <>

                                            <div className="flex flex-col md:flex-row gap-5 md:items-center justify-start">


                                                <h2 className="font-bold text-md md:text-lg"> {"Promo Codes : "} </h2>

                                                <input onChange={(e) => setPromo(e.target.value)} type="text" name="promo" placeholder="Enter Promo Code" className="border rounded-md p-2 md:w-3/5" />

                                                <button onClick={applyPromo} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-10 py-2 relative   bg-neutral-800 rounded-xl overflow-hidden">Apply</button>
                                            </div>

                                        </>
                                    }
                                    {
                                        promoError && (<div className=" text-red-400 text-sm text-start px-4 py-2 bg-red-50 my-3 "> {promoError}</div>)
                                    }

                                </div>

                                <div className="mt-2">

                                    {
                                        cart.promo && cart.total > 500 ? (
                                            <div className='flex flex-col gap-1 justify-center md:justify-end w-full items-baseline'  >
                                                <div className="text-2xl  font-semibold">
                                                    Total: ₹ {cart.total}
                                                </div>
                                                <div className="text-2xl  font-bold text-red-500">
                                                    Discount: ₹ {cart.discount * cart.total / 100}
                                                </div> <div className="text-2xl  font-bold text-green-500">
                                                    Final Total: ₹ {cart.total - cart.discount * cart.total / 100}
                                                </div>
                                            </div>

                                        ) : <> <p className="text-2xl  font-bold">
                                            Total: ₹ {cart.total}
                                        </p></>
                                    }
                                </div>

                                <div className='w-full flex justify-center'>
                                    <button onClick={handleCheckout} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )
                }
            </div >
        </ >
    );
};
export default Checkout;