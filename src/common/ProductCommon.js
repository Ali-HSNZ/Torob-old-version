import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { analyzeAction } from "@/redux/analytics/analyticsActions";
import { likedAction } from "@/redux/like/likeActions";
import { authPanel } from "@/redux/user/userActions";
import Image from "next/image";

const ProductCommon = ({product , isLiked , isLikeLoading , user , isAnalyze , isAnalyzeLoading}) => {
    const dispatch = useDispatch() 
    
    return (  
        <section  className="bg-white rounded-md w-full h-full min-w-[200px] px-4 flex flex-col items-center">
            <Link href={`/product/${product.hash_id}/${product.title.replace(/\s+/g, '-')}`}>
                <a className="w-24   lg:w-32 flex justify-center pt-4 relative  ">
                    {/* <img src={product.image_url} className="w-full h-auto"/> */}
                    <Image 
                        placeholder="blur" 
                        blurDataURL={product.image_url} 
                        unoptimized 
                        loader={()=>product.image_url} 
                        width={'150px'} 
                        height={'150px'} 
                        layout={'intrinsic'} 
                        src={product.image_url} 
                        alt={`عکس ${product.title.length > 33 ? product.title.substring(0,33)+"..." : product.title} `}
                    />
                </a>
            </Link>
            <Link href={`/product/${product.hash_id}/${product.title.replace(/\s+/g, '-')}`}>
                <a className="font-sans text-sm text-right w-full mt-5 text-gray-800">{product.title}</a>
            </Link>
            <div className=" flex  flex-col justify-end w-full mt-5 flex-1 gap-y-2">
                <h6 className={`font-sans text-sm  ${product.price_start===0 ? "text-red-600" : "text-gray-800"}`}>{product.price_start === 0 ? "ناموجود" :  toPersianPrice(product.price_start)+" تومان " }</h6>
                <h6 className="font-sans text-sm text-gray-500">در {toPersianDigits(product.shops_count)} فروشگاه</h6>
            </div>
            <div className="flex my-4 justify-between w-full px-9">
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
        </section>
    );
}
export default ProductCommon;