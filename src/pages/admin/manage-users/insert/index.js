import AdminPageAside from "@/components/adminPage/Aside";
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
import { provinces } from "@/common/admin/provinces";
import SelectBox from "@/common/admin/SelectBox";
import { useEffect } from "react";
import { allCities } from "@/common/admin/cities";
import ReactLoading from 'react-loading';
import Cookies from "universal-cookie";
import axios from "axios";
import { insertUser } from "@/redux/admin/admin_manageUsers/admin_manageUsersActions";
import FormikInput from "@/common/admin/FormikInput";
import { ONLY_DIGIT_REGIX, PHONE_NUMBER_REGIX, POSTAL_CODE_REGIX } from "@/utils/Regex";


const InsertStore = () => {
    const { loading} = useSelector(state => state.admin_users)
    const dispatch = useDispatch()
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
        const profileImage = onChangeFile && onChangeFile.selectedFile || null;
        const city = selectedCity && selectedCity.name || null
        const province = selectedProvience && selectedProvience.name || null
        dispatch(insertUser({values,profileImage,city,province}))
    }
    
    
    const validationSchema = Yup.object({
        house_number : Yup.string()
        .test('house_number_checkLength' , "شماره تلفن ثابت  معتبر نیست." , (value = "") => {
            const staticPhoneNumber = value.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
            if(staticPhoneNumber.length > 0){
                if(staticPhoneNumber.length < 11) return false;
                return true
            }
            return true
        }),
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
        initialValues : {
            full_name : "",
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
                    {/* Modal For Profile Image */}
                    <Modal open={isImage_Modal} onClose={() => setIsImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                            <img className="max-h-full w-auto" src={onChangeFile && onChangeFile.imageUrl || ""}/>
                            <button onClick={() => setIsImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </section>
                    </Modal>
                    <div className="flex justify-between w-full items-center mt-4">
                        
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">ثبت کاربر (خریدار)</h1>
                        </div>
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

                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <p className="font-sans font-bold"> مشخصات کاربر</p>
                                <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                    <FormikInput name={"full_name"} title={"نام و نام خانوادگی"} isRequired={true} formik={formik} placeholder={"نام و نام خانوادگی"} parentClassName="flex flex-col relative"/>
                                    <FormikInput name={"national_code"} title={"کد ملی"} isRequired={true} formik={formik} placeholder={"کد ملی"} parentClassName="flex flex-col relative"/>
                                    <FormikInput name={"phone_number_primary"} title={"شماره همراه"} isRequired={true} formik={formik} placeholder={"شماره همراه"} parentClassName="flex flex-col relative"/>
                                    <FormikInput name={"phone_number_secondary"} title={"شماره همراه دوم"}  formik={formik} placeholder={"شماره همراه دوم"} parentClassName="flex flex-col relative"/>

                                    <div className="flex flex-col relative ">
                                        <p className="font-sans text-[13px] ">تلفن ثابت :</p>
                                        <InputMask dir="ltr"  type={"text"} value={formik.values.house_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="house_number" maskPlaceholder="-" className={`${formik.errors.house_number && formik.touched.house_number ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-[13px]  font-sans bg-white text-gray-800 rounded-md`} maskchar={null}/>
                                        {formik.errors.house_number && formik.touched.house_number && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.house_number}</p>}
                                    </div>

                                    <div className="flex flex-col relative ">
                                        <p className="font-sans text-[13px] ">استان :</p>
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
                                        <p className="font-sans text-[13px] ">شهر :</p>
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
                                    <FormikInput name={"address_detail"} title={"آدرس دقیق"} isRequired={true} formik={formik} placeholder={"آدرس دقیق"} parentClassName="flex flex-col relative"/>
                                    <FormikInput name={"address_postcode"} title={"کد پستی"}  formik={formik} placeholder={"کد پستی"} parentClassName="flex flex-col relative"/>

                                </section>
                        </div>
                        <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">

                            <p className="font-sans font-bold">تصاویر و فایل ها</p>
                            <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                            {/* Profile Image */}
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-[13px] text-gray-800"> تصویر پروفایل :</p>
                                <input type={'file'} id="chooseImage"  ref={image_input_ref} accept=".jpg,.png,.jpeg,.webp" className="hidden" onChange={event => changeFIleAction_input(event,16,1024,setOnChangeFile,"کاربر","۱۶ کیلوبایت","۱,۰۲۴ کیلوبایت",image_input_ref)}/>
                                {onChangeFile ? (
                                    <section  className="flex justify-between h-[38px] items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsImage_Modal(true)} className="flex justify-between items-center w-full h-full rounded-r-md bg-green-50 border-l-0 hover:bg-green-100 hover:border-green-600 border border-green-500">
                                            <span className="text-[13px] font-sans text-green-700 pr-2">نمایش تصویر پروفایل</span>
                                        </button>
                                        <button onClick={()=> {setOnChangeFile(null) ; image_input_ref.current.value = null}}  type={"button"}  className="bg-red-50 h-full items-center hover:bg-red-100 border px-4 rounded-l-md border-red-500 hover:border-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </section>
                                ) : (
                                    <label htmlFor="chooseImage"  className="flex justify-between items-center h-[38px] px-2 mt-2 cursor-pointer text-[13px] font-sans rounded-md  bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-400 ">
                                        <span className="text-blue-700">انتخاب تصویر پروفایل</span>
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
                            <button disabled={loading} type={"submit"} className={`flex items-center ${formik.isValid ? " hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-[13px] rounded-md`}>
                                ثبت نام 
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