import React from "react";
import { useState } from "react";
import Image from 'next/image';
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
interface chapters {
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

    // const [form, setForm] = useState({
    //     itemID: Chapters[selectedChapter].number,
    //     itemName: Chapters[selectedChapter].title,
    //     itemType: 'chapter',
    //     type: 'digital',
    //     quantity: 1,
    //     price: Chapters[selectedChapter].price,
    // });
    const handleAddChapterToCart = (e: any) => {
        e.preventDefault();
        // addToCart(form);
        let cart = localStorage.getItem('cart');
        if (cart) {
            let cartArray = JSON.parse(cart);
            cartArray.push({
                itemID: uuidv4() + Chapters[selectedChapter].number,
                itemName: Chapters[selectedChapter].title,
                itemType: 'chapter',
                type: 'digital',
                quantity: 1,
                price: Chapters[selectedChapter].price,
            });
            localStorage.setItem('cart', JSON.stringify(cartArray));
        } else {
            let cartArray = [{
                itemID: uuidv4() + Chapters[selectedChapter].number,
                itemName: Chapters[selectedChapter].title,
                itemType: 'chapter',
                type: 'digital',
                quantity: 1,
                price: Chapters[selectedChapter].price,
            }];
            localStorage.setItem('cart', JSON.stringify(cartArray));
        }
        toast.success('Added to cart');


    }
    return (
        <div className="inline-flex flex-col items-start  gap-10 relative" >
            <div className="relative w-fit  text-black text-[32px] tracking-[0] leading-[normal]">
                <label htmlFor="chapters" className="relative w-fit  font-bold text-black  tracking-[0] leading-[normal]">
                    Chapters:
                </label>
            </div>
            <div className="w-full flex justify-between">

                <select id="chapters"
                    value={selectedChapter}
                    onChange={(e) => {
                        setSelectedChapter(parseInt(e.target.value));
                    }}
                    name="chapters" className="relative w-48 h-14 bg-white shadow-md rounded-xl  p-3 ">
                    {
                        Chapters.map((chapter: any, index: number) => {
                            return <option key={chapter.number} value={index} > {"Chapter " + chapter.number}</option>
                        })
                    }
                </select>
                <button className="relative w-48 h-14 bg-black text-white shadow-md rounded-xl  p-3 " onClick={handleAddChapterToCart}>
                    Buy Chapter
                </button>
            </div>

            <div className="inline-flex flex-col items-start gap-[27px] relative flex-[0_0_auto]">

                <p className="relative w-fit mt-[-1.00px] [font-family:'Mulish-Bold',Helvetica] font-bold text-black text-[27px] tracking-[0] leading-[normal]">
                    {"Chapter " + Chapters[selectedChapter].number} : {Chapters[selectedChapter].title}
                </p>
                <p className="relative  [ font-normal text-black text-[25px] tracking-[0] leading-normal">
                    {Chapters[selectedChapter].heading}
                </p>
                <h2 className="relative  font-bold text-[32px] tracking-[0] leading-normal">
                    {"Introduction: "}
                </h2>
                <div className="flex gap-2  flex-col">
                    {
                        Chapters[selectedChapter].introduction.map((intro: any, index: number) => {
                            return <li key={index} className="relative  [ font-normal text-black text-[25px]   leading-tight">
                                {intro}
                            </li>
                        })
                    }
                </div>
                <h2 className="relative  font-bold text-[32px] tracking-[0] leading-normal">
                    {Chapters[selectedChapter].goalsTitle}
                </h2>
                <div className="flex gap-2  flex-col">
                    {
                        Chapters[selectedChapter].goals.map((intro: any, index: number) => {
                            return <li key={index} className="relative  font-normal text-black text-[25px]   leading-tight">
                                {intro}
                            </li>
                        })
                    }
                </div>

                <Image src={Chapters[selectedChapter].imageUrl} width={400} height={500} alt={""} className="w-full h-40 self-center object-contain" />
            </div>
        </div >
    );
};


export default ChaptersComponent;