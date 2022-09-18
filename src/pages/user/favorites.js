
import Layout from "@/layout/Layout";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";


const Favorites = () => {
    const {user} = useSelector(state => state.userSignup)
    return (  
        <Layout>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <aside className="hidden lg:flex min-w-[200px] max-w-[300px]  bg-white h-screen flex-col sticky top-0 bottom-0 overflow-y-auto">
                    <div className="py-3">
                        <Link href={'#'}>
                            <a className="flex items-center pr-6 py-2 hover:bg-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <span className="font-sans mr-2 text-gray-700 font-bold text-sm">تغییرات قیمت</span>
                            </a>
                        </Link>
                        <Link href={'#'}>
                            <a className="flex items-center pr-6 py-2 hover:bg-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <span className="font-sans mr-2 text-gray-700 font-bold text-sm">محبوب‌ها</span>
                            </a>
                        </Link>
                        <Link href={'#'}>
                            <a className="flex items-center pr-6 py-2 hover:bg-gray-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-sans mr-2 text-gray-700 font-bold text-sm">مشاهدات اخیر</span>
                            </a>
                        </Link>
                    </div>

                    <hr/>

                    <div className="flex py-3 flex-col">
                        <Link href={"#"}>
                            <a className="text-gray-700 font-sans pr-6 text-sm py-2 hover:bg-gray-50">لیست فروشگاه‌های ترب</a>
                        </Link>
                        <Link href={"#"}>
                            <a className="text-gray-700 font-sans pr-6 text-sm py-2 hover:bg-gray-50">ثبت نام فروشگاه</a>
                        </Link>
                    </div>

                    <hr/>

                    <section className="py-3">
                        {/* //? پیگیری سفارش */}
                        <div className=" cursor-pointer relative hover:bg-gray-50">
                            <input type="checkbox" id="tracking_checkBox" className="peer hidden"/>
                            {/* //? Button */}
                            <label htmlFor="tracking_checkBox" className="pr-6 py-2   flex items-center cursor-pointer">
                                <span className="font-sans text-sm text-gray-700">پیگیری سفارش</span>
                            </label>
                            <svg className="w-4 h-4 peer-checked:rotate-[-90deg] absolute top-[15px] right-[5px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            {/* //? Content */}
                            <section className="hidden flex-col peer-checked:flex">
                                <Link href={"#"}>
                                    <a className="text-xs text-gray-700 font-sans pr-9  py-2 hover:bg-gray-200">لیست فروشگاه‌های ترب</a>
                                </Link>
                                <Link href={"#"}>
                                    <a className="text-xs text-gray-700 font-sans pr-9  py-2 hover:bg-gray-200">ثبت نام فروشگاه</a>
                                </Link>
                            </section>
                        </div>

                        {/* //? راهنمایی و شرایط */}
                        <div className=" cursor-pointer relative hover:bg-gray-50">
                            <input type="checkbox" id="guidance_checkBox" className="peer hidden"/>
                            {/* //? Button */}
                            <label htmlFor="guidance_checkBox" className="pr-6 py-2   flex items-center cursor-pointer">
                                <span className="font-sans text-sm text-gray-700">راهنمایی و شرایط</span>
                            </label>
                            <svg className="w-4 h-4 peer-checked:rotate-[-90deg] absolute top-[15px] right-[5px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            {/* //? Content */}
                            <section className="hidden flex-col peer-checked:flex">
                                <Link href={"#"}>
                                    <a className="text-gray-700 font-sans pr-9 text-xs py-2 hover:bg-gray-200">راهنمای خرید امن</a>
                                </Link>
                                <Link href={"#"}>
                                    <a className="text-gray-700 font-sans pr-9 text-xs py-2 hover:bg-gray-200">قوانین و مقررات</a>
                                </Link>
                                <Link href={"#"}>
                                    <a className="text-gray-700 font-sans pr-9 text-xs py-2 hover:bg-gray-200">حریم خصوصی</a>
                                </Link>
                            </section>
                        </div>

                        <div className="flex flex-col">
                            <Link href={"#"}>
                                <a className="text-gray-700  font-sans pr-6 text-sm py-2 hover:bg-gray-50">لیست فروشگاه‌های ترب</a>
                            </Link>
                            <Link href={"#"}>
                                <a className="text-gray-700 font-sans pr-6 text-sm py-2 hover:bg-gray-50">ثبت نام فروشگاه</a>
                            </Link>
                        </div>

                    </section>

                    <hr/>

                   {user && user.phone_number &&  (
                        <Link href={'#'}>
                            <a className="py-3 mt-3 pr-4 hover:bg-red-50">
                                <p className="font-sans text-sm text-gray-700">خروج از حساب کاربری</p>
                                <p className="font-sans mt-2 text-sm text-gray-700">{toPersianDigits(user && user.phone_number && user.phone_number)}</p>
                            </a>
                        </Link>
                   )}

                </aside>

                <section className="w-full flex-0 h-max px-4 "> 
                    Index
                </section>
            </div>
        </Layout>
    );
}
 
export default Favorites;