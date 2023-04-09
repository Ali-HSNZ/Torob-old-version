import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const DesctopMenu = ({customClassname}) => {

     const {categories} = useSelector(state => state.categories)

     const categoryHandler_btn = (button) => {
          const panel = button?.nextElementSibling;
          document.addEventListener('click', event => {
               if(button === null){
                    document.querySelectorAll('.panel').forEach(panel => panel.style.display = "none")
               }
               else if(button.contains(event.target) || panel.contains(event.target)) {
                    document.querySelectorAll('.panel').forEach(panel => panel.style.display = "none")
                    panel.style.display = "block";
               }else{
                    panel.style.display = "none"
               }
          })
     }


     return (  
        <section  className={`w-full overflow-hidden flex items-center`}>
            <nav id="nav" className="hidden lg:flex px-5 gap-x-6 font-iranyekan-regular text-sm w-full">
                {categories && categories.length > 0 && categories.map(category => {
                        return (
                            <section key={category.id}>
                                <button onClick={(event)=>  categoryHandler_btn(event.target)}  className="category_btn hover:text-red-500  cursor-pointer text-sm font-iranyekan-regular text-gray-500 z-20" >{category.title}</button>
                                <div className={`panel hidden ${customClassname ?? " z-40 absolute mx-10 right-0 left-0 rounded-md top-[130px]"} `}>
                                    <div className="bg-gray-50 pb-4 rounded-md">
                                            <nav className="px-5 py-4"> 
                                                <Link href={{pathname : '/search' , query : {category:category.slug}}}>
                                                    <a onClick={()=> categoryHandler_btn(null)} className="hover:text-red-500  text-sm font-iranyekan-bold text-gray-700">{category.title}</a>
                                                </Link>
                                            </nav>
                                            <hr/>
                                            <div className=" sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 mt-5 px-4">
                                                {category.sub_categories.length > 0 && category.sub_categories.map((sub,main_index) => {
                                                    return(
                                                        <div  className=" mb-3 break-inside-avoid" key={main_index}>
                                                                <nav className="flex gap-x-4">
                                                                    <Link href={{pathname : '/search' , query : {category:sub.slug}}} >
                                                                        <a onClick={()=> categoryHandler_btn(null)} className="hover:text-red-500 text-sm font-iranyekan-bold cursor-pointer text-gray-800" >{sub.title}</a>
                                                                    </Link>
                                                                </nav>
                                                                <nav >
                                                                {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,sub_index) => {
                                                                    const handlePath = sub_sub.type === 'brand' ? {category : sub_sub.category , brand : sub_sub.brand} : {category : sub_sub.slug}
                                                                    return (
                                                                        <Link key={sub_index} href={{pathname : '/search' , query : handlePath}}>
                                                                            <a onClick={()=> categoryHandler_btn(null)} className="flex gap-x-4 mr-4 mt-3 hover:text-red-500 text-xs font-iranyekan-regular cursor-pointer text-gray-800" >{sub_sub.title}</a>
                                                                        </Link>
                                                                    )
                                                                })}
                                                                </nav>
                                                        </div>
                                                    )}
                                                )}
                                            </div>
                                    </div>
                                </div>
                            </section>
                        )
                })}
            </nav>
        </section>


    );
}
export default DesctopMenu;