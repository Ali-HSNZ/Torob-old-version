import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { cartDetails } from '@/redux/cart/cart/cartActions'
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from '@/redux/categories/categoriesActions'
import { wrapper } from '@/redux/store'
import ReactLoading from "react-loading";
import { authFailure, authRequest, authSuccess } from '@/redux/user/userActions'
import { deleteUserSearch, fetchSearchDataFailure, fetchSearchDataSuccess, fetchUserSearchSuggested } from '@/redux/userSearch/userSaerch_actions'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import http, { returnTokenInServerSide } from 'src/services/http'
import Link from 'next/link'
import torob_logo from '/public/torob_logo.svg'
//! ====Swiper====>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode , Navigation} from "swiper";
import "swiper/css/free-mode";
//! <====Swiper====

export default function Home(){
    const searchSuggestion = useSelector(state => state.userSearch.suggested)
    const searchData = useSelector(state => state.userSearch.searchData)
    const dispatch = useDispatch()
    const [inputValue , setInputValue] = useState('')
    const router = useRouter()
    const onSubmitForm = (e) => {
        e.preventDefault()
        router.push({ pathname: "/search", query: { query: inputValue }})
   }

   if(typeof document !== 'undefined'){
    //! Search
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.getElementById("searchInput");

    document.addEventListener('click', function handleClickOutsideBox(event) {
        //! Search Panel
        if(searchPanel && searchInput){
            if(searchInput.contains(event.target) | searchPanel.contains(event.target)) {
               searchPanel.style.display = 'block'
               searchInput.classList.add('rounded-b-none')
               searchInput.classList.add('border-b-0')
            }else{
               searchPanel.style.display = 'none'
               searchInput.classList.remove('rounded-b-none')
               searchInput.classList.remove('border-b-0')
            }
        }
    });
}
   useEffect(()=>{
        //! Search
        const searchPanel = document.getElementById("searchPanel");
        const searchInput = document.getElementById("searchInput");
        if(searchPanel && searchInput){
             searchPanel.style.display = 'none'
             searchInput.classList.remove('rounded-b-none')
             searchInput.classList.remove('border-b-0')
             searchInput.blur()
        }
        setInputValue(router?.query?.query ?? "")
   },[router])

   const searchInputHandler = (txt) => {
        setInputValue(txt)
        if(txt.length > 1) dispatch(fetchUserSearchSuggested(txt))
   }
    return (
        <>
            <Head><title>ترب | بهترین قیمت بازار</title></Head>
            <Header/>
            <section className='absolute top-0 bottom-0  w-full flex justify-center flex-col items-center '>
                <article className='flex items-center  justify-center px-4'>
                    <div className='w-24'>
                         <img src={torob_logo.src} alt="لوگو ترب"/>
                    </div>
                    <div className='mr-4 flex flex-col gap-y-2'>
                        <p className='text-[#d73948] text-[35px] sm:text-[40px] font-iranyekan-bold'>ترب</p>
                        <p className='text-gray-500 text-sm font-iranyekan-regular'>مقایسه قیمت میلیون ها محصول بین هزاران فروشگاه</p>
                    </div>
                </article>
                <main className='mt-8 w-full flex justify-center  '>
                    <form method='get' className='w-full px-8 flex justify-center' onSubmit={form => onSubmitForm(form)}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute right-10 top-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" >
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                         </svg>

                         <div className="relative w-full h-auto sm:w-[420px]">
                                   <input autoComplete={"off"} value={inputValue} onChange={input => searchInputHandler(input.target.value)} id="searchInput" className="pr-12 bg-white border border-gray-300 outline-none rounded-md placeholder:text-sm text-sm text-gray-700 py-3 font-iranyekan-regular w-full shadow-sm px-4"  placeholder="جستجو" />
                                   {searchSuggestion.loading &&  <ReactLoading className="absolute top-[9px] left-[9px]" type="spinningBubbles" height={23} width={23} color="red" />}
                                   
                                   <svg className="w-6 h-6 text-gray-500 absolute top-[9px] right-3 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                   </svg>
                                   {/* //! Search Panel */}
                                   <section id="searchPanel" className="z-10 max-h-[220px] overflow-y-auto overflow-hidden hidden pb-4 bg-white rounded-md rounded-t-sm absolute w-full border border-t-0 border-gray-300">
                                        {inputValue.length > 1  ? (
                                             <>
                                                  {/* //? Suggstion Search */}
                                                  {searchSuggestion?.data?.suggestions?.length > 0 && (
                                                       <nav className="flex flex-col ">
                                                            {searchSuggestion.data.suggestions.map((item,index) => (
                                                                 <Link key={index} href={{pathname: "/search", query: { query: item.query , category : item.category_slug }}}>
                                                                      <a className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
                                                                           <div className="flex items-center">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                                                </svg>
                                                                                <div>
                                                                                     <span className="font-iranyekan-regular text-sm mr-4 text-gray-800 font-iranyekan-bold">{item.query}</span>
                                                                                     {item.category_slug && <div className="flex gap-x-1 mt-2 mr-4">
                                                                                          <span className="font-iranyekan-regular text-sm  text-gray-800 ">در دسته</span>
                                                                                          <span className="font-iranyekan-regular text-sm text-red-700 font-iranyekan-bold">{item.category_name}</span>
                                                                                     </div>}
                                                                                </div>
                                                                           </div>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                                           </svg>
                                                                      </a>
                                                                 </Link>
                                                            ))}
                                                       </nav>
                                                  )}
                                             </>
                                        ) : (
                                             <>                                      
                                             {/* //? User History Search */}
                                                  {searchData?.data?.search_bar?.user?.length > 0 && (
                                                       <>
                                                            <div className="mt-4 px-4  w-full flex flex-row justify-between items-center">
                                                                 <div className="flex w-fit items-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4 text-gray-500">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                      </svg>
                                                                      <h5 className="font-iranyekan-regular text-sm text-gray-700  font-iranyekan-bold ">آخرین جستجوهای شما</h5>
                                                                 </div>
                                                                 <button className="p-1" onClick={() => dispatch(deleteUserSearch())} >
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                      </svg>
                                                                 </button>
                                                            </div>
                                                            <div className="pr-4 mt-3">
                                                                 <Swiper className={"searchSlider_header"} freeMode={true} navigation={true} spaceBetween={3} modules={[ Navigation , FreeMode]}  slidesPerView={'auto'}>
                                                                      {searchData.data.search_bar.user.map((item,index) => (
                                                                           <SwiperSlide key={index}>
                                                                                <Link href={{pathname: "/search", query: { query: item }}}>
                                                                                     <a className="w-fit px-4 py-2 flex  rounded-full border border-gray-200">
                                                                                          <p className="font-iranyekan-bold text-gray-700 text-sm">{item}</p>
                                                                                          <svg className="w-5 h-5 mr-1 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                                               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                                                          </svg>
                                                                                     </a>
                                                                                </Link>
                                                                           </SwiperSlide>                                                 
                                                                      ))}
                                                                 </Swiper>
                                                            </div>
                                                       </>
                                                  )}
                                             </>
                                        )}

                                        {/* //? Popular Search Section */}
                                        {searchData?.data?.search_bar?.popular?.length > 0 && (
                                             <>
                                                  {/* //? Title */}
                                                  <div className="mt-4 mx-4 w-full flex flex-row items-center">
                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4 text-gray-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                                       </svg>
                                                       <h5 className="font-iranyekan-regular text-sm text-gray-700  font-iranyekan-bold ">جستجوهای پرطرفدار</h5>
                                                  </div>
                                                  {/* //? Slider For Popular Search */}
                                                  <div className="pr-4 mt-2">
                                                       <Swiper className={"searchSlider_header"} freeMode={true} navigation={true} spaceBetween={3} modules={[ Navigation , FreeMode]}  slidesPerView={'auto'}>
                                                       {searchData.data.search_bar.popular.map((item,index) => (
                                                                 <SwiperSlide key={index}>
                                                                      <Link href={{pathname: "/search", query: { query: item }}}>
                                                                           <a className="w-fit px-4 py-2 flex font-iranyekan-bold text-gray-700 text-sm rounded-full border border-gray-200">
                                                                                <p>{item}</p>
                                                                                <svg className="w-5 h-5 mr-1 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                                                </svg>
                                                                           </a>
                                                                      </Link>
                                                                 </SwiperSlide>
                                                       ))}                                     
                                                       </Swiper>
                                                  </div>
                                             </>
                                        )}

                                   </section>
                         </div>    
                    </form>
                </main>
            </section>
            <Footer/>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({req}) => {
    const token = returnTokenInServerSide({cookie : req.headers.cookie})
    if(!token.includes("undefined")){
        // Fetch User Data
        dispatch(authRequest())    
        await http.get("user", {headers : {authorization : token}})
        .then(({data}) => {
            dispatch(cartDetails(data))
            dispatch(authSuccess(data.user))
        })
        .catch(error => dispatch(authFailure("خطا در بخش احراز هویت")))

        // Fetch SearchBar Data With User Token
        await http.get(`public/searchbar`,{headers : {authorization : token}})
        .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
        .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
    }else{
        // Fetch SearchBar Data Without User Token
        await http.get(`public/searchbar`)
        .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
        .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
    }
    // Fetch Navbar Categories
    dispatch(fetchCategoriesRequest())
    await http.get(`public/categories`)
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))

});