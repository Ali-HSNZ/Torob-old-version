import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import AdminPageAside from "@/components/adminPage/Aside";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { TbBrandAsana } from 'react-icons/tb';
import Link from "next/link";
import { useSelector } from "react-redux";
import { fetchAdminCountFailure, fetchAdminCountSuccess } from "@/redux/admin/admin_dataCount/admin_dataCountActions";
import http, { returnTokenInServerSide } from "src/services/http";
import { wrapper } from "@/redux/store";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { addToCartSuccess } from "@/redux/cart/cart/cartActions";

const AdminPage = () => {
     const [isAsideModal , setIsAsideModal] = useState(false)
     const {data , loading} = useSelector(state => state.admin_dataCount)

     return (  
          <Layout isFooter={true} pageTitle="پنل مدیریت ترب">
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <AdminPageAside/>

                    <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                         <Modal open={isAsideModal || false} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                         <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                         </Modal>
                         <section className="w-full ">

                         <nav className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pb-4">
                              <Link  href={'/admin/manage-users'}>
                                   <a className="cursor-pointer py-4 hover:bg-orange-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px] items-center justify-center rounded-full border border-orange-200 bg-orange-50">
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                             </svg>
                                        </div>
                                        <div className="mr-4 w-full ">
                                             <h2 className="font-sans font-bold">{loading ? "..." : toPersianDigits(data && data.users || 0)} کاربر</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-orange-400 "/>
                                        </div>
                                   </a>
                              </Link> 
                              <Link href={'/admin/manage-products'}>
                                   <a className="cursor-pointer py-4 hover:bg-blue-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-700">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                             </svg>
                                        </div>
                                        <div className="mr-4 w-full">
                                             <h2 className="font-sans font-bold">{loading ? "..." : toPersianDigits(data && data.products || 0)} کالا</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-blue-400 "/>
                                        </div>
                                   </a>
                              </Link>
                              <Link href={'/admin/manage-brands'}>
                                   <a className="cursor-pointer py-4 hover:bg-pink-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-pink-200 bg-pink-50">
                                             <TbBrandAsana className="h-6 w-6 text-pink-700"/>
                                        </div>
                                        <div className="mr-4 w-full">
                                             <h2 className="font-sans font-bold">{loading ? "..." : toPersianDigits(data && data.brands || 0)} برند</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-pink-400 "/>
                                        </div>
                                   </a>
                              </Link>
                              <Link href={'/admin/manage-category'}>
                                   <a className="cursor-pointer py-4 hover:bg-purple-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-purple-200 bg-purple-50">
                                             <BiCategory className="h-6 w-6 text-purple-700"/>
                                        </div>
                                        <div className="mr-4 w-full">
                                             <h2 className="font-sans font-bold">{loading ? "..." : toPersianDigits(data && data.categories || 0)} دسته بندی</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-purple-400 "/>
                                        </div>
                                   </a>
                              </Link>
                              <Link href={'/admin/manage-stores'}>
                                   <a className="cursor-pointer py-4 hover:bg-red-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-red-200 bg-red-50">
                                             <svg   className="h-6 w-6 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                                             </svg>
                                        </div>
                                        <div className="mr-4 w-full">
                                             <h2 className="font-sans font-bold">{loading ? "..." : toPersianDigits(data && data.stores || 0)} فروشگاه</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش | حذف | جستجو</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-red-400 "/>
                                        </div>
                                   </a>
                              </Link>
                              <Link href={'/admin/change-password'}>
                                   <a className="cursor-pointer py-4 hover:bg-yellow-50 flex items-center justify-between rounded-xl bg-white shadow-lg overflow-hidden">
                                        <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-yellow-200 bg-yellow-50">
                                             <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-yellow-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                             </svg>
                                        </div>
                                        <div className="mr-4 w-full">
                                             <h2 className="font-sans font-bold"> تغییر رمز عبور</h2>
                                             <span className="font-sans text-xs text-gray-500">ویرایش</span>
                                        </div>
                                        <div className="h-full flex items-center ml-1">
                                             <BsFillCaretLeftFill className="text-yellow-400 "/>
                                        </div>
                                   </a>
                              </Link>
                         </nav>
                         </section>
                    </section>
               </div>
          </Layout>
     );
}
export default AdminPage;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {

    // Check Permission
    const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie , key : "userToken"});
     
    let ErrorCode = 0;
    if(!token) return {notFound : true}

    // Fetch User Data     
     await http.get("user", {headers : {authorization : token}})
     .then(({data}) =>  {
          if(data.user.account_type !== 'admin') ErrorCode = 403; 
          else {
               dispatch(addToCartSuccess(data))
               dispatch(authSuccess(data.user))
          }
     })  
     .catch(() => {
          ErrorCode = 403
          dispatch(authFailure("خطا در بخش احراز هویت"))    
     })

    if(ErrorCode === 403){return{notFound : true}}
     
    // Fetch Data Count
     await http.get(`admin/counter` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchAdminCountSuccess(data.count)))
     .catch(() => dispatch(fetchAdminCountFailure("خطای سرور در بخش گرفتن تعداد داده ها")))

     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
    
     return { props : {}}
})