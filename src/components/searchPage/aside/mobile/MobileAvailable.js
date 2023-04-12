import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const MobileAvailable = ({closeHandler,isMobileMenu}) => {

     const {query} = useRouter()

     const [isQuantityCheckbox , setIsQuantityCheckbox] = useState(query.available)
     
     const router = useRouter()

     const handler = () =>{
          if(isQuantityCheckbox){
               router.push({pathname : "/search" , query : {...query , available:true }})
          }else{
               delete query.available; 
               router.push({pathname : "/search" , query : {...query}})
          }
          closeHandler("")
     }


     return (
          <Modal open={isMobileMenu || false} onClose={()=>closeHandler()} className="flex lg:hidden justify-center items-center px-4">
               <div className="bg-white w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0">

               <div className="px-4 mt-6 flex w-full">
                    <button onClick={()=> closeHandler(false)}>
                         <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                    </button>
                    <h6 className="text-sm  text-center w-full font-iranyekan-regular text-gray-800 ">انتخاب وضعیت کالا</h6>
               </div>

               <hr className="mt-5"/>

               <div className={`pb-3 flex gap-x-1 px-6 mt-6`}>
                    <input id="checkbox" type="checkbox" checked={isQuantityCheckbox}  onChange={(e) => setIsQuantityCheckbox(e.currentTarget.checked)}  className="w-5 h-5 text-blue-600 bg-gray-100 focus:outline-none border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 rounded-md dark:border-gray-600"/>
                    <label htmlFor="checkbox"  className="mr-3 font-iranyekan-regular text-sm  font-medium cursor-pointer text-gray-800 dark:text-gray-300"> فقط نمایش محصولات موجود</label>
               </div>

               <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4">
                    <button onClick={handler} className="bg-gray-700 font-iranyekan-regular text-sm text-gray-100 py-3 rounded-md w-3/4 text-center" >
                         اعمال فیلتر 
                    </button>
                    <button onClick={()=> {delete query.available & router.push({pathname : "/search" , query : {...query}}) & closeHandler("")}}  className="w-1/4 border text-gray-800  border-gray-700 rounded-md text-sm font-iranyekan-regular  py-3">حذف</button>
               </div>

               </div>
          </Modal>
     );
}
 
export default MobileAvailable;