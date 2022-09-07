import { useRouter } from 'next/router';
import { useState } from 'react';
const MobileSort = ({closeHandler}) => {

    const router = useRouter()
    const {query} = useRouter()
    const [currentSort , setCurrentSort] = useState("")

    return ( 


        <div className="bg-white   w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0  cursor-default">
            <div className="px-4 mt-6 flex w-full">
                <button onClick={()=> closeHandler(false)}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h6 className="text-sm  text-center w-full font-sans">مرتب‌سازی</h6>
            </div>

            <hr className="mt-5"/>

            <section className='mt-8 flex flex-col'>
                <button onClick={()=> setCurrentSort("mostFavorite")} className={`py-2 my-2 ${currentSort === "mostFavorite" ? "text-red-600" : ""} text-right px-5 font-sans text-sm`}>محبوب‌ ترین</button>
                <button onClick={()=> setCurrentSort("dateRecent")} className={`py-2 my-2 ${currentSort === "dateRecent" ? "text-red-600" : ""} text-right px-5 font-sans text-sm`}>جدید ترین</button>
                <button onClick={()=> setCurrentSort("priceMin")} className={`py-2 my-2 ${currentSort === "priceMin" ? "text-red-600" : ""} text-right px-5 font-sans text-sm`}>ارزان ترین</button>
                <button onClick={()=> setCurrentSort("priceMax")} className={`py-2 my-2 ${currentSort === "priceMax" ? "text-red-600" : ""} text-right px-5 font-sans text-sm`}>گران ترین</button>
            </section>


            <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4">
                <button onClick={()=>  router.push({pathname : "/search" , query : {...query , sort:currentSort }}) & closeHandler("")} className="bg-gray-700 font-sans text-sm text-gray-100 py-3 rounded-md w-3/4 text-center" >
                        اعمال فیلتر 
                </button>
                <button onClick={()=> {delete query.sort & router.push({pathname : "/search" , query : {...query}}) & closeHandler("")}}  className="w-1/4 border border-gray-700 rounded-md text-sm font-sans  py-3">حذف</button>
            </div>


        </div>
    );
}
 
export default MobileSort;