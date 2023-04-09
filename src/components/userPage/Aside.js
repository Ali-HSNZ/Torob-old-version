import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "src/redux/user/userActions";

const UserPageAside = ({isMobileScreen,setIsMobileScreen,mobileScreenClassName}) => {
     const { user } = useSelector((state) => state.auth);

     const router = useRouter();
     const dispatch = useDispatch();

     return (
          <aside className={`${mobileScreenClassName ? mobileScreenClassName : "w-1/5"}   h-screen bg-white ${isMobileScreen ? "lg:hidden" : "hidden"} sticky top-0 lg:flex flex-col overflow-y-auto`}>
               {isMobileScreen && (
                    <section>
                         <div className="px-4 mt-6 flex w-full">
                              <button onClick={() => setIsMobileScreen(false)}>
                                   <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                              </button>
                              <h6 className="text-sm  text-center w-full font-iranyekan-regular text-gray-800 ">منو</h6>
                         </div>
                         <hr className="mt-5" />
                    </section>
               )}

               <nav className="py-2">
                    <Link href={"/user/favorites"}>
                         <a className={` flex items-center pr-8 py-3 ${ router.pathname === "/user/favorites" ? "bg-red-50 text-red-600 ": "text-gray-800 hover:bg-gray-50 "}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 " >
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                              </svg>
                              <span className="font-iranyekan-regular mr-2  font-iranyekan-bold text-sm ">محبوب‌ها</span>
                         </a>
                    </Link>
                    <Link href={"/user/history"}>
                         <a className={` flex items-center pr-8 py-3 ${router.pathname === "/user/history" ? "bg-red-50 text-red-600 ": "text-gray-800 hover:bg-gray-50 "}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                              <span className="font-iranyekan-regular mr-2  font-iranyekan-bold text-sm ">مشاهدات اخیر</span>
                         </a>
                    </Link>
                    <Link href={"/user/invoices"}>
                         <a className={` flex items-center pr-8 py-3 ${router.pathname === "/user/invoices" ? "bg-red-50 text-red-600 ": "text-gray-800 hover:bg-gray-50 "}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                              <span className="font-iranyekan-regular mr-2  font-iranyekan-bold text-sm ">سفارشات</span>
                         </a>
                    </Link>
               </nav>
               <hr className="mt-2"/>

               <nav className="flex py-2 flex-col">
                    <Link href={"/signup/store"}>
                         <a className="text-gray-700 font-iranyekan-regular pr-8 text-sm py-3 hover:bg-gray-50">ثبت نام فروشگاه</a>
                    </Link>
               </nav>

               <hr />

               {user && user.phone_number_primary && (
                    <button onClick={() => dispatch(userLogout())} className="text-gray-700 text-right font-iranyekan-regular pr-8 text-sm py-3 hover:bg-gray-50 mt-2">
                         خروج از حساب کاربری      
                    </button>
               )}
          </aside>
     );
};
export default UserPageAside;