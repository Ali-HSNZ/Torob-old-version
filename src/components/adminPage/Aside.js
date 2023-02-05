import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiCategory } from 'react-icons/bi';
import { TbBrandAsana } from 'react-icons/tb';
import { useSelector } from "react-redux";

const AdminPageAside = ({isMobileScreen , setIsMobileScreen  , mobileScreenClassName }) => {

    const router = useRouter()
    const {user} = useSelector(state => state.auth)


     return (  
          <aside className={`${mobileScreenClassName ?? "w-1/5"}   h-screen bg-white ${isMobileScreen ? "lg:hidden" : "hidden"} sticky top-0 lg:flex flex-col overflow-y-auto`}>
               
               {isMobileScreen && (
                    <section>
                         <div className="px-4 mt-6 flex w-full">
                              <button onClick={()=> setIsMobileScreen(false)}>
                                   <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                              </button>
                              <h6 className="text-sm  text-center w-full font-sans text-gray-800 ">منو</h6>
                         </div>
                         <hr className="mt-5"/>
                    </section>
               )}

               <nav className="py-3">

                    <Link href={'/admin'}>
                         <a  className={` ${router.pathname === '/admin' ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">داشبورد</span>
                         </a>
                    </Link>

                    <Link href={'/admin/manage-users'}>
                         <a  className={` ${router.asPath.startsWith('/admin/manage-users') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت کاربران</span>
                         </a>
                    </Link>
                    
                    <Link href={'/admin/manage-products'}>
                         <a className={` ${router.asPath.startsWith('/admin/manage-products') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت محصولات</span>
                         </a>
                    </Link>
                    

                    <Link href={'/admin/manage-category'}>
                         <a className={` ${router.asPath.startsWith('/admin/manage-category') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <BiCategory className="h-6 w-6 text-gray-900"/>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت دسته‌بندی</span>
                         </a>
                    </Link>


                    <Link href={'/admin/manage-brands'}>
                         <a className={` ${router.asPath.startsWith('/admin/manage-brand') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <TbBrandAsana className="h-6 w-6 text-gray-900"/>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت برند</span>
                         </a>
                    </Link>


                    <Link href={'/admin/manage-stores'}>
                         <a className={` ${router.asPath.startsWith('/admin/manage-stores') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت فروشگاه‌ها</span>
                         </a>
                    </Link>

                    <Link href={'/admin/change-password'}>
                         <a className={` ${router.asPath.startsWith('/admin/change-password') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">تغییر رمز عبور</span>
                         </a>
                    </Link>

                    <Link href={'/admin/messages'}>
                         <a className={` ${router.asPath.startsWith('/admin/messages') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>

                            <span className="font-sans mr-2 font-bold text-sm text-gray-900">اطلاعیه ها</span>
                            <span className="font-sans text-xs relative bottom-1 right-[2px] text-gray-900">({toPersianDigits(user?.notifications_count || 0)})</span>
                            
                         </a>
                    </Link>


               </nav>
          </aside>
     );
}
 
export default AdminPageAside;