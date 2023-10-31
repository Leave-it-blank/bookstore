import { useEffect, useState } from "react";
import { useUser } from "@/store/user";
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import OrderItem from "@/components/order/OrderItem";
import { PacmanLoader } from 'react-spinners'
export default function Orders() {
    const { user, loading, token } = useUser();
    const [orders, setOrder] = useState([]);
    const [myloading, setMyLoading] = useState<Boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            setMyLoading(true);
            await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/orders/get`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            }).then(async (res) => {

                if (res.status === 200 || res.status == 201) {
                    const data = await res.json();
                    if (data.error) {
                        toast.error(data.error)
                        return;
                    }
                    setOrder(data.orders);
                } else if (res.status == 404 || res.status == 500) {
                    toast.error("Backend service is down. Try again.")
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
                setMyLoading(false);
            }).catch((err) => {
                console.log(err);
                toast.error("Something went wrong. Please try again")
            });
        }
        if (user) {
            fetchOrder();
        }

    }, [token, user]);

    if (loading) {
        return <PacmanLoader
            color="#eeeeee"
            size={30}
        />
    }

    if (!user && loading) {
        return <PacmanLoader
            color="#eeeeee"
            size={30}
        />;
    }
    if (!user) {
        // router.push('/login')
        return <>
            Login Required.
        </>
    }
    if (myloading) {
        return <div className="container mx-auto    rounded-lg flex justify-center flex-col">
            <h1 className="text-start text-2xl md:text-3xl">My Orders</h1>

            <div className='text-xl md:text-2xl  flex justify-center h-[400px] items-center'>
                <PacmanLoader
                    color="#eeeeee"
                    size={30}
                />
            </div>

        </div>
    }

    return <>
        {
            orders.length > 0 ? (
                <div className="container mx-auto">
                    <div className="">
                        <h1 className="text-start text-2xl md:text-3xl">My Orders</h1>
                        <div className='bg-green-50 text-green-600 p-5 md:p-6 rounded-md my-3'>
                            Download link will only be available for 24 hr after purchase. Please download the file as soon as possible.
                            <br />
                            For any technical issues, please contact us at <a href="mailto:contact4bookqueries@gmail.com" className='text-green-800'> contact4bookqueries@gmail.com</a>
                        </div>
                        <div className=" bg-white rounded-md p-3 md:p-5">
                            {
                                orders.map((order, indx) => {
                                    return <OrderItem item={order} key={indx} />
                                })
                            }

                        </div>
                    </div>
                </div >
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center">No Orders</h1>
                        </div>
                    </div>
                </div>
            )
        }

    </>

}


