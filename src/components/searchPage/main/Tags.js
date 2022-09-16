import { useRouter } from "next/router";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
const MainTags = ({priceMax , priceMin}) => {

    const {query} = useRouter()
    const router = useRouter()

    return (
        <>
          
                 <section className="overflow-x-auto py-4 flex gap-x-4 flex-nowrap whitespace-nowrap">
                 {query.category && (
                     <div onClick={()=> {delete query.category ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                             {query.category}
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                             </svg>
                     </div>
                 )}
                 {query.fromPrice && query.toPrice && (
                     <div onClick={()=> {delete query.fromPrice ; delete query.toPrice ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                         از {toPersianPrice(query.fromPrice)} تا {toPersianPrice(query.toPrice)}
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4  text-gray-800 ">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                     </div>
                 )} 
     
                 {query.available && (
                     <div  onClick={()=> {delete query.available ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs  font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                         نمایش کالاهای موجود
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                     </div>
                 )}
                 {query.brand && (
                     <div  onClick={()=> {delete query.brand ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                         {query.brand}
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                     </div>
                 )}
     
                 {query.sort && (
                     <div  onClick={()=> {delete query.sort ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                         {query.sort === "mostFavorite" && "محبوب‌ ترین"}
                         {query.sort === "dateRecent" && "جدید ترین"}
                         {query.sort === "priceMin" && "ارزان ترین"}
                         {query.sort === "priceMax" && "گران ترین"}
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                     </div>
                 )}
             </section>
            
        </>
    );
}
export default MainTags;