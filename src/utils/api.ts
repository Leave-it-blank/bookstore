export async function getBookBySlug(bookSlug : string){
    console.log(bookSlug);
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/books/${bookSlug}`);
    const data = await res.json();
    if(res.status !== 200 && data.error.length > 0){
        console.error(res.statusText);
        
    }
    return data;
    
}