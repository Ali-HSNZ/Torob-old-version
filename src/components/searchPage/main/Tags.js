import { useRouter } from "next/router";
import { toPersianPrice } from "@/utils/toPersianPrice";
import { removeHyphen } from "@/utils/global";

const MainTags = () => {
    
    const router = useRouter()
    const {query} = useRouter()
    
    return (
        <section className={`overflow-x-auto  flex  gap-x-4 flex-nowrap whitespace-nowrap`}>
            {query.category && (
                <div onClick={()=> {delete query.category ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white mt-4 text-xs font-iranyekan-regular rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700 group">
                    {removeHyphen(query.category)}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover:text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
            {query.price_from && query.price_to && (
                <div onClick={()=> {delete query.price_from ; delete query.price_to ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white mt-4 text-xs font-iranyekan-regular rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700 group">
                    از {toPersianPrice(query.price_from)} تا {toPersianPrice(query.price_to)}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover:text-red-600 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )} 

            {query.available && (
                <div  onClick={()=> {delete query.available ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white mt-4 text-xs  font-iranyekan-regular rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700 group">
                    نمایش کالاهای موجود
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover:text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
            {query.brand && (
                <div  onClick={()=> {delete query.brand ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white mt-4 text-xs font-iranyekan-regular rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700 group">
                    {query.brand}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover:text-red-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}

            {query.sort && (
                <div onClick={()=> {delete query.sort ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white mt-4 text-xs font-iranyekan-regular rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700 group">
                    {query.sort === "mostFavorite" && "محبوب‌ ترین"}
                    {query.sort === "dateRecent" && "جدید ترین"}
                    {query.sort === "priceMin" && "ارزان ترین"}
                    {query.sort === "priceMax" && "گران ترین"}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 group-hover:text-red-600 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            )}
        </section>
    );
}
export default MainTags;