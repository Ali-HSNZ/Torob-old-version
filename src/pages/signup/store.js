import Layout from "@/layout/Layout";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup'
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { provinces } from "src/static/provinces";
import SelectBox from "@/common/SelectBox";
import { useEffect } from "react";
import { allCities } from "src/static/cities";
import ReactLoading from 'react-loading';
import FormikInput from "@/common/FormikInput";
import { ONLY_DIGIT_REGIX, ONLY_PERSIAN_ALPHABET, PASSWORD_REGIX, PHONE_NUMBER_REGIX } from "@/utils/Regex";
import { insertStoreAction } from "@/redux/signup/signupActions";
import http, { returnTokenInServerSide } from "src/services/http";
import { wrapper } from "@/redux/store";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";

const InsertStorePage = ({numbers}) => {

    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.signupReducer)
    const [isAsideModal,setIsAsideModal] = useState(false)
    const [provienceQuery,setProvienceQuery] = useState('')
    const [cities,setCities] = useState(null)    
    const [cityQuery , setCityQuery] = useState("")
    const [selectedProvience,setSelectedProvience] = useState("")
    const [selectedCity,setSelectedCity] = useState("")

    const filteredProvinces = provienceQuery === '' ? provinces : provinces && provinces.filter((province) => province.name.toLowerCase().replace(/\s+/g, '').includes(provienceQuery.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredCities = cityQuery === '' ? cities : cities && cities.filter((city) => city.name.toLowerCase().replace(/\s+/g, '').includes(cityQuery.toLocaleLowerCase().replace(/\s+/g, '')))


    const [isImage_logo_Modal ,setIsImage_logo_Modal] = useState(false)
    const [isImage_license_Modal ,setIsImage_license_Modal] = useState(false)
    const [isImage_storeBanner_Modal ,setIsImage_storeBanner_Modal] = useState(false)

    const [onChangeFile_license , setOnChangeFile_license] = useState({imageUrl : null , selectedFile : null})
    const [onChangeFile_logo , setOnChangeFile_logo] = useState({imageUrl : null , selectedFile : null})
    const [onChangeFile_storeBanner , setOnChangeFile_storeBanner] = useState({imageUrl : null , selectedFile : null})

    const image_license_Input_ref = useRef()
    const image_logo_Input_ref = useRef()
    const image_storeBanner_Input_ref = useRef()

    const checkImageFormat = (fileName) => {
        const type =  fileName.split('.').pop();
        const valid = ['png','jpg','jpeg','webp']
        if(!valid.includes(type.toLocaleLowerCase())){
            return false
        }
        return true
    }

    const changeFIleAction_input = (input,min,max,setOnChangeFile,title,minTitle,maxTitle,ref) => {
        const image = input.target.files[0]
        if(input.target.files && image){
            if(!checkImageFormat(image.name)){
                toast.error(`تصویر ${title} معتبر نیست`)
                ref.current.value = null
                return false
            }
            if(Number(image.size) < (min*1000)){
                toast.error(`تصویر ${title} نمی تواند کمتر از ${toPersianDigits(minTitle)} باشد`)
                ref.current.value = null
                return false
            } 
            if(Number(image.size) > (max*1000)){
                toast.error(`تصویر ${title} نمی تواند بیشتر از ${toPersianDigits(maxTitle)}  باشد`)
                ref.current.value = null
                return false
            }
            setOnChangeFile({selectedFile : image , imageUrl : URL.createObjectURL(image)})
        }
    }

    useEffect(()=>{
        setSelectedCity('')
        const id = selectedProvience && selectedProvience.id || null;
        if(id){
            const cities = allCities.filter(city => city.province_id === selectedProvience.id)
            setCities(cities)
        }else{
            setCities(null)
        }
    },[selectedProvience])
    
    
    const onSubmit = (values) => {
        const city = selectedCity && selectedCity.name || null
        const province = selectedProvience && selectedProvience.name || null
        if(!onChangeFile_logo.selectedFile){
            toast.error('عکس لوگو نمی تواند خالی باشد'); return false
        } 
        if(!province){
            toast.error('حوضه فعالیت شرکت (استان) را وارد کنید'); return false
        } 
        if(!city){
            toast.error('حوضه فعالیت شرکت (شهر) را وارد کنید'); return false
        }
        dispatch(insertStoreAction({values,onChangeFile_logo,onChangeFile_license,onChangeFile_storeBanner,city,province}))
    }
    
    const validationSchema = Yup.object({
     warehouse_number : Yup.string()
          .test('warehouse_number_checkLength' , "شماره تلفن ثابت انبار مرکزی معتبر نیست." , (value = "") => {
               const warehouseNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '')
               if(warehouseNumber.length > 0){
                    if(warehouseNumber.length < 11) return false
               };
               return true
          })
          .test("check Availability" , "این شماره توسط شخص دیگری به ثبت رسیده است" ,  (value = "") => {
               const warehouseNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '')
               return !numbers.numbers.includes(warehouseNumber)
          })
          ,
     bank_card_number : Yup.string()
          .trim()
          .test('bank_card_number_checkLength' , "شماره کارت معتبر نیست." , (value = "") => {
               const cartNumber = value.replace(/\s/g, '').replace(/-/g, '')
               if(cartNumber.length > 0){
                    if(cartNumber.length < 16) return false
               };
               return true
          }),
     office_number : Yup.string()
          .required("شماره تلفن ثابت دفتر مرکزی الزامی است.") 
          .test('office_number_checkRequire' , "شماره تلفن ثابت دفتر مرکزی الزامی است." , (value = "") => {
               const phoneNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
               if(phoneNumber.length === 0) return false;
               return true
          })
          .test('office_number_checkLength' , "شماره تلفن ثابت دفتر مرکزی معتبر نیست." , (value = "") => {
               const phoneNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
               if(phoneNumber.length < 11) return false;
               return true
          })
          .test("check Availability" , "این شماره توسط شخص دیگری به ثبت رسیده است" ,  (value = "") => {
               const phoneNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
               return !numbers.numbers.includes(phoneNumber)
          }),
     owner_password : Yup.string()
          .required('رمز عبور الزامی است.')
          .min(6 , "رمز عبور نمی تواند کمتر از 6 کاراکتر باشد.")
          .max(24 , "رمز عبور نمی تواند بیشتر از 24 نویسه باشد.")
          .matches(PASSWORD_REGIX,"رمز عبور معتبر نیست | رمز عبور میتواند ترکیبی از عدد و حروف انگلیسی باشد."),
     name : Yup.string()
          .required('نام فروشگاه الزامی است.')
          .min(3, "نام فروشگاه نمی تواند کم تر از ۳ نویسه باشد.")
          .max(50,"نام فروشگاه نمی تواند بیشتر از ۵۰ نویسه باشد.")
          .trim(),
     economic_code : Yup.string()
          .length(12,"کد اقتصادی ۱۲ رقم است.")
          .matches(ONLY_DIGIT_REGIX,"کد اقتصادی باید از نوع عدد باشد.")
          .trim(),
     owner_full_name : Yup.string()
          .required('نام و نام خانوادگی مالک فروشگاه الزامی است.')
          .matches(ONLY_PERSIAN_ALPHABET , "نام و نام خانوادگی را به فارسی وارد کنید.")
          .min(3,"نام و نام خانوادگی نمی تواند کم تر از ۳ نویسه باشد.")
          .max(50,"نام و نام خانوادگی نمی تواند بیشتر از ۵۰ نویسه باشد.")
          .trim(),
     owner_phone_number : Yup.string()
          .required('شماره همراه مالک فروشگاه الزامی است.')
          .matches(PHONE_NUMBER_REGIX,"شماره همراه مالک فروشگاه معتبر نیست.")
          .test("check Availability" , "این شماره توسط شخص دیگری به ثبت رسیده است" ,  (value = "") => !numbers.numbers.includes(value))
          .trim(),
     secend_phone_number : Yup.string()
          .matches(PHONE_NUMBER_REGIX,"شماره همراه دوم مالک فروشگاه معتبر نیست.")
          .test("check Availability" , "این شماره توسط شخص دیگری به ثبت رسیده است" ,  (value = "") => !numbers.numbers.includes(value))
          .trim(),
     office_address : Yup.string()
          .required('آدرس دفتر مرکزی الزامی است.')
          .trim(),
     warehouse_address : Yup.string().trim(),
     bank_name: Yup.string()
          .min(3,"نام بانک نمی تواند کم تر از ۳ نویسه باشد.")
          .max(50 , "نام بانک نمی تواند بیتر از ۵۰ نویسه باشد.")
          .matches(ONLY_PERSIAN_ALPHABET , "نام بانک را به فارسی وارد کنید.")
          .trim(),
     bank_code : Yup.string()
          .length(4,'کد شعبه بانک ۴ رقم است.')
          .matches(ONLY_DIGIT_REGIX,"کد شعبه باید از نوع  عدد باشد.")
          .trim(),
     bank_sheba_number : Yup.string()
          .length(24,"شماره شبا باید ۲۴ رقم باشد.")
          .matches(ONLY_DIGIT_REGIX,"شماره شبا باید از نوع عدد باشد.")
          .trim(),
     owner_national_code : Yup.string()
          .required("کد ملی مالک فروشگاه الزامی است.")
          .length(10 , "کد ملی نامعتبر است.")
          .matches(ONLY_DIGIT_REGIX , "کد ملی نامعتبر است.")
          .trim()
     })
    
    const formik = useFormik({
        onSubmit,
        validateOnMount : true,
        validationSchema,
        initialValues : {
            name : "",
            economic_code : "",
            owner_full_name : "",
            owner_phone_number : "",
            secend_phone_number : "",
            office_address : "",
            office_number : "",
            warehouse_address : "",
            warehouse_number : "",
            bank_name : "",
            bank_code : "",
            bank_card_number : "",
            bank_sheba_number : "",
            owner_national_code : "",
        }
    })

    return (  
        <Layout isFooter={true} pageTitle={"ترب | ثبت فروشگاه"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <section className="w-full flex-0 h-max px-4 "> 
                    <Modal open={isImage_license_Modal} onClose={() => setIsImage_license_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                            <img alt="تصویر مجوز" className="max-h-full w-auto" src={onChangeFile_license && onChangeFile_license.imageUrl || ""}/>
                            <button onClick={() => setIsImage_license_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </section>
                    </Modal>
                    <Modal open={isImage_logo_Modal} onClose={() => setIsImage_logo_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                            <img alt="تصویر لوگو" className="max-h-full w-auto" src={onChangeFile_logo && onChangeFile_logo.imageUrl || ""}/>
                            <button onClick={() => setIsImage_logo_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </section>
                    </Modal>
                    <Modal open={isImage_storeBanner_Modal} onClose={() => setIsImage_storeBanner_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                            <img alt="تصویر سر در فروشگاه" className="max-h-full w-auto" src={onChangeFile_storeBanner && onChangeFile_storeBanner.imageUrl || ""}/>
                            <button onClick={() => setIsImage_storeBanner_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </section>
                    </Modal>
                    <div className="flex justify-between w-full items-center mt-4">
                        <div  className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-iranyekan-bold text-lg text-gray-800">ثبت فروشگاه</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            {/* Back Page */}
                            <Link href={'/'}>
                                <a className=" items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2 px-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        {/*  مالک فروشگاه */}
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <p className="font-iranyekan-bold text-gray-800"> مالک فروشگاه</p>
                            <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                                <FormikInput  isRequired={true} name={"owner_full_name"} title={"نام و نام خانوادگی مالک فروشگاه"} formik={formik}/>
                                <FormikInput maxLength={11} isRequired={true} name={"owner_phone_number"} title={"شماره همراه مالک فروشگاه" } formik={formik} />
                                <FormikInput maxLength={10} isRequired={true} name={"owner_national_code"}title={"کد ملی مالک فروشگاه (نام کاربری)" } formik={formik}/>
                                <FormikInput maxLength={11} isRequired={false} name={"secend_phone_number"} title={"شماره همراه دوم مالک فروشگاه"} formik={formik}/>
                                <FormikInput maxLength={24} isRequired={true} name={"owner_password"} title={"رمز عبور"} formik={formik}/>
                            </section>
                        </div>
                        {/*  فروشگاه | شرکت */}
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <p className="font-iranyekan-bold text-gray-800"> فروشگاه | شرکت</p>
                            <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                                <FormikInput isRequired={true} name={"name"} title={"نام فروشگاه"} formik={formik}/>
                                <FormikInput isRequired={true} name={"office_address"} title={"آدرس دفتر مرکزی فروشگاه"} formik={formik}/>
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 before:content-['*'] before:text-red-600">شماره تلفن ثابت دفتر مرکزی:</p>
                                    <InputMask dir="ltr"  type={"text"} value={formik.values.office_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="office_number"  maskPlaceholder="-" className={`${formik.errors.office_number && formik.touched.office_number ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600"} border focus:outline-none py-[6px] px-2 text-[13px] mt-2 rounded-md  focus:ring-0`} maskchar={null}/>
                                    {formik.errors.office_number && formik.touched.office_number && <p className="mt-2 font-iranyekan-regular text-xs text-red-700">{formik.errors.office_number}</p>}
                                </div>
                                <FormikInput isRequired={false} name={"warehouse_address"} title={"آدرس انبار مرکزی شرکت"} formik={formik}/>
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 ">شماره تلفن ثابت انبار مرکزی شرکت:</p>
                                    <InputMask dir="ltr"  type={"text"} value={formik.values.warehouse_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="warehouse_number"  maskPlaceholder="-" className={`${formik.errors.warehouse_number && formik.touched.warehouse_number ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600"} border px-2 focus:outline-none py-[6px] text-[13px] mt-2 rounded-md  focus:ring-0`} maskchar={null}/>
                                    {formik.errors.warehouse_number && formik.touched.warehouse_number && <p className="mt-2 font-iranyekan-regular text-xs text-red-700">{formik.errors.warehouse_number}</p>}
                                </div>
                                
                                <FormikInput maxLength={12}  name={"economic_code"} title={"کد اقتصادی"} formik={formik}/>
                                
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 before:content-['*'] before:text-red-600">حوضه فعالیت شرکت - استان :</p>
                                    <div className="mt-2">
                                        <SelectBox 
                                            notFoundTitle="استان مورد نظر یافت نشد." 
                                            query={provienceQuery} 
                                            setQuery={setProvienceQuery} 
                                            filteredData={filteredProvinces} 
                                            selected={selectedProvience} 
                                            setSelected={setSelectedProvience}
                                        />
                                    </div>
                                </div>
    
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 before:content-['*'] before:text-red-600">حوضه فعالیت شرکت - شهر :</p>
                                    <div className="mt-2">
                                        <SelectBox 
                                            isDisabled={selectedProvience ? false : true}
                                            notFoundTitle="شهر مورد نظر یافت نشد." 
                                            query={cityQuery} 
                                            setQuery={setCityQuery} 
                                            filteredData={filteredCities} 
                                            selected={selectedCity} 
                                            setSelected={setSelectedCity}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/*  حساب بانکی */}
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <p className="font-iranyekan-bold text-gray-800"> حساب بانکی</p>
                            <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 ">شماره کارت :</p>
                                    <InputMask dir="ltr"  type={"text"} value={formik.values.bank_card_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="9999 9999 9999 9999" name="bank_card_number" maskPlaceholder="-" className={`${formik.errors.bank_card_number && formik.touched.bank_card_number ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600"} border px-2 focus:outline-none py-[6px] text-[13px] mt-2 rounded-md  focus:ring-0`} maskchar={null}/>
                                    {formik.errors.bank_card_number && formik.touched.bank_card_number && <p className="mt-2 font-iranyekan-regular text-xs text-red-700">{formik.errors.bank_card_number}</p>}
                                </div>
                                <FormikInput maxLength={24}  name={"bank_sheba_number"} title={"شماره شبا"} formik={formik}/>
                                <FormikInput  name={"bank_name"} title={"نام بانک"} formik={formik}/>
                                <FormikInput maxLength={4}  name={"bank_code"} title={"کد شعبه"} formik={formik}/>
                            </section>
                        </div>
                        {/* تصاویر و فایل ها */}
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <p className="font-iranyekan-bold text-gray-800">تصاویر و فایل ها</p>
                            <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                                {/* License Image */}
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800"> تصویر مجوز :</p>
                                    <input type={'file'} id="chooseImage_license" name="license" ref={image_license_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,64,2048,setOnChangeFile_license,"مجوز","64 کیلوبایت","2 مگابایت",image_license_Input_ref)}/>
                                    {onChangeFile_license.imageUrl? (
                                        <section className="flex justify-between items-center mt-2 h-[38px] ">
                                            <button type={"button"} onClick={()=>setIsImage_license_Modal(true)} className="flex items-center justify-between w-full rounded-r-md bg-green-50 h-full border-l-0 pr-2 hover:bg-green-100 hover:border-green-600 border border-green-500">
                                                <span className="text-[13px] font-iranyekan-regular text-green-700 "> نمایش تصویر مجوز</span>
                                            </button>
                                            <button onClick={()=> {setOnChangeFile_license({imageUrl : null , selectedFile : null}) ; image_license_Input_ref.current.value = null}}  type={"button"} className="bg-red-50 hover:bg-red-100 border h-full px-4 rounded-l-md border-red-500 hover:border-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </section>
                                    ) : (
                                        <label htmlFor="chooseImage_license" className="flex justify-between items-center px-2 mt-2 cursor-pointer text-[13px] font-iranyekan-regular rounded-md h-[38px] bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-400 ">
                                            <span className="text-blue-700">انتخاب تصویر مجوز</span>
                                            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    )}
                                </div>

                                {/* Logo Image */}
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800 before:content-['*'] before:text-red-600">تصویر لوگو :</p>
                                    <input type={'file'} id="chooseImage_logo"  ref={image_logo_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,32,2048,setOnChangeFile_logo,"سر در فروشگاه","32 کیلوبایت","2 مگابایت",image_logo_Input_ref)}/>
                                    {onChangeFile_logo.imageUrl ?  (
                                        <section className="flex justify-between items-center mt-2 h-[38px] ">
                                            <button type={"button"} onClick={()=>setIsImage_logo_Modal(true)} className="flex justify-between items-center pr-2 w-full h-full rounded-r-md bg-green-50  border-l-0 hover:bg-green-100 hover:border-green-600 border border-green-500">
                                                <span className="text-[13px] font-iranyekan-regular text-green-800 ">نمایش لوگو </span>
                                            </button>
                                            <button onClick={()=> {setOnChangeFile_logo({imageUrl : null , selectedFile : null}) ; image_logo_Input_ref.current.value = null}}  type={"button"} className="h-full bg-red-50 hover:bg-red-100 border px-4 rounded-l-md border-red-500 hover:border-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </section>
                                    ) : (
                                        <label htmlFor="chooseImage_logo" className="flex justify-between items-center px-2 h-[38px] mt-2 cursor-pointer text-[13px] font-iranyekan-regular rounded-md  bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-400 ">
                                            <span className="text-blue-700">انتخاب لوگو</span>
                                            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label> 
                                    )}
                                </div>

                                {/* Store Banner Image */}
                                <div className="flex flex-col relative ">
                                    <p className="font-iranyekan-regular text-[13px] text-gray-800"> تصویر سر در فروشگاه :</p>
                                    <input type={'file'} id="chooseImage_storeBanner"  ref={image_storeBanner_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,64,2048,setOnChangeFile_storeBanner,"سر در فروشگاه","64 کیلوبایت","2 مگابایت",image_storeBanner_Input_ref)}/>
                                    {onChangeFile_storeBanner.imageUrl ? (
                                        <section className="flex justify-between items-center mt-2 h-[38px] ">
                                            <button type={"button"} onClick={()=>setIsImage_storeBanner_Modal(true)} className="flex justify-between items-center pr-2 w-full h-full rounded-r-md bg-green-50  border-l-0 hover:bg-green-100 hover:border-green-600 border border-green-500">
                                                <span className="text-[13px] font-iranyekan-regular text-green-800 ">نمایش تصویر سر در فروشگاه </span>
                                            </button>
                                            <button onClick={()=> {setOnChangeFile_storeBanner({imageUrl : null , selectedFile : null}) ; image_storeBanner_Input_ref.current.value = null}}  type={"button"} className="h-full bg-red-50 hover:bg-red-100 border px-4 rounded-l-md border-red-500 hover:border-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </section>
                                    ) : (
                                        <label htmlFor="chooseImage_storeBanner" className="flex justify-between items-center px-2 h-[38px] mt-2 cursor-pointer text-[13px] font-iranyekan-regular rounded-md  bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-400 ">
                                            <span className="text-blue-700">انتخاب تصویر سر در فروشگاه</span>
                                            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    )}
                                </div>
                            </section>
                        </div>
                        <section className="w-full flex justify-end my-4 gap-x-2 items-center ">
                            {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                            <button disabled={loading} type={"submit"} className={buttonClassName({bgColor : 'blue' , isValid : formik.isValid , isOutline : false})}>
                                ثبت فروشگاه
                            </button>
                        </section>
                    </form>


                </section>
            </div>
        </Layout>
    );
}
 
export default InsertStorePage;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async({req}) => {

    const token = returnTokenInServerSide({cookie : req.headers.cookie})
    
    
    if(!token.includes("undefined")){ 
        // Fetch User Data     
        await http.get("user", {headers : {authorization : token}})
        .then(({data}) =>  {
            dispatch(cartDetails(data))
            dispatch(authSuccess(data.user))
        })  
        .catch(() => {
            dispatch(authFailure("خطا در بخش احراز هویت"))    
        });

        // Fetch SearchBar Data With User Token
        await http.get(`public/searchbar`,{headers : {authorization : token}})
        .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
        .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
    }else{
        // Fetch SearchBar Data With User Token
        await http.get(`public/searchbar`)
        .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
        .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
    }

    // Fetch Navbar Categories
    await http.get(`public/categories`)
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))

    const data = await http.get('numbers').then(res => res.data)
    return {
        props : {
            numbers : data
        }
    }
})