import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";



const Layout = ({children , isFooter,pageTitle}) => {
    return (  
        <div>
            <Head>
                <title>{pageTitle || "عنوان  صفحه نامشخص"}</title>
            </Head>
            <Header/>
            {children}
           {isFooter ? <Footer/> : <></>}
        </div>
    );
}
 
export default Layout;