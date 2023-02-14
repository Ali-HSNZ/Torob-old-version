import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import Login from "@/components/Login";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout, authPanel } from "src/redux/user/userActions";
import { requestError } from "src/services/http";
import images from "/public/torob_logo.svg"

const Header = () => {

     const router = useRouter();
     const { user, loading } = useSelector((state) => state.auth);
     const dispatch = useDispatch();
     const {cart_count} = useSelector(state => state.cart)
     
     const [isSmallScreenModal , setIsSmallScreenModal] = useState(false)

     const {categories} = useSelector(state => state.categories)

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

     const onSubmit = ({title}) => {
          router.push({ pathname: "/search", query: { query: title }})
     }
     const formik = useFormik({
          onSubmit,
          enableReinitialize : true,
          initialValues : {
               title : router.query.query || ""
          }
     })

     return (
          <header className=" py-4 bg-gray-50  border-b border-gray-300 left-0 flex justify-center right-0 z-50 shadow-sm">
            <main className="w-full max-w-[1700px]   ">
               {/* Login is Modal */}
               {!user && <Login />}

               {/* Header   */}
               <div className="flex justify-between items-center px-4 ">

                    {/* //? Logo =>  */}
                    <section className="flex items-center justify-end">
                         {categories && categories.length > 0 && (
                              // Menu Button
                              <button className="flex items-center lg:hidden ml-4 justify-center p-2 bg-white" onClick={() => setIsSmallScreenModal(!isSmallScreenModal)}>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                   </svg>
                              </button>
                         )}
                         <Link href={"/"}>
                              <a className="flex items-center justify-center z-20">
                                   <div className="w-11 md:w-12">
                                        <img className="w-full h-auto" src={images.src} alt="لوگو ترب"/>
                                   </div>
                                   <span className="text-[#d73948] font-bold text-[24px] font-sans mr-1">ترب</span>
                              </a>
                         </Link>
                    </section>

                    {/* //? Input Search =>  */}
                    <form onSubmit={formik.handleSubmit} method="get" className="w-full hidden lg:pr-6 sm:flex sm:justify-center lg:justify-start items-center z-10">
                         <input onBlur={formik.handleBlur} onChange={formik.handleChange } name="title" className="bg-white outline-none rounded-r-md text-gray-800 w-1/2 py-2 lg:py-3 sm:w-9/12 font-sans border lg:w-[420px] border-gray-300 px-4" value={formik.values.title} placeholder="نام کالا را وارد کنید" />
                         <button type={"submit"} className="bg-[#d73948] py-2 lg:py-3 px-5 rounded-l-md">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>
                         </button>
                    </form>
                    {/* //? Cart & Login Button */}
                    <section className="w-full sm:w-fit flex justify-end relative z-10">
                         {/* Cart Page */}
                         <Link href={'/cart'}>
                              <a className="py-2 px-4 bg-white border relative border-gray-300 rounded-md ml-4 flex items-center ">
                              {/* cart Count */}
                              {cart_count > 0 && <span className="absolute top-[-6px] right-[-6px] bg-red-600 font-sans text-xs  w-6 h-6 text-center flex items-center justify-center rounded-full text-white">{toPersianDigits(cart_count)}</span>}
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                   </svg>
                              </a>
                         </Link>
                         <section className="relative w-[123px]">
                            {/* Login Button => 0936... */}
                            {user?.phone_number_primary && <button onClick={() => handleUserPanel_btn()} className="w-full userPhoneNumber_btn whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white md:py-3 py-2 font-sans text-sm ">
                                {toPersianDigits(user.phone_number_primary)}
                            </button>}
                            {user ? (
                                <>
                                    {user?.account_type === 'normal' ? (
                                        <nav className={`w-full userPanel overflow-hidden bg-white border border-gray-300 border-t-0 rounded-b-md hidden absolute z-50 top-[34px] md:top-[42px] left-[0px]  whitespace-nowrap `}>
                                            <Link href={'/user/favorites'} >
                                                <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">محبوب‌ها</a>
                                            </Link>
                                            <Link href={'/user/history'} >
                                                <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">مشاهدات اخیر</a>
                                            </Link>
                                            <Link href={'/user/invoices'} >
                                                <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">سفارشات</a>
                                            </Link>
                                            <button onClick={()=> {dispatch(userLogout()) ; dispatch(authPanel(false))}} className="text-xs cursor-pointer hover:bg-red-100 font-bold text-red-600 w-full py-2 text-center font-sans ">
                                                خروج
                                            </button>
                                        </nav>
                                    ) : (
                                        <div className={`bg-white rounded-b-md   border overflow-hidden border-gray-300 border-t-0 userPanel hidden absolute top-[34px] md:top-[42px] w-full left-[0px]  whitespace-nowrap `}>
                                            {user.is_pending ? (
                                                <nav className="w-ful">
                                                    <button onClick={()=>requestError({error : null , defaultMessage : ' فروشگاه شما در وضعیت "بررسی نشده" است. و پس از بررسی به پنل خود دسترسی خواهید داشت'})} className="text-xs min-w-[120px] max-w-[120px] cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">پنل مدیریت</button>
                                                    <Link href={'/user/favorites'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">محبوب‌ها</a>
                                                    </Link>
                                                    <Link href={'/user/history'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">مشاهدات اخیر</a>
                                                    </Link>
                                                    <Link href={'/user/invoices'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">سفارشات</a>
                                                    </Link>
                                                </nav>
                                            ) : (
                                                <nav className="w-ful">
                                                    <Link href={`/${user.account_type}`} >
                                                        <a className="text-xs cursor-pointer  hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">پنل مدیریت</a>
                                                    </Link>
                                                    <Link href={'/user/favorites'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">محبوب‌ها</a>
                                                    </Link>
                                                    <Link href={'/user/history'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">مشاهدات اخیر</a>
                                                    </Link>
                                                    <Link href={'/user/invoices'} >
                                                        <a className="text-xs cursor-pointer hover:bg-gray-200 font-bold text-gray-700 py-2 text-center font-sans block">سفارشات</a>
                                                    </Link>
                                                </nav>
                                            )}
                                            <button onClick={()=> {dispatch(userLogout())}} className="text-xs cursor-pointer hover:bg-red-100  font-bold text-red-600 w-full py-2 text-center font-sans ">خروج</button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {loading ? (
                                        <button className="w-full whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2  text-sm">...</button>
                                    ) : (
                                        <button onClick={() => handleUserPanel_btn() & dispatch(authPanel({isOpen : true,type : "normal"}))} className="w-full whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white  md:py-3 py-2 font-sans text-sm">ورود / ثبت نام</button>
                                    )}
                                </>
                            )}

                         </section>
                    </section>
               </div>

               {/*  Mobile Search Input For Medium With =>  */}
               <form onSubmit={formik.handleSubmit} method="get" className="w-full flex sm:hidden px-4 sm:px-8 mt-4 sm:justify-center items-center">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange } name="title" className="bg-white text-gray-700 rounded-r-md outline-none w-full py-2  font-sans border  border-gray-300 px-4" value={formik.values.title}  placeholder="نام کالا را وارد کنید"/>
                    <button type="submit" className="bg-[#d73948] py-2 px-5 rounded-l-md  ">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                         </svg>
                    </button>
               </form>


               {/* //?  Menu For Big Screen  ==> */}
                <BigScreenMenu customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-[140px]"}/>

               {/* //?  Menu For Small Width - Responsive  ==> */}
               {isSmallScreenModal && <SmallScreenMenu customClassname="lg:hidden" isSmallScreenModal={isSmallScreenModal} setIsSmallScreenModal={setIsSmallScreenModal} />} 
            </main>
          </header>
     );
};
export default Header;