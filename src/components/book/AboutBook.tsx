import React from "react";

const AboutBook = ({ Descrition }: { Descrition: string }): JSX.Element => {


    return (
        <div className="flex flex-col items-start gap-5 relative">
            <div className="relative w-fit   font-bold text-black   text-2xl md:text-3xl   ">
                About Book
            </div>
            <p className="relative     font-normal text-black  text-sm sm:text-md md:text-lg text-justify  ">
                {Descrition}
            </p>
        </div>
    );
};

export default AboutBook;
