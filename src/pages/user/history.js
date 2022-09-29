import ProductCommon from "@/common/ProductCommon";
import UserPageAside from "@/components/userPage/Aside";
import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, fetchHistory } from "../../redux/history/historyActions";
import Styles from '../../components/searchPage/product.module.css'
import empty_history from '../../images/empty_history1.png'
import ReactLoading from 'react-loading';
import { fetchLikes } from "../../redux/like/likeActions";
import { fetchAnalytics } from "../../redux/analytics/AnalyticsActions";

const History = () => {

    const [isAsideModal , setIsAsideModal] = useState(false)
    const dispatch = useDispatch()
    const {history , loading} = useSelector(state => state.history)
    const {user} = useSelector(state => state.auth)
    const {likes , likesLoading} = useSelector(state => state.likes)
    const {analytics , analyticsLoading} = useSelector(state => state.analytics)

    useEffect(()=>{
        dispatch(fetchHistory())
        dispatch(fetchLikes())
        dispatch(fetchAnalytics())
    },[])

    return (  
        <Layout isFooter={true}>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <UserPageAside/>

                <section className="w-full flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <>
                            <UserPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/>
                        </>
                    </Modal>
                    
                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading  type="spinningBubbles" height={50} width={50} color='red'/>
                        </div>
                    )}
                    {!loading && (
                        <div className="flex justify-between mt-5">
                            <div className="flex items-center">
                                <button onClick={()=>setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                                <span className="font-sans text-gray-800 font-bold text-xl">مشاهدات اخیر</span>
                            </div>
                            {history && history.length > 0 && <button onClick={()=> dispatch(deleteHistory())} className="font-sans  text-sm px-3 hover:text-red-600 rounded-lg py-2 hover:bg-red-100 border border-gray-100 hover:border-red-200 ">حذف مشاهدات اخیر</button>}
                        </div>
                    )}
                    {!loading &&  !history  && (
                        <div className="w-full flex justify-center my-7">
                            <div className="w-full sm:w-1/2 flex flex-col items-center">
                                <img className="w-full h-auto" src={empty_history.src}/>
                                <p className=" text-center leading-5 font-sans relative text-gray-500 sm:left-6 sm:w-4/6 text-xs">آخرین محصولاتی که دیده‌اید را می‌توانید اینجا پیدا کنید.</p>
                            </div>
                        </div>
                    )}
                    {history && history.length > 0 && (
                       <>

                            <section className={Styles.productsParent}>
                                {history.map((product,index) => {
                                    const isLiked = () => {
                                        const likedProduct = likes && likes.find(item => item.hash_id === product.hash_id)
                                        if(likedProduct){return true} return false
                                    };
                                    const isAnalyze = () => {
                                        const analyticsProduct = analytics && analytics.find(item => item.hash_id === product.hash_id)
                                        if(analyticsProduct){return true} return false
                                    };
                                    const isLikeLoading = () => {
                                        const loadingProduct = likesLoading && likesLoading.length > 0 && likesLoading.find(item => item.hash_id === product.hash_id)
                                        if(loadingProduct){return true} 
                                    };
                                    const isAnalyzeLoading = () => {
                                        const loadingProduct = analyticsLoading && analyticsLoading.length > 0 && analyticsLoading.find(item => item.hash_id === product.hash_id)
                                        if(loadingProduct){return true}
                                    };
                                    return( 
                                        <ProductCommon  
                                            user={user && user.phone_number ? true : false} 
                                            isLikeLoading={isLikeLoading()} 
                                            isAnalyzeLoading={isAnalyzeLoading()} 
                                            isLiked={isLiked()} 
                                            isAnalyze = {isAnalyze()}
                                            likes={likes} 
                                            key={index} 
                                            product={product}
                                        />
                                    )
                                })}
                            </section>
                       </>
                    )}
                </section>
            </div>
        </Layout>
    );
}
 
export default History;