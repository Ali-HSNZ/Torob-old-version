import { timeDifference } from "@/utils/timeDifference";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { analyzeAction } from "@/redux/analytics/analyticsActions";
import { likedAction } from "@/redux/like/likeActions";
import { authPanel } from "@/redux/user/userActions";
import ChartDetail from "../productPage/ChartDetail";

const AnalyticsComponent = ({product , isLikeLoading , isLiked , isAnalyzeLoading , isAnalyze , user}) => {
    const dispatch = useDispatch()
    return (  
        <section className=" flex flex-col ">
            <article className=" w-full py-2 bg-white  px-2 flex flex-col  sm:flex-row items-center relative">
                <Link href={`/product/${product.hash_id}/${product.title.replace(/\s+/g, '-')}`}>
                    <a className="w-[120px] h-full flex justify-center items-center  ">
                        <img  className="w-full h-auto font-sans text-sm" src={product.image_url} alt={`تصویر ${product.title}`}/>
                    </a>
                </Link>
                <div className="w-full flex flex-col justify-between gap-y-7 px-3 sm:mt-0 mt-4 ">
                    <Link href={`/product/${product.hash_id}/${product.title.replace(/\s+/g, '-')}`}>
                        <a className="text-right w-full font-sans text-sm leading-6">{product.title}</a>
                    </Link>

                    <section>
                        <h6 className="font-sans text-right text-xs text-red-600">از {toPersianPrice(product.price_start)} تومان</h6>
                        <h6 className="font-sans text-right text-xs text-gray-600 mt-2">در {toPersianDigits(product.shops_count)} فروشگاه</h6>
                    </section>
                </div>
                <div className="flex pb-1 h-full flex-col  sm:justify-between  p-4 absolute sm:relative top-0 left-0">
                    <button onClick={()=>{ user ? dispatch(likedAction({hash_id : product.hash_id})) : dispatch(authPanel(true))}} className='p-2 hover:bg-gray-100 rounded-full' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={ `${isLikeLoading ? "#fc6b62" :isLiked ? "red" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${isLikeLoading ? "text-[#fc6b62]" : isLiked ? "text-red-700" : "none"} outline-none`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg> 
                    </button>
                    <button  onClick={()=>{ user ? dispatch(analyzeAction({hash_id : product.hash_id})) : dispatch(authPanel(true))}} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill={ `${isAnalyzeLoading ? "#fc6b62" : isAnalyze ? "red" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${isAnalyzeLoading ? "text-[#fc6b62]" : isAnalyze ? "text-red-700" : "none"} outline-none`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </button>
                </div>
            </article>   
            
            <div className="w-full px-4 bg-white whitespace-nowrap h-full">
                <section className="mt-2 grid grid-cols-1 sm:grid-cols-2  gap-y-5">
                    {product.history && product.history.length > 0 ? product.history.map((history,index) => {
                        return(
                            <div key={index} className="flex items-center">
                                {history.type === "finished" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : history.type === "increase" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>                                  
                                ) : history.type === "decrease" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                    </svg>                                  
                                ) : history.type === "started" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                ) : history.type === "unchanged" && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                                <div className="mr-2">
                                    <p className="font-sans text-xs text-gray-500">{timeDifference(history.change_time)} پیش</p>
                                    {history.type === "finished" ? (
                                        <p className="font-sans  text-md font-bold">ناموجود شدن در {history.shop_name}</p>
                                    ) : history.type === "increase" ? (
                                        <p className="font-sans  text-md font-bold">افزایش قیمت در {history.shop_name}</p>
                                    ) : history.type === "decrease" ? (
                                        <p className="font-sans  text-md font-bold">کاهش قیمت در {history.shop_name}</p>
                                    ) : history.type === "started" ? (
                                        <p className="font-sans  text-md font-bold">موجود شدن در {history.shop_name}</p>
                                    ) : history.type === "unchanged" && (
                                        <p className="font-sans  text-md font-bold">بدون تغییر در {history.shop_name}</p>
                                    )}

                                    <p className="font-sans text-xs text-gray-500">از {toPersianPrice(history.price)} تومان به {toPersianPrice(history.new_price)} تومان</p>
                                </div>
                            </div>
                        )
                    }): (
                        <></>
                    )}
                </section>
            </div>   
            <div className="px-4 bg-white">
                <div className="h-60 ">
                    <ChartDetail chart={product.chart} />
                </div>
            </div>
        </section>
    );
}
 
export default AnalyticsComponent;