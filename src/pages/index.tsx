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
              return (<section key={index} className="my-8">


                <div className="flex flex-col md:flex-row   w-full gap-5">
                  {/* Book 1 */}
                  <div className="flex-shrink-0 self-center ">
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


export const getStaticProps = (async (context: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/books/getbooks`)
  const books = await res.json()
  const authorRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/author/getauthor`)
  const author = await authorRes.json()
  return { props: { books, author } }
})  
