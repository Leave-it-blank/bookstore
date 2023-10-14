import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useUser } from "@/store/user";
interface cart {
    itemID: number;
    itemName: string;
    price: number;
    itemType: string;
    quantity: number;
    type: string;
}
const Checkout = () => {
    const [cartItems, setCartItems] = useState<cart[]>([]);
    const [total, setTotal] = useState(0);
    const [promo, setPromo] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState("");
    const [promoSuccess, setPromoSuccess] = useState("");
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));

        } else {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        const calculateTotal = () => {
            return cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
        };

        if (cartItems.length > 0) {

            setTotal(calculateTotal());
        }
    }, [cartItems]);
    useEffect(() => {
        if (cartItems.length > 0) {

        }
    }, [cartItems]);

    const applyPromo = async (e: any) => {
        e.preventDefault();
        if (promo.length == 0) {
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/promo/valid`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ promo, total }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                if (data.valid) {
                    setPromoSuccess(data.message)
                    setPromoApplied(true)
                    setDiscount(data.discount)
                    toast.success(data.message)
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
    const removePromo = () => {
        setPromoApplied(false)
        setPromo("")
        setDiscount(0)
        setPromoError("")
        setPromoSuccess("")
    }
    if (!user) {
        return <></>
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-3xl font-semibold mb-4"> Order Summary</h1>
            {cartItems.length === 0 ? (
                <></>
            ) : (
                <div className='flex flex-col gap-5'>
                    {cartItems.map((item) => (
                        <div
                            key={item.itemID}
                            className=" grid grid-cols-8 justify-center gap-10 items-center border-b border-gray-300 py-2"
                        >
                            <div className='col-span-1 flex justify-center flex-col gap-1 items-center capitalize border-r'>
                                <p className="text-lg font-semibold">{item.itemType}</p>
                                <p className="text-lg font-semibold">{item.type}</p>


                            </div>
                            <div className='col-start-2 col-span-3 border-r'>
                                <p className="text-lg font-semibold">{item.itemName}</p>
                            </div>
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

                            promoApplied ? (
                                <div className="flex flex-col  justify-center items-start gap-1">
                                    <div className="flex flex-wrap w-full gap-5 items-center justify-start ">
                                        <div className="capitalize text-green-500 text-xl" > {promo}</div>
                                        <div className="text-md font-semibold "> {promoSuccess}</div>
                                        <button className="capitalize text-xs text-red-500 justify-self-end self-end  items-end" onClick={removePromo} >remove</button>
                                    </div>
                                    <div> <span className="text-md font-bold"> Discount :</span> <span className="text-2xl font-light stroke-violet-300">{discount}</span> </div>
                                </div>
                            )
                                :
                                <>

                                    <div className="flex flex-col md:flex-row gap-5 md:items-center justify-start">


                                        <h2 className="font-bold text-sm md:text-xl"> {"Promo Codes : "} </h2>

                                        <input onChange={(e) => setPromo(e.target.value)} type="text" name="promo" placeholder="Enter Promo Code" className="border rounded-md p-2 w-3/5" />

                                        <button onClick={applyPromo} className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-10 py-2 relative   bg-neutral-800 rounded-xl overflow-hidden">Apply</button>
                                    </div>   {
                                        promoError && (<div className=" text-red-400 text-sm text-center "> {promoError}</div>)
                                    }</>
                        }

                    </div>


                    <div className="mt-2">
                        <p className="text-2xl  font-bold">
                            Total:
                            {
                                discount > 0 ? (
                                    <span className=" "> ₹{total - discount}</span>
                                ) : <span className=""> ₹{total}</span>
                            }
                        </p>
                    </div>
                    <br />
                    <div className='w-full flex justify-center'>
                        <button className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-xl overflow-hidden">
                            Pay Now
                        </button>
                    </div>

                </div>
            )
            }
        </div >
    );
}

export default Checkout;