import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wrapper } from 'src/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserInfo } from 'src/redux/user/userActions';
import '@etchteam/next-pagination/dist/index.css'
import Cookies from 'universal-cookie';

function MyApp({ Component, pageProps }) {
  const token = new Cookies().get("userToken");

  const dispatch = useDispatch()
  useEffect(()=>{
    if(token){
      dispatch(loadUserInfo())
    }
  },[])

  return  (
    <>
        <NextNProgress options={{ easing: "ease", speed: 500 , showSpinner : false }} color="#ff3021" />
        <Component {...pageProps} />
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            // toastClassName={() => "font-sans bg-white text-gray-600 flex justify-between p-3 text-sm mt-3"}
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </>
  )
}

export default wrapper.withRedux(MyApp)
