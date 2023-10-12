import React from "react";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import PreeBookForm from "./prebook/PreBookForm";
interface BookProps {
    id: string;
    title: string;
    category: string;
    author: string;
    rating: number;
    thumbUrl: string[];
    price: string;
    priceList: {
        digital: string;
        hardcopy: string;
    };

}

export const BuyBookPage = ({ Book }: { Book: BookProps }): JSX.Element => {
    const [modelState, setModelState] = useState(false);
    const [activeBookImageIndex, setActiveBookImageIndex] = useState(0);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            quantity: parseInt(event.target.value)
        });
    };
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "digital") {
            setForm({
                ...form,
                type: "digital",
                quantity: 1,
                price: Book.priceList.digital,
            });
        } else {
            setForm({
                ...form,
                type: "hardcopy",
                price: Book.priceList.hardcopy,
            });
        }
    };


    const [form, setForm] = useState({
        itemID: Book.id,
        itemName: Book.title,
        itemType: Book.category,
        type: 'hardcopy',
        quantity: 1,
        price: Book.price,
    });

    const handleAddToCart = (e: any) => {
        e.preventDefault();

        const cart = localStorage.getItem('cart');
        if (cart) {
            const cartItems = JSON.parse(cart);
            cartItems.push({
                itemID: uuidv4() + Book.id,
                itemName: Book.title,
                itemType: Book.category,
                type: form.type,
                quantity: form.quantity,
                price: form.price,
            });
            localStorage.setItem('cart', JSON.stringify(cartItems));
            console.log(cartItems);
        } else {
            localStorage.setItem('cart', JSON.stringify([{
                itemID: uuidv4() + Book.id,
                itemName: Book.title,
                itemType: Book.category,
                type: form.type,
                quantity: form.quantity,
                price: form.price,
            }]));
            console.log({
                itemID: uuidv4() + Book.id,
                itemName: Book.title,
                itemType: Book.category,
                type: form.type,
                quantity: form.quantity,
                price: form.price,
            });
        }
        toast.success('Successfully Added to Cart!')
    }

    const handleBuyNow = (e: any) => {
        e.preventDefault();
        console.log(form);
    }

    const handlePreOrder = (e: any) => {
        e.preventDefault();
        setModelState(!modelState);
        console.log(form);
    }

    return (


        <div className="flex flex-col xl:flex-row  items-center justify-between  xl:items-start gap-5 xl:gap-32  mx-auto relative w-full">

            {
                modelState && (

                    <PreeBookForm setModelState={setModelState} />


                )
            }
            <div className="flex flex-col items-start gap-[26px]  relative  ">
                <div className="flex relative justify-center overflow-hidden w-80  -z-50 bg-[#f2f2f2] rounded-2xl sm:w-[409px] sm:min-h-[462px] items-start gap-[8px]  mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] drop-shadow-sm shadow-[0px_4px_23px_#00000021]">
                    <Image className=" relative rounded-2xl min-h-[460.3px] max-h-[460.6px] object-contain" alt="Image" src={Book.thumbUrl[activeBookImageIndex]} width={383} height={450} />
                </div>
                <div className="inline-flex items-start gap-[13px] relative flex-[0_0_auto]">
                    {
                        Book.thumbUrl.map((image, index) => (
                            <div key={index} onClick={() => {
                                setActiveBookImageIndex(index);
                            }} className=" cursor-pointer transform ">
                                {
                                    index !== activeBookImageIndex ? (
                                        <Image
                                            className="relative w-[60px] h-[70px] mt-[-4.00px] mb-[-12.00px] mr-[-8.00px] rounded-md"
                                            alt="Group"
                                            src={Book.thumbUrl[index]}
                                            width={200} height={250}
                                        />

                                    ) : (
                                        <Image
                                            className="relative w-[60px] h-[70px] mt-[-4.00px] mb-[-12.00px] mr-[-8.00px] rounded-md   border-black border-2"
                                            alt="Group"
                                            src={Book.thumbUrl[index]}
                                            width={200} height={250}
                                        />
                                    )

                                }


                            </div>
                        ))

                    }

                </div>
            </div>
            <div className="flex flex-col   items-start relative  overflow-hidden  w-full  ">
                <div className="inline-flex items-start gap-[13px] relative w-full ">
                    <div className="relative  w-full h-[400px] xl:h-[470px]">
                        <div className="inline-flex flex-col items-start gap-[25px] absolute top-[198px] left-0">
                            <div className="relative w-fit mt-[-1.00px]   font-semibold text-black text-[57px] tracking-[0] leading-[normal]">
                                <span>  ₹</span> {form.price}
                            </div>
                            <div className="inline-flex items-start gap-[25px] relative ">

                                <label className="inline-flex items-center gap-3 relative ">
                                    <input
                                        type="radio"
                                        value="hardcopy"
                                        className="w-5 h-5"
                                        checked={form.type === 'hardcopy'}
                                        onChange={handleOptionChange}
                                        id="hardcopy-radio"

                                    />
                                    <div className="relative w-fit mt-[-1.00px] font-medium text-black text-[21px] tracking-[0] leading-[normal]">
                                        Hardcopy
                                    </div>
                                </label>

                                <label className="inline-flex items-center  gap-3 relative ">
                                    <input
                                        type="radio"
                                        value="digital"
                                        className="w-5 h-5"
                                        checked={form.type === 'digital'}
                                        onChange={handleOptionChange}
                                        id="digital-radio"
                                    />
                                    <div className="relative w-fit mt-[-1.00px] font-medium text-black text-[21px] tracking-[0] leading-[normal]">
                                        Digital
                                    </div>
                                </label>

                            </div>
                            {form.type === 'hardcopy' ?
                                (<div className="flex flex-row items-center gap-10  relative ">
                                    <label htmlFor="quantity" className="relative w-fit [font-family:'Mulish-SemiBold',Helvetica] font-semibold text-black text-[25px] tracking-[0] leading-[normal]">
                                        Quantity:
                                    </label>
                                    <select
                                        id="quantity"
                                        name="quantity"
                                        className="relative w-28 h-14 bg-white shadow-md rounded-xl  p-3 "
                                        value={form.quantity}
                                        onChange={handleQuantityChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>) : null}
                        </div>
                        <div className="inline-flex flex-col items-start gap-[14px] absolute top-0 left-0">
                            <div className="inline-flex flex-col items-start gap-[9px] relative flex-[0_0_auto]">
                                <p className="relative w-fit mt-[-1.00px] [font-family:'Mulish-Bold',Helvetica]  font-bold text-black text-[38px] tracking-[0] leading-[normal]">
                                    {Book.title}
                                </p>
                                <div className="relative w-fit   text-black text-[21px] tracking-[0] leading-[normal]">
                                    by  <span> {Book.author}</span> (Author)
                                </div>
                            </div>
                            <div className="inline-flex items-center gap-[12px] relative flex-[0_0_auto]">
                                <div className="relative w-fit h-[22px] flex">
                                    {/* Add ratings input here */}

                                    {
                                        [...Array(5)].map((e, i) =>
                                            i <= Book.rating - 1 ?
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#FFD700" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg> :
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#fffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                </svg>
                                        )
                                    }

                                </div>
                                <div className="relative w-fit  font-medium text-black text-[14px] tracking-[0] leading-[normal]">
                                    {Book.rating} <span> star ratings</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <img className="relative flex-[0_0_auto] h-[50px]" alt="Frame" src="frame-5.svg" /> */}
                </div>
                <div className="flex flex-row flex-wrap w-full items-center gap-5 md:gap-20 relative  justify-center ">
                    {
                        form.type === 'hardcopy' ? (<>

                            <button onClick={handlePreOrder} className="inline-flex mt-5 xl:mt-0 w-full md:w-fit h-20 items-center justify-center gap-[8px]  px-24 py-15 relative   bg-black rounded-[16px] overflow-hidden">
                                <div className="relative w-fit md:px-32 [font-family:'Mulish-Medium',Helvetica] font-medium text-white text-[30px] tracking-[0] leading-[normal]">
                                    Pre Order
                                </div>
                            </button>
                        </>
                        ) : (
                            <>
                                <button className="inline-flex w-full md:w-fit h-20 items-center justify-center gap-[8px] px-20 py-15 relative   bg-[#e0e4ef] rounded-[16px] overflow-hidden">
                                    <div onClick={handleAddToCart} className="relative w-fit [font-family:'Mulish-Medium',Helvetica] font-medium text-black text-[30px] tracking-[0] leading-[normal]">
                                        Add to Cart
                                    </div>
                                </button>
                                <button onClick={handleBuyNow} className="inline-flex w-full md:w-fit h-20 items-center justify-center gap-[8px]  px-24 py-15 relative   bg-black rounded-[16px] overflow-hidden">
                                    <div className="relative w-fit [font-family:'Mulish-Medium',Helvetica] font-medium text-white text-[30px] tracking-[0] leading-[normal]">
                                        Buy Now
                                    </div>
                                </button>
                            </>
                        )
                    }


                </div>
            </div>
        </div >

    );
};


export default BuyBookPage;