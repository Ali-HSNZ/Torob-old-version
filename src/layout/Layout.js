import Footer from "./Footer";
import Header from "./Header";



const Layout = ({children , isFooter}) => {
    return (  
        <div>
            <Header/>
            {children}
           {isFooter ? <Footer/> : <></>}
        </div>
    );
}
 
export default Layout;