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

     const handleUserPanel_btn = ()=>{
          if(document){
               document.addEventListener('click', function handleClickOutsideBox(event) {
                    const userPhoneNumber_btn = document.querySelectorAll('.userPhoneNumber_btn')[0];
                    const panel = document.querySelectorAll('.userPanel')[0];

                    if(userPhoneNumber_btn && panel){
                         if(userPhoneNumber_btn.contains(event.target)) {
                              panel.style.display = "block"
                         }else{
                              panel.style.display = "none"
                         }
                    }
               });
          }
     }

     const { user, loading } = useSelector((state) => state.auth);
     const dispatch = useDispatch();
     const [userPanel, setUserPanel] = useState(false);
     const [isSmallScreenModal , setIsSmallScreenModal] = useState(false)

     return (
          <header className="flex relative  justify-between px-4 py-2 bg-gray-50 items-center z-10">
               {!user &&  <Login />}

               {/* Big Screen Menu */}
               <section className="hidden sm:flex  gap-x-6 ">
                    <BigScreenMenu customClassname={ "z-40 absolute mx-10 right-0 left-0 rounded-md top-14"}/>
               </section>

               {/* Mobile Menu Button  */}
               <section className="sm:hidden">
                    <button className="flex items-center justify-center p-2 bg-white" onClick={() => setIsSmallScreenModal(!isSmallScreenModal)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700" >
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    </button>
               </section>

               {/* User Panel */}
               <section className="w-full sm:w-fit flex justify-end relative ">
                    <Link href={'/cart'}>
                         <a className=" flex items-center justify-center ml-4 bg-white px-4 py-2 border border-gray-300 rounded-md text-xs font-sans text-gray-500"> 
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                              سبد خرید
                         </a>
                    </Link>
                    {user && user.account_type === 'normal' ? (
                         <>
                              <button onClick={() => handleUserPanel_btn()} className="userPhoneNumber_btn bg-white px-6 py-2 border border-gray-300 rounded-md text-xs font-sans text-gray-500 min-w-[121] max-w-[121]" >
                                   {toPersianDigits(user.phone_number_primary)}
                              </button>
                              <nav className={`bg-gray-50 rounded-b-md userPanel hidden absolute  top-[37px] left-0  whitespace-nowrap `} >
                                   <Link href={'/user/favorites'} >
                                        <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-2 text-center font-sans block">محبوب‌ها</a>
                                   </Link>
                                   <Link href={'/user/history'} >
                                        <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-2 text-center font-sans block">مشاهدات اخیر</a>
                                   </Link>
                                   <button onClick={() => { dispatch(userLogout())}} className="text-xs cursor-pointer hover:bg-red-100 px-6 font-bold text-red-600 w-full py-2 text-center font-sans ">
                                        خروج
                                   </button>
                              </nav>
                         </>
                    ) : user ? (
                         <>
                              <button onClick={() => handleUserPanel_btn()} className="userPhoneNumber_btn bg-white px-6 py-2 border border-gray-300 rounded-md text-xs font-sans text-gray-500 min-w-[121] max-w-[121]" >
                                   {toPersianDigits(user.phone_number_primary)}
                              </button>
                              <div className={`bg-white rounded-b-md   border overflow-hidden border-gray-300 border-t-0 userPanel hidden absolute  top-[32px] left-[0px]  whitespace-nowrap `}>
                                   {user.is_pending ? (
                                        <button onClick={()=>requestError({error : null , defaultMessage : ' فروشگاه شما در وضعیت "بررسی نشده" است. و پس از بررسی به پنل خود دسترسی خواهید داشت'})} className="text-xs min-w-[120px] max-w-[120px] cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">در حال بررسی</button>
                                   ) : (
                                        <nav>
                                             <Link href={`/${user.account_type}`} >
                                                  <a className="text-xs cursor-pointer min-w-[120px] max-w-[120px] hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">پنل مدیریت</a>
                                             </Link>
                                             <Link href={'/user/favorites'} >
                                                  <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-2 text-center font-sans block">محبوب‌ها</a>
                                             </Link>
                                             <Link href={'/user/history'} >
                                                  <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-2 text-center font-sans block">مشاهدات اخیر</a>
                                             </Link>
                                        </nav>
                                   )}
                                   <button onClick={()=> {dispatch(userLogout())}} className="min-w-[120px] max-w-[120px] text-xs cursor-pointer hover:bg-red-100  font-bold text-red-600 w-full py-2 text-center font-sans ">خروج</button>
                              </div>
                         </>
                    ) : (
                         <>
                              {loading ? (
                                   <button className="cursor-default bg-white px-4 py-2 border border-gray-300 rounded-md text-xs font-sans text-gray-500">...</button>
                              ) : ( 
                                   <button onClick={() => dispatch(authPanel({isOpen : true,type : "normal"}))} className="bg-white px-4 py-2 border border-gray-300 rounded-md text-xs font-sans text-gray-500">ورود / ثبت نام</button>
                              )}
                         </>
                    )}

               </section>

               {/* Small Screen Modal */}
               {isSmallScreenModal && <SmallScreenMenu isSmallScreenModal={isSmallScreenModal} setIsSmallScreenModal={setIsSmallScreenModal} />} 
          </header>
     );
};
export default Header;