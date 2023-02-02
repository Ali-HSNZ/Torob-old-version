import Layout from "@/layout/Layout";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import { Fragment } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { checkoutMainFetchFailure, checkoutMainFetchSuccess, confirmFactor, decreaseProductInCheckout, increaseProductInCheckout } from "@/redux/cart/checkout/checkoutActions";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import Error from "@/common/alert/Error";
import { cartDetails } from "@/redux/cart/cart/cartActions";

const CartStore = () => {
     const {data , loading , increaseOrDecreaseLoading} = useSelector(state => state.checkout)
     const dispatch = useDispatch()

     const limitHandler = (props) => {
          const limit = props?.limit || 0
          const count = props?.count || 0
          return count >= limit;
     }

     const isIncreaseOrDecreaseProductLoading = ({store_id}) => {
          if(increaseOrDecreaseLoading.length > 0){
               const availableStore = increaseOrDecreaseLoading.find(store => store.store_id === store_id)
               if(availableStore) return true ; else return false
          }else return false
     }

     return ( 
          <Layout isFooter={true} pageTitle="  ترب | سبد خرید">
               <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading || false}>
                    <CircularProgress color="error" />
               </Backdrop>
               <main className="flex w-full flex-col lg:flex-row justify-between gap-x-8 px-4 sm:px-8 my-4">
                    {data && data.cart.items.length > 0 ? (
                    <>
                         <section className="bg-white w-full rounded-lg p-4  h-fit">
                              <div className="flex items-center">
                                   <div className="w-14">
                                        <img className="w-full h-auto" src={data.store.logo_image} alt={`لوگو فروشگاه ${data.store.title}`}/>
                                   </div>
                                   <span className="font-sans text-sm mr-4">{data.store.title}</span>
                              </div>
                              <section className="mt-4">
                                   {data.cart.items.map((item,index) => (
                                        <Fragment key={index}>
                                             {index > 0 && <hr/>}
                                             <article className="flex">
                                                  <div className="w-16  flex items-center">
                                                       <img className="w-full h-auto" src={item.product.image_url}/>
                                                  </div>
                                                  <section className="w-full mr-4">
                                                       <div className="flex justify-between">
                                                            <span className="font-sans text-sm text-gray-700">{item.product.title}</span>
                                                            {item.price.discount_percent !== 0 && <span className="font-sans text-xs text-red-100 bg-red-600 rounded-lg py-1 px-3 font-bold flex items-center">{toPersianDigits(item.price.discount_percent)}%</span>}
                                                       </div>
                                                       <div className="flex justify-between items-center mt-4">
                                                            <div className="flex bg-white  border-2 border-red-500 rounded-md items-center overflow-hidden">
                                                                 {/* increase */}
                                                                 <button disabled={limitHandler({limit : item.state.limit , count : item.price.count})}  onClick={()=> dispatch(increaseProductInCheckout({product_id : item.item_id.product , store_id : item.item_id.store}))} className="font-sans text-sm p-2 text-gray-800 disabled:bg-red-100 disabled:cursor-not-allowed">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                      </svg>
                                                                 </button>
                                                                 { isIncreaseOrDecreaseProductLoading({store_id : item.item_id.store}) ? (
                                                                      <ReactLoading type="spinningBubbles" height={20} width={20} color="red" className="mr-2"/>
                                                                 ) : (
                                                                      <span className="font-sans text-base px-3">{toPersianDigits(item.price.count)}</span>
                                                                 )}
                                                                 {/* Decrease */}
                                                                 <button onClick={()=>dispatch(decreaseProductInCheckout({product_id : item.item_id.product , store_id : item.item_id.store}))} className="font-sans text-sm p-2">
                                                                      {item.price.count <= 1 ? (
                                                                           // Trash Icon
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                           </svg>
                                                                      ) : (
                                                                           // Decrease Icon
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                                           </svg>
                                                                      )}
                                                                 </button>
                                                            </div> 
                                                            <div>
                                                                 {item.price.is_discount && <p className="font-sans text-sm text-gray-500 line-through text-left">{toPersianPrice(item.price.original)}</p>}
                                                                 <p className="font-sans text-sm font-bold">{toPersianPrice(item.price.final)} تومان</p>
                                                            </div>
                                                       </div>
                                                  </section>
                                             </article>
                                             {item.state.is_show && item.state.message.map((message,index) => <Error key={index} text={message}/>)}
                                        </Fragment>
                                   ))}
                              </section>
                         </section>
                         <section className="bg-white w-full sm:min-w-[400px] sm:max-w-[400px] sm:w-[400px] p-4 rounded-lg h-fit mt-4 lg:mt-0">
                              <p className="font-sans font-bold text-sm text-gray-700">جزئیات فاکتور</p>
                              <div className="flex justify-between w-full mt-4">
                                   <div>
                                        <span className="font-sans text-sm text-gray-600">مجموع خرید شما</span>
                                        <span className="font-sans text-sm text-gray-400 mr-1">({toPersianPrice(2)} کالا)</span>
                                   </div>
                                   <span className="font-sans text-sm text-gray-600">{toPersianPrice(data.cart.cost.total_price)} تومان</span>
                              </div>
                              <hr className="border border-gray-100 border-dashed mt-4" />

                              <div className="flex justify-between w-full mt-4">
                                   <span className="font-sans text-sm text-gray-600">تخفیف</span>
                                   <div>
                                        <span className="font-sans text-sm text-gray-600">{data.cart.cost.discount_percent !== 0 ? toPersianDigits(data.cart.cost.discount_percent)+" درصد" : ""} </span>
                                        <span className="mx-1 font-sans text-gray-400">{data.cart.cost.discount_percent === 0 && data.cart.cost.discount_price === 0 ? "-" : "|"}</span>
                                        <span className="font-sans text-sm text-gray-600">{data.cart.cost.discount_price !== 0 ? toPersianPrice(data.cart.cost.discount_price)+" تومان " : ""} </span>
                                   </div>
                              </div>
                              <hr className="border border-gray-100 border-dashed mt-4" />

                              <div className="flex justify-between w-full mt-4">
                                   <span className="font-sans text-sm text-gray-600">مبلغ قابل پرداخت</span>
                                   <span className="font-sans text-sm text-gray-600">{toPersianPrice(data.cart.cost.final_price)} تومان</span>
                              </div>

                              <button onClick={()=>dispatch(confirmFactor({store_id : data.store.id}))} disabled={!data.cart.cost.payment_state} className="disabled:cursor-not-allowed font-bold disabled:bg-red-500 bg-red-600 hover:bg-red-700 duration-150 py-3 w-full rounded-lg font-sans text-red-200 mt-6">
                                   تایید و ثبت سفارش
                              </button>

                         </section>
                    </>
                    ) : (
                    <section className="bg-white w-full rounded-lg p-4  h-fit">
                         <section className="w-full">
                         <div className="w-full flex flex-col items-center">
                                   <img src="https://www.digikala.com/statics/img/svg/empty-cart.svg" alt="empty cart image" className="w-72 h-auto" />
                              <h3 className="font-sans font-bold text-center">سبد خرید شما در این فروشگاه خالی است!</h3>
                              <Link href={'/cart'}>
                                   <a className="w-full mt-2 text-center text-red-600 hover:text-red-500 font-sans text-sm underline underline-offset-4">بازگشت به سبد خرید</a>
                              </Link>
                         </div>
                         </section>
                    </section>
                    )}
               </main>
          </Layout>
     );
}
 
export default CartStore;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async({req , query}) => {
     
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     if(token.includes("undefined")) return {notFound : true}
     
     let ErrorCode = 0;

     if(!token.includes("undefined")){
          // Fetch User Data     
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) =>  {
               dispatch(cartDetails(data))
               dispatch(authSuccess(data.user))
          })  
          .catch(() => {
               ErrorCode = 403
               dispatch(authFailure("خطا در بخش احراز هویت"))    
          })

          if(query.storeId){
               // Fetch Checkout Data Via Store id
               await http.get(`user/cart/store/${query.storeId}`,{headers : {authorization : token}})
               .then(({data}) => dispatch(checkoutMainFetchSuccess(data)))
               .catch(error => dispatch(checkoutMainFetchFailure("خطای سرور در بخش گرفتن اطلاعات فروشگاه در پیش فاکتور ")))
          }
     }
  
     if(ErrorCode === 403){ return{notFound : true} }
  
     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})