import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Categories = ({similarCategories , categories , query}) => {
    const {category} = query
    const [isSuggestedCategories, setIsSuggestedCategories] = useState(true)

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
        <section className="flex flex-col w-full  px-6">
            <div onClick={()=>setIsSuggestedCategories(!isSuggestedCategories) } className={`py-6 flex items-center cursor-pointer`}>
                <div className={`${isSuggestedCategories ? "" : "rotate-90"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sans mr-2">{returnSubcategory(category) ? returnSubcategory(category).text : "دسته بندی پیشنهادی"}</span>
            </div>
            <nav className={`${isSuggestedCategories ? "" : "hidden"} flex flex-col gap-y-6 pr-4 pb-6`}>
                { !returnSubcategory(category) ?  categories.categories.map((category, index) => {
                    return (
                        <Link key={index} href={{pathname: "/search",query: { ...query, category: category.name }}}>
                            <a className="hover:text-red-500  text-sm font-sans text-gray-700">{category.name}</a>
                        </Link>
                        
                    );
                }) : (
                    <div className="flex flex-col ">
                        {returnSubcategory(category).mainName && (
                            <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).mainName}}}>
                                    <a className="flex items-center  gap-x-2 mr-2 pb-3"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                        </svg>
                                        <p className="font-sans hover:text-red-500 text-sm ">{returnSubcategory(category).mainName}</p>
                                    </a>
                                </Link>
                        )}
                        {returnSubcategory(category).subName && (
                                <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).subName}}}>
                                    <a className="flex items-center  gap-x-2 mr-4 py-3"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                        </svg>
                                        <p className="font-sans hover:text-red-500 text-sm ">{returnSubcategory(category).subName}</p>
                                    </a>
                                </Link>
                        )}
                        {returnSubcategory(category).sub_subName && (
                                <Link href={{pathname : '/search' , query : {...query , category : returnSubcategory(category).sub_subName}}}>
                                    <a className="flex items-center  gap-x-2 mr-6 py-3"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                        </svg>
                                        <p className="font-sans hover:text-red-500 text-sm ">{returnSubcategory(category).sub_subName}</p>
                                    </a>
                                </Link>
                        )}
                        {/* Maping On Data */}
                        {returnSubcategory(category) !== null && returnSubcategory(category).data.map((category, index) => {
                            {if(category.status === false) return <p key={index} className=" mr-12 py-3  text-sm font-sans text-gray-700">{category.name}</p>};
                            return(
                                    <Link key={index} href={{pathname: "/search",query: { ...query, category: category.name }}}>
                                        <a className="hover:text-red-500 mr-12 py-3  text-sm font-sans text-gray-700">{category.name}</a>
                                    </Link>
                            )
                        })}
                    </div>
                )}
            </nav>

        </section>
     );
}
 
export default Categories;