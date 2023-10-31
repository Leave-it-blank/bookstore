import Image from 'next/image'
import Link from 'next/link';
import AboutAuthor from '@/components/book/AboutAuthor';
export default function Home({ books, author }: any) {

  return (
    <>
      <div className="min-h-screen">
        <main className="  md:p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 ">Featured Books</h2>
          {
            books.map((book: any, index: number) => {
              return (<section key={index} className="my-8 md:pl-7">


                <div className="flex flex-col md:flex-row gap-5 md:gap-20    w-full  ">
                  {/* Book 1 */}
                  <div className="flex-col items-start gap-[16px] self-center md:self-auto flex-[0_0_auto]  flex  justify-center md:py-5 relative">
                    <Image
                      height={250}
                      width={200}
                      src={JSON.parse(book.thumbUrl)[0]} // Replace with your book cover image URL
                      alt="Book 1"
                      className="w-48 h-60 rounded-lg shadow-md object-contain"
                    />
                  </div>
                  <div className='self-start'>
                    <Link href={`books/${book.titleSlug}`}>  <h3 className=" text-xl md:text-2xl  font-semibold hover:text-sky-600  hover:cursor-pointer">{book.title}</h3>  </Link>
                    {/* <p className="text-gray-600">Author: {book.author}</p> */}
                    <p className="mt-2  text-sm sm:text-md md:text-lg   w-full max-w-7xl  text-justify">
                      {
                        book.description
                      }
                    </p>
                    <Link href={`books/${book.titleSlug}`}> {/* Replace with the actual book route */}
                      <span className="text-blue-500 hover:underline mt-2">Learn More</span>
                    </Link>
                  </div>
                </div>
              </section>)


            })
          }
          <AboutAuthor Author={author} />

        </main>

      </div>
    </>


  )
}


export const getServerSideProps = async () => {
  try {
    const books = await fetchBooks();
    const author = await fetchAuthor();

    return { props: { books, author } };
  } catch (error) {
    // Handle the error, e.g., log it or display a friendly error message.
    console.error('Error fetching data:', error);
    return {
      redirect: {
        destination: '/500', // You can create a custom 404 page
        permanent: false,
      },
    };
  }
}

async function fetchBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/books/getbooks`);
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return await res.json();
}

async function fetchAuthor() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/author/getauthor`);
  if (!res.ok) {
    throw new Error('Failed to fetch author data');
  }
  return await res.json();
}
