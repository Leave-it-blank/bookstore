import ProcessingSpinner from '@/components/ProccessingSpinner'
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import moment from 'moment';
import { Disclosure, Transition } from '@headlessui/react'
import toast from 'react-hot-toast';
import { useUser } from '@/store/user';
export default function OrderItem({ item, download }: { item: any, download?: any }) {
    const { token, user } = useUser();
    const [processLoading, processLoadingSet] = useState<boolean>(false);
    const handleDownload = async (id: string, name: string) => {
        if (!token) {
            toast.error("Please login to download")
            return;
        }
        processLoadingSet(true);
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/download/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json ', 'Authorization': `Bearer ${token}` },

        }).then(async (res) => {
            if (res.ok) {
                const blob = await res.blob();
                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);
                // Create a temporary link and trigger the download
                const a = document.createElement('a');
                a.href = url;
                a.download = name + ".zip"; // Set the desired filename
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to download the file');
                toast.error(`Failed to download the file. Contact Support.`)

            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
        processLoadingSet(false);
    }
    return (
        <Disclosure key={item.id} as="div" >

            <Disclosure.Button as={Fragment} >
                <div

                    className="flex flex-col md:flex-row justify-between md:gap-10 md:items-center border-b border-gray-300 py-2 gap-5"
                >
                    <div className='flex justify-start  md:justify-center flex-col gap-1 items-start md:items-center capitalize border-r bg-neutral-900 text-white rounded-full py-3  px-8'>
                        <p className="text-md text-center font-semibold w-full">{item.orderNumber}</p>

                    </div>
                    <div className='flex flex-col md:flex-row gap-1 items-start md:items-center'>
                        <p className="text-md text-center font-semibold w-full">{moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

                    </div>
                    <div className=' flex flex-row   justify-between w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 items-center  bg-neutral-200 p-2 rounded-md '>


                        <div className=''>
                            <p className=" text-gray-600 text-xl"> Total: ₹ {item.total}</p>
                        </div>
                        {
                            item.status == "COMPLETED" && (
                                <div className=''>
                                    <p className=" text-lg font-semibold text-gray-900   cursor-pointer hover:text-gray-600   ">{"Expand"}</p>
                                </div>
                            )
                        }
                        {
                            item.status == 'CREATED' && (
                                <div className=''>
                                    <a href={item.pay_url} className=" text-lg font-semibold text-gray-900  capitalize  "> Retry Payment</a>
                                </div>
                            )
                        }
                        {
                            item.status == 'CANCELLED' && (
                                <div className=''>
                                    <span className=" text-lg font-semibold text-red-600  capitalize  "> ORDER CANNCELED</span>
                                </div>
                            )
                        }
                        {
                            item.status == 'PROCESSING' && (
                                <div className=''>
                                    <span className=" text-lg font-semibold text-red-600  capitalize  ">  Generating Links </span>
                                </div>
                            )
                        }


                    </div>

                    <ProcessingSpinner color="" loading={processLoading} classes="self-center md:self-start my-3 md:my-0 md:mt-5  " />

                </div >

            </Disclosure.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Disclosure.Panel className="text-gray-500">
                    <div className="flex flex-col   justify-between  border-b border-gray-300 py-2 gap-5">
                        {
                            item.items.map((product: any, indx: number) => {
                                return <div key={indx}>
                                    {
                                        product.Product ? (
                                            <div className='flex justify-between gap-3'>

                                                <div className='w-1/2'> {product.Product?.title} X{product.quantity} </div>
                                                <div> @{product.price} </div>
                                                {
                                                    item.status === "COMPLETED" && (
                                                        <> {
                                                            new Date(product.activedate) > new Date() ? (
                                                                <button onClick={(e) => { e.preventDefault(); handleDownload(product.id, product.Product.title); }} > Download </button>
                                                            ) : <> Link Expired </>
                                                        }
                                                        </>
                                                    )
                                                }

                                            </div>
                                        ) : (
                                            <div className='flex justify-between gap-3'>
                                                <div className='w-1/2'> {"Chapter " + product.Chapter.number} {product.Chapter?.title} X{product.quantity} </div>
                                                <div>  @{product.price} </div>
                                                {
                                                    item.status === "COMPLETED" && (
                                                        <> {
                                                            new Date(product.activedate) > new Date() ? (
                                                                <button onClick={(e) => { e.preventDefault(); handleDownload(product.id, "Chapter " + product.Chapter.number + " " + product.Chapter.title); }} > Download </button>
                                                            ) : <> Link Expired </>
                                                        }
                                                        </>
                                                    )
                                                }
                                            </div>
                                        )

                                    }

                                </div>
                            })
                        }
                    </div>
                </Disclosure.Panel>
            </Transition>
        </Disclosure >)
}