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

async function fetchBookData(bookSlug: any) {
    const apiUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/books/${bookSlug}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch book data for slug: ${bookSlug}`);
    }

    const bookData = await response.json();
    return bookData;
}


export const getServerSideProps = async ({ params }: { params: { bookSlug: string } }) => {
    const { bookSlug } = params;
    try {
        const bookData = await fetchBookData(bookSlug);

        return {
            props: {
                bookData,
            },
        };
    } catch (error) {
        // Handle the error, e.g., log it or display a friendly error message.
        console.error('Error fetching book data:', error);

        // You can return a custom error page or redirect to a 404 page.
        return {
            redirect: {
                destination: '/500', // You can create a custom 404 page
                permanent: false,
            },
        };
    }
}