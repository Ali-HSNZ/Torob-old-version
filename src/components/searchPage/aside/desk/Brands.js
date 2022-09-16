import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Brands = ({brands}) => {
    
    const [isChooseBrans , setIsChooseBrans] = useState(true)
    const [inputValue,setInputValue] = useState("")
    const {query} = useRouter()
    const findBrands = (value) => {
        if(value){
            const faResualt = brands.filter(e => e.name.toLowerCase().includes(value.toLowerCase()))
            const enResualt = brands.filter(e =>  e.name_english.toLowerCase().includes(value.toLowerCase()))
            if(faResualt.length > 0){
                return faResualt    
            }else if(enResualt.length > 0){
                return enResualt
            }
            return  null
        }
        return brands
    }
    
    return ( 
        <section className={`flex flex-col w-full  px-6`}>
            <div onClick={()=>setIsChooseBrans(!isChooseBrans) } className={`py-6 flex items-center cursor-pointer`}>
                <div className={`${isChooseBrans ? "" : "rotate-90"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-800  w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sans mr-2 text-gray-800">انتخاب برند</span>
            </div>

            <div className={`${isChooseBrans ? "" : "hidden"} relative`}>
                <svg className="absolute w-6 h-6 top-3 right-3 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeٌidth="1.5" stroke="gray" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type='text' value={inputValue} onChange={ input => setInputValue(input.target.value) } placeholder="جستجوی برند" className="rounded-md text-gray-800 w-full font-sans  py-3 focus:ring-0 text-sm pr-11  focus:border-gray-300  border-gray-300" />
            </div>                                   

            <div className={`${isChooseBrans ? "" : "hidden"} my-4`}>
                {
                    findBrands(inputValue) && findBrands(inputValue).length > 0 ? findBrands(inputValue).map(brand => {
                        return(
                            <Link  href={{pathname : '/search' , query : {...query , brand : brand.name}}} key={brand.id} > 
                                <a className={` ${query.brand === brand.name ? "bg-gray-200" : ""} flex justify-between py-3 hover:bg-gray-50 px-2 rounded-md`} key={brand.id}>
                                    <span className="font-sans text-gray-600 text-sm">{brand.name}</span>
                                    <span className="font-sans text-gray-600 text-sm">{brand.name_english}</span>
                                </a>
                            </Link>
                        )
                    }) : (
                        <p className="text-center font-sans text-sm text-red-700">برند مورد نظر پیدا نشد</p>
                    )
                }
            </div>

        </section>
    );
}
 
export default Brands;