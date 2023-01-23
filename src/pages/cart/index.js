import Layout from "@/layout/Layout";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCartSuccess, deleteStoreInCart, fetchMainCartFailure, fetchMainCartSuccess } from "@/redux/cart/cart/cartActions";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { Backdrop, CircularProgress } from "@mui/material";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";


const CartPage = () => {
     const {data} = useSelector(state => state.cart.mainCartPage)
     const cart = useSelector(state => state.cart)
     const {cart_count} = cart
     const loading = cart.cart.loading;
     const dispatch = useDispatch()

     return (  
          <Layout isFooter={true} pageTitle="ترب | سبدهای خرید شما">
               <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading || false}>
                    <CircularProgress color="error" />
               </Backdrop>
               <section className="my-4 px-4 md:px-8">
                    <div  className="bg-white my-4 p-4 rounded-lg">
                         {cart_count > 0 ? (
                              <>
                                   <div className="flex">
                                        <h1 className="font-sans text-right">سبدهای خرید شما</h1>
                                        <span className="font-sans text-xs text-gray-600 mr-1">({toPersianDigits(cart_count)} عدد)</span>
                                   </div>
                                   <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-4">
                                        {data && data.length > 0 && data.map(data => (
                                             <article key={data.id}>
                                                  <div className="border border-gray-400 rounded-lg p-4">
                                                  <div className="flex justify-between w-full">
                                                       <div className="flex items-center">
                                                            <div className="border border-gray-300 p-1 rounded-md relative w-16 h-10 overflow-hidden">
                                                                 <Image unoptimized layout="fill" objectFit="cover" loader={()=>data.logo_image} src={data.logo_image} alt="" className="w-16 h-auto cursor-pointer" />
                                                            </div>
                                                            <span className="font-sans text-sm font-bold text-gray-700 mr-4">{data.title}</span>
                                                       </div>
                                                       <button onClick={()=> dispatch(deleteStoreInCart({store_id : data.id}))} className="">
                                                            {/* delete Icon */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                       </button>
                                                  </div>
                                                  <section className="flex gap-4 flex-wrap mt-4">
                                                       {data.products.map((product,index) => (
                                                            <div key={index} className="w-16">
                                                                 <img src={product.image_url} alt="" className="w-full h-auto cursor-pointer" />
                                                            </div>
                                                       ))}
                                                  </section>
                                                  <div className="w-full flex justify-between gap-x-4 mt-4">
                                                       <Link href={'/'}>
                                                            <a className="font-sans w-full hover:bg-red-50 duration-150 text-sm border border-gray-400 rounded-lg font-bold py-3 flex text-red-600 items-center justify-center">
                                                                 ادامه خرید
                                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600 mr-4">
                                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                                 </svg>
                                                            </a>
                                                       </Link>
                                                       <Link  href={`/cart/${data.id}`}>
                                                            <a className="text-center font-sans hover:bg-red-700 duration-150 w-full font-bold text-sm bg-red-600 text-white py-3 rounded-lg">تکمیل سفارش</a>
                                                       </Link>
                                                  </div>
                                                  </div>
                                             </article>
                                        ))}
                                   </section>
                              </>
                         ) : (
                              <section className="w-full">
                                   <div className="w-full flex flex-col items-center">
                                        <img src="https://www.digikala.com/statics/img/svg/empty-cart.svg" alt="empty cart image" className="w-72 h-auto" />
                                   <h3 className="font-sans font-bold text-center">سبد خرید شما خالی است!</h3>
                                   <Link href={'/'}>
                                        <a className="w-full mt-2 text-center text-red-600 hover:text-red-500 font-sans text-sm underline underline-offset-4">بازگشت به فروشگاه</a>
                                   </Link>
                                   </div>
                              </section>
                         )}
                    </div>
               </section>
          </Layout>
     );
}
export default CartPage;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({req}) => {
     
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     
       
     if(!token.includes("undefined")){ 
          // Fetch User Data     
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) =>  {
               dispatch(addToCartSuccess(data))
               dispatch(authSuccess(data.user))
          })  
          .catch(() => {
               dispatch(authFailure("خطا در بخش احراز هویت"))    
          })
     
          
          // Fetch Main Cart Data
          await http.get(`user/cart`,{headers : {authorization : token}})
          .then(({data}) => dispatch(fetchMainCartSuccess(data.stores)))
          .catch(() => dispatch(fetchMainCartFailure("خطای سرور در بخش اطلاعات فروشگاه در سبد خرید ")))
     }
     
     
     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})