
//! ====Swiper====>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination , Navigation} from "swiper";
//! <====Swiper====

import image from '@/images/mainSlide.jpg'
import image1 from '@/images/mainSlide1.jpg'
import image2 from '@/images/mainSlide2.jpg'
import image3 from '@/images/mainSlide3.gif'
import image4 from '@/images/mainSlide4.jpg'
import image5 from '@/images/mainSlide5.jpg'
import Image from "next/image";

const MainSlider_indexPage = () => {
    return(
        <section className="w-full py-0 my-0 max-w-[1700px]">
            <Swiper navigation={true} loop={true} pagination={{dynamicBullets: true}} modules={[ Pagination , Navigation]} className={"mainSlider_indexPage_swiper lg:max-w-none  "}>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image.src} />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image1.src} />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image2.src} />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image3.src} />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image4.src} />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div  className="w-full  flex items-center relative justify-center ">
                        <img className="w-full object-cover h-auto min-h-[130px] max-h-[400px]" src={image5.src} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
export default MainSlider_indexPage