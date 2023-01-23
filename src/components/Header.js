import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPanel, userLogout } from "src/redux/user/userActions";
import Login from "./Login";
import { requestError } from "src/services/http";

const Header = () => {
     const [isCategoryPanel, setIsCategoryPanel] = useState(false);
     const { user, loading } = useSelector((state) => state.auth);
     const dispatch = useDispatch();
     const [userPanel, setUserPanel] = useState(false);
     const {categories  : data} = useSelector(state => state.categories)
     const [categories , setCategories] = useState(data)

     const closeCategory = () => {
          const allCategories = categories && categories.length > 0 ? [...categories] : [];
          allCategories.forEach(category => category.status = false);
          setCategories(allCategories);
          setIsCategoryPanel(false);
     };


     function handleCategory(id) {
          closeCategory();
          const index = categories.findIndex(category => category.id === id);
          const category = { ...categories[index] };
          category.status = true;
          const allCategories = [...categories];
          allCategories[index] = category;
          setCategories(allCategories);
          setIsCategoryPanel(true);
     }

     return (
          <>
               <div onClick={() => setUserPanel(false)} className={`fixed ${ userPanel ? "" : "hidden" } bg-[#44444438] inset-0  h-full w-full z-10`}></div>
               <div onClick={() => closeCategory() } className={`fixed ${isCategoryPanel ? "" : "hidden"} mt-0 inset-0 h-full w-full z-10`}></div>
               
               <header className="flex relative  justify-between md:px-10  px-4 py-2 bg-gray-50 items-center z-10">
                    {!user &&  <Login />}

                    {/* Big Screen Menu */}
                    <section className="hidden sm:flex  gap-x-6 ">
                         <BigScreenMenu 
                              setIsCategoryPanel={setIsCategoryPanel} 
                              isCategoryPanel={isCategoryPanel} 
                              customClassname={ "z-40 absolute mx-10 right-0 left-0 rounded-md top-14"}
                              closeCategory = {closeCategory}
                              handleCategory = {handleCategory}
                              categories={categories}
                         />
                    </section>

                    {/* Mobile Menu Button  */}
                    <section className="sm:hidden">
                         <button className="flex items-center justify-center p-2 bg-white" onClick={() => setIsCategoryPanel(!isCategoryPanel)} >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700" >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                         </svg>
                         </button>
                    </section>

                    {/* //? User Modal */}
                    <section className="w-full sm:w-fit flex justify-end relative ">
                         {user && user.account_type === 'normal' ? (
                              <>
                                   <button onClick={() => setUserPanel(!userPanel)} className="bg-white px-6 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500 min-w-[123px] max-w-[123px]" >
                                        {toPersianDigits(user.phone_number_primary)}
                                   </button>
                                   <nav className={`bg-gray-50 rounded-b-md ${ userPanel ? "" : "hidden" } absolute  top-[37px] left-0  whitespace-nowrap py-2`} >
                                        <Link href={'/user/favorites'} >
                                             <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">محبوب‌ها</a>
                                        </Link>
                                        <Link href={'/user/history'} >
                                             <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">مشاهدات اخیر</a>
                                        </Link>
                                        <button onClick={() => { dispatch(userLogout()); setUserPanel(false)}} className="text-xs cursor-pointer hover:bg-red-100 px-6 font-bold text-red-600 w-full py-1.5 text-center font-sans ">
                                             خروج
                                        </button>
                                   </nav>
                              </>
                         ) : user ? (
                              <>
                                   <button onClick={() => setUserPanel(!userPanel)} className="bg-white px-6 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500 min-w-[123px] max-w-[123px]" >
                                        {toPersianDigits(user.phone_number_primary)}
                                   </button>
                                   <div className={`bg-gray-50 rounded-b-md ${userPanel ? "" : "hidden"} absolute  top-[33px] left-[1px]  whitespace-nowrap py-2`}>
                                        {user.is_pending ? (
                                             <button onClick={()=>requestError({error : null , defaultMessage : ' فروشگاه شما در وضعیت "بررسی نشده" است. و پس از بررسی به پنل خود دسترسی خواهید داشت'})} className="text-xs min-w-[119.2px] max-w-[119.2px] cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-1.5 text-center font-sans block">در حال بررسی</button>
                                        ) : (
                                             <nav>
                                                  <Link href={`/${user.account_type}`} >
                                                       <a className="text-xs cursor-pointer min-w-[119.2px] max-w-[119.2px] hover:bg-gray-200 font-bold text-gray-700 py-1.5 text-center font-sans block">پنل مدیریت</a>
                                                  </Link>
                                                  <Link href={'/user/favorites'} >
                                                       <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">محبوب‌ها</a>
                                                  </Link>
                                                  <Link href={'/user/history'} >
                                                       <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">مشاهدات اخیر</a>
                                                  </Link>
                                             </nav>
                                        )}
                                        <button onClick={()=> {dispatch(userLogout())}} className="min-w-[119.2px] max-w-[119.2px] text-xs cursor-pointer hover:bg-red-100  font-bold text-red-600 w-full py-1.5 text-center font-sans ">خروج</button>
                                   </div>
                              </>
                         ) : (
                              <>
                                   {loading ? (
                                        <button className="cursor-default bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500">...</button>
                                   ) : ( 
                                        <button onClick={() => dispatch(authPanel({isOpen : true,type : "normal"}))} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500">ورود / ثبت نام</button>
                                   )}
                              </>
                         )}
                    </section>
               </header>

               {/* //? Menu Mobile =>  */}
               <SmallScreenMenu 
                    isCategoryPanel={isCategoryPanel}
                    setIsCategoryPanel={setIsCategoryPanel}
                    closeCategory = {closeCategory}
                    handleCategory = {handleCategory}
                    categories={categories}

               /> 
          </>
     );
};
export default Header;