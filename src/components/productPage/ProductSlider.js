import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { toPersianPrice } from "@/utils/toPersianPrice";

export default function ProductSlider({models}) {
    const {query} = useRouter()
    return (
            <Swiper tag="div"  wrapperTag="div" spaceBetween={20} loop={false}
                className="mx-5" 
                breakpoints= {{
                    0: {
                        slidesPerView: 2,
                    },
                    630: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 5,
                    },
                    1260: {
                        slidesPerView: 7,
                    },
                    1360: {
                        slidesPerView: 4,
                    }
                }}>
        
                {models.map((model,index) => {
                    return(
                            <SwiperSlide  key={index} className={`border border-1 whitespace-nowrap rounded-md ${query.hashId === model.hash_id ? "border-black" : "border-gray-300"}  flex flex-col items-center`}>
                                   <Link href={`/product/${model.hash_id}/${model.title}`}>
                                        <a className="py-2 ">
                                            <p className="font-iranyekan-bold text-xs px-2 w-full text-gray-800">{model.model_trait} </p>
                                            <p className="font-iranyekan-regular mt-1 text-xs px-2 w-full  text-gray-700">از {toPersianPrice(model.price_start)} تومان</p>
                                        </a>
                                   </Link>
                            </SwiperSlide>  
                    )
                })}
                
            </Swiper>
    );
}
