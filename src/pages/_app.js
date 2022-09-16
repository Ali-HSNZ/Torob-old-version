import Layout from '../layout/Layout'
import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";
import Auth from 'src/contexts/Auth';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return  (
    <Auth>
        <NextNProgress options={{ easing: "ease", speed: 500 , showSpinner : false }} color="#ff3021" />
        <Component {...pageProps} />
        <Toaster position="top-left" toastOptions={{className: '',duration: 5000}}/>
    </Auth>
    
  )
}

export default MyApp
