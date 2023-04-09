import BigScreenMenu from "@/layout/DesktopMenu";
import SmallScreenMenu from "@/layout/MobileMenu";
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
     const {cart_count} = useSelector(state => state.cart)

     const dispatch = useDispatch();
     const [userPanel, setUserPanel] = useState(false);
     const [isSmallScreenModal , setIsSmallScreenModal] = useState(false)

     return (
          <header className="flex relative  justify-between px-4 py-2 bg-gray-50 items-center z-10">
               {!user &&  <Login />}

               {/* Big Screen Menu */}
               <section className="hidden sm:flex items-center gap-x-6 ">
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
               <section className="w-full sm:w-fit flex justify-end  ">
                    {/* Cart */}
                    <Link href={'/cart'}>
                         <a className="relative flex items-center justify-center ml-4 bg-white px-4 py-2 border border-gray-300 rounded-md text-xs font-iranyekan-regular text-gray-700"> 
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                              </svg>
                              سبد خرید
                              {cart_count > 0 && <span className="absolute top-[-6px] right-[-6px] bg-red-600 font-iranyekan-regular text-xs w-6 h-6 text-center flex items-center justify-center rounded-full text-white">{toPersianDigits(cart_count)}</span>}

                         </a>
                    </Link>
                    <section className="relative w-[123px]">

                        {user?.phone_number_primary && <button onClick={() => handleUserPanel_btn()} className="w-full userPhoneNumber_btn bg-white  py-2 border border-gray-300 rounded-md text-xs font-iranyekan-regular text-gray-700 " >
                            {toPersianDigits(user?.phone_number_primary)}
                        </button>}

                        {user ? (
                            <>
                                {user?.account_type === 'normal' ? (
                                    <nav className={`bg-white rounded-b-md border overflow-hidden border-gray-300 border-t-0 userPanel hidden absolute w-full top-[30px] left-[0px]  whitespace-nowrap `} >
                                        <Link href={'/user/favorites'} >
                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">محبوب‌ها</a>
                                        </Link>
                                        <Link href={'/user/history'} >
                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">مشاهدات اخیر</a>
                                        </Link>
                                        <Link href={'/user/invoices'} >
                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">سفارشات</a>
                                        </Link>
                                        <button onClick={() => {dispatch(userLogout())}} className="text-xs cursor-pointer  hover:bg-red-100 px-6 font-iranyekan-bold text-red-700 w-full py-2 text-center ">
                                            خروج
                                        </button>
                                    </nav>
                                ) : (
                                    <div className={`bg-white rounded-b-md   border overflow-hidden border-gray-300 border-t-0 userPanel hidden absolute  top-[30px] w-full left-[0px]  whitespace-nowrap `}>
                                        {user?.is_pending ? (
                                            <nav className="w-full">
                                                <button onClick={()=>requestError({error : null , defaultMessage : ' فروشگاه شما در وضعیت "بررسی نشده" است. و پس از بررسی به پنل خود دسترسی خواهید داشت.'})} className="text-xs w-full cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">پنل مدیریت</button>
                                                <Link href={'/user/favorites'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">محبوب‌ها</a>
                                                </Link>
                                                <Link href={'/user/history'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">مشاهدات اخیر</a>
                                                </Link>
                                                <Link href={'/user/invoices'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">سفارشات</a>
                                                </Link>
                                            </nav>
                                        ) : (
                                            <nav className="w-full">
                                                <Link href={`/${user.account_type}`} >
                                                    <a className="text-xs cursor-pointer  hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">پنل مدیریت</a>
                                                </Link>
                                                <Link href={'/user/favorites'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">محبوب‌ها</a>
                                                </Link>
                                                <Link href={'/user/history'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">مشاهدات اخیر</a>
                                                </Link>
                                                <Link href={'/user/invoices'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center block">سفارشات</a>
                                                </Link>
                                            </nav>
                                        )}
                                        <button onClick={()=> {dispatch(userLogout())}} className="w-full text-xs cursor-pointer hover:bg-red-100  font-iranyekan-bold text-red-600 py-2 text-center ">خروج</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {loading ? (
                                    <button className="cursor-default bg-white px-4 py-2 border border-gray-300 rounded-md text-xs w-full font-iranyekan-regular text-gray-700">...</button>
                                ) : ( 
                                    <button onClick={() => dispatch(authPanel({isOpen : true,type : "normal"}))} className="bg-white px-4 py-2 w-full border border-gray-300 rounded-md text-xs font-iranyekan-regular text-gray-700">ورود / ثبت نام</button>
                                )}
                            </>
                        )}

                    </section>

               </section>

               {/* Small Screen Modal */}
               {isSmallScreenModal && <SmallScreenMenu isSmallScreenModal={isSmallScreenModal} setIsSmallScreenModal={setIsSmallScreenModal} />} 
          </header>
     );
};
export default Header;