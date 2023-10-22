import AboutAuthor from "@/components/book/AboutAuthor";
import AboutBook from "@/components/book/AboutBook";
import AboutChapters from "@/components/book/AboutChapters";
import BuyBook from "@/components/book/BuyBook";
import { getBookBySlug } from "@/utils/api";

export default function mybook({ bookData }: any) {
    // console.log(bookData)
    if (!bookData) return;

    const { book, chapters, author } = bookData;
    //  console.log(chapters)
    return <>
        <div className="mx-auto flex flex-col justify-center items-center gap-7  md:gap-10 ">
            <BuyBook Book={book} author={author} />
            <AboutBook Descrition={book.description} />
            <AboutChapters Chapters={chapters} />
            <AboutAuthor Author={author} />
        </div>

    </>
}

export async function getServerSideProps({ params }: any) {
    const { bookSlug } = params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/books/${bookSlug}`);
    const bookData = await res.json();

    return {
        props: {
            bookData
        }
    }
}
