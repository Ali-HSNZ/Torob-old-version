import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import ManageStoreAside from "@/components/manageStore/storeAside";
import Link from "next/link";
import FormikInput from "@/common/admin/FormikInput";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { ONLY_DIGIT_REGIX } from "@/utils/Regex";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { changeMinShoppingCount } from "@/redux/manage-store/settings/storeSettings.actions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";

const StoreSettingsPage = () => {


     const [isAsideModal , setIsAsideModal] = useState(false)
     const {loading} = useSelector(state => state.storeSetting)
     const {user} = useSelector(state => state.auth)
     const {data} = useSelector(state => state.storeSetting)
     const dispatch = useDispatch()
     
     const onSubmit = (values) => {
          dispatch(changeMinShoppingCount(values))
     }

     const validationSchema = Yup.object({
        min_shopping_count : Yup.string()
            .required("مقدار حداقل خرید الزامی است")
            .trim()
            .test("check-value-typeof","مقدار حداقل خرید باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
            .test("check-equal-value","مقدار حداقل خرید از فروشگاه نمی‌تواند یکسان با مقدار  فعلی باشد.", (value = 0) => data ? data?.store?.minimum_shopping_count != value : user?.min_shopping_count != value),
     })

     const formik = useFormik({
          onSubmit,
          initialValues : {
               min_shopping_count : user?.min_shopping_count ?? "",
          },
          validationSchema,
          validateOnMount : true,
     })

     return (  
          <Layout isFooter={true} pageTitle="پنل فروشگاه | تنظیمات">
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <ManageStoreAside/>
                         
                    <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                         <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                              <><ManageStoreAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                         </Modal>
                         <div className="flex justify-between w-full items-center mt-4">
                         <div className="flex items-center">
                              <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                   </svg>
                              </button>
                              <h1 className="font-sans font-bold text-lg text-gray-800">تنظیمات</h1>
                         </div>
                         <nav className="flex gap-x-2 items-center">
                              {/* Home SVG */}
                              <Link href={'/store'}>
                                   <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                   </a>
                              </Link>
                         </nav>
                         </div>
                         <form onSubmit={formik.handleSubmit}>
                         <section className="w-full pb-4 ">
                              <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">

                                   <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                        <FormikInput  isRequired={true} name={"min_shopping_count"} title={"حداقل خرید از فروشگاه" } formik={formik} parentClassName="flex flex-col relative"/>
                                   </section>
                                   <div className="mt-4 w-full flex justify-end">
                                        {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                                        <button disabled={loading} type={"submit"} className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : loading ? !loading : formik.isValid})}> ثبت تغییرات</button>
                                   </div>
                              </div>
                         </section>
                         </form>
                    </section>
               </div>
          </Layout>
     );
}
export default StoreSettingsPage;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {
     // Check Permission
     const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
     if(token.includes("undefined")) return {notFound : true}
          
     let ErrorCode = 0;

     if(!token.includes("undefined")){
          // Fetch User Data     
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) =>  {
               if(data.user.account_type !== 'store') ErrorCode = 403
               if(data.user.is_pending === true ) ErrorCode = 403;
               else {
                    dispatch(cartDetails(data))
                    dispatch(authSuccess(data.user))
               }
          })  
          .catch(() => {
               ErrorCode = 403
               dispatch(authFailure("خطا در بخش احراز هویت"))    
          })
     }
     if(ErrorCode === 403){return{notFound : true}}

     // Fetch SearchBar Data With User Token
     await http.get(`public/searchbar`,{headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
     .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

     // Fetch Nav Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})