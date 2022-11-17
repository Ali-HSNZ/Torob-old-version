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
import { provinces } from "@/common/admin/provinces";
import SelectBox from "@/common/admin/SelectBox";
import { useEffect } from "react";
import { allCities } from "@/common/admin/cities";
import ReactLoading from 'react-loading';
import Cookies from "universal-cookie";
import axios from "axios";
import { fetchOneUser, insertUser } from "@/redux/admin/admin_manageUsers/admin_manageUsersActions";
import { useRouter } from "next/router";
import Warning from "@/common/alert/Warning";


const InsertStore = () => {
    const { loading,user} = useSelector(state => state.admin_users.oneUser)
    const dispatch = useDispatch()
    const router = useRouter()
    const pageId = router.query.userId
    const [isAsideModal,setIsAsideModal] = useState(false)
    const [provienceQuery,setProvienceQuery] = useState('')
    const [cities,setCities] = useState(null)    
    const [cityQuery , setCityQuery] = useState("")
    const [selectedProvience,setSelectedProvience] = useState("")
    const [selectedCity,setSelectedCity] = useState("")

    const filteredProvinces = provienceQuery === '' ? provinces : provinces && provinces.filter((province) => province.name.toLowerCase().replace(/\s+/g, '').includes(provienceQuery.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredCities = cityQuery === '' ? cities : cities && cities.filter((city) => city.name.toLowerCase().replace(/\s+/g, '').includes(cityQuery.toLocaleLowerCase().replace(/\s+/g, '')))


    const [isImage_Modal,setIsImage_Modal] = useState(false)
    const [onChangeFile , setOnChangeFile] = useState(null)

    const image_input_ref = useRef()

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

    // useEffect(()=>{
    //     dispatch(fetchOneUser(pageId))
    // },[])

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
        
        // const profileImage = onChangeFile && onChangeFile.selectedFile || null;
        // const city = selectedCity && selectedCity.name || null
        // const province = selectedProvience && selectedProvience.name || null
        // const house_number = formik.values.house_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
        // if(house_number.length > 0){
        //     if(house_number.length < 11){
        //         toast.error("شماره تلفن ثابت معتبر نیست")
        //         return false;
        //     }
        // }
        // dispatch(insertUser({values,profileImage,city,province,house_number}))
    }
    
    const PHONE_NUMBER_REGIX = /^09[0|1|2|3][0-9]{8}$/;
    const ONLY_DIGIT_REGIX = /^\d+$/;
    const POSTAL_CODE_REGIX = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;


    const validationSchema = Yup.object({
        full_name : Yup.string()
            .required('نام و نام خانوادگی الزامی است')
            .min(3, "نام و نام خانوادگی نمی تواند کم تر از ۳ نویسه باشد")
            .max(50,"نام و نام خانوادگی نمی تواند بیشتر از ۵۰ نویسه باشد")
            .trim(),
        national_code : Yup.string()
            .required("کد ملی الزامی است")
            .length(10 , "کد ملی نامعتبر است")
            .matches(ONLY_DIGIT_REGIX , "کد ملی نامعتبر است")
            .trim(),
        phone_number_primary : Yup.string()
            .required('شماره همراه الزامی است')
            .matches(PHONE_NUMBER_REGIX,"شماره همراه معتبر نیست")
            .trim(),
        phone_number_secondary : Yup.string()
            .matches(PHONE_NUMBER_REGIX,"شماره همراه معتبر نیست")
            .trim(),
        address_detail : Yup.string()
            .required('آدرس الزامی است')
            .min(3,'آدرس نمی تواند کم تر از ۳ نویسه باشد')
            .max(2000,'آدرس نمی تواند بیشتر از ۲۰۰۰ نویسه باشد')
            .trim(),
        address_postcode : Yup.string()
            .matches(POSTAL_CODE_REGIX , "کد پستی معتبر نیست")
            .trim(),
    })
    
    const formik = useFormik({
        onSubmit,
        validateOnMount : true,
        validationSchema,
        enableReinitialize : true,
        initialValues : {
            full_name : user && user.full_name || "",
            national_code : "",
            phone_number_primary : "",
            phone_number_secondary : "",
            house_number : "",
            address_detail : "",
            address_postcode : "",
        }
    })


    return (  
        <Layout isFooter={true} pageTitle={"پنل مدیریت | ثبت کاربر"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <AdminPageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>

                    <div className="flex justify-between w-full items-center mt-4">
                        <h1 className="font-sans font-bold text-lg">ویرایش کاربر (خریدار)</h1>
                        <div className="flex gap-x-2 items-center">
                        <Link href={'/admin/manage-users'}>
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
                    <Warning text={"این بخش  در حال توسعه است و هیچ درخواستی به سرور ارسال نمی شود"}/>
                    <form onSubmit={formik.handleSubmit}>
                        <section  className="grid grid-cols-3 gap-4 mt-6">

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">نام و نام خانوادگی :</p>
                                <input type={"text"} name="full_name"  value={formik.values.full_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="نام و نام خانوادگی " className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.full_name && formik.touched.full_name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.full_name}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">کد ملی :</p>
                                <input type={"text"} name="national_code"  value={formik.values.national_code} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="کد ملی" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.national_code && formik.touched.national_code && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.national_code}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">شماره همراه :</p>
                                <input type={"text"} name="phone_number_primary"  value={formik.values.phone_number_primary} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="شماره همراه" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.phone_number_primary && formik.touched.phone_number_primary && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.phone_number_primary}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm ">شماره همراه دوم :</p>
                                <input type={"text"} name="phone_number_secondary"  value={formik.values.phone_number_secondary} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="شماره همراه دوم" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.phone_number_secondary && formik.touched.phone_number_secondary && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.phone_number_secondary}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm ">تلفن ثابت :</p>
                                <InputMask dir="ltr"  type={"text"} value={formik.values.house_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="house_number"   placeholder="Enter Static Phone Number" maskPlaceholder="-" className="border border-gray-300 hover:border-gray-600 px-2 focus:border-gray-600 py-2 text-sm mt-2 rounded-md  focus:ring-0" maskchar={null}/>
                                {formik.errors.house_number && formik.touched.house_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.house_number}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm ">استان :</p>
                                <div className="mt-2">
                                    <SelectBox 
                                        notFoundTitle="استان مورد نظر یافت نشد." 
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
                                <p className="font-sans text-sm ">شهر :</p>
                                <div className="mt-2">
                                    <SelectBox 
                                        isDisabled={selectedProvience ? false : true}
                                        notFoundTitle="شهر مورد نظر یافت نشد." 
                                        placeholder={'انتخاب شهر'} 
                                        query={cityQuery} 
                                        setQuery={setCityQuery} 
                                        filteredData={filteredCities} 
                                        selected={selectedCity} 
                                        setSelected={setSelectedCity}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">آدرس دقیق :</p>
                                <input type={"text"} name="address_detail"  value={formik.values.address_detail} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="آدرس دقیق" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.address_detail && formik.touched.address_detail && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.address_detail}</p>}
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">کد پستی :</p>
                                <input type={"text"} name="address_postcode"  value={formik.values.address_postcode} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="کد پستی" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.address_postcode && formik.touched.address_postcode && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.address_postcode}</p>}
                            </div>


                            {/* Profile Image */}
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm text-gray-800"> تصویر کاربر :</p>
                                <input type={'file'} id="chooseImage"  ref={image_input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,16,1024,setOnChangeFile,"کاربر","۱۶ کیلوبایت","۱,۰۲۴ کیلوبایت",image_input_ref)}/>
                                {onChangeFile? (
                                    <section className="flex justify-between items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsImage_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                            <span className="text-sm font-sans text-green-800 ">تصویر کاربر انتخاب شده است.</span>
                                        </button>
                                        <button onClick={()=> {setOnChangeFile(null) ; image_input_ref.current.value = null}}  type={"button"}className="bg-red-200 hover:bg-red-300 border py-2 px-4 rounded-l-md border-red-500 hover:border-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </section>
                                ) : (
                                    <>
                                        <label htmlFor="chooseImage" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                            <span className="text-blue-700">انتخاب تصویر کاربر</span>
                                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    </>
                                )}
                                <Modal open={isImage_Modal} onClose={() => setIsImage_Modal(false)} className=" h-full w-full flex justify-center items-center">
                                    <section className=" bg-white w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                        <img className="max-h-full w-auto" src={onChangeFile && onChangeFile.imageUrl || ""}/>
                                        <button onClick={() => setIsImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </section>
                                </Modal>
                            </div>

                        </section>

                        <section className="w-full flex justify-end mt-3 gap-x-2 items-center ">
                            {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                            <button disabled={loading} type={"submit"} className={`flex items-center ${formik.isValid ? " hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>
                                    تایید تغییرات
                            </button>
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