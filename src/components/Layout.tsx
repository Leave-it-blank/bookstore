
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

import { useContext, useEffect } from 'react';

import { Toaster } from 'react-hot-toast'

export default function Layout({ children }: any) {


    return <>

        <div className='relative'>
            <NavBar />
            <div><Toaster position="bottom-right" /></div>
            <div className=' min-h-screen  mx-auto container py-10 px-3'>

                {children}
            </div>
            <Footer />
        </div>

    </>
}