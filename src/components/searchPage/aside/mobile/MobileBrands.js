import { Modal } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


const MobileBrands = ({closeHandler , brands , isMobileMenu}) => {
    
    const [isChooseBrans , setIsChooseBrans] = useState(false)
    const [inputValue,setInputValue] = useState("")

    const {query} = useRouter()
    const router = useRouter()

    const findBrands = (value) => {
        if(value){
            const faResualt = brands.filter(e => e?.name?.toLowerCase()?.includes(value?.toLowerCase()))
            const enResualt = brands.filter(e =>  e?.name_english?.toLowerCase()?.includes(value?.toLowerCase()))
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
        <Modal
        open={isMobileMenu}
        onClose={()=>closeHandler()}
        className="flex lg:hidden justify-center  items-center px-4">
            <div className="bg-white  w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0">
            
            <div className="px-4 mt-6 flex w-full">
                <button onClick={()=> closeHandler(false)}>
                    <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h6 className="text-sm  text-center w-full font-iranyekan-regular text-gray-800 ">انتخاب برند</h6>
            </div>

            <hr className="mt-5"/>

                <section className={`flex flex-col w-full mt-8 px-6`}>

                    <div className={`relative`}>
                        <svg className="absolute w-6 h-6 top-3 right-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeٌidth="1.5" stroke="gray" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type='text' value={inputValue} onChange={ input => setInputValue(input.target.value) } placeholder="جستجوی برند" className="rounded-md w-full font-iranyekan-regular  py-3 focus:ring-0 focus:outline-none border px-4  text-sm pr-11  focus:border-gray-300  border-gray-300" />
                    </div>                                   

                    <div className={`my-4`}>
                        {
                            findBrands(inputValue) && findBrands(inputValue).length > 0 ? findBrands(inputValue).map(brand => {
                                return(
                                    <Link href={{pathname : '/search' , query : {...query , brand : brand.name}}} key={brand.id} > 
                                        <a onClick={()=> closeHandler(false)} className={`${router.query.brand === brand.name ? "bg-gray-100" : ""} flex justify-between py-3 hover:bg-gray-100 px-2 rounded-md`} key={brand.id}>
                                            <span className="font-iranyekan-regular text-gray-600 text-sm">{brand.name}</span>
                                            <span className="font-iranyekan-regular text-gray-600 text-sm">{brand.english_name}</span>
                                        </a>
                                    </Link>
                                )
                            }) : (
                                <p className="text-center font-iranyekan-regular text-sm text-red-700">برند مورد نظر پیدا نشد</p>
                            )
                        }
                    </div>

                    <div className={`bg-gray-100 ${router.query.brand ? "flex" : "hidden"}  right-0 gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4 `}>
                        <button onClick={()=> {delete query.brand & router.push({pathname : "/search" , query : {...query}}) & closeHandler("")}}  className=" text-gray-800 w-full border border-gray-700 rounded-md text-sm font-iranyekan-regular  py-3">
                                حذف فیلتر برند
                        </button>
                    </div>
                </section>
            </div>
        </Modal>
     );
}
 
export default MobileBrands;