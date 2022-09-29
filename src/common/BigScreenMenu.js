import Link from "next/link";
import { useDispatch } from "react-redux";
import { authPanel } from "src/redux/user/userActions";
const BigScreenMenu = ({setUserPanel , customClassname , category  , handleCategory , closeCategory}) => {
    const dispatch = useDispatch()
    return (  
        <nav className="flex gap-x-4 ">
            <button  className="hover:text-red-500  cursor-pointer text-sm font-sans text-gray-500" onClick={()=> handleCategory(category.id) & setUserPanel(false) & dispatch(authPanel(false))}>{category.name}</button>

            <div className={`${category.status ? "" : "hidden"} ${customClassname}`}>
                <div className="bg-gray-50 pb-3">
                    <nav className="px-5 py-4">
                        <Link href={{pathname : '/search' , query : {category:category.name}}}>
                            <a className="hover:text-red-500  text-sm font-bold font-sans text-gray-700">{category.name}</a>
                        </Link>
                    </nav>
                    <hr/>
                    <div className=" sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 mt-5 px-4">
                        {category.sub_categories.length > 0 && category.sub_categories.map((sub,main_index) => {
                            return(
                                <div className=" mb-3 break-inside-avoid" key={main_index}>
                                    <nav className="flex gap-x-4">
                                        <Link href={{pathname : '/search' , query : {category:sub.name}}} >
                                            <a onClick={()=> closeCategory()} className="hover:text-red-500 font-sans text-sm font-bold cursor-pointer text-gray-800" >{sub.name}</a>
                                        </Link>
                                    </nav>
                                    {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,sub_index) => {
                                        return(
                                            <nav className="flex gap-x-4 mt-2 " key={sub_index}>
                                                <Link href={{pathname : '/search' , query : {category:sub_sub.name}}}>
                                                    <a onClick={()=> closeCategory()} className="hover:text-red-500 text-xs font-sans cursor-pointer text-gray-800" >{sub_sub.name}</a>
                                                </Link>
                                            </nav>
                                        )
                                    })}
                                </div>
                            )}
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default BigScreenMenu;