import React from "react";
import { useState } from "react";
import Image from 'next/image';
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@/store/user";
import { useRouter } from "next/router";
interface chapters {
    id: number;
    number: string;
    title: string;
    heading: string;
    introduction: string[];
    goalsTitle: string;
    goals: string[];
    price: string;
    imageUrl: string;
}

function ChaptersComponent({ Chapters }: { Chapters: chapters[] }) {

    const [selectedChapter, setSelectedChapter] = useState(0);
    const { user, token } = useUser();
    const router = useRouter();

    // const chapterArray = Object.keys(Chapters).map((key: any) => {
    //     return Chapters[key];
    // });

    // const [form, setForm] = useState({
    //     itemID: Chapters[selectedChapter].number,
    //     itemName: Chapters[selectedChapter].title,
    //     itemType: 'chapter',
    //     type: 'digital',
    //     quantity: 1,
    //     price: Chapters[selectedChapter].price,
    // });
    const handleAddChapterToCart = async (e: any) => {
        e.preventDefault();
        // addToCart(form);
        // let cart = localStorage.getItem('cart');
        // if (cart) {
        //     let cartArray = JSON.parse(cart);
        //     cartArray.push({
        //         itemID: uuidv4() + Chapters[selectedChapter].number,
        //         itemName: Chapters[selectedChapter].title,
        //         itemType: 'chapter',
        //         type: 'digital',
        //         quantity: 1,
        //         price: Chapters[selectedChapter].price,
        //     });
        //     localStorage.setItem('cart', JSON.stringify(cartArray));
        // } else {
        // let cartArray = [{
        //     itemID: uuidv4() + Chapters[selectedChapter].number,
        //     itemName: Chapters[selectedChapter].title,
        //     itemType: 'chapter',
        //     type: 'digital',
        //     quantity: 1,
        //     price: Chapters[selectedChapter].price,
        // }];
        //     localStorage.setItem('cart', JSON.stringify(cartArray));
        // }
        // toast.success('Added to cart');

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

            body: JSON.stringify({
                itemType: 'CHAPTER',
                type: 'digital',
                quantity: 1,
                price: Chapters[selectedChapter].price, chapterId: Chapters[selectedChapter].id
            }),
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
    return (
        <div className="inline-flex flex-col items-start  gap-5 md:gap-10 relative w-full" >
            <div className="relative w-fit  text-black  text-2xl md:text-3xl ">
                <label htmlFor="chapters" className="relative w-fit  font-bold text-black  ">
                    Chapters:
                </label>
            </div>
            <div className="w-full flex justify-between gap-5">

                <select id="chapters"
                    value={selectedChapter}
                    onChange={(e) => {
                        setSelectedChapter(parseInt(e.target.value));
                    }}
                    name="chapters" className="relative w-48 h-14 bg-white shadow-md rounded-xl  p-3 ">
                    {
                        Chapters.map((chapter: any, index: number) => {
                            return <option key={index} value={index} > {"Chapter " + chapter.number}</option>
                        })
                    }
                </select>
                <button className="relative w-40 h-14 bg-black text-white shadow-md rounded-xl  p-3 " onClick={handleAddChapterToCart}>
                    Buy Chapter
                </button>
            </div>

            <div className="inline-flex flex-col items-start gap-3 md:gap-5 relative  w-full">

                <p className="relative w-fit  font-bold text-black text-xl md:text-2xl    ">
                    {"Chapter " + Chapters[selectedChapter].number} : {Chapters[selectedChapter].title}
                </p>
                <p className="relative  [ font-normal text-black  text-sm sm:text-md md:text-lg text-justify  w-full">
                    {Chapters[selectedChapter].heading}
                </p>
                <h2 className="relative  font-bold text-xl md:text-2xl ">
                    {"Introduction: "}
                </h2>
                <div className="flex gap-2  flex-col">
                    {
                        JSON.parse(String(Chapters[selectedChapter].introduction)).map((intro: any, index: number) => {
                            return <li key={index} className="relative   font-normal text-sm sm:text-md md:text-lg text-justify">
                                {intro}
                            </li>
                        })
                    }
                </div>
                <h2 className="relative  font-bold  text-xl md:text-2xl ">
                    {Chapters[selectedChapter].goalsTitle}
                </h2>
                <div className="flex gap-2  flex-col">
                    {
                        JSON.parse(String(Chapters[selectedChapter].goals)).map((intro: any, index: number) => {
                            return <li key={index} className="relative  font-normal text-sm sm:text-md md:text-lg text-justify ">
                                {intro}
                            </li>
                        })
                    }
                </div>
                <br />
                <Image src={Chapters[selectedChapter].imageUrl} width={400} height={500} alt={""} className="w-full h-40 self-center object-contain" />
            </div>
        </div >
    );
};


export default ChaptersComponent;