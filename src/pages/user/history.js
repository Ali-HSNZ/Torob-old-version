import ProductCommon from "@/common/ProductCommon";
import UserPageAside from "@/components/userPage/Aside";
import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, fetchHistory, historyFailure, historySuccess } from "@/redux/history/historyActions";
import Styles from "@/common/productsParent_grid.module.css";
import empty_history from "@/images/empty_history1.png";
import ReactLoading from "react-loading";
import { wrapper } from "@/redux/store";
import http, { requestError, returnTokenInServerSide } from "src/services/http";
import { addToCartSuccess } from "@/redux/cart/cart/cartActions";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";

const History = () => {
     const [isAsideModal, setIsAsideModal] = useState(false);
     const dispatch = useDispatch();
     const { history, loading } = useSelector(state => state.history);

     console.log("history : ",history);

     return (
          <Layout isFooter={true} pageTitle={"ترب | مشاهدات اخیر"}>
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <UserPageAside />
                    <section className="w-full flex-0 h-max px-4 ">
                         <Modal open={isAsideModal || false} onClose={() => setIsAsideModal(false)} className="lg:hidden">
                              <><UserPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={"sm:w-1/3 w-full"} /></>
                         </Modal>

                         {loading && (
                              <div className="w-full flex justify-center my-8">
                                   <ReactLoading type="spinningBubbles" height={50} width={50} color="red" /> 
                              </div>
                         )}
                         {!loading && (
                              <div className="flex justify-between mt-5">
                                   <div className="flex items-center">
                                        <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                             </svg>
                                        </button>
                                        <span className="font-sans text-gray-800 font-bold text-xl">مشاهدات اخیر</span>
                                   </div>
                                   {history && history.length > 0 && (
                                        <button onClick={() => dispatch(deleteHistory())} className={buttonClassName({bgColor : "red" , isOutline : true , isValid : true})}>
                                             حذف مشاهدات اخیر
                                        </button>
                                   )}
                              </div>
                         )}
                         {!loading && history.length === 0 && (
                              <div className="w-full flex justify-center my-7">
                                   <div className="w-full sm:w-1/2 flex flex-col items-center">
                                        <img className="w-full h-auto" src={empty_history.src} />
                                        <p className=" text-center leading-5 font-sans relative text-gray-500 sm:left-6 sm:w-4/6 text-xs">
                                             آخرین محصولاتی که دیده‌اید را می‌توانید اینجا پیدا کنید.
                                        </p>
                                   </div>
                              </div>
                         )}
                         {history.length > 0 && (
                              <section className={Styles.productsParent}>
                                   {history.map((product, index) => <ProductCommon key={index} product={product} />)}
                              </section>
                         )}
                    </section>
               </div>
          </Layout>
     );
};
export default History;

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

          // Fetch History Products
          await http.get(`user/history`, {headers : {authorization: token}})
          .then( ({data}) => dispatch(historySuccess(data.products)))
          .catch(error => {
               requestError({error : error?.response?.data?.errors , defaultMessage : "خطای سرور در بخش گرفتن لیست محصولات بازدیدشده"})
               dispatch(historyFailure("خطای سرور در بخش گرفتن لیست محصولات بازدیدشده"))
          })
     }
     if(ErrorCode === 403){ return{notFound : true} }

     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})