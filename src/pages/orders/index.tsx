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
                const data = await res.json();
                if (res.ok) {
                    setOrder(data.orders);
                } else {
                    if (data.error) {
                        toast.error(data.error)
                    }
                } setMyLoading(false);
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


