import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Price = () => {
    const {query} = useRouter()
    const [isPriceTaggle, setIsPriceTaggle] = useState(true)
    const [minPriceinput,setMinPriceinput] = useState(0)
    const [maxPriceinput,setMaxPriceinput] = useState(0)

    return ( 
        <section className="flex flex-col w-full  px-6">
            <div onClick={()=>setIsPriceTaggle(!isPriceTaggle) }  className={`py-6 flex items-center cursor-pointer`}>
                <div className={`${isPriceTaggle ? "" : "rotate-90"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sans mr-2">قیمت (تومان) </span>
            </div>
            <div className={`${isPriceTaggle ? "" : "hidden"} flex gap-x-4`}>
                <div className="flex">
                    <span className="relative right-5 top-3 text-xs font-sans text-gray-500">از</span>
                    <input dir="ltr"  type="number" value={minPriceinput}  onChange={e => setMinPriceinput(e.target.value)} className="border w-full font-sans border-gray-400 rounded-md"/>
                </div>
                <div className="flex">
                    <span className="relative right-5 top-3 text-xs font-sans text-gray-500">تا</span>
                    <input dir="ltr" type="number" value={maxPriceinput} onChange={e => setMaxPriceinput(e.target.value)} className="border w-full border-gray-400 rounded-md"/>
                </div>
            </div>

            <Link  href={{pathname : "/search" , query : {...query , priceMin :minPriceinput , priceMax  : maxPriceinput}}} >
                <a className={`${isPriceTaggle ? "" : "hidden"} text-center hover:bg-gray-300 text-sm rounded-md font-sans py-3 my-5 bg-gray-200`}>
                    اعمال فیلتر قیمت
                </a>
            </Link>
        </section>
    );
}
 
export default Price;