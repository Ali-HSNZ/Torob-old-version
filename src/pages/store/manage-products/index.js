import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import ManageStoreAside from "@/components/Panel_Menu/StorePanelMenu";
import { BsFillCaretLeftFill } from 'react-icons/bs';
import Link from "next/link";
import { useSelector } from "react-redux";
import { fetchStoreCountFailure, fetchStoreCountSuccess } from "@/redux/manage-store/manageStore/manageStore_actions";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";

const ManageStore = () => {
    const [isAsideModal , setIsAsideModal] = useState(false)
    const {data , loading} = useSelector(state => state.manage_store.mainDataCount)
    
    return (  
        <Layout isFooter={true} pageTitle="پنل فروشگاه | مدیریت محصولات">
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <ManageStoreAside/>

                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><ManageStoreAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>
                    <div className="flex justify-between w-full items-center mt-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-iranyekan-bold text-lg text-gray-800">مدیریت محصولات</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            {/* Home SVG */}
                            <Link href={'/store'}>
                                <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <section className="w-full pb-4">
                        <nav className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            <Link href={'/store/manage-products/store-products'}>
                                <a className="cursor-pointer py-4 hover:bg-blue-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-blue-200 bg-blue-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-blue-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                        </svg>
                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-iranyekan-bold text-gray-800">{loading ? "..." : toPersianDigits(data && data.products || 0)} کالا</h2>
                                        <span className="font-iranyekan-regular text-xs text-gray-500">ویرایش | حذف | جستجو</span>
                                    </div>
                                    <div className="h-full flex items-center ml-1">
                                        <BsFillCaretLeftFill className="text-blue-400 "/>
                                    </div>
                                </a>
                            </Link>

                            <Link href={'/store/manage-products/insert'}>
                                <a className="cursor-pointer py-4 hover:bg-green-50 flex items-center justify-between rounded-xl bg-white shadow-md overflow-hidden">
                                    <div className="flex h-12 mr-4 w-[67px]  items-center justify-center rounded-full border border-green-200 bg-green-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-green-700">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                        </svg>
                                    </div>
                                    <div className="mr-4 w-full">
                                        <h2 className="font-iranyekan-bold text-gray-800">ثبت کالا</h2>
                                        <span className="font-iranyekan-regular text-xs text-gray-500">ثبت </span>
                                    </div>
                                    <div className="h-full flex items-center ml-1">
                                        <BsFillCaretLeftFill className="text-green-400 "/>
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
     if(ErrorCode === 403){return{notFound : true}}

    // Fetch SearchBar Data With User Token
    await http.get(`public/searchbar`,{headers : {authorization : token}})
    .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
    .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
          
     // Fetch Data Count
     await http.get(`store/counter` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchStoreCountSuccess(data.count)))
     .catch(error => dispatch(fetchStoreCountFailure("خطا در بخش گرفتن تعداد کالا ها")))

     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))     
 })