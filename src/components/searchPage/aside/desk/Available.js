import { useRouter } from "next/router";
import { useState } from "react";

const Available = () => {
    const {query} = useRouter()
    const [isQuantityTaggle, setisQuantityTaggle] = useState(false)
    const [isQuantityCheckbox , setIsQuantityCheckbox] = useState(false)

    const router = useRouter()
    const handler = () =>{
        if(isQuantityCheckbox){
            router.push({pathname : "/search" , query : {...query , available:true }})
        }else{
            delete query.available; 
            router.push({pathname : "/search" , query : {...query}})
        }
    }


    return (
        <section className="flex flex-col w-full  px-6">
            <div onClick={()=>setisQuantityTaggle(!isQuantityTaggle) } className={`py-6 flex items-center cursor-pointer`}>
                <div className={`${isQuantityTaggle ? "" : "rotate-90"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sans mr-2 text-gray-800">موجودی  </span>
            </div>
            <section className={`${isQuantityTaggle ? "" : "hidden"} pb-3  gap-x-4`}>
                    <div onClick={handler}>
                        <a className="flex items-center mb-4" onClick={()=>setIsQuantityCheckbox(!isQuantityCheckbox)} >
                            <input id="default-checkbox" type="checkbox"  checked={query.available} onChange={(e) => setIsQuantityCheckbox(e.target.checked)}  className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-checkbox" className="mr-3 font-sans text-sm  font-medium cursor-pointer text-gray-700 dark:text-gray-300"> نمایش محصولات موجود</label>
                        </a>
                    </div>
            </section>
        </section>
    );
}
 
export default Available;