import ProcessingSpinner from '@/components/ProccessingSpinner'
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import moment from 'moment';
import { Disclosure, Transition } from '@headlessui/react'
export default function OrderItem({ item, download }: { item: any, download?: any }) {
    const [processLoading, processLoadingSet] = useState<boolean>(false);
    console.log(item);
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
                        <p className="text-md text-center font-semibold w-full">{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>

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
                                    <a href='' className=" text-lg font-semibold text-gray-900  capitalize  "> Retry Payment</a>
                                </div>
                            )
                        }

                        {
                            download && (
                                <button

                                    className=" bg-neutral-900 text-white hover:bg-neutral-800  rounded-md py-3 px-4 w-14 "
                                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                </button>
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
                            item.items.map((item: any, indx: number) => {
                                return <div key={indx}>
                                    {
                                        item.Product ? (
                                            <div className='flex justify-between gap-3'>

                                                <div className='w-1/2'> {item.Product?.title} X{item.quantity} </div>
                                                <div> @{item.price} </div>
                                                <div> Download </div>
                                            </div>
                                        ) : (
                                            <div className='flex justify-between gap-3'>
                                                <div className='w-1/2'> {item.Chapter?.title} X{item.quantity} </div>
                                                <div>  @{item.price} </div>
                                                <a href='/' target='_blank' > Download </a>
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