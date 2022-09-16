import { toEnDigits, toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import PersianDate from "@alireza-ab/persian-date";
import { TbTruckDelivery } from "react-icons/tb";
import Link from 'next/link';

const StoreCommon = ({store , index}) => {


    function timeDifference(time){
        const date = new Date(time*1000)
        const toPersianDate = date.toLocaleDateString("fa-IR")
        const year = toPersianDate.split('/')[0]
        const month = toPersianDate.split('/')[1]
        const day = toPersianDate.split('/')[2]
        const splitDate = toEnDigits(`${year}/${month}/${day}`)
        let dateNow = new PersianDate(null)
        return toPersianDigits(dateNow.diffForHumans( splitDate , false))
    }


    return (  
        <div  key={index}>
            <section className='  flex flex-col xl:flex-row justify-between mt-0 group py-4 px-3 md:px-8 hover:bg-gray-50'>
                {/* //?city */}
                <div className='whitespace-nowrap flex w-fit gap-y-1 flex-row xl:flex-col items-center xl:items-start '>
                    <p className='font-sans font-bold text-gray-800'>{store.shop.title}</p>
                    <p className='font-sans text-sm text-gray-500 mr-3 xl:mr-0'>{store.shop.province}</p>
                </div>

                {/* //?Content */}
                <div className='text-right w-full  xl:mx-8'>
         
                    <section >
                        {/* //?button */}
                        <input type={'checkbox'} id={`shop_id_${index}`}  className=' peer hidden'/>
                        <label htmlFor={`shop_id_${index}`}  className='whitespace-nowrap mt-4 xl:mt-0 cursor-pointer w-fit border hover:border-blue-700 bg-[#DAF2D5] font-sans text-green py-1 px-3 rounded-full text-xs items-center flex justify-between'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#025c17" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                            {toPersianDigits(store.shop.rate)}
                            <div className='mx-2'>(  {timeDifference(store.shop.activity_time)} در ترب)</div>
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
                                <div className='font-sans mr-0.5 text-sm'>{toPersianDigits(store.shop.rate)}</div>
                                <div className='mx-2 text-sm  font-sans'>( {timeDifference(store.shop.activity_time)}  در ترب)</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <div className='flex flex-col items-start mt-3 gap-y-2 pb-1'>
                                <p className='font-sans text-xs'>حدود {toPersianDigits(store.shop.stats.orders.min)} تا {toPersianDigits(store.shop.stats.orders.max)} سفارش در {toPersianDigits(90)} روز اخیر فعالیت در ترب</p>
                                <p className='font-sans text-xs'>{toPersianDigits(store.shop.stats.trackings)} کاربر از طریق ترب سفارش خود را پیگیری کرده اند.</p>

                            </div>
                        </section>
                    </section>

                    {/* //? Product Title */}
                    <p className='font-sans text-sm mt-5 group-hover:text-blue-700'>{store.offer.title}</p>

                    
                    <div className='mt-2'>
                        <span className='text-xs mt-3 font-sans text-gray-500'>{store.offer.is_mobile_registered ? " رجیستر شده | " : " "}</span>
                        <span className='text-xs mt-3 font-sans text-gray-500'>{store.offer.guarantee ? store.offer.guarantee : ""}</span>
                    </div>


                    <section>
                        {/* //? Button */}
                        <input type={'checkbox'} id={`offer_id_${index}`} name='s' className=' peer hidden'/>
                        {store.shop.badges.length > 0 ? (
                            <label  htmlFor={`offer_id_${index}`} className=' border hover:border-blue-700 cursor-pointer group-hover:bg-white bg-gray-50 rounded-full mt-3 flex w-fit gap-x-2 font-sans text-xs py-1 px-3'>
                                {store.shop.badges.map((badge,index) => {
                                    return(
                                        <section key={index}>
                                            {/* //? تحویل فوری */}
                                            {badge.type === "instant_delivery" && (
                                                <div className='flex items-center gap-x-1'>
                                                    <TbTruckDelivery size={21} className="text-gray-500"/>
                                                    <p className='font-sans text-xs text-gray-700'>{badge.title}</p>
                                                </div>
                                            )}
                                            {/* //? پرداخت در محل */}
                                            {badge.type === "inplace_pay" && (
                                                <div className='flex items-center gap-x-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                                    </svg> 
                                                    <p className='font-sans text-xs text-gray-700'>{badge.title}</p>
                                                </div>
                                            )}
                                            {/* //?  ارسال رایگان  */}
                                            {badge.type === "free_delivery" && (
                                                <div className='flex items-center gap-x-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                    </svg>
                                                    <p className='font-sans text-xs text-gray-700'>{badge.title}</p>
                                                </div>
                                            )}
                                        </section>
                                    )
                                })}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </label>
                            ) : (
                                <label  htmlFor={`offer_id_${index}`} className=' border hover:border-blue-700 cursor-pointer group-hover:bg-white bg-gray-50 rounded-full mt-3 flex w-fit gap-x-2 font-sans text-xs py-1 px-3'>
                                    هزینه و نحوه‌ی ارسال برحسب سفارش متفاوت است.
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </label>
                            )
                        }
                        {/* //? Content */}
                        <div className={`peer-checked:flex bg-gray-50 group-hover:bg-white  hidden  mt-4  flex-col gap-y-2 p-3 rounded-md `}>
                            {store.shop.advantage.map((advantage,index) => {
                                return(
                                    <section key={index}>
                                        {/* //? پرداخت در محل */}
                                        {advantage.type === "inplace_pay" && (
                                            <div className='flex items-center gap-x-1'>
                                                <TbTruckDelivery size={21} className="text-gray-500"/>
                                                <p className='font-sans text-xs text-gray-700'>{toPersianDigits(advantage.title)}</p>
                                            </div>
                                        )}
                                        {/* //?  ارسال رایگان  */}
                                        {advantage.type === "free_delivery" && (
                                            <div className='flex items-center gap-x-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                                <p className='font-sans text-xs text-gray-700'>{toPersianDigits(advantage.title)}</p>
                                            </div>
                                        )}
                                        {/* //? تحویل فوری */}
                                        {advantage.type === "instant_delivery" && (
                                            <div className='flex items-center gap-x-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                                </svg>
                                                <p className='font-sans text-xs text-gray-700'>{toPersianDigits(advantage.title)}</p>
                                            </div>
                                        )}
                                    </section>
                                )
                            })}
                            <p className='font-sans font-bold text-xs'>روش های ارسال</p>
                            <section className='flex'>
                                {store.shop.delivery_methods.map((item,index) => {
                                    return(
                                        <p key={index} className='font-sans py-1 px-2 border border-gray-400 text-xs text-gray-700'>{item}</p>
                                    )
                                })}
                            </section>
                        </div>
                    </section>
                </div>

                {/* //? Buy Product */}
                <section>
                    <div className='flex flex-row justify-between mt-5 items-center xl:flex-col xl:mt-0 '>
                        <p className={`${store.offer.is_available ? "text-red-600" : "text-gray-600" }  whitespace-nowrap  font-sans`}>{store.offer.is_available ? toPersianPrice(store.offer.price) +" تومان " :   " ناموجود  (" +toPersianPrice(store.offer.price) +" تومان)" }</p>
                        <Link href={store.offer.redirect_url}>
                            <a className={` ${store.offer.is_available ? " group-hover:bg-red-600 border-red-600 text-red-600" : " group-hover:bg-gray-600 border-gray-600 text-gray-600"} block  py-1.5 group-hover:text-white xl:mt-5 border  font-sans rounded-md font-bold  text-sm px-4  bg-white`}>خرید اینترنتی</a>
                        </Link>
                    </div>
                    <div className='mt-5 flex flex-row justify-end xl:flex-col gap-y-1 text-left'>
                        <p className='whitespace-nowrap text-xs text-gray-600 font-sans'>آخرین تغییر قیمت فروشگاه : </p>
                        <p  className='whitespace-nowrap text-xs text-gray-600 font-sans'>{timeDifference(store.offer.last_update)} پیش</p>
                    </div>
                </section>

            </section>
            <hr/>
        </div>
    );
}
 
export default StoreCommon;