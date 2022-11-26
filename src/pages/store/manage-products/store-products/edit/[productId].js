import StorePageAside from "@/components/manageStore/storeAside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import * as Yup from 'yup'
import ReactLoading from 'react-loading';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import { Modal } from "@mui/material";
import FormikInput from "@/common/admin/FormikInput";

// Date Picker
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker,{DateObject} from "react-multi-date-picker"
import { insertStoreProduct } from "@/redux/manage-store/insertProduct/manageStore_actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { deleteProduct, fetchProduct, updateStoreProduct } from "@/redux/manage-store/companyProducts/companyProducts_Actions";
import { setComma } from "@/utils/setComma";
//  <==
const InsertStoreProduct = () => {
    const dispatch = useDispatch();
    const [production_date, setProduction_date] = useState(new DateObject())
    const [expire_date, setExpire_date] = useState(new DateObject())
    const {query} = useRouter()
    const [isAsideModal,setIsAsideModal] = useState(false)
    const {product,loading} = useSelector(state => state.store_companyProducts.oneProduct)
    const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
    

    const validationSchema = Yup.object({
        production_price : Yup.string()
            .required("قیمت تولید الزامی است")
            .test("check-value-typeof","قیمت تولید باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        consumer_price : Yup.string()
            .required("قیمت مصرف کننده الزامی است")
            .test("check-value-typeof","قیمت مصرف کننده باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        store_price : Yup.string()
            .required("قیمت فروش الزامی است")
            .test("check-value-typeof","قیمت فروش باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        per_unit : Yup.string()
            .test("check-value-typeof","تعداد در واحد باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        warehouse_count : Yup.string()
            .test("check-value-typeof","موجودی انبار باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        delivery_description : Yup.string()
            .required("توضیحات ارسال کالا الزامی است")
            .max(5000,"توضیحات ارسال کالا نمی تواند بیشتر از 5000 نویسه باشد")
            .trim(),
        store_note : Yup.string()
            .required("توضیحات فروشنده الزامی است")
            .max(5000,"توضیحات فروشنده نمی تواند بیشتر از 5000 نویسه باشد")
            .trim(),
        discount : Yup.string()
            .test("check-value-typeof","تخفیف باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
        commission : Yup.string()
            .test("check-value-typeof","پورسانت بازاریابی محصول باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            .trim(),
    })

    useEffect(()=>{
        dispatch(fetchProduct({id : query.productId}))
    },[])

    const onSubmit = (values) => {
        dispatch(updateStoreProduct({product_id:product.id,baseProduct_id : product.base_product.id, values,production_date : production_date.toDate().toLocaleDateString('fa-IR') ,expire_date : expire_date.toDate().toLocaleDateString('fa-IR')}))
    }
    
    const formik = useFormik({
        onSubmit,
        validationSchema,
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            production_price : product && setComma(product.production_price) ||  "",
            consumer_price : product && setComma(product.consumer_price)  || "",
            store_price : product && setComma(product.store_price) || "",
            per_unit : product && setComma(product.per_unit) || "",
            warehouse_count : product && setComma(product.warehouse_count) || "",
            delivery_description : product && product.delivery_description || "",
            store_note : product && product.store_note || "",
            discount : product && setComma(product.discount) || "",
            commission : product && setComma(product.commission) || "",
        }
    })

    return (  
        <Layout isFooter={true} pageTitle={"پنل مدیریت | ویرایش کالا"}>
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
                            <h1 className="font-sans font-bold text-lg">ویرایش کالا</h1>
                        </div>
                        <div className="flex gap-x-2">
                            
                            <Link href={'/store/manage-products/store-products'}>
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
                    <form onSubmit={formik.handleSubmit}>
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {/* تاریخ تولید */}
                            <div className="flex flex-col ">
                                <p className="font-sans text-sm">تاریخ تولید :</p>
                                <DatePicker
                                    value={production_date}
                                    onChange={setProduction_date}
                                    calendar={persian}
                                    weekDays={weekDays}
                                    locale={persian_fa}
                                    placeholder="تاریخ تولید"
                                    rangeHover={"black"}
                                    className=" font-sans w-full"
                                    inputClass={"mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md"}
                                />
                            </div>
                            {/* تاریخ انقضا */}
                            <div className="flex flex-col ">
                                <p className={`font-sans text-sm  `}>تاریخ انقضا :</p>
                                <DatePicker
                                        value={expire_date}
                                        onChange={setExpire_date}
                                        calendar={persian}
                                        weekDays={weekDays}
                                        locale={persian_fa}
                                        placeholder="تاریخ انقضا"
                                        rangeHover={"black"}
                                        className=" font-sans w-full"
                                        inputClass={"mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md"}
                                />
                            </div>

                            <FormikInput isComma={true} name={"production_price"} title={"قیمت تولید"} formik={formik} placeholder={"قیمت تولید"} isRequired={true}  parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"consumer_price"} title={"قیمت مصرف کننده"} formik={formik} placeholder={"قیمت مصرف کننده"} isRequired={true}  parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"store_price"} title={"قیمت فروش"} formik={formik} placeholder={"قیمت فروش"} isRequired={true}  parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"per_unit"} title={"تعداد در واحد"} formik={formik} placeholder={"تعداد در واحد"} parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"warehouse_count"} title={"موجودی انبار"} formik={formik} placeholder={"موجودی انبار"} parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"discount"} title={"تخفیف"} formik={formik} placeholder={"تخفیف"} parentClassName={"flex flex-col relative"}/>
                            <FormikInput isComma={true} name={"commission"} title={"پورسانت بازاریابی محصول"} formik={formik} placeholder={"پورسانت بازاریابی محصول"} parentClassName={"flex flex-col relative"}/>

                        </section>
                        <div className="flex flex-col mt-4">
                            <p className="font-sans text-sm before:content-['*'] before:text-red-600">توضیحات ارسال کالا :</p>
                            <textarea value={formik.values.delivery_description} name='delivery_description' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="توضیحات ارسال کالا..." className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                            {formik.errors.delivery_description && formik.touched.delivery_description && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.delivery_description}</p>}
                        </div>

                        <div className="flex flex-col mt-4">
                            <p className="font-sans text-sm before:content-['*'] before:text-red-600">توضیحات فروشنده :</p>
                            <textarea value={formik.values.store_note} name='store_note' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="توضیحات فروشنده..." className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                            {formik.errors.store_note && formik.touched.store_note && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.store_note}</p>}
                        </div>

                            <section className=" flex justify-end mt-6 items-center gap-x-2">
                                {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                                {!loading && <button type={"button"} onClick={()=> dispatch(deleteProduct({id : product.id}))} className={`items-center ${product && product.is_show ? "bg-green-50 hover:bg-green-100  border-green-600 text-green-600 " : "bg-red-50 hover:bg-red-100  border-red-600 text-red-600 "}  flex border text-sm rounded-md py-[6px] px-5 font-sans`}>تغییر وضعیت</button>}
                                
                                <button  type={"submit"} disabled={loading} className={`flex items-center ${formik.isValid ? " hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>
                                    تایید تغییرات
                                </button>
                            </section>
                    </form>
                </section>
            </div>
        </Layout>
    );
}
 
export default InsertStoreProduct;

export const getServerSideProps = async(ctx) => {
    // Check Permission
    const token =  new Cookies( ctx.req.headers.cookie).get("userToken");
    let ErrorCode = 0;
    if(!token) return{notFound : true}
    await axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
    .then(({data}) =>  {
        if(data.user.account_type !== 'store') ErrorCode = 403
    })
    .catch(() => ErrorCode = 403)
    if(ErrorCode === 403){
        return{notFound : true}
    }
    return { props : {}}
}