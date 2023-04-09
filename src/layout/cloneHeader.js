import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import Login from "@/components/Login";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

    function disableScroll() {
        if(typeof window !== "undefined" && typeof document !== "undefined"){
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
            document.body.classList.add("stop-scrolling");
        }
    }
      
    function enableScroll() {
        if(typeof window !== "undefined" && typeof document !== "undefined"){
            window.onscroll = function() {};
            document.body.classList.remove("stop-scrolling");
        }

    }

    //! -----------------------User Panel---------------------------
    if(typeof document !== "undefined"){
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



            const searchPanel = document.getElementById('searchPanel');
            const divSearch = document.getElementById('divSearch');
            const inputSearch_input = document.getElementById('inputSearch_input');
            if(divSearch){
             //* اگر در قسمت جستجو کلیک کند 
            // * cursor اینپوت به آخرین رنج متن تغییر میکند
                if(divSearch.contains(event.target)){
                    inputSearch_input.focus()
                    const end = inputSearch_input.value.length;
                    inputSearch_input.setSelectionRange(end , end) 

                }
            //* اگر کاربر روی اینپوت و یا پنل جستجو کلیک کند پنل اینپوت را نشان میدهد
                if(divSearch.contains(event.target) || searchPanel.contains(event.target)) {
                    searchPanel.style.display = "flex"
                    searchPanel.style.opacity = "1";
                    disableScroll()
                }
            //* در غیر این صورت پنل جستجو را پنهان میکند
                else{
                    searchPanel.style.opacity = "0"
                    searchPanel.style.display = "none"
                    enableScroll()
                }


                if(divSearch.offsetWidth > 220){
                    searchPanel.style.width = `${divSearch.offsetWidth}px`
                }else{
                    searchPanel.style.width = `93%`
                }
            }
        });
    }
    //! -----------------------search Panel---------------------------
    if(typeof window !== "undefined"){
        window.onresize = () => {
            const searchPanel = document.getElementById('searchPanel');
            const divSearch = document.getElementById('divSearch');
            if(divSearch.offsetWidth > 220){
                searchPanel.style.width = `${divSearch.offsetWidth}px`
            }else{
                searchPanel.style.width = `93%`
            }
        }
    }



    const [inputValue , setInputValue] = useState(router?.query?.query || "")

    

    const changeInputValueHandler = (value) => {
        const inputSearch_input = document.getElementById('inputSearch_input');
        if(inputSearch_input.value.length === 0){
            divSearch.children[0].innerText = "جستجو"
        }else{
            divSearch.children[0].innerText = value
        }
        setInputValue(value)
    }

    useEffect(()=>{
        if(router?.query?.query) changeInputValueHandler(router?.query?.query)
    },[router])

     const onSubmit = (e) => {
        e.preventDefault()
        router.push({ pathname: "/search", query: { query: inputValue }})
        const searchPanel = document.getElementById('searchPanel');
        searchPanel.style.opacity = "0"
        searchPanel.style.display = "none"
     }


     return (
          <header className=" py-4 bg-gray-50  border-b border-gray-300 left-0 flex justify-center right-0 z-50 shadow-sm">
            <main className="w-full max-w-[1700px]   ">

               {/* //! Login => is Modal */}
               {!user && <Login />}

               {/* //! Header   */}
               <div className="flex flex-col sm:flex-row items-start  sm:justify-between sm:items-center px-4 ">

                    {/* //? Logo =>  */}
                    <section className="flex w-10/12 sm:w-fit items-center justify-end">
                         {categories && categories.length > 0 && (
                              // Menu Button
                              <button className="flex items-center lg:hidden ml-4 justify-center rounded-sm p-2 md:p-3 bg-white" onClick={() => setIsSmallScreenModal(!isSmallScreenModal)}>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                   </svg>
                              </button>
                         )}
                         <Link href={"/"}>
                              <a className="flex w-full  items-center justify-center z-20">
                                   <div className="w-11 md:w-12">
                                        <img className="w-full h-auto" src={images.src} alt="لوگو ترب"/>
                                   </div>
                                   <span className="text-[#d73948] font-iranyekan-bold text-[24px] font-iranyekan-regular mr-1">ترب</span>
                              </a>
                         </Link>
                    </section>
                    
                    <section className="w-full mt-4 sm:mt-0 flex justify-between">

                        {/* //! Div Search =>  */}
                            <div id="divSearch" className=" bg-gray-200 relative ml-4 sm:mr-6 placeholder:text-xs text-gray-600 sm:placeholder:text-sm pr-11 outline-none rounded-md  py-2 md:py-3 w-full sm:w-9/12 font-iranyekan-regular lg:w-[420px] px-4">
                                <span className="font-iranyekan-regular text-sm text-gray-500">جستجو</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2 md:top-3 right-3 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                {/*//! Search Panel */}
                                <form id="searchPanel" onSubmit={e => onSubmit(e)} method="get" className=" hidden w-[420px] bg-white absolute rounded-md z-20 right-[16px] sm:right-[184px] md:right-[196px] lg:right-[132px]">
                                    <input id="inputSearch_input" onChange={input => changeInputValueHandler(input.target.value) } name="title" className=" py-[10px] md:py-[14px] text-gray-600 placeholder:text-sm pr-11 outline-none rounded-md w-full text-sm font-iranyekan-regular px-4" value={inputValue} placeholder="جستجو" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-[8px] sm:top-[12px] right-3 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </form>
                            </div>


                        {/* <form onSubmit={formik.handleSubmit} method="get" className="w-full ml-4 relative sm:pr-6 flex justify-start items-center z-10">
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange } name="title" className="bg-gray-200 placeholder:text-xs text-gray-600 sm:placeholder:text-sm pr-11 outline-none rounded-md  py-2 md:py-3 w-full sm:w-9/12 font-iranyekan-regular lg:w-[420px] px-4" value={formik.values.title} placeholder="جستجو" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-3 sm:right-9 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </form> */}

                        {/* //? Cart & Login Button */}
                        <section className="w-fit flex justify-end  z-10">
                            {/* Cart Page */}
                            <Link href={'/cart'}>
                                <a className="py-2 md:py-3 h-fit px-4 bg-white border absolute top-4 sm:top-0 left-0  sm:relative border-gray-300 rounded-md ml-4 flex items-center ">
                                    {cart_count > 0 && <span className="absolute top-[-6px] right-[-6px] bg-red-600 font-iranyekan-regular text-xs  w-6 h-6 text-center flex items-center justify-center rounded-full text-white">{toPersianDigits(cart_count)}</span>}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </a>
                            </Link>
                            <section className="relative w-[123px]">
                                {/* Login Button => 0936...*/}
                                {user?.phone_number_primary && <button  className="w-full userPhoneNumber_btn whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white py-2 md:py-3  font-iranyekan-regular text-sm ">
                                    {toPersianDigits(user.phone_number_primary)}
                                </button>}
                                {user ? (
                                    <>
                                        {user?.account_type === 'normal' ? (
                                            <nav className={`w-full userPanel overflow-hidden bg-white border border-gray-300 border-t-0 rounded-b-md hidden absolute z-50 top-[34px] md:top-[42px] left-[0px]  whitespace-nowrap `}>
                                                <Link href={'/user/favorites'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">محبوب‌ها</a>
                                                </Link>
                                                <Link href={'/user/history'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">مشاهدات اخیر</a>
                                                </Link>
                                                <Link href={'/user/invoices'} >
                                                    <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">سفارشات</a>
                                                </Link>
                                                <button onClick={()=> {dispatch(userLogout()) ; dispatch(authPanel(false))}} className="text-xs cursor-pointer hover:bg-red-100 font-iranyekan-bold text-red-600 w-full py-2 text-center font-iranyekan-regular ">
                                                    خروج
                                                </button>
                                            </nav>
                                        ) : (
                                            <div className={`bg-white rounded-b-md   border overflow-hidden border-gray-300 border-t-0 userPanel hidden absolute top-[34px] md:top-[42px] w-full left-[0px]  whitespace-nowrap `}>
                                                {user.is_pending ? (
                                                    <nav className="w-ful">
                                                        <button onClick={()=>requestError({error : null , defaultMessage : ' فروشگاه شما در وضعیت "بررسی نشده" است. و پس از بررسی به پنل خود دسترسی خواهید داشت'})} className="text-xs w-full cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">پنل مدیریت</button>
                                                        <Link href={'/user/favorites'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">محبوب‌ها</a>
                                                        </Link>
                                                        <Link href={'/user/history'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">مشاهدات اخیر</a>
                                                        </Link>
                                                        <Link href={'/user/invoices'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">سفارشات</a>
                                                        </Link>
                                                    </nav>
                                                ) : (
                                                    <nav className="w-ful">
                                                        <Link href={`/${user.account_type}`} >
                                                            <a className="text-xs cursor-pointer  hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">پنل مدیریت</a>
                                                        </Link>
                                                        <Link href={'/user/favorites'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">محبوب‌ها</a>
                                                        </Link>
                                                        <Link href={'/user/history'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">مشاهدات اخیر</a>
                                                        </Link>
                                                        <Link href={'/user/invoices'} >
                                                            <a className="text-xs cursor-pointer hover:bg-gray-200 font-iranyekan-bold text-gray-700 py-2 text-center font-iranyekan-regular block">سفارشات</a>
                                                        </Link>
                                                    </nav>
                                                )}
                                                <button onClick={()=> {dispatch(userLogout())}} className="text-xs cursor-pointer hover:bg-red-100  font-iranyekan-bold text-red-600 w-full py-2 text-center font-iranyekan-regular ">خروج</button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {loading ? (
                                            <button className="w-full whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 py-2 md:py-3   text-sm">...</button>
                                        ) : (
                                            <button onClick={() => dispatch(authPanel({isOpen : true,type : "normal"}))} className="w-full whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white py-2 md:py-3  font-iranyekan-regular text-sm">ورود / ثبت نام</button>
                                        )}
                                    </>
                                )}

                            </section>
                        </section>
                    </section>
               </div>

               {/* //!  Menu For Big Screen  ==> */}
                <BigScreenMenu customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-[140px]"}/>

               {/* //!  Menu For Small Width - Responsive  ==> */}
               {isSmallScreenModal && <SmallScreenMenu customClassname="lg:hidden" isSmallScreenModal={isSmallScreenModal} setIsSmallScreenModal={setIsSmallScreenModal} />} 
            </main>
          </header>
     );
};
export default Header;
