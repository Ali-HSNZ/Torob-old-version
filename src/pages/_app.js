import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { wrapper } from 'src/redux/store';

function MyApp({ Component, pageProps }) {
     
     return  (
          <>
               <NextNProgress options={{ easing: "ease", speed: 500 , showSpinner : false }} color="#ff3021" />
               <Component {...pageProps} />
               <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={true} pauseOnFocusLoss draggable pauseOnHover theme="dark" /> 
          </>
     )
}
export default wrapper.withRedux(MyApp)