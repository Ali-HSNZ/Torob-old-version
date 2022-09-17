import { Modal } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MobilePrice = ({closeHandler , isMobileMenu}) => {
    
    const router = useRouter()
    const {query} = useRouter()
    const [minPriceinput,setMinPriceinput] = useState(0)
    const [maxPriceinput,setMaxPriceinput] = useState(0)

    return ( 
        <Modal
        open={isMobileMenu}
        onClose={()=>closeHandler()}
        className="flex justify-center items-center px-4">
            <div className="bg-white   w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0">
                <div className="px-4 mt-6 flex w-full">
                    <button onClick={()=> closeHandler(false)}>
                        <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h6 className="text-sm  text-center w-full font-sans text-gray-800 ">انتخاب قیمت</h6>
                </div>

                <hr className="mt-5"/>


                <section className="flex flex-col w-full  px-6 mt-8">

                    <div className={` flex gap-x-4 flex-between w-full`}>
                        <div className="flex w-1/2 relative">
                            <span className="absolute right-5 top-3 text-xs font-sans  text-gray-800 ">از</span>
                            <input dir="ltr"  type="number" value={minPriceinput}  onChange={e => setMinPriceinput(e.target.value)} className=" text-gray-800 border w-full font-sans border-gray-400 rounded-md"/>
                        </div>
                        <div className="flex w-1/2 relative">
                            <span className="absolute right-5 top-3 text-xs font-sans text-gray-800">تا</span>
                            <input dir="ltr" type="number" value={maxPriceinput} onChange={e => setMaxPriceinput(e.target.value)} className=" text-gray-800 border w-full border-gray-400 rounded-md"/>
                        </div>
                    </div>

                    <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 left-0 py-4 px-4">

                        <Link  href={{pathname : "/search" , query : {...query , fromPrice :minPriceinput , toPrice  : maxPriceinput}}} >
                            <a className="bg-gray-700 font-sans text-sm text-gray-100 py-3 rounded-md w-3/4 text-center" onClick={()=> closeHandler("")}>
                                اعمال فیلتر 
                            </a>
                        </Link>
                        <button onClick={()=> {delete query.fromPrice & delete query.toPrice &  router.push({pathname : "/search" , query : {...query}}) & closeHandler("") }}  className="w-1/4 border border-gray-700 rounded-md text-sm font-sans text-gray-800  py-3">حذف</button>
                    </div>
                </section>
            </div>
        </Modal>

    );
}
 
export default MobilePrice;