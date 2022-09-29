import { Modal } from "@mui/material";
import { useRouter } from "next/router";


const SmallScreenMenu = ({isCategoryPanel , setIsCategoryPanel , closeCategory , categories , handleCategory , setCurrentCategory , currentCategory}) => {
    
    
    const router = useRouter()
    const {query} = useRouter()

    return (  
            <section className={`h-full  pb-[230px]  fixed  ${isCategoryPanel ? "" : "hidden"} sm:hidden inset-0  z-40 w-full bg-white`}>

                <div className="px-4 mt-6 flex w-full">
                    <button onClick={()=> closeCategory()}>
                        <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h6 className="text-sm text-gray-700 text-center w-full font-sans">همه‌ دسته‌بندی ها</h6>
                </div>

                <hr className="mt-5"/>

                <div className="flex py-4  gap-x-4 mt-4 z-20 w-full whitespace-nowrap overflow-x-auto px-4">                    
                    {categories&&categories.map((category,index) => {
                        return(
                            <button key={index}  className="hover:text-red-500 text-xs border px-4 py-2 rounded-md border-gray-400 cursor-pointer flex font-sans text-gray-700" onClick={()=> handleCategory(category.id)}>{category.name}</button>
                        )
                    })}
                </div>

                <div className=" h-full w-full pb-4 px-4 overflow-y-auto">
                    {categories&&categories.map((category,index) =>{
                        return(
                            <div className={`${category.status ? "" : "hidden"}`} key={index}>
                                <section className="pb-4">
                                    <button onClick={()=>setCurrentCategory(category.name)} className={`hover:text-red-500 ${category.name === currentCategory ? "text-red-500" : "text-gray-700"} font-bold font-sans text-sm `}>{category.name}</button>
                                </section>
                                <hr/>
                                <div className="pbt-4">
                                    {category.sub_categories && category.sub_categories.length > 0 && category.sub_categories.map((sub,main_index) => {
                                        return(
                                            <div className=" relative" key={main_index}>
                                                <input type="checkbox" className="peer hidden" name={`${main_index}_checkbox_${index}`} id={`${main_index}_checkbox_${index}`} />
                                                <section className="mt-4 mr-6 ">
                                                    <label htmlFor={`${main_index}_checkbox_${index}`}  onClick={()=>setCurrentCategory(sub.name)} className={`hover:text-red-500 ${sub.name === currentCategory ? "text-red-500" : "text-gray-700"} font-sans font-bold text-sm cursor-pointer `}>{sub.name}</label>
                                                </section>
                                                {sub.sub_categories && (
                                                    <div className=" peer-checked:rotate-[-90deg] absolute right-0 top-1.5">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                        </svg>
                                                    </div>
                                                )}
                                                {sub.sub_categories  && sub.sub_categories.map((sub_sub,sub_sub_index) => {
                                                    return(
                                                        <section className="peer-checked:flex hidden mr-8 gap-x-4 mt-4 text-gray-600  whitespace-nowrap" key={sub_sub_index}>
                                                            <button  onClick={()=>setCurrentCategory(sub_sub.name)} className={`hover:text-red-500 ${sub_sub.name === currentCategory  ? "text-red-500" : "text-gray-700"} text-xs font-sans cursor-pointer `} >{sub_sub.name}</button>
                                                        </section>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="border-t bg-white flex fixed bottom-0 gap-x-4 w-full h-auto py-4 px-4">
                    <button onClick={()=>  router.push({pathname : "/search" , query : {...query , category:currentCategory }}) & closeCategory() & setIsCategoryPanel(false)} className={`bg-gray-700 font-sans text-sm text-gray-100 py-3 rounded-md ${query.category ? "w-3/4" : "w-full"} text-center`}>
                            اعمال فیلتر 
                    </button>
                    {query.category && <button onClick={()=> {delete query.category &  router.push({pathname : "/search" , query : {...query}}) & closeCategory() & setIsCategoriesModal_background(false)}}  className="w-1/4 border border-gray-700 bg-white text-gray-700 rounded-md text-sm font-sans  py-3">حذف</button>}
                </div>

            </section>
    );
}
 
export default SmallScreenMenu;