import StorePageAside from "@/components/manageStore/storeAside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import * as Yup from 'yup'
import ReactLoading from 'react-loading';
import { Formik, Field, Form , FieldArray ,ErrorMessage} from 'formik';
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
import { setComma } from "@/utils/setComma";
import { toPersianDigits } from "@/utils/toPersianDigits";
//  <==
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
                    .test("check-value-typeof","مقدار تخفیف باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || "")),
                final_price : Yup.string()
                    .required("مبلغ بعد از تخفیف الزامی است")
                    .trim()
                    .test("check-value-typeof","مبلغ بعد از تخفیف باید عدد باشد", value => !isNaN(value && value.replace(/,/g, '') || ""))
            })
        ),
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
    const onSubmit = (values) => {
        dispatch(insertStoreProduct({
            values,
            product_id:query.productId, 
            production_date : production_date.toDate().toLocaleDateString('fa-IR') ,
            expire_date : expire_date.toDate().toLocaleDateString('fa-IR')
        }))
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
                        initialValues={{
                            production_price :  "",
                            consumer_price : "",
                            store_price : "",
                            per_unit : "",
                            warehouse_count : "",
                            delivery_description : "",
                            store_note : "",
                            discount : "",
                            commission : "",
                            product_discounts : [
                                {
                                    discount_value : '', // 0 - 100 -  NUMBER 
                                    final_price : '' , // Price
                                    discount_type : 'count', // count or price
                                },
                            ]
                        }}
                        >
                            {({ errors, touched ,values}) => {
                                return (
                                    <Form>
                                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>قیمت تولید :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`production_price`} 
                                                        placeholder={"قیمت تولید"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.production_price && touched.production_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.production_price}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>قیمت مصرف کننده :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`consumer_price`} 
                                                        placeholder={"قیمت مصرف کننده"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.consumer_price && touched.consumer_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.consumer_price}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600`}>قیمت فروش :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`store_price`} 
                                                        placeholder={"قیمت فروش"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.store_price && touched.store_price && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.store_price}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 `}>تعداد در واحد :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`per_unit`} 
                                                        placeholder={"تعداد در واحد"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.per_unit && touched.per_unit && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.per_unit}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 `}>موجودی انبار :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`warehouse_count`} 
                                                        placeholder={"موجودی انبار"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.warehouse_count && touched.warehouse_count && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.warehouse_count}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 `}>تخفیف :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`discount`} 
                                                        placeholder={"تخفیف"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.discount && touched.discount && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.discount}</p>}
                                            </div>
                                            <div className={'flex flex-col'}>
                                                <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                                                    <p className={`font-sans text-sm text-gray-800 `}>پورسانت بازاریابی محصول :</p>
                                                    <Field 
                                                        type="text" 
                                                        name={`commission`} 
                                                        placeholder={"پورسانت بازاریابی محصول"}
                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                    />
                                                </section>
                                                {errors.commission && touched.commission && <p className={'text-red-600 font-sans text-xs pt-2'}>{errors.commission}</p>}
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
                                                            <section key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-4 gap-4 bg-white p-4 rounded-lg">
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
                                                                        value={setComma(values.product_discounts[index].discount_value)}
                                                                        name={`product_discounts.${index}.discount_value`}
                                                                        placeholder={ values.product_discounts[index].discount_type === "price" ? "قیمت (تومان)" : "تعداد"}
                                                                        className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                                    />
                                                                    <ErrorMessage  name={`product_discounts.${index}.discount_value`}>{message => <p className={'text-red-600 font-sans text-xs pt-2'}>{message}</p>}</ErrorMessage>
                                                                </div>
                
                                                                <div className="flex flex-col items-start" >
                                                                    <p className="font-sans text-sm whitespace-nowrap"> مبلغ بعد از تخفیف : </p>
                                                                    <div className="flex flex-row w-full mt-2">
                                                                        <Field 
                                                                            type="text" 
                                                                            name={`product_discounts.${index}.final_price`}
                                                                            value={setComma(values.product_discounts[index].final_price)}
                                                                            placeholder={"قیمت (تومان)"}
                                                                            className="w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                                                                        />
                                                                        <div className="flex items-center">
                                                                            {index > 0 && <button type="button" onClick={() => arrayHelpers.remove(index)} className=" items-center hover:bg-red-100 bg-red-50 flex border border-[#c32e2e] text-[#cc3d3d] rounded-md py-2 px-3 mr-2">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                                                </svg>
                                                                            </button>}
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
        
                                        <div className="flex flex-col mt-4">
                                            <p className="font-sans text-sm before:content-['*'] before:text-red-600">توضیحات ارسال کالا :</p>
                                            <Field as='textarea'
                                                name="delivery_description"
                                                placeholder="توضیحات ارسال کالا..."
                                                className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "
                                            />
                                            {errors.delivery_description && touched.delivery_description && <p className="mt-2 font-sans text-xs text-red-700">{errors.delivery_description}</p>} 
                                        </div>
        
                                        <div className="flex flex-col mt-4">
                                            <p className="font-sans text-sm before:content-['*'] before:text-red-600">توضیحات فروشنده :</p>
                                            <Field as='textarea'
                                                name="store_note"
                                                placeholder="توضیحات فروشنده..."
                                                className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "
                                            />
                                            {errors.store_note && touched.store_note && <p className="mt-2 font-sans text-xs text-red-700">{errors.store_note}</p>} 
                                        </div>
        
                                        <div className="mt-6 w-full flex justify-end gap-x-2">
                                            <section className=" flex justify-end  items-center ">
                                                {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                                                <button  type={"submit"} disabled={loading} className={`flex items-center hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer py-[6px] px-6 font-sans  text-sm rounded-md`}>
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