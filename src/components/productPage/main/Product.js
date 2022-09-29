import { toPersianPrice } from '@/utils/toPersianPrice';
import Link from 'next/link';
import ProductSlider from '../ProductSlider';
import Styles from '@/pages/product/[hashId]/grid.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikes, likedAction } from '@/redux/like/likeActions';
import { useEffect } from 'react';
import { authPanel } from '@/redux/user/userActions';
import { analyzeAction, fetchAnalytics } from '@/redux/analytics/analyticsActions';



const Product = ({product}) => {
   
    const dispatch = useDispatch()
    const {likes , likesLoading} = useSelector(state => state.likes)
    const {analyticsLoading , analytics} = useSelector(state => state.analytics)
    const {user} = useSelector(state => state.auth)

    const isLiked = () => {
        const liked = likes &&  likes.find(item => item.hash_id === product.product.hash_id)
        if(liked) return true
    }
    const isLikeLoading = () => {
        const likeLoading = likesLoading && likesLoading.length > 0 && likesLoading.find(item => item.hash_id === product.product.hash_id)
        if(likeLoading){return true} return false;
    }
    const isAnalyze = () => {
        const analyze = analytics && analytics.find(item => item.hash_id === product.product.hash_id)
        if(analyze){return true}  
    };
    const isAnalyzeLoading = () => {
        const analyzeLoading_product = analyticsLoading && analyticsLoading.length > 0 && analyticsLoading.find(item => item.hash_id === product.product.hash_id)
        if(analyzeLoading_product){return true}
    };

    useEffect(()=>{
        dispatch(fetchLikes())
        dispatch(fetchAnalytics())
    },[])

    return (  
        <article className={`${Styles.product} overflow-hidden bg-white flex flex-col lg:flex-row lg:justify-between w-full lg:flex p-5`}>
            <div className=" flex justify-center items-center">
                <img className='w-auto h-auto ' src={product.product.image_url}/>
            </div>

            <section className=' md:pr-5 w-full flex flex-col justify-between mt-6 lg:mt-0 '>
                <p className='font-sans text-bold w-full text-right text-gray-800'>{product.product.title}</p>
                <p className='w-full text-right font-sans mt-6 text-red-600'>از {toPersianPrice(product.prices_range.min)} تومان تا {toPersianPrice(product.prices_range.max)} تومان</p>
                <div className='mt-6 max-w-[600px] 1360:max-w-[600px]'>
                    <ProductSlider models={product.models}/>
                </div>
                <div className='w-full  mt-6 flex flex-col-reverse md:flex-row justify-between'>
                    <Link href={product.cheapest_shop_url}>
                        <a className='whitespace-nowrap mt-4 md:mt-0 rounded-md py-3 md:py-2 px-4 font-bold text-center font-sans text-sm text-white bg-[#d73948]'>خرید از ارزان ترین فروشنده ریجستر شده</a>
                    </Link>
                    
                    <div className='  flex justify-between w-full'>

                        {/* //? Icons */}
                        <div className='flex pl-5 justify-end w-fit md:w-full'>
                        {/* //?Notification */}
                            <button  onClick={()=>{ user ? dispatch(analyzeAction({hash_id : product.product.hash_id})) : dispatch(authPanel(true))}} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill={ `${isAnalyzeLoading() ? "#fc6b62" : isAnalyze() ? "red" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${isAnalyzeLoading() ? "text-[#fc6b62]" : isAnalyze() ? "text-red-700" : "none"} outline-none`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>
                            {/* //?Heart */}
                            <button onClick={()=> user && user.phone_number ? dispatch(likedAction({hash_id : product.product.hash_id})) : dispatch(authPanel(true))} className='p-2 hover:bg-gray-100 rounded-full' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill={ `${isLikeLoading() ? "#fc6b62" : isLiked() ? "red" : "none"}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  ${isLikeLoading() ? "text-[#fc6b62]" :  isLiked() ? "text-red-700" : "none"} outline-none`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg> 
                            </button>
                            {/* //?Share */}
                            <button className='p-2 hover:bg-gray-100 rounded-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
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
    );
}
export default Product;