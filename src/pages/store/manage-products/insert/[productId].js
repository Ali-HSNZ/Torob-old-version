import StorePageAside from "@/components/manageStore/storeAside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import * as Yup from 'yup'
import ReactLoading from 'react-loading';
import { Formik, Field, Form , FieldArray ,ErrorMessage} from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";

// Date Picker
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker,{DateObject} from "react-multi-date-picker"
//  <==
import { insertStoreProduct } from "@/redux/manage-store/manageStore/manageStore_actions";
import { useRouter } from "next/router";
import { setComma } from "@/utils/setComma";
import { ONLY_DIGIT_REGIX } from "@/utils/Regex";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { addToCartSuccess } from "@/redux/cart/cart/cartActions";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";
import { toPersianPrice } from "@/utils/toPersianPrice";

const InsertStoreProduct = () => {
     const dispatch = useDispatch();
     const [production_date, setProduction_date] = useState(new DateObject())
     const [expire_date, setExpire_date] = useState(new DateObject())
     const {query} = useRouter()
     const [isAsideModal,setIsAsideModal] = useState(false)
     const {loading} = useSelector(state => state.manage_store.products)
     const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]

     const validationSchema = Yup.object({
          product_discounts : Yup.array().of(
               Yup.object().shape({
                    discount_value : Yup.string()
                         .required("مقدار تخفیف الزامی است")
                         .trim()
                         .test("check-value-typeof","مقدار تخفیف باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
                    final_price : Yup.string()
                         .required("مبلغ بعد از تخفیف الزامی است")
                         .trim()
                         .test("check-value-typeof","مبلغ بعد از تخفیف باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
               })
          ),
          production_price : Yup.string()
               .test("check-value-typeof","قیمت تولید باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
               .trim(),
          consumer_price : Yup.string()
               .required("قیمت مصرف کننده الزامی است")
               .test("check-value-typeof","قیمت مصرف کننده باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
               .trim(),
          store_price : Yup.string()
               .required("قیمت فروش الزامی است")
               .test("check-value-typeof","قیمت فروش باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
               .trim(),
          per_unit : Yup.string()
               .required('تعداد در واحد الزامی است')
               .test("check-value-typeof","تعداد در واحد باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
               .trim(),
          warehouse_count : Yup.string()
               .test("check-value-typeof","موجودی انبار باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0))
               .trim(),
          cash_payment_discount : Yup.string()
               .test("check-value-typeof","تخفیف نقدی باید عدد باشد", (value="") => !isNaN(value && value.replace(/,/g, '') || ""))
               .test("check-degree","درصد تخفیف باید بین ۰ تا ۱۰۰ باشد", (value="") => {
                    if(Number(value) > 100 || Number(value) < 0){return false}
                    return true
               })
               .trim(),
          commission : Yup.string()
               .test("check-value-typeof","پورسانت بازاریابی محصول باید عدد باشد", (value="") => !isNaN(value && value.replace(/,/g, '') || ""))
               .test("check-degree","درصد پورسانت بازاریابی محصول باید بین ۰ تا ۱۰۰ باشد", (value="") => {
                    if(Number(value) > 100 || Number(value) < 0){return false}
                    return true
               })
               .trim(),
     })
     const onSubmit = (values) => {
          dispatch(insertStoreProduct({
               values,
               product_id:query.productId, 
               production_date : production_date.toDate().toLocaleDateString('fa-IR') ,
               expire_date : expire_date.toDate().toLocaleDateString('fa-IR')
          }))
     }

     // Show in "مقدار تخفیف"
     const calculateTotalPrice = ({price , count , type}) => {
          if(type == "count"){
               if(ONLY_DIGIT_REGIX.test(price && price.replace(/,/g, '')) && ONLY_DIGIT_REGIX.test(count && count.replace(/,/g, ''))){
                    const total = price.replace(/,/g, '') * count.replace(/,/g, '');
                    return <p className="font-sans text-xs whitespace-nowrap pt-2 font-bold">قیمت {toPersianPrice(count)} کالا : {toPersianPrice(total)} تومان</p>
               }
          }
          return ``
     }

     return (  
          <Layout isFooter={true} pageTitle={"پنل مدیریت | افزودن کالا"}>
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <StorePageAside/>
               
                    <section  className=" w-full lg:w-4/5 flex-0 h-max p-4">
                         <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                         <><StorePageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                         </Modal>
                         <div className="flex justify-between w-full items-center">
                         <div className="flex items-center">
                              <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                   </svg>
                              </button>
                              <h1 className="font-sans font-bold text-lg">ثبت کالا</h1>
                         </div>
                         <div className="flex gap-x-2">
                              <Link href={'/store/manage-products/insert'}>
                                   <a className=" items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2 px-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                   </a>
                              </Link>
                              <Link href={'/store'}>
                                   <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                   </a>
                              </Link>
                         </div>
                         </div>
                         <Formik 
                              onSubmit={onSubmit}
                              validationSchema={validationSchema}
                              validateOnMount={true}
                              initialValues={{
                                   production_price :  "",
                                   consumer_price : "",
                                   store_price : "",
                                   per_unit : "",
                                   warehouse_count : "",
                                   delivery_description : "",
                                   store_note : "",
                                   cash_payment_discount : "",
                                   commission : "",
                                   product_discounts : []
                              }}>
                              {({ errors, touched ,values ,isValid}) => {
                                   return (
                                        <Form>
                                             <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                             <p className="font-sans font-bold"> مشخصات کالا | تعداد</p>
                                             <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                                  <div className="flex flex-col ">
                                                       <p className="font-sans text-sm">تاریخ تولید :</p>
                                                       <DatePicker
                                                            value={production_date}
                                                            onChange={setProduction_date}
                                                            calendar={persian}
                                                            weekDays={weekDays}
                                                            locale={persian_fa}
                                                            rangeHover={"black"}
                                                            className=" font-sans w-full"
                                                            inputClass={"mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md"}
                                                       />
                                                  </div>
                                                  <div className="flex flex-col ">
                                                       <p className={`font-sans text-sm  `}>تاریخ انقضا :</p>
                                                       <DatePicker
                                                                 value={expire_date}
                                                                 onChange={setExpire_date}
                                                                 calendar={persian}
                                                                 weekDays={weekDays}
                                                                 locale={persian_fa}
                                                                 rangeHover={"black"}
                                                                 className=" font-sans w-full"
                                                                 inputClass={"mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md"}
                                                       />
                                                  </div>
                                                  <div className={'flex flex-col'}>
                                                       <div className="w-auto flex flex-col items-right gap-x-1">
                                                            <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>تعداد در واحد :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`per_unit`} 
                                                                 value={setComma(values.per_unit)}
                                                                 className={`${errors.per_unit &&  touched.per_unit ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                                 />
                                                       </div>
                                                       {errors.per_unit && touched.per_unit && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.per_unit}</p>}
                                                  </div>
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800 `}>موجودی انبار :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}     
                                                                 name={`warehouse_count`} 
                                                                 value={setComma(values.warehouse_count)}
                                                                 className={`${errors.warehouse_count &&  touched.warehouse_count ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.warehouse_count && touched.warehouse_count && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.warehouse_count}</p>}
                                                  </div>
                                             </section>
                                             </div>

                                             <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                             <p className="font-sans font-bold"> قیمت</p>
                                             <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800`}>قیمت تولید :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`production_price`}
                                                                 value={setComma(values.production_price)}
                                                                 className={`${errors.production_price &&  touched.production_price ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.production_price && touched.production_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.production_price}</p>}
                                                  </div>
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>قیمت مصرف کننده :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`consumer_price`} 
                                                                 value={setComma(values.consumer_price)}
                                                                 className={`${errors.consumer_price &&  touched.consumer_price ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.consumer_price && touched.consumer_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.consumer_price}</p>}
                                                  </div>
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>قیمت فروش :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`store_price`} 
                                                                 value={setComma(values.store_price)}
                                                                 className={`${errors.store_price &&  touched.store_price ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.store_price && touched.store_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.store_price}</p>}
                                                  </div>
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800 `}>پورسانت بازاریابی محصول (درصد) :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`commission`} 
                                                                 value={values.commission}
                                                                 className={`${errors.commission &&  touched.commission ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.commission && touched.commission && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.commission}</p>}
                                                  </div>
                                             </section>
                                             </div>

                                             <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                             <p className="font-sans font-bold"> تخفیف</p>
                                             <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                                  <div className={'flex flex-col'}>
                                                       <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                            <p className={`font-sans text-sm text-gray-800 `}>تخفیف نقدی (درصد) :</p>
                                                            <Field 
                                                                 type="text" 
                                                                 autoComplete={"off"}
                                                                 name={`cash_payment_discount`} 
                                                                 value={values.cash_payment_discount}
                                                                 className={`${errors.cash_payment_discount &&  touched.cash_payment_discount ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                                                            />
                                                       </section>
                                                       {errors.cash_payment_discount && touched.cash_payment_discount && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.cash_payment_discount}</p>}
                                                  </div>
                                             </section>
                                             <FieldArray 
                                                  name="product_discounts"
                                                  render={arrayHelpers  => (
                                                       <div className="flex flex-col mt-4">
                                                            <div className="font-sans text-sm before:content-['*'] before:text-red-600">
                                                                 تخفیف پله‌ایی :
                                                                 <button onClick={() => arrayHelpers.push({ discount_value: '', final_price: '' , discount_type : 'count' })} type="button" className="mr-2 font-sans text-xs text-blue-700 underline underline-offset-4 hover:text-red-700">(تخفیف جدید)</button>
                                                            </div>
                                                            {values.product_discounts && values.product_discounts.length > 0 && (values.product_discounts.map((discount , index) => {
                                                                 return (
                                                                      <section key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-4 gap-4 bg-[#FCFCFC] border border-gray-200 p-4 rounded-lg">
                                                                           <div className="flex items-start flex-col ">
                                                                                <p className="font-sans text-sm whitespace-nowrap">نوع تخفیف : </p>
                                                                                <section className="w-full flex justify-between  gap-x-2 mt-2">
                                                                                     <div className="flex w-full">
                                                                                          <Field type="radio"  name={`product_discounts.${index}.discount_type`} id={`discountType_count_${index}`} value="count"  className="peer hidden"/>
                                                                                          <label htmlFor={`discountType_count_${index}`} className=" text-gray-500 whitespace-nowrap bg-white peer-checked:text-black peer-checked:border-gray-700 font-sans text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 pl-4 pr-4">تعداد کالا</label>
                                                                                     </div>
                                                                                     <div className="flex w-full">
                                                                                          <Field type="radio" name={`product_discounts.${index}.discount_type`} id={`discountType_price_${index}`} value="price"  className="peer hidden"/>
                                                                                          <label htmlFor={`discountType_price_${index}`} className=" text-gray-500  bg-white peer-checked:text-black peer-checked:border-gray-700 font-sans text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">قیمت</label>
                                                                                     </div>
                                                                                </section>
                                                                           </div>
                              
                                                                           <div className="flex items-start flex-col">
                                                                                <p className="font-sans text-sm whitespace-nowrap">مقدار تخفیف : </p>
                                                                                <Field 
                                                                                     type="text" 
                                                                                     autoComplete={"off"}
                                                                                     value={setComma(values.product_discounts[index].discount_value)}
                                                                                     name={`product_discounts.${index}.discount_value`}
                                                                                     placeholder={ values.product_discounts[index].discount_type === "price" ? "قیمت (تومان)" : "تعداد"}
                                                                                     className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                                                />
                                                                                {calculateTotalPrice({type : values.product_discounts[index].discount_type , price : values.store_price , count : values.product_discounts[index].discount_value})}
                                                                                <ErrorMessage  name={`product_discounts.${index}.discount_value`}>{message => <p className={'text-red-600 font-sans text-xs pt-2'}>{message}</p>}</ErrorMessage>
                                                                           </div>
                              
                                                                           <div className="flex flex-col items-start" >
                                                                                <p className="font-sans text-sm whitespace-nowrap"> مبلغ بعد از تخفیف : </p>
                                                                                <div className="flex flex-row w-full mt-2">
                                                                                     <Field 
                                                                                          type="text" 
                                                                                          autoComplete={"off"}
                                                                                          name={`product_discounts.${index}.final_price`}
                                                                                          value={setComma(values.product_discounts[index].final_price)}
                                                                                          placeholder={"قیمت (تومان)"}
                                                                                          className="w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                                                     />
                                                                                     <div className="flex items-center">
                                                                                          {/* Delete  Discount Button */}
                                                                                          <button type="button" onClick={() => arrayHelpers.remove(index)} className=" items-center hover:bg-red-100 bg-red-50 flex border border-[#c32e2e] text-[#cc3d3d] rounded-md py-2 px-3 mr-2">
                                                                                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                                               </svg>
                                                                                          </button>
                                                                                     </div>
                                                                                </div>
                                                                                <ErrorMessage  name={`product_discounts.${index}.final_price`}>{message => <p className={'text-red-600 font-sans text-xs pt-2'}>{message}</p>}</ErrorMessage>

                                                                           </div>
                                                                      </section>
                                                                 )
                                                            }))}
                                                       </div>
                                                  )}>
                                             </FieldArray>
                                             </div>
                                             <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                             <p className="font-sans font-bold">توضیحات</p>
          
                                             <div className="flex flex-col mt-4">
                                                  <p className="font-sans text-sm">توضیحات ارسال کالا :</p>
                                                  <Field as='textarea'
                                                       name="delivery_description"
                                                       className={`${errors.delivery_description &&  touched.delivery_description ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md leading-8`}
                                                  />
                                                  {errors.delivery_description && touched.delivery_description && <p className="mt-2 font-sans text-xs text-red-700">{errors.delivery_description}</p>} 
                                             </div>
               
                                             <div className="flex flex-col mt-4">
                                                  <p className="font-sans text-sm">توضیحات فروشنده :</p>
                                                  <Field as='textarea'
                                                       name="store_note"
                                                       className={`${errors.store_note &&  touched.store_note ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md leading-8`}
                                                  />
                                                  {errors.store_note && touched.store_note && <p className="mt-2 font-sans text-xs text-red-700">{errors.store_note}</p>} 
                                             </div>
                                             </div>
          
                                             <div className="mt-6 w-full flex justify-end gap-x-2">
                                                  <section className=" flex justify-end  items-center ">
                                                       {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                                                       <button disabled={loading} type={"submit"} className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : isValid})}>
                                                            ثبت کالا
                                                       </button>
                                                  </section>
                                             </div>
                                        </Form>
                                   )    
                              }}
                         </Formik>
                    </section>
               </div>
          </Layout>
     );
}
     
     export default InsertStoreProduct;

     export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {

          // Check Permission
          const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
               
          let ErrorCode = 0;
          if(token.includes("undefined")) return {notFound : true}

          // Fetch User Data     
               await http.get("user", {headers : {authorization : token}})
               .then(({data}) =>  {
                    if(data.user.account_type !== 'store') ErrorCode = 403
                    if(data.user.is_pending === true ) ErrorCode = 403;
                    else {
                         dispatch(addToCartSuccess(data))
                         dispatch(authSuccess(data.user))
                    }
               })  
               .catch(() => {
                    ErrorCode = 403
                    dispatch(authFailure("خطا در بخش احراز هویت"))    
               })

          if(ErrorCode === 403){return{notFound : true}}
               
          // Fetch Navbar Categories
          await http.get(`public/categories`)
          .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
          .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))     
     })