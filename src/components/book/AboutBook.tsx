import React from "react";

const AboutBook = ({ Descrition }: { Descrition: string }): JSX.Element => {


    return (
        <div className="inline-flex flex-col items-start gap-[45px] relative">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Mulish-ExtraBold',Helvetica] font-bold text-black text-[32px] tracking-[0] leading-[normal]">
                About Book
            </div>
            <p className="relative     font-normal text-black text-[25px] tracking-[0] leading-normal">
                {Descrition}
            </p>
        </div>
    );
};

export default AboutBook;
