import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";


const Layout = ({children , isFooter,pageTitle}) => {
     return (  
          <div className="w-full flex flex-col items-center">
               <Head>
                    <title>{pageTitle || "عنوان  صفحه نامشخص"}</title>
               </Head>
               <div className={`w-full max-w-[1700px]`}>
                    <Header/>
                    {children}
                    {isFooter ? <Footer/> : <></>}
               </div>
          </div>
     );
}
 
export default Layout;