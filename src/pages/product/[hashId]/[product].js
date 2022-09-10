import ChartDetail from '@/components/productPage/ChartDetail';
import Chart from '@/components/productPage/Chartjs';
import ProductSlider from '@/components/productPage/ProductSlider';
import Layout from '@/layout/Layout';
import { toEnDigits, toPersianDigits } from '@/utils/toPersianDigits';
import { Modal } from '@mui/material';
import axios from 'axios';
import Link from 'next/link'; 
import PersianDate from '@alireza-ab/persian-date'
import { useState } from 'react';
import Styles from './grid.module.css'
import { TbTruckDelivery } from "react-icons/tb";
import { toPersianPrice } from '@/utils/toPersianPrice';


const ProductPage = ({product}) => {
    const [isModal , setIsModal] = useState(false)

    const [showAllStors , setShowAllStore] = useState(false)

    let store;
    if(!showAllStors){
        store =  product.sales.length > 6 ? product.sales.slice(0,6) : product.sales
    }else{
        store = product.sales
    }


    return (  
        <Layout>
    

            <section className="w-full text-center px-2 md:px-8 flex justify-center">
                <div className='w-full max-w-7xl'>
                        {/* //? BreadCrump */}
                        <div className='flex whitespace-nowrap overflow-x-auto  pb-4'>
                                <Link href="/">
                                        <a className='hover:text-red-500 before:hover:text-gray-500 cursor-pointer mt-4 before:content-["›"] before:px-2 first:before:content-none text-xs text-gray-500 font-sans'>ترب</a>
                                </Link>                    
                                {product.path.map((path,index) => {
                                return(
                                    <Link key={index} href={{pathname : "/search" , query : {category : path}}}>
                                        <a className='hover:text-red-500 before:hover:text-gray-500 cursor-pointer mt-4 before:content-["›"] before:px-2 first:before:content-none text-xs text-gray-500 font-sans'>{path}</a>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* //? Main Content */}
                        <div className={`${Styles.gridParent} gap-4 mt-4 `}>







                            {/* //? Product */}
                            <article className={`${Styles.product} overflow-hidden bg-white flex flex-col lg:flex-row lg:justify-between w-full lg:flex p-5`}>
                                {/* //! Image */}
                                <div className="w-full lg:w-fit flex justify-center">
                                    <section className=''>
                                        <img className='w-auto h-full' src={product.product.image_url}/>
                                    </section>
                                </div>

                                <section className=' md:pr-5 w-full flex flex-col justify-between mt-6 lg:mt-0 '>
                                    <p className='font-sans text-bold w-full text-right'>{product.product.title}</p>
                                    <p className='w-full text-right font-sans mt-6 text-red-600'>از {toPersianPrice(product.prices_range.min)} تومان تا {toPersianPrice(product.prices_range.max)} تومان</p>
                                    <div className='mt-6 w-full'>
                                        <ProductSlider models={product.models}/>
                                    </div>
                                    <div className='w-full  mt-6 flex flex-col-reverse md:flex-row justify-between'>
                                        <button className='whitespace-nowrap mt-4 md:mt-0 rounded-md py-3 md:py-2 px-4 font-bold  font-sans text-sm text-white bg-[#d73948]'>خرید از ارزان ترین فروشنده ریجستر شده</button>
                                        
                                        <div className='  flex justify-between w-full'>

                                            {/* //? Icons */}
                                            <div className='flex pl-5 justify-end w-fit md:w-full'>
                                            {/* //?Notification */}
                                                <button className='p-2 hover:bg-gray-100 rounded-full'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                                    </svg>
                                                </button>
                                                {/* //?Heart */}
                                                <button className='p-2 hover:bg-gray-100 rounded-full'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>
                                                </button>
                                                {/* //?Share */}
                                                <button className='p-2 hover:bg-gray-100 rounded-full'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* //?Flag */}
                                            <button className='text-red-700 whitespace-nowrap rounded-full flex w-fit font-sans text-xs bg-red-50 items-center px-3'>
                                                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                                                </svg>
                                                گزارش مشکل
                                            </button>


                                        </div>


                                    </div>
                                </section>
                            </article>
                        
































                            {/* //? Chart */}
                            <div className={`${Styles.chart} bg-white  font-sans p-4 relative`}>
                                <p className='w-full text-right'>تغییرات قیمت</p>
                                    <div className=' relative ' >
                                        <Chart chart={product.chart} />
                                    </div>
                                <div className='w-full flex justify-end  '>
                                    <button onClick={()=>setIsModal(true)} className='p-2 absolute bottom-2 left-2 hover:bg-gray-100 rounded-full'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </button>
                                        <Modal className="flex items-center px-2 md:px-0 justify-center relative" open={isModal} onClose={()=>setIsModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                                <div className='bg-white w-full p-4 md:w-4/6 rounded-md'>
                                                    <div onClick={()=>setIsModal(false)} className='p-1 hover:bg-gray-200 hover:cursor-pointer bg-gray-50 rounded-full relative top-5 right-5 w-fit'>
                                                        <svg  className=" w-7 text-black h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <ChartDetail chart={product.chart} />
                                                </div>
                                        </Modal>
                                </div>
                            </div>

















                            

                            {/* //? Store */}
                            <div className={`${Styles.store}  bg-white py-5`}>
                                {/* //? Header */}
                                <section className='w-full flex peer  justify-between items-center mb-8 px-8'>
                                    <div className='flex flex-col md:flex-row gap-x-8 items-center'>
                                        <span className='font-sans font-bold'>فروشگاه های اینترنتی</span>
                                        <button className='bg-gray-800 hover:bg-gray-700 rounded-full text-white font-sans px-2 mt-4 md:mt-0 py-1.5 flex text-sm items-center justify-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
    
                                            <p className='mx-2 '>انتخاب شهر</p>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <a className='text-red-600  rounded-full  font-sans text-sm' href='/'>راهنمای خرید امن</a>
                                </section>

                                {/* //? Store */}

                                {store.map((shop,index) => {

                                    const date = new Date(shop.shop.activity_time*1000)
                                    const toPersianDate = date.toLocaleDateString("fa-IR")
                                    const year = toPersianDate.split('/')[0]
                                    const month = toPersianDate.split('/')[1]
                                    const day = toPersianDate.split('/')[2]
                                    const splitDate = toEnDigits(`${year}/${month}/${day}`)
                                    let dateNow = new PersianDate(null)
                                    const shopActivity = dateNow.diffForHumans( splitDate , false)

                                    return(
                                        <div  key={index}>
                                            <section className='  flex flex-col xl:flex-row justify-between mt-0 group py-4 px-3 md:px-8 hover:bg-gray-50'>

                                                {/* //?city */}
                                                <div className='whitespace-nowrap flex w-fit gap-y-1 flex-row xl:flex-col items-center xl:items-start '>
                                                    <p className='font-sans font-bold text-gray-800'>{shop.shop.title}</p>
                                                    <p className='font-sans text-sm text-gray-500 mr-3 xl:mr-0'>{shop.shop.province}</p>
                                                </div>

                                                {/* //?Content */}
                                                <div className='text-right w-full  xl:mx-8'>
                                                    

                                                        <section className=''>
                                                        {/* //?button */}
                                                            <input type={'checkbox'} id={`shop_id_${index}`} name='s' className=' peer hidden'/>
                                                            <label htmlFor={`shop_id_${index}`}  className='whitespace-nowrap mt-4 xl:mt-0 cursor-pointer w-fit border hover:border-blue-700 bg-[#DAF2D5] font-sans text-green py-1 px-3 rounded-full text-xs items-center flex justify-between'>

                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#025c17" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-3 h-3">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                        </svg>
                                                                        {toPersianDigits(shop.shop.rate)}
                                                                        <div className='mx-2'>(  {toPersianDigits(shopActivity)} در ترب)</div>
                                                                        <div className='peer-active:rotate-3'>
                                                                        <svg className="w-4 h-4 peer-active:bg-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                            </svg>
                                                                        </div>
                                                            </label>
                                                            {/* //? Content  */}
                                                            <section className={`peer-checked:block hidden bg-[#DAF2D5] mt-3 py-2 px-3  rounded-2xl `}>
                                                                <div className='flex items-center'>
                                                                    <p className='ml-2 text-sm  font-sans'>امتیاز فروشگاه</p>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#025c17" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-3 h-3">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                                    </svg>
                                                                    <div className='font-sans mr-0.5 text-sm'>{toPersianDigits(shop.shop.rate)}</div>
                                                                    <div className='mx-2 text-sm  font-sans'>( {toPersianDigits(shopActivity)}  در ترب)</div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                    </svg>
                                                                </div>
                                                                <div className='flex flex-col items-start mt-3 gap-y-2'>
                                                                    <p className='font-sans text-xs'>حدود ۲۰۰۰ تا ۳۰۰۰ سفارش در ۹۰ روز اخیر فعالیت در ترب</p>
                                                                    <p className='font-sans text-xs'>۴ کاربر از طریق ترب سفارش خود را پیگیری کرده اند.</p>
                                                                    <div className='flex gap-x-3 py-2'>
                                                                        <button className='hover:bg-blue-100 rounded-md text-xs font-sans bg-white px-3 py-2 border border-blue-400'>پروفایل فروشگاه</button>
                                                                        <button className='hover:bg-blue-100 rounded-md text-xs font-sans bg-white px-3 py-2 border border-blue-400'>شیوه ارزیابی فروشگاه</button>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </section>
                                                            {/* //? Product Title */}
                                                        <p className='font-sans text-sm mt-5 group-hover:text-blue-700'>{shop.offer.title}</p>

                                                    
                                                    <div className='mt-2'>
                                                        <span className='text-xs mt-3 font-sans text-gray-500'>{shop.offer.is_mobile_registered ? " رجیستر شده | " : " رجیستر نشده  | "}</span>
                                                        <span className='text-xs mt-3 font-sans text-gray-500'>{shop.offer.guarantee ? shop.offer.guarantee : ""}</span>
                                                    </div>


                                                    <section>
                                                        {/* //* Button */}
                                                        <input type={'checkbox'} id={`offer_id_${index}`} name='s' className=' peer hidden'/>
                                                        <label  htmlFor={`offer_id_${index}`} className=' border hover:border-blue-700 cursor-pointer group-hover:bg-white bg-gray-50 rounded-full mt-3 flex w-fit gap-x-2 font-sans text-xs py-1 px-3'>
                                                                    <div className='flex items-center gap-x-1'>
                                                                        <TbTruckDelivery size={21} className="text-gray-500"/>
                                                                        <p className='font-sans text-xs text-gray-700'>پرداخت در محل</p>
                                                                    </div>
                                                                    <div className='flex items-center gap-x-1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                                        </svg>
                                                                        <p className='font-sans text-xs text-gray-700'>ارسال رایگان</p>
                                                                    </div>
                                                                    <div className='flex items-center gap-x-1'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                                                        </svg>
                                                                        <p className='font-sans text-xs text-gray-700'>تحویل فوری</p>
                                                                    </div>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                    </svg>
                                                        </label>

                                                        {/* //? Content */}
                                                        <div className={`peer-checked:flex bg-gray-50 group-hover:bg-white  hidden  mt-4  flex-col gap-y-2 p-3 rounded-md `}>
                                                            <div className='flex items-center gap-x-1'>
                                                                <TbTruckDelivery size={21} className="text-gray-500"/>
                                                                <p className='font-sans text-xs text-gray-700'>امکان پرداخت در محل در تهران با هماهنگی</p>
                                                            </div>
                                                            <div className='flex items-center gap-x-1'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                                </svg>
                                                                <p className='font-sans text-xs text-gray-700'>امکان ارسال رایگان برای خریدهای بالای ۳۰۰٫۰۰۰ تومان</p>
                                                            </div>
                                                            <div className='flex items-center gap-x-1'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                                                </svg>
                                                                <p className='font-sans text-xs text-gray-700'>امکان تحویل در همان روز برای تهران با هماهنگی</p>
                                                            </div>
                                                            <p className='font-sans font-bold text-xs'>روش های ارسال</p>
                                                            <section className='flex'>
                                                                {shop.shop.delivery_methods.map((item,index) => {
                                                                    return(
                                                                        <p key={index} className='font-sans py-1 px-2 border border-gray-400 text-xs text-gray-700'>{item}</p>
                                                                    )
                                                                })}
                                                            </section>
                                                            <div className='w-full flex flex-end'>
                                                                <button className='mt-2 text-xs font-sans border px-3 py-2  rounded-md text-blue-600 border-blue-400'>پروفایل فروشگاه</button>
                                                            </div>
                                                        </div>

                                                    </section>
                                                </div>
























































                                                {/* //? Buy Product */}
                                                <div className=''>
                                                    <div className='flex flex-row justify-between items-center xl:flex-col '>
                                                        <p className='font-sans  text-red-600'>{toPersianPrice(shop.offer.price)} تومان</p>
                                                        <Link href={shop.offer.redirect_url}>
                                                                <a className='group-hover:bg-red-600 block group-hover:text-white mt-5 border border-red-600 font-sans rounded-md font-bold text-red-600 text-sm px-4 py-1.5 bg-white'>خرید اینترنتی</a>
                                                        </Link>
                                                    </div>
                                                    <div className='mt-5 flex flex-row justify-end xl:flex-col gap-y-1 text-left'>
                                                        <p className='whitespace-nowrap text-xs text-gray-600 font-sans'>آخرین تغییر قیمت فروشگاه : </p>
                                                        <p  className='whitespace-nowrap text-xs text-gray-600 font-sans'>{toPersianDigits(6)} ساعت پیش</p>
                                                    </div>
                                                </div>

                                            </section>
                                            <hr/>
                                        </div>
                                    )
                                })}
                                <div className='w-full px-4'>
                                    <button onClick={() => setShowAllStore(!showAllStors)} className='mt-4 rounded-md font-sans text-sm bg-[#d73948] w-full py-3 text-white'> 
                                        {showAllStors ? "نمایش کمتر" :  `نمایش تمام ${toPersianDigits(product.sales.length)} فروشگاه `}

                                    </button>
                                </div>
                            </div>






























                            {/* //? Properties */}
                            <div className={`${Styles.properties}  bg-white px-5 py-5`}>
                                <p className='font-sans font-bold pb-3 text-right text-[18px]'>مشخصات {product.product.title}</p>
                                
                                <div className={`${Styles.properties_scroll}  overflow-y-auto max-h-[700px]`}>
                                    <div className={` mt-4 w-full text-right`}>
                                        <p className=' font-sans font-bold '>مشخصات کلی</p>
                                        <hr className='mt-2'/>
                                        {JSON.parse(product.product.specs).map((e,index) => {
                                            const generalInformation = e.title === "مشخصات کلی" ? e.details : [];
                                            return(
                                                <div className='mt-3' key={index}>
                                                    {generalInformation.map((properties,newIndex) => {
                                                        return(
                                                            <div className='my-5' key={newIndex}>
                                                                <p className='font-bold font-sans text-sm'>{properties.name}</p>
                                                                <p className='mt-2 font-sans text-sm text-gray-500'>{properties.value}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className='mt-4 w-full text-right'>
                                        <p className=' font-sans font-bold '>مشخصات فنی </p>
                                        <hr className='mt-2'/>
                                        {JSON.parse(product.product.specs).map((e,index) => {
                                            const generalInformation = e.title === "مشخصات فنی" ? e.details : [];
                                            return(
                                                <div className='mt-3' key={index}>
                                                    {generalInformation.map((properties,newIndex) => {
                                                        return(
                                                            <div className='my-5'  key={newIndex}>
                                                                <p className='font-bold font-sans text-sm'>{properties.name}</p>
                                                                <p className='mt-2 font-sans text-sm text-gray-500'>{properties.value}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    
                                </div>
                            </div>




                        {/* //?    <===   Main Content */}
                        </div>
                </div>
            </section>
        </Layout>
    );
}
 
export default ProductPage;

export const getServerSideProps = async({query}) => {
    const {hashId} = query
    const {data : product} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}`)).then(res => res.data)
    return{
        props : {
            product,
        }
    }
}