import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import ManageStoreAside from "@/components/manageStore/storeAside";
import { BsFillCaretLeftFill } from 'react-icons/bs';
import Link from "next/link";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";
import { useSelector } from "react-redux";

const ManageStore = () => {
    const [isAsideModal , setIsAsideModal] = useState(false)
    const auth = useSelector(state => state.auth)
    console.log("auth : ",auth);
    return (  
        <Layout isFooter={true} pageTitle="پنل فروشگاه ترب">
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <ManageStoreAside/>

                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><ManageStoreAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>
                    <section className="w-full ">
                        <p className="mt-6 text-1xl font-sans">فروشگاه {auth?.user?.store_name ?? "نامشخص"}</p>
                        <nav className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

                            <Link href={'/store/manage-products'}>
                                <a className="cursor-pointer py-4 hover:bg-blue-50 flex items-center justify-between rounded-xl bg-white shadow-lg overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                        </svg>
                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-sans font-bold text-gray-800"> مدیریت محصولات</h2>
                                        <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                    </div>
                                    <div className="h-full flex items-center ml-1">
                                        <BsFillCaretLeftFill className="text-blue-400 "/>
                                    </div>
                                </a>
                            </Link>

                            <Link href={'/store/manage-factors'}>
                                <a className="cursor-pointer py-4 hover:bg-green-50 flex items-center justify-between rounded-xl bg-white shadow-lg overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-green-200 bg-green-50">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-sans font-bold text-gray-800"> سفارشات</h2>
                                        <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                    </div>
                                    <div className="h-full flex items-center ml-1">
                                        <BsFillCaretLeftFill className="text-green-400 "/>
                                    </div>
                                </a>
                            </Link>

                            <Link href={'/store/settings'}>
                                <a className="cursor-pointer py-4 hover:bg-pink-50 flex items-center justify-between rounded-xl bg-white shadow-lg overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-pink-200 bg-pink-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-pink-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-sans font-bold text-gray-800"> تنظیمات</h2>
                                        <span className="font-sans text-xs text-gray-500">ویرایش | ثبت | حذف | جستجو</span>
                                    </div>
                                    <div className="h-full flex items-center ml-1">
                                        <BsFillCaretLeftFill className="text-pink-400 "/>
                                    </div>
                                </a>
                            </Link>

                            <Link href={'/store/change-password'}>
                                <a className="cursor-pointer py-4 hover:bg-yellow-50 flex items-center justify-between rounded-xl bg-white shadow-lg overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-yellow-200 bg-yellow-50">
                                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-yellow-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                        </svg>
                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-sans font-bold text-gray-800"> تغییر رمز عبور</h2>
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
export default ManageStore;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {
    // Check Permission
    const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
        
    let ErrorCode = 0;
    if(token.includes("undefined")) return {notFound : true}

    // Fetch User Data     
    await http.get("user", {headers : {authorization : token}})
    .then(({data}) =>  {
        if(data.user.account_type !== 'store') ErrorCode = 403
        if(data.user.is_pending === true ) ErrorCode = 403;
        else {
            dispatch(cartDetails(data))
            dispatch(authSuccess(data.user))
        }
    })  
    .catch(() => {
        ErrorCode = 403
        dispatch(authFailure("خطا در بخش احراز هویت"))    
    })

    // Fetch SearchBar Data With User Token
    await http.get(`public/searchbar`,{headers : {authorization : token}})
    .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
    .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

    if(ErrorCode === 403){return{notFound : true}}
        

    // Fetch Categories
    await http.get(`public/categories`)
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})