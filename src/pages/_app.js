import Layout from '../layout/Layout'
import '../../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return  (
    <>
        <NextNProgress options={{ easing: "ease", speed: 500 }} color="red" />
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
