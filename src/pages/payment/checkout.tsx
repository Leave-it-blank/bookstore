
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@/store/user';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from '@/components/cart/CartItem';
import ProcessingSpinner from '@/components/ProccessingSpinner';
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
    const [proccessLoading, setProccessLoading] = useState<boolean>(false);

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
                    toast.error("Backend service is down. Try again.")
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
            body: JSON.stringify({ promo }),
        }).then(async (res) => {
            if (res.status === 200 || res.status == 201) {
                const data = await res.json();
                if (data.valid) {
                    toast.success(data.message)
                    setPromoError("")
                    setReload(!reload)
                } else {
                    setPromoError(data.error)
                    toast.error(data.error)
                }


            } else if (res.status == 404 || res.status == 500) {
                toast.error("Backend service is down. Try again.")
            } else if (res.status == 403) {
                toast.error("Request failed. Forbidden.");
            } else if (res.status == 400 || res.status == 401 || res.status == 402 || res.status == 409) {
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error)
                    setPromoError(data.error)
                }
            } else if (res.status == 429) {
                toast.error("Too many requests. Please try again later.")
            } else if (res.status == 405 || res.status == 501) {
                toast.error("Method not allowed.")
            } else if (res.status == 451) {
                toast.error("Unavailable For Legal Reasons.")
            } else {
                toast.error("Something went wrong. Please try again")
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
            if (res.status === 200 || res.status == 201) {
                const data = await res.json();
                if (data.valid) {
                    toast.success(data.message)
                    setReload(!reload)
                } else {
                    setPromoError(data.error)
                    toast.error(data.error)
                }


            } else if (res.status == 404 || res.status == 500) {
                toast.error("Backend service is down. Try again.")
            } else if (res.status == 403) {
                toast.error("Request failed. Forbidden.");
            } else if (res.status == 400 || res.status == 401 || res.status == 402 || res.status == 409) {
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error)
                    setPromoError(data.error)
                }
            } else if (res.status == 429) {
                toast.error("Too many requests. Please try again later.")
            } else if (res.status == 405 || res.status == 501) {
                toast.error("Method not allowed.")
            } else if (res.status == 451) {
                toast.error("Unavailable For Legal Reasons.")
            } else {
                toast.error("Something went wrong. Please try again")
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
        setReload(!reload)
        setPromo("")

    }

    const handleCheckout = async () => {
        setProccessLoading(true);
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
                if (res.status === 200 || res.status == 201) {
                    const result = await stripe.redirectToCheckout({
                        sessionId: checkoutSession.data.id,
                    });
                    if (result.error) {
                        setProccessLoading(false);
                        toast.error(result.error.message || "Error redirecting to checkout")
                    }
                } else if (res.status == 500) {
                    toast.error("Backend service is down. Try again.")
                } else if (res.status == 404) {
                    toast.error("Not found. Try again.")
                } else if (res.status == 403) {
                    toast.error("Request failed. Forbidden.");
                } else if (res.status == 400 || res.status == 401 || res.status == 402 || res.status == 409) {
                    const data = await res.json();
                    if (data.error) {

                        toast.error(data.error)
                    }
                } else if (res.status == 429) {
                    toast.error("Too many requests. Please try again later.")
                } else if (res.status == 405 || res.status == 501) {
                    toast.error("Method not allowed.")
                } else if (res.status == 451) {
                    toast.error("Unavailable For Legal Reasons.")
                } else {
                    toast.error("Something went wrong. Please try again")
                }
            }).catch((err) => {
                console.log(err);
                setProccessLoading(false);
                toast.error("Something went wrong. Please try again")
            });
        } catch (error) {
            console.log(error);
            setProccessLoading(false);
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
                Download link will only be available for 24 hr after purchase. Please download the file as soon as possible.
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
                                    {
                                        proccessLoading ? <div className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">
                                            <ProcessingSpinner color='white' loading={proccessLoading} />
                                        </div> :
                                            <button onClick={handleCheckout} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">
                                                Pay Now
                                            </button>
                                    }

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