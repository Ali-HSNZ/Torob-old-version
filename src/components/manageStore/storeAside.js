import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ManageStoreAside = ({isMobileScreen , setIsMobileScreen  , mobileScreenClassName }) => {

     const router = useRouter()

     const {user} = useSelector(state => state.auth)

     return (  
          <aside className={`${mobileScreenClassName ? mobileScreenClassName : "w-1/5"}   h-screen bg-white ${isMobileScreen ? "lg:hidden" : "hidden"} sticky top-0 lg:flex flex-col overflow-y-auto`}>
               
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

                    <Link href={'/store'}>
                         <a  className={` ${router.pathname === '/store' ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-4 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">داشبورد</span>
                         </a>
                    </Link>

                    <Link href={'/store/manage-products'}>
                         <a  className={` ${router.asPath.startsWith('/store/manage-products') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-4 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت محصولات</span>
                         </a>
                    </Link>
                    

                    <Link href={'/store/manage-factors'}>
                         <a className={` ${router.asPath.startsWith('/store/manage-factors') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-4 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت سفارشات</span>
                         </a>
                    </Link>

                    <Link href={'/store/change-password'}>
                         <a className={` ${router.asPath.startsWith('/store/change-password') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-4 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">تغییر رمز عبور</span>
                         </a>
                    </Link>

                    <Link href={'/store/settings'}>
                         <a className={` ${router.asPath.startsWith('/store/setting') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-4 py-3 hover:bg-gray-100`}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="font-sans mr-2 font-bold text-sm text-gray-900">تنظیمات</span>
                         </a>
                    </Link>

               </nav>

          </aside>
     );
}
 
export default ManageStoreAside;