
//! ====Swiper====>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode , Navigation} from "swiper";
import "swiper/css/free-mode";
//! <====Swiper====
import offerImage from '@/images/offerproduct_slider_indexPage.png'
import offerProducts_text_indexPage from '@/images/offerProducts_text_indexPage.svg'

import image from '@/images/mainSlide.jpg'
import image1 from '@/images/mainSlide1.jpg'
import image2 from '@/images/mainSlide2.jpg'
import image3 from '@/images/mainSlide3.gif'
import image4 from '@/images/mainSlide4.jpg'
import image5 from '@/images/mainSlide5.jpg'
import Image from "next/image";
import { toPersianPrice } from "@/utils/toPersianPrice";

const OffersSlider_indexPage = () => {
    return(
        <section className="md:px-4">
            <div className="w-full pb-4 px-1 mt-4 bg-[#ef394e] md:rounded-lg overflow-hidden">
                <Swiper 
                    freeMode={true} 
                    navigation={true} 
                    spaceBetween={3} 
                    modules={[ Navigation , FreeMode]} 
                    className={"mt-4 offersSlider_indexPage_swiper "}
                    // breakpoints={{
                    //     // when window width is >= 320px
                    //     320:{
                    //         slidesPerView: 2,
                    //     },
                    //     // when window width is >= 480px
                    //     480: {
                    //         slidesPerView: 3,
                    //     },
                    //     // when window width is >= 640px
                    //     640: {
                    //         slidesPerView: 6,
                    //     },
                    //     1300: {
                    //         slidesPerView: 7,
                    //     }
                    //   }}
                    slidesPerView={'auto'}
                    // centeredSlides={true}
                    
                >
                
                    <SwiperSlide >
                        <div className="flex flex-col justify-center items-center h-[288px] max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <div className="w-full flex justify-center px-12">
                                <img className="w-full object-contain h-auto" src={offerProducts_text_indexPage.src} />
                            </div>
                            <div  className="w-full flex justify-center flex-col items-center px-8">
                                <img className="w-full object-contain  h-auto" src={offerImage.src} />
                                <a href="#" className="flex mt-4 items-center text-white font-sans text-sm font-extrabold tracking-wider">
                                    مشاهده همه      
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className=" first:rounded-r-xl w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div  className="  w-full h-full bg-white p-4 flex flex-col justify-start  relative max-w-[182px] min-w-[182px] max-h-[288px] min-h-[288px]">
                            <img className="rounded-lg w-full object-cover h-auto min-h-[180px] max-h-[180px]" src={image2.src} />
                            <div className="w-full flex justify-between mt-4">
                                <span className="w-fit h-fit px-3 rounded-xl py-0.5 font-sans text-sm bg-red-600 text-red-50">{toPersianPrice(9)}%</span>
                                <span className="font-sans text-gray-700 font-bold">{toPersianPrice(4366145)}</span>
                            </div>
                            <span className="font-sans text-sm line-through text-gray-500 text-left mt-4">{toPersianPrice(4366000)}</span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="last:rounded-l-xl w-full max-w-[182px] min-w-[182px]  min-h-[288px] max-h-[288px] bg-white p-4 flex flex-col  justify-center items-center">
                            <div className="border-2 p-3 border-red-400 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-700 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                            </div>
                            <p className="font-sans text-sm tracking-wide mt-4 font-bold">مشاهده همه</p>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </section>
    )
}
export default OffersSlider_indexPage