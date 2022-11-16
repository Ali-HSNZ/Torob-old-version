import AdminPageAside from "@/components/adminPage/Aside";
import Layout from "@/layout/Layout";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup'
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { deleteStore, fetchOneStore, insertStore, updateStore } from "@/redux/admin/admin_manageStores/admin_manageStoresAction";
import { provinces } from "@/common/admin/provinces";
import SelectBox from "@/common/admin/SelectBox";
import { useEffect } from "react";
import { allCities } from "@/common/admin/cities";
import ReactLoading from 'react-loading';
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from "next/router";


const InsertStore = () => {


    const dispatch = useDispatch()
    const {loading,store} = useSelector(state => state.admin_stores.oneStore)
    const router = useRouter()
    const pageId = router.query.storeId
    const [isAsideModal,setIsAsideModal] = useState(false)
    const [provienceQuery,setProvienceQuery] = useState('')
    const [cities,setCities] = useState(null)    
    const [cityQuery , setCityQuery] = useState("")
    const [selectedProvience,setSelectedProvience] = useState("")
    const [selectedCity,setSelectedCity] = useState("")

    useEffect(()=>{
        dispatch(fetchOneStore(pageId))
    },[pageId])


    const filteredProvinces = provienceQuery === '' ? provinces : provinces && provinces.filter((province) => province.name.toLowerCase().replace(/\s+/g, '').includes(provienceQuery.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredCities = cityQuery === '' ? cities : cities && cities.filter((city) => city.name.toLowerCase().replace(/\s+/g, '').includes(cityQuery.toLocaleLowerCase().replace(/\s+/g, '')))


    const [isImage_license_Modal,setIsImage_license_Modal] = useState(false)
    const [isImage_logo_Modal,setIsImage_logo_Modal] = useState(false)
    const [isImage_storeBanner_Modal,setIsImage_storeBanner_Modal] = useState(false)

    const [onChangeFile_license , setOnChangeFile_license] = useState(null)
    const [onChangeFile_logo , setOnChangeFile_logo] = useState(null)
    const [onChangeFile_storeBanner , setOnChangeFile_storeBanner] = useState(null)

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
        if(store){
            const currentProvince = provinces.find(province => province.name == store.province);
            const currentCity = allCities.find(city => city.name == store.city);
            setSelectedCity(currentCity)
            setSelectedProvience(currentProvince)
        }
        setOnChangeFile_logo(store && store.is_logo_image && {imageUrl : store.logo_image} || "") 
        setOnChangeFile_license(store && store.is_license_image && {imageUrl : store.license_image} || "") 
        setOnChangeFile_storeBanner(store && store.is_store_banner_image && {imageUrl : store.banner_image} || "") 

    },[store])

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
        const logo = onChangeFile_logo && onChangeFile_logo.selectedFile || null;
        const license = onChangeFile_license && onChangeFile_license.selectedFile || null;
        const storeBanner = onChangeFile_storeBanner && onChangeFile_storeBanner.selectedFile || null;
        const city = selectedCity && selectedCity.name || null
        const province = selectedProvience && selectedProvience.name || null
        const bankCardNumber = formik.values.bank_card_number.replace(/\s/g, '').replace(/-/g, '')
        const staticWarehouseNumber = formik.values.warehouse_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
        const staticOfficeNumber = formik.values.office_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
        if(bankCardNumber.length < 16){
            toast.error('شماره کارت معتبر نیست'); return false
        } 
        if(staticWarehouseNumber.length < 11){
            toast.error('شماره تلفن ثابت انبار مرکزی شرکت معتبر نیست'); return false
        }
        if(staticOfficeNumber.length < 11){
            toast.error('شماره تلفن ثابت دفتر مرکزی معتبر نیست'); return false
        }
        if(!province){
            toast.error('حوضه فعالیت شرکت (استان) را وارد کنید'); return false
        } 
        if(!city){
            toast.error('حوضه فعالیت شرکت (شهر) را وارد کنید'); return false
        }
        dispatch(updateStore({pageId,values,logo,license,storeBanner,city,province,bankCardNumber,staticWarehouseNumber,staticOfficeNumber}))
    }


    
    const PHONE_NUMBER_REGIX = /^09[0|1|2|3][0-9]{8}$/;
    const ONLY_DIGIT_REGIX = /^\d+$/;
    const validationSchema = Yup.object({
        name : Yup.string()
            .required('نام فروشگاه نمی تواند خالی باشد')
            .min(3, "نام فروشگاه نمی تواند کم تر از 3 نویسه باشد")
            .max(50,"نام فروشگاه نمی تواند بیشتر از 50 نویسه باشد")
            .trim(),
        economic_code : Yup.string()
            .length(12,"کد اقتصادی باید ۱۲ رقم باشد")
            .required("کد اقتصادی نمی تواند خالی باشد")
            .matches(/^[0-9]{12}\d*$/,"کد اقتصادی باید عدد باشد")
            .trim(),
        owner_full_name : Yup.string()
            .required('نام فروشگاه نمی تواند خالی باشد')
            .min(3,"نام و نام خانوادگی نمی تواند کم تر از 3 نویسه باشد")
            .max(50,"نام و نام خانوادگی نمی تواند بیشتر از 50 نویسه باشد")
            .trim(),
        owner_phone_number : Yup.string()
            .required('شماره همراه مالک فروشگاه نمی تواند خالی باشد')
            .matches(PHONE_NUMBER_REGIX,"شماره همراه مالک فروشگاه معتبر نیست")
            .trim(),
        secend_phone_number : Yup.string()
            .matches(PHONE_NUMBER_REGIX,"شماره همراه دوم مالک فروشگاه معتبر نیست")
            .trim(),
        office_address : Yup.string()
            .required('آدرس دفتر مرکزی نمی تواند خالی باشد')
            .trim(),
        warehouse_address : Yup.string().trim(),

        bank_name: Yup.string()
            .required("نام بانک نمی تواند خالی باشد")
            .min(3,"نام بانک نمی تواند کم تر از 3 نویسه باشد")
            .max(50 , "نام بانک نمی تواند بیتر از 50 نویسه باشد")
            .trim(),
        bank_code : Yup.string()
            .required("کد شعبه نمی تواند خالی باشد")
            .length(4,'کد شعبه بانک باید 4 رقمی باشد')
            .matches(ONLY_DIGIT_REGIX,"کد شعبه باید از نوع  عدد باشد")
            .trim(),
        bank_sheba_number : Yup.string()
            .required("شماره شبا نمی تواند خالی باشد")
            .length(24,"شماره شبا باید 24 رقم باشد")
            .matches(ONLY_DIGIT_REGIX,"شماره شبا باید عدد باشد")
            .trim(),

        owner_national_code : Yup.string()
            .required("کد ملی مالک فروشگاه الزامی است")
            .length(10 , "کد ملی نامعتبر است")
            .matches(ONLY_DIGIT_REGIX , "کد ملی نامعتبر است")
            .trim()
    })
    
    const formik = useFormik({
        onSubmit,
        validateOnMount : true,
        validationSchema,
        enableReinitialize : true,
        initialValues : {
            name : store && store.name || "",
            economic_code :  store && store.economic_code || "",
            owner_full_name :  store && store.owner_full_name || "",
            owner_phone_number :  store && store.owner_phone_number || "",
            secend_phone_number :  store && store.secend_phone_number || "",
            office_address : store && store.office_address || "",
            office_number :  store && store.office_number || "",
            warehouse_address :  store && store.warehouse_address || "",
            warehouse_number : store && store.warehouse_number || "",
            bank_name : store && store.bank_name || "",
            bank_code : store && store.bank_code || "",
            bank_card_number :  store && store.bank_card_number || "",
            bank_sheba_number : store && store.bank_sheba_number || "",
            owner_national_code :  store && store.owner_national_code || "",
        }
    })


    return (  
        <Layout isFooter={true} pageTitle={"پنل مدیریت | ویرایش فروشگاه"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <AdminPageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>

                    <div className="flex justify-between w-full items-center mt-4">
                        <h1 className="font-sans font-bold text-lg">ویرایش فروشگاه</h1>
                        <div className="flex gap-x-2 items-center">
                        <Link href={'/admin/manage-stores'}>
                            <a className=" items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2 px-7">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </a>
                        </Link>
                            <Link href={'/admin'}>
                                <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <section  className="grid grid-cols-3 gap-4 mt-6">

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">نام و نام خانوادگی مالک فروشگاه :</p>
                                <input type={"text"} name="owner_full_name"  value={formik.values.owner_full_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="نام و نام خانوادگی مالک فروشگاه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.owner_full_name && formik.touched.owner_full_name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.owner_full_name}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm  before:content-['*'] before:text-red-600">شماره همراه مالک فروشگاه:</p>
                                <input type={"text"} name="owner_phone_number"  value={formik.values.owner_phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="شماره همراه مالک فروشگاه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.owner_phone_number && formik.touched.owner_phone_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.owner_phone_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm  before:content-['*'] before:text-red-600">کد ملی مالک فروشگاه:</p>
                                <input type={"text"} name="owner_national_code"  value={formik.values.owner_national_code} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="کد ملی مالک فروشگاه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.owner_national_code && formik.touched.owner_national_code && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.owner_national_code}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">شماره همراه دوم مالک فروشگاه:</p>
                                <input type={"text"} name="secend_phone_number"  value={formik.values.secend_phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="شماره همراه دوم مالک فروشگاه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.secend_phone_number && formik.touched.secend_phone_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.secend_phone_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm  before:content-['*'] before:text-red-600">نام فروشگاه :</p>
                                <input type={'text'} name="name"  value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="نام فروشگاه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.name && formik.touched.name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.name}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">آدرس دفتر مرکزی شرکت:</p>
                                <input type={"text"} name="office_address"  value={formik.values.office_address} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="آدرس دفتر مرکزی شرکت" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.office_address && formik.touched.office_address && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.office_address}</p>}
                            </div>
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">شماره تلفن ثابت دفتر مرکزی :</p>
                                <InputMask dir="ltr"  type={"text"} value={formik.values.office_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="office_number"   placeholder="Enter Static Phone Number" maskPlaceholder="-" className="border border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600 py-2 text-sm mt-2 rounded-md  focus:ring-0" maskchar={null}/>
                                {formik.errors.office_number && formik.touched.office_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.office_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">آدرس انبار مرکزی شرکت:</p>
                                <input type={"text"} name="warehouse_address"  value={formik.values.warehouse_address} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="آدرس انبار مرکزی شرکت" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.warehouse_address && formik.touched.warehouse_address && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.warehouse_address}</p>}
                            </div>                    


                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">شماره تلفن ثابت انبار مرکزی شرکت:</p>
                                <InputMask dir="ltr"  type={"text"} value={formik.values.warehouse_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="warehouse_number"   placeholder="Enter Static Phone Number" maskPlaceholder="-" className="border border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600 py-2 text-sm mt-2 rounded-md  focus:ring-0" maskchar={null}/>
                                {formik.errors.warehouse_number && formik.touched.warehouse_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.warehouse_number}</p>}
                            </div>


                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">کد اقتصادی :</p>
                                <input type={"text"} name="economic_code"  value={formik.values.economic_code} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="کد اقتصادی" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.economic_code && formik.touched.economic_code && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.economic_code}</p>}
                            </div>
 
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">حوضه فعالیت شرکت (استان) :</p>
                                <div className="mt-2">
                                    <SelectBox 
                                        notFoundTitle="برند مورد نظر یافت نشد." 
                                        placeholder={'انتخاب استان'} 
                                        query={provienceQuery} 
                                        setQuery={setProvienceQuery} 
                                        filteredData={filteredProvinces} 
                                        selected={selectedProvience} 
                                        setSelected={setSelectedProvience}
                                    />
                                </div>
                            </div>
 
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">حوضه فعالیت شرکت (شهر) :</p>
                                <div className="mt-2">
                                    <SelectBox 
                                        isDisabled={selectedProvience ? false : true}
                                        notFoundTitle="برند مورد نظر یافت نشد." 
                                        placeholder={'انتخاب شهر'} 
                                        query={cityQuery} 
                                        setQuery={setCityQuery} 
                                        filteredData={filteredCities} 
                                        selected={selectedCity} 
                                        setSelected={setSelectedCity}
                                    />
                                </div>
                            </div>



                            {/* License Image */}
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm text-gray-800"> تصویر مجوز :</p>
                                <input type={'file'} id="chooseImage_license" name="license" ref={image_license_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,64,2048,setOnChangeFile_license,"مجوز","64 کیلوبایت","2 مگابایت",image_license_Input_ref)}/>
                                {onChangeFile_license? (
                                    <section className="flex justify-between items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsImage_license_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                            <span className="text-sm font-sans text-green-800 ">تصویر مجوز انتخاب شده است.</span>
                                        </button>
                                        <button onClick={()=> {setOnChangeFile_license(null) ; image_license_Input_ref.current.value = null}}  type={"button"}className="bg-red-200 hover:bg-red-300 border py-2 px-4 rounded-l-md border-red-500 hover:border-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </section>
                                ) : (
                                    <>
                                        <label htmlFor="chooseImage_license" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                            <span className="text-blue-700">انتخاب تصویر مجوز</span>
                                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    </>
                                )}
                                <Modal open={isImage_license_Modal} onClose={() => setIsImage_license_Modal(false)} className=" h-full w-full flex justify-center items-center">
                                    <section className=" bg-white w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                        <img className="max-h-full w-auto" src={onChangeFile_license && onChangeFile_license.imageUrl || ""}/>
                                        <button onClick={() => setIsImage_license_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </section>
                                </Modal>
                            </div>

                            {/* Logo Image */}
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm text-gray-800 before:content-['*'] before:text-red-600">تصویر لوگو :</p>
                                <input type={'file'} id="chooseImage_logo" ref={image_logo_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,16,1024,setOnChangeFile_logo,"لوگو","16 کیلوبایت","1 مگابایت",image_logo_Input_ref)}/>
                                {onChangeFile_logo? (
                                    <section className="flex justify-between items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsImage_logo_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                            <span className="text-sm font-sans text-green-800 ">تصویر لوگو انتخاب شده است.</span>
                                        </button>
                                        <button onClick={()=> {setOnChangeFile_logo(null) ; image_logo_Input_ref.current.value = null}}  type={"button"}className="bg-red-200 hover:bg-red-300 border py-2 px-4 rounded-l-md border-red-500 hover:border-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </section>
                                ) : (
                                    <>
                                        <label htmlFor="chooseImage_logo" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                            <span className="text-blue-700">انتخاب تصویر لوگو</span>
                                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    </>
                                )}
                                <Modal open={isImage_logo_Modal} onClose={() => setIsImage_logo_Modal(false)} className=" h-full w-full flex justify-center items-center">
                                    <section className=" bg-white w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                        <img className="max-h-full w-auto" src={onChangeFile_logo && onChangeFile_logo.imageUrl || ""}/>
                                        <button onClick={() => setIsImage_logo_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </section>
                                </Modal>
                            </div>

                            {/* Store Banner Image */}
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm text-gray-800"> تصویر سر در فروشگاه :</p>
                                <input type={'file'} id="chooseImage_storeBanner"  ref={image_storeBanner_Input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,32,2048,setOnChangeFile_storeBanner,"سر در فروشگاه","32 کیلوبایت","2 مگابایت",image_storeBanner_Input_ref)}/>
                                {onChangeFile_storeBanner? (
                                    <section className="flex justify-between items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsImage_storeBanner_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                            <span className="text-sm font-sans text-green-800 ">تصویر سر در فروشگاه انتخاب شده است.</span>
                                        </button>
                                        <button onClick={()=> {setOnChangeFile_storeBanner(null) ; image_storeBanner_Input_ref.current.value = null}}  type={"button"}className="bg-red-200 hover:bg-red-300 border py-2 px-4 rounded-l-md border-red-500 hover:border-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </section>
                                ) : (
                                    <>
                                        <label htmlFor="chooseImage_storeBanner" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                            <span className="text-blue-700">انتخاب تصویر سر در فروشگاه</span>
                                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    </>
                                )}
                                <Modal open={isImage_storeBanner_Modal} onClose={() => setIsImage_storeBanner_Modal(false)} className=" h-full w-full flex justify-center items-center">
                                    <section className=" bg-white w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                        <img className="max-h-full w-auto" src={onChangeFile_storeBanner && onChangeFile_storeBanner.imageUrl || ""}/>
                                        <button onClick={() => setIsImage_storeBanner_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </section>
                                </Modal>
                            </div>



                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">شماره کارت :</p>
                                <InputMask dir="ltr"  type={"text"} value={formik.values.bank_card_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="9999 9999 9999 9999" name="bank_card_number"   placeholder="Enter Cart Number" maskPlaceholder="-" className="border border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600 py-2 text-sm mt-2 rounded-md  focus:ring-0" maskchar={null}/>
                                {formik.errors.bank_card_number && formik.touched.bank_card_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.bank_card_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm  before:content-['*'] before:text-red-600">شماره شبا :</p>
                                <input type={"text"} name="bank_sheba_number"  value={formik.values.bank_sheba_number} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="شماره شبا" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.bank_sheba_number && formik.touched.bank_sheba_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.bank_sheba_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">نام بانک :</p>
                                <input type={"text"} name="bank_name"  value={formik.values.bank_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="نام بانک" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.bank_name && formik.touched.bank_name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.bank_name}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">کد شعبه :</p>
                                <input type={"text"} name="bank_code"  value={formik.values.bank_code} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="کد شعبه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.bank_code && formik.touched.bank_code && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.bank_code}</p>}
                            </div>
                        </section>

                        <section className="w-full flex justify-end gap-x-2 mt-3 items-center ">
                            {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                            {!loading && <button type={"button"} onClick={()=> dispatch(deleteStore(pageId))} className={`items-center ${store && store.is_show ? "bg-green-50 hover:bg-green-100  border-green-600 text-green-600 " : "bg-red-50 hover:bg-red-100  border-red-600 text-red-600 "}  flex border text-sm rounded-md py-[6px] px-5 font-sans`}>تغییر وضعیت</button>}
                            <button disabled={loading} type={"submit"} className={`flex items-center ${formik.isValid ? " hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}> تایید تغییرات</button>
                        </section>
                    </form>


                </section>
            </div>
        </Layout>
    );
}
 
export default InsertStore;

export const getServerSideProps = async(ctx) => {
    // Check Permission
    const token =  new Cookies( ctx.req.headers.cookie).get("userToken");
    let ErrorCode = 0;
    if(!token) return{notFound : true}
    await axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
    .then(({data}) =>  {
        if(data.user.account_type !== 'admin') ErrorCode = 403
    })
    .catch( () => ErrorCode = 403)
    if(ErrorCode === 403){
        return{notFound : true}
    }
    return { props : {}}
}