import { toPersianPrice } from "@/utils/toPersianPrice";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { likedAction } from "@/redux/like/likeActions";
import { authPanel } from "@/redux/user/userActions";

const Product = ({ product }) => {

     const {user} = useSelector(state => state.auth)
     const dispatch = useDispatch();
     const { likes, likesLoading } = useSelector((state) => state.likes);

     const isLiked = () => {
          const liked = likes.find(item => item.id === product.product.id);
          if(liked) return true ; else return false
     };
     const isLikeLoading = () => {
          const likeLoading = likesLoading.find(item => item.product_id === product.product.id);
          if(likeLoading) return true ; else return false;
     };
     return (
          <article className={`relative overflow-hidden bg-white flex lg:w-[300px] lg:max-w-[300px] lg:min-w-[300px] rounded-lg flex-col  sm:flex-row lg:flex-col h-fit lg:sticky top-0 p-2`}>
               <div className=" flex justify-center items-center relative z-0">
                    <Swiper pagination={{dynamicBullets: true}} modules={[ Pagination]} className={"swiper_productPage max-w-[300px] sm:max-w-[230px] lg:max-w-none  "}>
                         {product.product.images.map(image => (
                              <SwiperSlide key={image.id}>
                                   <div  className="flex items-center justify-center w-30 ">
                                        <img className="w-full h-auto" src={image.url} alt={`تصویر ${product.product.title}`}/>
                                   </div>
                              </SwiperSlide>
                         ))}
                    </Swiper>
               </div>

               <section className=" w-full mt-4 p-2 ">
                    <p className="font-iranyekan-regular text-bold text-sm w-full text-right text-gray-700 leading-8  sm:mt-0 ">{product.product.title}</p>
                    <p className="w-full mt-1 text-right text-sm font-iranyekan-regular text-red-600">از {toPersianPrice(product.prices_range.min)} تومان تا{" "}{toPersianPrice(product.prices_range.max)} تومان</p>
                    <div className="w-fit  flex items-center justify-between overflow-hidden rounded-bl-lg bg-gray-100 absolute top-0 right-0 ">

                         <div className="flex flex-col w-fit">
                              <button 
                                   onClick={() => user ? dispatch(likedAction({product_id : product.product.id})) : dispatch(authPanel({isOpen : true , type : "userpass"}))} 
                                   className="p-2 hover:bg-gray-200">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill={`${isLiked() ? "red" : isLikeLoading() ? "#f57373" : "none"} `} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${isLiked() ? "text-red-700" : isLikeLoading() ? "text-red-400" : "none"} outline-none`}> 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /> 
                                   </svg> 
                              </button>
                         </div>
                    </div>
               </section>
          </article>
     );
};
export default Product;
