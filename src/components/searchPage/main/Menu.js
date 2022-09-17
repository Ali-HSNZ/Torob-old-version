import MobileBrands from "@/components/searchPage/aside/mobile/MobileBrands";
import MobileCategories from "@/components/searchPage/aside/mobile/MobileCategories";
import MobilePrice from "@/components/searchPage/aside/mobile/MobilePrice";
import MobileAvailable from "@/components/searchPage/aside/mobile/MobileAvailable";
import MobileSort from "@/components/searchPage/aside/mobile/MobileSort";
import { useState } from "react";

const MainMenu = ({brands , categories , similarCategories}) => {

const [isMobileMenu , setIsMobileMenu] = useState("")

    return (  

        <aside className="overflow-x-auto whitespace-nowrap flex flex-nowrap w-full lg:hidden gap-x-6 bg-[#ececec] py-3 relative px-8">
        
            <div className={`w-full h-full fixed bg-[#0000002d] inset-0  z-30  ${isMobileMenu.length > 0 ? "" : "hidden"}`} onClick={()=> setIsMobileMenu('')}></div>
            
            {brands && brands.length > 0 && (
                <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("brands")}>
                    برند
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            )}
            { isMobileMenu === "brands" && <MobileBrands brands={brands} isMobileMenu={isMobileMenu} closeHandler={()=> setIsMobileMenu("")}/>}

            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("category")}>
                دسته‌بندی
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            { isMobileMenu === "category" && <MobileCategories  isMobileMenu={isMobileMenu} categories={categories} similarCategories={similarCategories} closeHandler={()=> setIsMobileMenu("")}/>}

            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("price")}>
                قیمت    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            { isMobileMenu === "price" && <MobilePrice  isMobileMenu={isMobileMenu} closeHandler={()=> setIsMobileMenu("")}/>}

            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("availableProducts")}>
                وضعیت کالا    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            { isMobileMenu === "availableProducts" && <MobileAvailable  isMobileMenu={isMobileMenu}closeHandler={()=> setIsMobileMenu("")}/>}

            <div className="max-w-fit py-2  cursor-pointer flex  md:hidden flex-col justify-end  items-end">
                <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("mobileSort")}>
                    مرتب سازی     
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                {isMobileMenu === "mobileSort" && <MobileSort isMobileMenu={isMobileMenu} closeHandler={()=>setIsMobileMenu("")}/>}
            </div>
        </aside>
    );
}
 
export default MainMenu;