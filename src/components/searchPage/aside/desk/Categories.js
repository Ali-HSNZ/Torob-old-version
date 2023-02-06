import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const Categories = ({similarCategories , categories}) => {
    const {query} = useRouter()
    const [isSuggestedCategories, setIsSuggestedCategories] = useState(true)

    const rotateChevron = (button) => {
        const svg = button.children[0];
        if(document){
             if(svg.classList.contains('rotate-90')){
                  svg.classList.remove("rotate-90")
                  svg.classList.add("rotate-0")
             }else{
                  svg.classList.remove("rotate-0")
                  svg.classList.add("rotate-90")
             }
        }
    }

    return ( 
        <section className="flex flex-col w-full ">
            <div onClick={(button)=> rotateChevron(button.currentTarget) & setIsSuggestedCategories(!isSuggestedCategories) } className='py-6 select-none flex items-center cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-0 duration-100 mr-4 text-gray-800 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span className="font-sans mr-2 text-gray-800">{categories.title}</span>
            </div>
            <nav className={`${isSuggestedCategories ? "" : "hidden"} flex flex-col gap-y-6 pr-4 pb-6`}>
                {!similarCategories ? categories.data.map((category, index) => {
                    return (
                        <Link key={index} href={{pathname: "/search",query: { ...query, category: category.slug }}}>
                            <a className="hover:text-red-500 mr-4 text-sm font-sans text-gray-800">{category.name}</a>
                        </Link>
                    )}
                ) : (
                    <div className="flex flex-col ">
                        {similarCategories && similarCategories.data.data.parent && (
                            <Link href={{pathname : '/search' , query : {...query , category : similarCategories.data.data.parent && similarCategories.data.data.parent.slug}}}>
                                <a className="flex items-center  gap-x-2 mr-2 pb-3"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                    <p className="font-sans hover:text-red-500 text-sm text-gray-800">{similarCategories.data.data.parent && similarCategories.data.data.parent.title}</p>
                                </a>
                            </Link>
                        )}
                        {similarCategories && similarCategories.data.data.sub1 && (
                            <Link href={{pathname : '/search' , query : {...query , category : similarCategories.data.data.sub1 && similarCategories.data.data.sub1.slug}}}>
                                <a className="flex items-center  gap-x-2 mr-6 py-3"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                    <p className="font-sans hover:text-red-500 text-sm text-gray-800">{similarCategories.data.data.sub1 && similarCategories.data.data.sub1.title}</p>
                                </a>
                            </Link>
                        )}
                        {similarCategories && similarCategories.data.data.sub2 && (
                            <Link href={{pathname : '/search' , query : {...query , category : similarCategories.data.data.sub2 && similarCategories.data.data.sub2.slug}}}>
                                <a className="flex items-center  gap-x-2 mr-10 py-3"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-800" fill="none"viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                    </svg>
                                    <p className="font-sans hover:text-red-500 text-sm text-gray-800">{similarCategories.data.data.sub2 && similarCategories.data.data.sub2.title}</p>
                                </a>
                            </Link>
                        )}
                        {similarCategories.data.list && similarCategories.data.list.map((category, index) => {
                            return(
                                <Link key={index} href={{pathname: "/search",query: { ...query, category: category.slug }}}>
                                    <a className={`hover:text-red-500  ${similarCategories.data.data.sub2 ? "mr-16" : similarCategories.data.data.sub1 ?  "mr-12" : "mr-9"} py-3  text-sm font-sans text-gray-800`}>{category.title}</a>
                                </Link>
                            )}
                        )} 
                    </div>
                )}
            </nav>
        </section>
     );
}
export default Categories;