import ProductCommon from "@/common/ProductCommon";
import UserPageAside from "@/components/userPage/Aside";
import Layout from "@/layout/Layout";
import Styles from "@/components/productPage/product.module.css";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { useState } from "react";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import {fetchLikeFailure , fetchLikeSuccess} from '@/redux/like/likeActions'
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { addToCartSuccess } from "@/redux/cart/cart/cartActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import empty_image from '@/images/empty_likes.png'

const Favorites = () => {
     const [isAsideModal, setIsAsideModal] = useState(false);
     const {likes , loading} = useSelector(state => state.likes)
     
     return (
          <Layout isFooter={true}>
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <UserPageAside />

                    <section className="w-full lg:w-4/5 flex-0 h-max px-4 ">
                         <Modal open={isAsideModal || false} onClose={() => setIsAsideModal(false)} className="lg:hidden" >
                              <><UserPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={"sm:w-1/3 w-full"} /></>
                         </Modal>
                         <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center">
                                   <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer" >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                   </button>
                                   <span className="font-sans text-gray-800 font-bold text-xl">محبوب‌ها</span>
                              </div>
                         </div>
                         {!loading && likes.length === 0 && (
                              <div className="w-full flex justify-center my-7">
                                   <div className="w-full sm:w-1/2 flex flex-col items-center">
                                        <img className="w-full h-auto" src={empty_image.src} />
                                        <p className=" text-center leading-5 font-sans relative text-gray-500 sm:left-6 sm:w-4/6 text-xs">
                                             آخرین محصولاتی که دیده‌اید را می‌توانید اینجا پیدا کنید.
                                        </p>
                                   </div>
                              </div>
                         )}
                         {likes && (
                              <section className={Styles.productsParent}>
                                   {likes.map((product, index) => <ProductCommon key={index} product={product} />)}
                              </section>
                         )}
                    </section>
               </div>
          </Layout>
     );
};
export default Favorites;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async({req}) => {
     
     const token = returnTokenInServerSide({cookie : req.headers.cookie , key : "userToken"})
     if(!token) return {notFound : true}

     let ErrorCode = 0;
     
     if(token){
          // Fetch User Data     
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) =>  {
               dispatch(addToCartSuccess(data))
               dispatch(authSuccess(data.user))
          })  
          .catch(() => {
               ErrorCode = 403
               dispatch(authFailure("خطا در بخش احراز هویت"))    
          })
          // Fetch Likes Products
          await http.get(`user/favorites`, {headers : {authorization : token}})
          .then(({data}) => dispatch(fetchLikeSuccess(data.products)))
          .catch(error => dispatch(fetchLikeFailure("خطا در بخش گرفتن محصولات پسندیده شده")))
     }
     if(ErrorCode === 403){ return{notFound : true} }

     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})