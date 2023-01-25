import Link from "next/link";
import { useSelector } from "react-redux";
const BigScreenMenu = ({customClassname}) => {

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
          <nav className="flex gap-x-4 ">
               {categories && categories.length > 0 && categories.map(category => {
                    return (
                         <section key={category.id}>
                              {/* <div onClick={() => closeCategory() } className={`fixed ${isCategoryPanel ? "" : "hidden"}  mt-0 inset-0 h-full w-full z-10`}></div> */}
                              <button onClick={(event)=>  categoryHandler_btn(event.target)}  className="category_btn hover:text-red-500  cursor-pointer text-sm font-sans text-gray-500 z-20" >{category.title}</button>
                              <div className={`panel  ${customClassname} hidden`}>
                                   <div className="bg-gray-50 pb-4 rounded-md">
                                        <nav className="px-5 py-4"> 
                                             <Link href={{pathname : '/search' , query : {category:category.slug}}}>
                                                  <a onClick={()=> categoryHandler_btn(null)} className="hover:text-red-500  text-sm font-bold font-sans text-gray-700">{category.title}</a>
                                             </Link>
                                        </nav>
                                        <hr/>
                                        <div className=" sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 mt-5 px-4">
                                             {category.sub_categories.length > 0 && category.sub_categories.map((sub,main_index) => {
                                                  return(
                                                       <div  className=" mb-3 break-inside-avoid" key={main_index}>
                                                            <nav className="flex gap-x-4">
                                                                 <Link href={{pathname : '/search' , query : {category:sub.slug}}} >
                                                                      <a onClick={()=> categoryHandler_btn(null)} className="hover:text-red-500 font-sans text-sm font-bold cursor-pointer text-gray-800" >{sub.title}</a>
                                                                 </Link>
                                                            </nav>
                                                            <nav >
                                                            {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,sub_index) => {
                                                                 const handlePath = sub_sub.type === 'brand' ? {category : sub_sub.category , brand : sub_sub.brand} : {category : sub_sub.slug}
                                                                 return (
                                                                      <Link key={sub_index} href={{pathname : '/search' , query : handlePath}}>
                                                                           <a onClick={()=> categoryHandler_btn(null)} className="flex gap-x-4 mr-4 mt-3 hover:text-red-500 text-xs font-sans cursor-pointer text-gray-800" >{sub_sub.title}</a>
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
    );
}
export default BigScreenMenu;