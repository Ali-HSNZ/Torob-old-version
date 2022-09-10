import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect , useState } from "react";

const MobileAvailable = ({closeHandler}) => {

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
        <div className="bg-white w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0">
           

        <div className="px-4 mt-6 flex w-full">
            <button onClick={()=> closeHandler(false)}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h6 className="text-sm  text-center w-full font-sans">انتخاب وضعیت کالا</h6>
        </div>

        <hr className="mt-5"/>

        <section className="flex flex-col w-full  px-6 mt-8">
            <div className={`pb-3  gap-x-4`}>
                <input id="checkbox" type="checkbox" checked={isQuantityCheckbox}  onChange={(e) => setIsQuantityCheckbox(e.currentTarget.checked)}  className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="checkbox"  className="mr-3 font-sans text-sm  font-medium cursor-pointer text-gray-700 dark:text-gray-300"> فقط نمایش محصولات موجود</label>
            </div>
        </section>

        <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4">
            <button onClick={handler} className="bg-gray-700 font-sans text-sm text-gray-100 py-3 rounded-md w-3/4 text-center" >
                    اعمال فیلتر 
            </button>
            <button onClick={()=> {delete query.available & router.push({pathname : "/search" , query : {...query}}) & closeHandler("")}}  className="w-1/4 border border-gray-700 rounded-md text-sm font-sans  py-3">حذف</button>
        </div>

        </div>
    );
}
 
export default MobileAvailable;