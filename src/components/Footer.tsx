import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='w-full  py-5 bg-black pb-10 px-10 '>
            <div className="  container mx-auto justify-between items-center flex  ">
                <div className=' flex flex-col gap-3'>


                    <div className="flex-col justify-start items-start gap-3 inline-flex  self-start">
                        <div className="text-white  text-sm sm:text-lg font-bold  leading-10 capitalize">Contact us</div>
                        <div className="justify-start text-xs sm:text-sm  items-start gap-5 inline-flex">
                            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                <Link href={"https://ajay.garg@s2p-pace.com"} className="text-gray-300  font-normal  leading-tight">ajay.garg@s2p-pace.com</Link>
                                <Link href={"mailTo:akgarg71@gmail.com"} className="text-gray-300   font-normal   leading-tight">akgarg71@gmail.com</Link>
                            </div>
                        </div>

                    </div>
                    <div className="flex-col justify-start items-start gap-3 inline-flex  self-start">
                        <div className="text-white  text-sm sm:text-lg font-bold  leading-10 capitalize">For any Query</div>
                        <div className="justify-start text-xs sm:text-sm  items-start gap-5 inline-flex">
                            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                <Link href={"https://ajay.garg@s2p-pace.com"} className="text-gray-300  font-normal  leading-tight">ajay.garg@s2p-pace.com</Link>
                                <Link href={"mailTo:akgarg71@gmail.com"} className="text-gray-300   font-normal   leading-tight">akgarg71@gmail.com</Link>
                            </div>
                        </div>

                    </div> </div>
                {/* <div className="flex-col justify-start h-full   gap-6 inline-flex items-center">
                    <div className="text-white text-2xl font-bold  leading-10">Connect with me on LinkdIn</div>

                    
                </div> */}
                <div className="text-center text-white text-xs font-extralight -mb-40 flex flex-wrap">© 2023 All rights reserved </div>
                <div className="flex-col justify-start text-sm sm:text-lg  items-end gap-1 inline-flex self-start">
                    <Link href={"/tos"} className="text-right text-white font-bold   sm:leading-relaxed">Terms & Conditions</Link>
                    <Link href={"/privacy"} className="text-right text-white   font-bold  sm:leading-relaxed">Privacy Policy</Link>
                </div>
            </div>
        </div >
    );
};

export default Footer;
