import { useEffect, useState } from "react";
import { useUser } from "@/store/user";
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import OrderItem from "@/components/order/OrderItem";

export default function Orders() {
    const { user, loading, token } = useUser();
    const [orders, setOrder] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/orders/get`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            }).then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    setOrder(data.orders);
                } else {
                    if (data.error) {
                        toast.error(data.error)
                    }
                }
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
        return <LoadingSpinner />
    }
    if (!user && !loading) {
        return <>Please Login</>;
    }


    return <>
        {
            orders.length > 0 ? (
                <div className="container">
                    <div className="">
                        <h1 className="text-start text-2xl md:text-3xl">My Orders</h1>
                        <div className='bg-green-50 text-green-600 p-5 md:p-6 rounded-md my-3'>
                            Download link will only be available for 15 min after purchase. Please download the file as soon as possible.
                            <br />
                            For any technical issues, please contact us at <a href="mailto:akgarg71@gmail.com" className='text-green-800'> akgarg71@gmail.com</a>
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


