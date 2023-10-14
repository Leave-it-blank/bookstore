// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import toast from "react-hot-toast";
// import { useUser } from "@/store/user";
// interface cart {
//     itemID: number;
//     itemName: string;
//     price: number;
//     itemType: string;
//     quantity: number;
//     type: string;
// }
// const Checkout = () => {
//     const [cartItems, setCartItems] = useState<cart[]>([]);
//     const [total, setTotal] = useState(0);
//     const [promo, setPromo] = useState("");
//     const [promoApplied, setPromoApplied] = useState(false);
//     const [discount, setDiscount] = useState(0);
//     const [promoError, setPromoError] = useState("");
//     const [promoSuccess, setPromoSuccess] = useState("");
//     const { user, loading } = useUser();
//     const router = useRouter();

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/login');
//         }
//     }, [user, loading, router]);
//     useEffect(() => {
//         const cart = localStorage.getItem('cart');
//         if (cart) {
//             setCartItems(JSON.parse(cart));

//         } else {
//             router.push('/');
//         }
//     }, [router]);

//     useEffect(() => {
//         const calculateTotal = () => {
//             return cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
//         };

//         if (cartItems.length > 0) {

//             setTotal(calculateTotal());
//         }
//     }, [cartItems]);
//     useEffect(() => {
//         if (cartItems.length > 0) {

//         }
//     }, [cartItems]);

//     const applyPromo = async (e: any) => {
//         e.preventDefault();
//         if (promo.length == 0) {
//             return;
//         }
//         await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/promo/valid`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ promo, total }),
//         }).then(async (res) => {
//             const data = await res.json();
//             if (res.ok) {
//                 if (data.valid) {
//                     setPromoSuccess(data.message)
//                     setPromoApplied(true)
//                     setDiscount(data.discount)
//                     toast.success(data.message)
//                 } else {
//                     setPromoError(data.error)
//                     toast.error(data.error)
//                 }


//             } else {
//                 if (data.error) {
//                     setPromoError(data.error)
//                     toast.error(data.error)
//                 } else {
//                     toast.error("Something went wrong. Please try again")
//                 }

//             }
//         }).catch((err) => {
//             console.log(err);
//             toast.error("Something went wrong. Please try again")
//         });
//     }
//     const removePromo = () => {
//         setPromoApplied(false)
//         setPromo("")
//         setDiscount(0)
//         setPromoError("")
//         setPromoSuccess("")
//     }
//     if (!user) {
//         return <></>
//     }

//     return (
//         <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
//             <h1 className="text-3xl font-semibold mb-4"> Order Summary</h1>
//             {cartItems.length === 0 ? (
//                 <></>
//             ) : (
//                 <div className='flex flex-col gap-5'>
//                     {cartItems.map((item) => (
//                         <div
//                             key={item.itemID}
//                             className=" grid grid-cols-8 justify-center gap-10 items-center border-b border-gray-300 py-2"
//                         >
//                             <div className='col-span-1 flex justify-center flex-col gap-1 items-center capitalize border-r'>
//                                 <p className="text-lg font-semibold">{item.itemType}</p>
//                                 <p className="text-lg font-semibold">{item.type}</p>


//                             </div>
//                             <div className='col-start-2 col-span-3 border-r'>
//                                 <p className="text-lg font-semibold">{item.itemName}</p>
//                             </div>
//                             <div className='col-start-5 border-r'>
//                                 <p className="text-lg font-semibold">{item.quantity + " qty"}</p>
//                             </div>
//                             <div className='col-start-7 border-r'>
//                                 <p className="text-gray-600">₹{item.price}</p>
//                             </div>

//                         </div>
//                     ))}

//                     <div className="mt-4 ">

//                         {

