import { Modal } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const MobileCategories = ({similarCategories , categories, closeHandler , isMobileMenu}) => {
    const {query} = useRouter()
    const {category} = query

    const router = useRouter()
    const returnSubcategory = (name) => {
        if(category){
            if(similarCategories && similarCategories.name === name){
                return { 
                    mainName : similarCategories.name, 
                    text:"دسته های پیشنهادی",
                    data : similarCategories.sub_categories
                }
            }
            if(!similarCategories.sub_categories.name){
                return{
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : category,
                    text:"دسته های مشابه",
                    data : [{name : "زیر دسته ایی وجود ندارد" , status : false}]
    
                }
            }
             else if(similarCategories && similarCategories.sub_categories.name === name){
                return {
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    text:"دسته های مشابه",
                    data :  similarCategories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories
                }
            }else if(similarCategories && similarCategories.sub_categories.sub_categories.name === name){
                return {
                    type : "sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text:"دسته‌بندی دقیق‌تر",
                    data :  similarCategories.sub_categories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories.sub_categories
                }
            }

            const sub_sub_sub =  similarCategories.sub_categories.sub_categories.sub_categories  && similarCategories.sub_categories.sub_categories.sub_categories.find(e => e.name === category)
            if(sub_sub_sub){
                return {
                    type : "sub_sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text: "دسته‌بندی دقیق‌تر",
                    data :  similarCategories.sub_categories.sub_categories.sub_categories 
                }
            }
            else if(!sub_sub_sub){
                return {
                    type : "sub_sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text:"دسته های مشابه",
                    data :  similarCategories.sub_categories.sub_categories 
                }
            }
        }
        return false
    }

    return ( 
        <Modal
        open={isMobileMenu}
        onClose={()=>closeHandler()}
        className="flex justify-center items-center px-4">
            <div className={`bg-white  ${category ? "pb-36" : "pb-16"} w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0`}>

                <div className="px-4 mt-6 flex w-full">
                    <button onClick={()=> closeHandler(false)}>
                        <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h6 className="text-sm  text-center w-full font-sans text-gray-800 ">انتخاب دسته بندی</h6>
                </div>

                <hr className="mt-5"/>

                <section className="flex flex-col w-full  px-6  h-full overflow-y-auto"  >
                        <span className=" py-6  font-sans mr-2 text-gray-800 ">{returnSubcategory(category) ? returnSubcategory(category).text : "دسته بندی پیشنهادی"}</span>
                    <nav className={`flex flex-col gap-y-6 pr-4 pb-6`}>
                        { !returnSubcategory(category) ?  categories.categories.map((category, index) => {
                            return (
                                <Link key={index} href={{pathname: "/search",query: { ...query, category: category.name }}}>
                                    <a className="hover:text-red-500  text-sm font-sans  text-gray-800 ">{category.name}</a>
                                </Link>
                            );
                        }) : (
                            <div className="flex flex-col ">
                                {returnSubcategory(category).mainName && (
                                    <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).mainName}}}>
                                            <a className="flex items-center  gap-x-2 mr-2 pb-3"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5  text-gray-800 " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                                <p className="font-sans hover:text-red-500 text-sm  text-gray-800 ">{returnSubcategory(category).mainName}</p>
                                            </a>
                                        </Link>
                                )}
                                {returnSubcategory(category).subName && (
                                        <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).subName}}}>
                                            <a className="flex items-center  gap-x-2 mr-4 py-3"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5  text-gray-800  " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                                <p className="font-sans hover:text-red-500 text-sm  text-gray-800 ">{returnSubcategory(category).subName}</p>
                                            </a>
                                        </Link>
                                )}
                                {returnSubcategory(category).sub_subName && (
                                        <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).sub_subName}}}>
                                            <a className="flex items-center  gap-x-2 mr-6 py-3"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5  text-gray-800 " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                                </svg>
                                                <p className="font-sans hover:text-red-500 text-sm  text-gray-800 ">{returnSubcategory(category).sub_subName}</p>
                                            </a>
                                        </Link>
                                )}
                                {/* Maping On Data */}
                                {returnSubcategory(category) !== null && returnSubcategory(category).data.map((category, index) => {
                                    {if(category.status === false) return <p key={index} className=" mr-12 py-3  text-sm font-sans text-gray-700">{category.name}</p>};
                                    return(
                                            <Link key={index} href={{pathname: "/search",query: { ...query, category: category.name }}}>
                                                <a className="hover:text-red-500 mr-12 py-3  text-sm font-sans  text-gray-800 ">{category.name}</a>
                                            </Link>
                                    )
                                })}

                                <div className="bg-gray-100 flex right-0 gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4">
                                    <button onClick={()=> {delete query.category & router.push({pathname : "/search" , query : {...query}}) ; closeHandler("")}}  className="w-full border border-gray-700  text-gray-800  rounded-md text-sm font-sans  py-3">
                                                   
                                        حذف فیلتر دسته‌بندی
                                    </button>
                                </div>

                            </div>
                            
                        )}
                    </nav>

                </section>
            </div>
        </Modal>
     );
}
 
export default MobileCategories;