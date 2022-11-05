import Layout from '../layout/Layout'
import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";
import { Toaster } from 'react-hot-toast';
import { wrapper } from 'src/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserInfo } from 'src/redux/user/userActions';
import '@etchteam/next-pagination/dist/index.css'

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUserInfo())
  },[])

  return  (
    <>
        <NextNProgress options={{ easing: "ease", speed: 500 , showSpinner : false }} color="#ff3021" />
        <Component {...pageProps} />
        <Toaster position="top-left" toastOptions={{className: 'font-sans text-sm',duration: 4000}} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
