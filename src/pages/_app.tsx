import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { useState, useEffect } from 'react'
import { UserProvider } from '@/store/user';
import toast from 'react-hot-toast'
import ErrorBoundary from '@/components/Errorboundary';
export default function App({ Component, pageProps }: AppProps) {

  return <ErrorBoundary> <UserProvider> <Layout ><Component {...pageProps} /></Layout></UserProvider></ErrorBoundary>
}