//                             promoApplied ? (
//                                 <div className="flex flex-col  justify-center items-start gap-1">
//                                     <div className="flex flex-wrap w-full gap-5 items-center justify-start ">
//                                         <div className="capitalize text-green-500 text-xl" > {promo}</div>
//                                         <div className="text-md font-semibold "> {promoSuccess}</div>
//                                         <button className="capitalize text-xs text-red-500 justify-self-end self-end  items-end" onClick={removePromo} >remove</button>
//                                     </div>
//                                     <div> <span className="text-md font-bold"> Discount :</span> <span className="text-2xl font-light stroke-violet-300">{discount}</span> </div>
//                                 </div>
//                             )
//                                 :
//                                 <>

//                                     <div className="flex flex-col md:flex-row gap-5 md:items-center justify-start">


//                                         <h2 className="font-bold text-sm md:text-xl"> {"Promo Codes : "} </h2>

//                                         <input onChange={(e) => setPromo(e.target.value)} type="text" name="promo" placeholder="Enter Promo Code" className="border rounded-md p-2 w-3/5" />

//                                         <button onClick={applyPromo} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-10 py-2 relative   bg-neutral-800 rounded-xl overflow-hidden">Apply</button>
//                                     </div>   {
//                                         promoError && (<div className=" text-red-400 text-sm text-center "> {promoError}</div>)
//                                     }</>
//                         }

//                     </div>


//                     <div className="mt-2">
//                         <p className="text-2xl  font-bold">
//                             Total:
//                             {
//                                 discount > 0 ? (
//                                     <span className=" "> ₹{total - discount}</span>
//                                 ) : <span className=""> ₹{total}</span>
//                             }
//                         </p>
//                     </div>
//                     <br />
//                     <div className='w-full flex justify-center'>
//                         <button className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-xl overflow-hidden">
//                             Pay Now
//                         </button>
//                     </div>

//                 </div>
//             )
//             }
//         </div >
//     );
// }
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

                                </div>
                            ))}

                            <div className="mt-4 ">
                                {

                                    cart.promo ? (
                                        <div className="flex flex-col  justify-center items-start gap-1">
                                            <div className="flex flex-wrap w-full gap-5 items-center justify-start ">
                                                <div className="capitalize text-green-500 text-xl" > {cart.promo}</div>
                                                <div className="text-md font-semibold "> {""}</div>
                                                <button className="capitalize text-xs text-red-500 justify-self-end self-end  items-end" onClick={removePromo} >remove</button>
                                            </div>
                                            <div> <span className="text-md font-bold"> Discount :</span> <span className="text-2xl font-light stroke-violet-300">{cart.discount} %</span> </div>
                                        </div>
                                    )
                                        :
                                        <>

                                            <div className="flex flex-col md:flex-row gap-5 md:items-center justify-start">


                                                <h2 className="font-bold text-sm md:text-xl"> {"Promo Codes : "} </h2>

                                                <input onChange={(e) => setPromo(e.target.value)} type="text" name="promo" placeholder="Enter Promo Code" className="border rounded-md p-2 w-3/5" />

                                                <button onClick={applyPromo} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-10 py-2 relative   bg-neutral-800 rounded-xl overflow-hidden">Apply</button>
                                            </div>
                                            {
                                                promoError && (<div className=" text-red-400 text-sm text-center "> {promoError}</div>)
                                            }
                                        </>
                                }

                            </div>

                            <div className="mt-4">

                                {
                                    cart.promo ? (
                                        <>
                                            <p className="text-2xl  font-semibold">
                                                Total: ₹ {cart.total}
                                            </p>
                                            <p className="text-2xl  font-bold">
                                                Discount: ₹ {cart.discount * cart.total / 100}
                                            </p> <p className="text-2xl  font-bold">
                                                Final Total: ₹ {cart.total - cart.discount * cart.total / 100}
                                            </p>
                                        </>

                                    ) : <> <p className="text-2xl  font-bold">
                                        Total: ₹ {cart.total}
                                    </p></>
                                }
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
export default Checkout;