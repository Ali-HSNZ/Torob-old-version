import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Modal } from "@mui/material";
import { useSelector } from "react-redux";

const SmallScreenMenu = ({setIsSmallScreenModal , isSmallScreenModal , customClassname}) => {
     const router = useRouter()
     const {query} = useRouter()
     const {categories} = useSelector(state => state.categories)

     const categoryHandler_btn = (button , categoryId) => {
          const parent = document.getElementById('smallScreenModal')
          const panel = document.querySelectorAll(`#mobilePanel_${categoryId}`)[0]
          document.addEventListener('click', event => {
               if(button === null ){
                    document.querySelectorAll('.mobilePanel').forEach(panel => panel.style.display = "none")
                    return false
               }
               else if(button.contains(event.target) || panel.contains(event.target) || parent.contains(event.target)) {
                    document.querySelectorAll('.mobilePanel').forEach(panel => panel.style.display = "none")
                    panel.style.display = "block";
               }else{
                    panel.style.display = "none"
               }
          })
     }
     
     return (  
          <Modal id="smallScreenModal" open={isSmallScreenModal || false} onClose={()=>setIsSmallScreenModal(false)} className={`${customClassname || "sm:hidden"}`}>
               <section className={`h-full pb-[230px] fixed  inset-0  z-40 sm:w-1/2 md:w-1/3  bg-white`}>

                    <div className="px-4 mt-4 flex w-full">
                         <button onClick={()=> categoryHandler_btn(null) & setIsSmallScreenModal(false)}>
                              <svg className="w-6 h-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                         </button>
                         <h6 className="text-sm text-gray-700 text-center w-full font-sans">همه‌ دسته‌بندی ها</h6>
                    </div>

                    <hr className="mt-4"/>

                    <div className="flex pb-2  gap-x-4 mt-4 z-20 w-full whitespace-nowrap overflow-x-auto px-4">                    
                         {categories &&  categories.map((category,index) => <button onClick={button=> categoryHandler_btn(button.target , category.id)} key={index}  className="hover:text-red-500 text-xs border px-4 py-2 rounded-md border-gray-400 cursor-pointer flex font-sans text-gray-700" >{category.title}</button>)}
                    </div>

                    <div className=" h-full w-full md:mt-4 mt-2 pb-4  px-4 overflow-y-auto">
                         {categories&&categories.map((category,index) =>{
                              return(
                                   <div id={`mobilePanel_${category.id}`} className={`mobilePanel hidden`} key={index}>
                                        <section className="pb-4">
                                             <Link  href={{pathname : '/search' , query : {category : category.slug}}}  >
                                                  <a onClick={()=> categoryHandler_btn(null) & setIsSmallScreenModal(false)} className="flex gap-x-4  text-gray-600  whitespace-nowrap text-sm font-sans font-bold">{category.title}</a>
                                             </Link>
                                        </section>
                                        <hr/> 
                                        <div className="pb-4">
                                             {category.sub_categories && category.sub_categories.length > 0 && category.sub_categories.map((sub,main_index) => {
                                                  return(
                                                       <div className=" relative" key={main_index}>
                                                            <input type="checkbox"  className="peer hidden" name={`${main_index}_checkbox_${index}`} id={`${main_index}_checkbox_${index}`} />
                                                            <section className="mt-4 mr-6 ">
                                                                 <Link  href={{pathname : '/search' , query : {category : sub.slug}}}  >
                                                                      <a onClick={()=> categoryHandler_btn(null) & setIsSmallScreenModal(false)} className="flex mr-2  text-gray-600  whitespace-nowrap text-sm font-sans font-bold">{sub.title}</a>
                                                                 </Link>
                                                            </section>
                                                            {sub.sub_categories &&  sub.sub_categories.length > 0 && (
                                                                 <label htmlFor={`${main_index}_checkbox_${index}`} className=" cursor-pointer peer-checked:rotate-[-90deg] absolute right-[-4px] top-0 p-1">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                                      </svg>
                                                                 </label>
                                                            )}
                                                            {sub.sub_categories  && sub.sub_categories.map((sub_sub,sub_sub_index) => {
                                                                 const handlePath = sub_sub.type === 'brand' ? {category : sub_sub.category , brand : sub_sub.brand} : {category : sub_sub.slug}
                                                                 return(
                                                                      <Fragment key={sub_sub_index}>
                                                                           <Link  href={{pathname : '/search' , query : handlePath}}  >
                                                                                <a onClick={()=> categoryHandler_btn(null) & setIsSmallScreenModal(false)} className="hidden peer-checked:flex  mr-12 mt-4 text-gray-600 whitespace-nowrap text-sm font-sans ">{sub_sub.title}</a>
                                                                           </Link>
                                                                           <section className="relative hidden peer-checked:flex">
                                                                                <input type="checkbox" className="peer hidden" name={`${sub_sub_index}_checkbox_sub_${index}`} id={`${sub_sub_index}_checkbox_sub_${index}`} />
                                                                                {sub_sub.is_sub_category && <label htmlFor={`${sub_sub_index}_checkbox_sub_${index}`} className=" cursor-pointer peer-checked:rotate-[-90deg] absolute right-4 top-[-18px] ">
                                                                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                                                     </svg>
                                                                                </label>}
                                                                                <div className="peer-checked:flex flex-col hidden">
                                                                                     {sub_sub.sub_categories  && sub_sub.sub_categories.map((sub_sub_sub,sub_sub_sub_index) => {
                                                                                          const handlePath_sub = sub_sub.type === 'brand' ? {category : sub_sub_sub.category , brand : sub_sub.brand} : {category : sub_sub_sub.slug}
                                                                                          return(
                                                                                               <Link  key={sub_sub_sub_index} href={{pathname : '/search' , query : handlePath_sub}}  >
                                                                                                    <a onClick={()=> categoryHandler_btn(null) & setIsSmallScreenModal(false)} className="mr-16 mt-4 text-gray-600 whitespace-nowrap text-sm font-sans ">{sub_sub_sub.title}</a>
                                                                                               </Link>
                                                                                          )
                                                                                     })}
                                                                                </div>
                                                                           </section> 
                                                                      </Fragment>
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
                    {query.category && (
                         <div className="border-t bg-white flex fixed bottom-0 gap-x-4 w-full h-auto py-4 px-4">
                              <button 
                                   onClick={()=> {
                                        delete query.category &
                                        delete query.brand &
                                        router.push({pathname : "/search" , query : {...query}}) & 
                                        setIsSmallScreenModal(false) & 
                                        categoryHandler_btn(null)
                                   }}
                                   className="w-full border border-gray-700 bg-white text-gray-700 rounded-md text-sm font-sans  py-3">
                                   حذف فیلتر دسته‌بندی
                              </button>
                         </div>
                    )}

               </section>
      </Modal>

     );
}
     
export default SmallScreenMenu;