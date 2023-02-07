
//! ====Swiper====>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode , Navigation} from "swiper";
import "swiper/css/free-mode";
//! <====Swiper====
import image1 from '@/images/indexPage/torob_offer/101.png'
import image2 from '@/images/indexPage/torob_offer/102.jpg'
import image3 from '@/images/indexPage/torob_offer/103.jpg'
import image4 from '@/images/indexPage/torob_offer/104.jpg'
import image5 from '@/images/indexPage/torob_offer/105.jpg'
import image6 from '@/images/indexPage/torob_offer/106.jpg'
import image7 from '@/images/indexPage/torob_offer/107.jpg'
import image8 from '@/images/indexPage/torob_offer/108.jpg'
import image9 from '@/images/indexPage/torob_offer/109.jpg'
import image10 from '@/images/indexPage/torob_offer/110.jpg'
import image11 from '@/images/indexPage/torob_offer/111.jpg'
import image12 from '@/images/indexPage/torob_offer/112.jpg'
import image13 from '@/images/indexPage/torob_offer/113.jpg'
import image14 from '@/images/indexPage/torob_offer/114.jpg'

const TorobOffer_categories = () => {
    return (
        <div className="px-4">
            <h3 className="font-sans text-gray-600 font-bold tracking-wide text-xl w-full text-center mt-10">پیشنهاد ترب</h3>

            <Swiper 
                freeMode={true} 
                navigation={true} 
                spaceBetween={1} 
                modules={[ Navigation , FreeMode]} 
                className={"mt-10 offersSlider_indexPage_swiper border border-gray-300 rounded-lg"}
                slidesPerView={'auto'}
            >
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image1.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image12.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image2.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image3.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image4.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image5.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image6.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image7.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image8.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image9.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image10.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image11.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image13.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image14.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="border-gray-300 border-r w-full h-full flex flex-col justify-between  relative  max-h-[340px] min-h-[340px]">
                        <div className='w-full flex flex-col py-4 pr-10 pl-10 items-center justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image1.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>گوشی موبایل</h6>
                        </div>
                        <div className='flex w-full border-gray-300 border-t flex-col items-center p-4 justify-center '>
                            <img className='w-[100px] md:w-[100px] h-auto' src={image1.src}/>
                            <h6 className='truncate  mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کیف و کاور گوشی</h6>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
export default TorobOffer_categories