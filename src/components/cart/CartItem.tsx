import ProcessingSpinner from '@/components/ProccessingSpinner'
import React, { useState, useEffect } from 'react';

export default function Cart({ item, removeItem }: { item: any, removeItem?: any }) {
    const [processLoading, processLoadingSet] = useState<boolean>(false);
    return (
        <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between md:gap-10 md:items-center border-b border-gray-300 py-2 gap-5"
        >
            <div className='flex justify-start  md:justify-center flex-col gap-1 items-start md:items-center capitalize border-r bg-neutral-900 text-white rounded-full py-3  px-8'>
                <p className="text-md text-center font-semibold w-full">{item.category} - {item.type}</p>

            </div>
            {
                item.category === 'BOOK' ? (
                    <div className=' text-center border-r  border-b md:border-b-0   md:border-l px-2'>
                        <p className="text-lg font-semibold">{item.product.title}</p>
                    </div>
                ) : (
                    <div className='  text-center border-b md:border-b-0 md:border-r md:border-l px-2'>
                        <p className="text-lg font-semibold">{item.chapter.title} - Chapter {item.chapter.number}</p>
                    </div>

                )
            }
            <div className=' flex flex-row   justify-between w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 items-center  bg-neutral-200 p-2 rounded-md '>


                <div className=''>
                    <p className="text-lg font-semibold">{item.quantity + " Qty"}</p>
                </div>
                <div className=''>
                    <p className="text-gray-600 text-xl">₹{item.price}</p>
                </div>
                {
                    removeItem && (
                        <button
                            onClick={() => { processLoadingSet(!processLoading); removeItem(item) }}
                            className=" bg-neutral-900 text-white hover:bg-neutral-800  rounded-md py-3 px-4 w-14 "
                        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    )
                }


            </div>

            <ProcessingSpinner color="" loading={processLoading} classes="self-center md:self-start my-3 md:my-0 md:mt-5  " />
        </div >)
}