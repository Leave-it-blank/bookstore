import React from "react";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { FormComponent } from "./prebook/PreBookForm";
import Modal from 'react-modal';
import { useUser } from "@/store/user";
interface BookProps {
    id: string;
    title: string;
    category: string;
    author: string;
    rating: number;
    thumbUrl: string[];
    price: string;
    description: string;
    priceDigital: string;
    priceHardCopy: string;

}
interface form {
    itemID: string;
    itemName: string;
    itemType: string;
    type: string;
    quantity: number;
    price: string;
}
interface userDetails {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    message: string;
}

export const BuyBookPage = ({ Book, author }: { Book: BookProps, author: any }): JSX.Element => {
    const router = useRouter();
    const { user, token } = useUser();

    const [modelState, setModelState] = useState(false);
    const [activeBookImageIndex, setActiveBookImageIndex] = useState(0);
    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            quantity: parseInt(event.target.value)
        });
    };
    const [userDetails, setUserDetails] = useState<userDetails>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        message: "",
    });
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "DIGITAL") {
            setForm({
                ...form,
                type: "DIGITAL",
                quantity: 1,
                price: Book.priceDigital,
            });
        } else {
            setForm({
                ...form,
                type: "HARDCOPY",
                price: Book.priceHardCopy,
            });
        }
    };

    const thumbUrl = JSON.parse(String(Book.thumbUrl));


    const [form, setForm] = useState<form>({
        itemID: Book.id,
        itemName: Book.title,
        itemType: Book.category,
        type: 'DIGITAL',
        quantity: 1,
        price: Book.priceDigital,
    });


    const handleAddToCart = async (e: any) => {
        e.preventDefault();
        // console.log(form);
        if (!user) {
            router.push('/login');
            toast.error("Please login to continue")
            return;
        }
        if (!token) {
            toast.error("Please login to continue")
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            body: JSON.stringify({ ...form, productId: Book.id }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                toast.success("Added to cart")
                // router.push('/cart');

            } else {
                if (data.error) {
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

    const handleBuyNow = async (e: any) => {
        e.preventDefault();
        // console.log(form);
        if (!user) {
            router.push('/login');
            toast.error("Please login to continue")
            return;
        }
        if (!token) {
            toast.error("Please login to continue")
            return;
        }
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },

            body: JSON.stringify({ ...form, productId: Book.id }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                toast.success("Added to cart")
                router.push('/cart');

            } else {
                if (data.error) {
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

    const handlePreOrder = (e: any) => {
        e.preventDefault();
        setModelState(!modelState);
        console.log(form);
    }
    // Function to close the modal
    const closeModal = () => {
        setModelState(false);
    };
    return (


        <div className="flex flex-col xl:flex-row  items-center justify-between  xl:items-start gap-5 xl:gap-32  mx-auto relative w-full">

            {
                modelState && (

                    <Modal
                        isOpen={modelState}
                        closeTimeoutMS={8000}
                        onRequestClose={closeModal}
                        shouldCloseOnEsc={true}
                        contentLabel="Full Screen Modal"
                        shouldCloseOnOverlayClick={true}
                        className="modal-content w-full   "
                        overlayClassName="modal-overlay p-2 md:p-10 "
                    >
                        {/* @ts-ignore */}
                        <div className="modal-body   relative">
                            <FormComponent closeModal={closeModal} form={form} userDetails={userDetails} setUserDetails={setUserDetails} />
                        </div>

                    </Modal>


                )
            }
            <div className="flex flex-col items-start gap-[26px]  relative  ">
                <div className="flex relative justify-center overflow-hidden w-80  -z-50 bg-[#f2f2f2] rounded-2xl sm:w-[409px] sm:min-h-[462px] items-start gap-[8px]  mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] drop-shadow-sm shadow-[0px_4px_23px_#00000021]">
                    <Image className=" relative rounded-2xl min-h-[460.3px] max-h-[460.6px] object-contain" alt="Image" src={thumbUrl[activeBookImageIndex]} width={383} height={450} />
                </div>
                <div className=" flex items-start gap-[13px] relative flex-[0_0_auto]">
                    {
                        thumbUrl.map((image: any, index: number) => (
                            <div key={index} onClick={() => {
                                setActiveBookImageIndex(index);
                            }} className=" cursor-pointer transform ">
                                {
                                    index !== activeBookImageIndex ? (
                                        <Image
                                            className="relative w-[60px] h-[70px] mt-[-4.00px] mb-[-12.00px] mr-[-8.00px] rounded-md"
                                            alt="Group"
                                            src={thumbUrl[index]}
                                            width={200} height={250}
                                        />

                                    ) : (
                                        <Image
                                            className="relative w-[60px] h-[70px] mt-[-4.00px] mb-[-12.00px] mr-[-8.00px] rounded-md   border-black border-2"
                                            alt="Group"
                                            src={thumbUrl[index]}
                                            width={200} height={250}
                                        />
                                    )

                                }


                            </div>
                        ))

                    }

                </div>
            </div>
            <div className="flex flex-col   items-start relative  overflow-hidden  w-full  gap-5 md:gap-0">
                <div className=" flex items-start gap-[13px] relative w-full ">
                    <div className="relative  w-full min-h-[400px] md:h-[470px]">

                        <div className=" flex flex-col items-start  gap-5 md:gap-10   left-0">
                            <div className=" flex flex-col items-start gap-[9px] relative flex-[0_0_auto]">
                                <p className="relative w-fit mt-[-1.00px] [font-family:'Mulish-Bold',Helvetica]  font-bold text-black text-[38px] tracking-[0] leading-[normal]">
                                    {Book.title}
                                </p>
                                <div className="relative w-fit   text-black text-[21px] tracking-[0] leading-[normal]">
                                    by  <span> {author.name}</span> (Author)
                                </div>
                            </div>
                            <div className=" flex items-center gap-[12px] relative flex-[0_0_auto]">
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
                            <div className=" flex flex-col items-start  ">
                                <div className="relative w-fit     font-semibold text-black text-[57px]  ">
                                    <span>  ₹</span> {form.price}
                                </div>
                                <div className=" flex items-start gap-[25px] relative ">

                                    <label className=" flex items-center gap-3 relative ">
                                        <input
                                            type="radio"
                                            value="HARDCOPY"
                                            className="w-5 h-5"
                                            checked={form.type === 'HARDCOPY'}
                                            onChange={handleOptionChange}
                                            id="hardcopy-radio"

                                        />
                                        <div className="relative w-fit mt-[-1.00px] font-medium text-black text-[21px] tracking-[0] leading-[normal]">
                                            Hardcopy
                                        </div>
                                    </label>

                                    <label className=" flex items-center  gap-3 relative ">
                                        <input
                                            type="radio"
                                            value="DIGITAL"
                                            className="w-5 h-5"
                                            checked={form.type === 'DIGITAL'}
                                            onChange={handleOptionChange}
                                            id="digital-radio"
                                        />
                                        <div className="relative w-fit mt-[-1.00px] font-medium text-black text-[21px] tracking-[0] leading-[normal]">
                                            Digital
                                        </div>
                                    </label>

                                </div>
                                {form.type === 'HARDCOPY' ?
                                    (<div className="flex flex-row items-center gap-10 pt-5 relative ">
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
                        </div>
                    </div>
                    {/* <img className="relative flex-[0_0_auto] h-[50px]" alt="Frame" src="frame-5.svg" /> */}
                </div>
                <div className="flex flex-row flex-wrap w-full items-center gap-5 md:gap-20 relative  justify-center  ">
                    {
                        form.type === 'HARDCOPY' ? (<>

                            <button onClick={handlePreOrder} className=" flex  mt-15 md:mt-5 xl:mt-0 w-full md:w-fit h-20 items-center justify-center gap-[8px]  px-24 py-15 relative   bg-black rounded-[16px] overflow-hidden">
                                <div className="relative w-fit md:px-32 [font-family:'Mulish-Medium',Helvetica] font-medium text-white  text-xl md:text-2xl">
                                    Pre Order
                                </div>
                            </button>
                        </>
                        ) : (
                            <>
                                <button className=" flex w-full md:w-fit h-20 items-center justify-center gap-[8px] px-20 py-15 relative   bg-[#e0e4ef] rounded-[16px] overflow-hidden">
                                    <div onClick={handleAddToCart} className="relative w-fit [font-family:'Mulish-Medium',Helvetica] font-medium text-black text-xl md:text-2xl">
                                        Add to Cart
                                    </div>
                                </button>
                                <button onClick={handleBuyNow} className=" flex w-full md:w-fit h-20 items-center justify-center gap-[8px]  px-24 py-15 relative   bg-black rounded-[16px] overflow-hidden">
                                    <div className="relative w-fit [font-family:'Mulish-Medium',Helvetica] font-medium text-white text-xl md:text-2xl">
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