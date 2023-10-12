import React from "react";
import Image from "next/image";


interface AuthorProps {
    name: string;
    jobTitle: string;
    degree: string;
    college: string;
    city: string;
    about: string;
    imageUrl: string;
    linkdInUrl: string;
}

export const Author = ({ Author }: { Author: AuthorProps }): JSX.Element => {


    return (
        <div className="inline-flex flex-col items-start gap-10 relative">
            <div className="relative w-fit mt-[-1.00px]  font-bold text-black text-[32px] tracking-[0] leading-[normal]">
                About Author
            </div>
            <div className=" items-center xl:items-start gap-7 xl:gap-14   flex flex-col xl:flex-row relative">
                <div className="flex-col items-start gap-[16px] flex-[0_0_auto] inline-flex relative">
                    {/* <img
                        className="relative w-[312px] h-[312px] mt-[-19.00px] ml-[-23.00px] mr-[-23.00px] object-cover"
                        alt="Rectangle"
                        src="rectangle-5.png"
                    /> */}
                    <Image
                        className="relative w-[200px] h-[230px] mt-[-4.00px] mb-[-12.00px] mr-[-8.00px] rounded-xl   "
                        alt="Group"
                        src={Author.imageUrl}
                        width={400} height={500}
                    />
                    <div className="flex-col items-start gap-3 mt-2  inline-flex relative w-full">
                        <div className="flex-col items-center gap-[5px] flex-[0_0_auto] inline-flex relative justify-center">
                            <div className="relative w-fit mt-[-1.00px]  font-semibold text-black text-[30px] tracking-[0] leading-[normal]">
                                {Author.name}
                            </div>
                            <div className="relative w-fit  font-normal text-black text-[20px] tracking-[0] leading-[normal]">
                                {Author.jobTitle}
                            </div>
                        </div>
                        <p className="relative    text-center font-light text-black text-[14px]  flex justify-center w-full tracking-[0] leading-[tight]">
                            {Author.degree}
                            <br />
                            {Author.college}
                            <br />
                            {Author.city}
                        </p>
                    </div>
                </div>
                <div className="flex-col items-start gap-10   inline-flex relative">
                    <p className="relative  mt-[-1.00px]  font-normal text-black text-[25px] tracking-[0] leading-[normal]">
                        <span className=" font-normal text-black text-[25px] tracking-[0]">
                            The author of the book,{" "}
                        </span>
                        <span className=" font-bold"> {Author.name} </span>
                        <span className="text-justify font-normal text-black text-[25px] tracking-[0] leading-normal">

                            {
                                Author.about
                            }
                        </span>
                    </p>
                    <a href={Author.linkdInUrl} target="_blank" className="h-[77px] items-center justify-center gap-[13px] px-[35px] py-[24px] bg-[#e0e4ef] rounded-[16px] overflow-hidden inline-flex relative">
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.5579 0.0833455H2.44209C2.14853 0.0792683 1.85703 0.13306 1.58426 0.24165C1.31148 0.350239 1.06277 0.511498 0.852322 0.716218C0.641875 0.920938 0.473818 1.16511 0.357746 1.43479C0.241675 1.70446 0.179864 1.99436 0.175842 2.28793V28.7121C0.179864 29.0057 0.241675 29.2956 0.357746 29.5652C0.473818 29.8349 0.641875 30.0791 0.852322 30.2838C1.06277 30.4885 1.31148 30.6498 1.58426 30.7584C1.85703 30.867 2.14853 30.9208 2.44209 30.9167H28.5579C28.8515 30.9208 29.143 30.867 29.4158 30.7584C29.6885 30.6498 29.9372 30.4885 30.1477 30.2838C30.3581 30.0791 30.5262 29.8349 30.6423 29.5652C30.7583 29.2956 30.8202 29.0057 30.8242 28.7121V2.28793C30.8202 1.99436 30.7583 1.70446 30.6423 1.43479C30.5262 1.16511 30.3581 0.920938 30.1477 0.716218C29.9372 0.511498 29.6885 0.350239 29.4158 0.24165C29.143 0.13306 28.8515 0.0792683 28.5579 0.0833455ZM9.47209 25.8908H4.84709V12.0158H9.47209V25.8908ZM7.15959 10.0733C6.52175 10.0733 5.91002 9.81996 5.459 9.36894C5.00797 8.91791 4.75459 8.30619 4.75459 7.66835C4.75459 7.0305 5.00797 6.41878 5.459 5.96775C5.91002 5.51673 6.52175 5.26335 7.15959 5.26335C7.49829 5.22494 7.84128 5.2585 8.16611 5.36183C8.49093 5.46517 8.79027 5.63595 9.04452 5.863C9.29877 6.09004 9.50219 6.36823 9.64148 6.67934C9.78076 6.99045 9.85276 7.32748 9.85276 7.66835C9.85276 8.00921 9.78076 8.34624 9.64148 8.65735C9.50219 8.96847 9.29877 9.24665 9.04452 9.4737C8.79027 9.70074 8.49093 9.87152 8.16611 9.97486C7.84128 10.0782 7.49829 10.1118 7.15959 10.0733ZM26.1529 25.8908H21.5279V18.4446C21.5279 16.5792 20.865 15.3613 19.1846 15.3613C18.6645 15.3651 18.1581 15.5282 17.7336 15.8287C17.3091 16.1291 16.9869 16.5525 16.8104 17.0417C16.6898 17.404 16.6375 17.7856 16.6563 18.1671V25.8754H12.0313C12.0313 25.8754 12.0313 13.2646 12.0313 12.0004H16.6563V13.9583C17.0764 13.2293 17.6875 12.6287 18.4237 12.2212C19.1599 11.8137 19.9933 11.6148 20.8342 11.6458C23.9175 11.6458 26.1529 13.6346 26.1529 17.905V25.8908Z" fill="black" />
                        </svg>

                        <div className="relative w-fit mt-[-1.00px]  font-normal text-black text-[23px] tracking-[0] leading-[normal]">
                            Connect with me
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Author;
