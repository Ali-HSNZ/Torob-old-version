import AdminPageAside from "@/components/Panel_Menu/AdminPanelMenu";
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
import { deleteUser, fetchOneUserFailure, fetchOneUserSuccess, updateUser } from "@/redux/admin/admin_manageUsers/admin_manageUsersActions";
import { useRouter } from "next/router";
import FormikInput from "@/common/FormikInput";
import { ONLY_DIGIT_REGIX, PASSWORD_REGIX, PHONE_NUMBER_REGIX, POSTAL_CODE_REGIX } from "@/utils/Regex";
import http, { requestError, returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { wrapper } from "@/redux/store";
import { accept, buttonClassName, checkImageFormat } from "@/utils/global";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";


const InsertStore = () => {
     const { user} = useSelector(state => state.admin_users.oneUser)
     const { loading} = useSelector(state => state.admin_users)

     const dispatch = useDispatch()
     const router = useRouter()
     const pageId = router.query.userId
     const [isAsideModal,setIsAsideModal] = useState(false)
     const [provienceQuery,setProvienceQuery] = useState('')
     const [cities,setCities] = useState(null)    
     const [cityQuery , setCityQuery] = useState("")
     const [selectedProvience,setSelectedProvience] = useState("")
     const [selectedCity,setSelectedCity] = useState("")
          
     // Search Province in The List
     const filteredProvinces = provienceQuery === '' ? provinces : provinces && provinces.filter((province) => province.name.toLowerCase().replace(/\s+/g, '').includes(provienceQuery.toLocaleLowerCase().replace(/\s+/g, '')))
     // Search Cities in The List
     const filteredCities = cityQuery === '' ? cities : cities && cities.filter((city) => city.name.toLowerCase().replace(/\s+/g, '').includes(cityQuery.toLocaleLowerCase().replace(/\s+/g, '')))

     const [isImage_Modal,setIsImage_Modal] = useState(false)
     const [imageFile , setImageFile] = useState(null)

     const image_input_ref = useRef()

     const setImageFile_handler = ({input,min,max,state,title,minTitle,maxTitle,ref}) => {
          const image = input.target.files[0]
          if(input.target.files && image){
               if(!checkImageFormat({fileName : image.name})){
                    requestError({error : null , defaultMessage : `تصویر ${title} معتبر نیست`})
                    ref.current.value = null
                    return false
               }
               if(Number(image.size) < (min*1000)){
                    requestError({error : null , defaultMessage : `تصویر ${title} نمی تواند کمتر از ${toPersianDigits(minTitle)} باشد`})
                    ref.current.value = null
                    return false
               } 
               if(Number(image.size) > (max*1000)){
                    requestError({error : null , defaultMessage : `تصویر ${title} نمی تواند بیشتر از ${toPersianDigits(maxTitle)}  باشد`})
                    ref.current.value = null
                    return false
               }
               state({selectedFile : image , imageUrl : URL.createObjectURL(image)})
          }
     }

     useEffect(()=>{
          setSelectedCity('')
          // id => proviance id
          const id = selectedProvience && selectedProvience.id || null;
          if(id){
               const cities = allCities.filter(city => city.province_id === selectedProvience.id)
               setCities(cities)
          }else{
               setCities(null)
          }
     },[selectedProvience])
    
     useEffect(()=>{
          if(user){
               const currentProvince = provinces.find(province => province.name == user.address.province) || "";
               const currentCity = allCities.find(city => city.name == user.address.city) || "";
               setSelectedCity(currentCity)
               setSelectedProvience(currentProvince)
          }
          setImageFile(user && user.is_profile_image && {imageUrl : user.profile_image} || "") 
     },[user])

     const onSubmit = (values) => {
          const profileImage = imageFile && imageFile.selectedFile || null;
          const city = selectedCity && selectedCity.name || null
          const province = selectedProvience && selectedProvience.name || null
          if(!province) {
               requestError({error : null , defaultMessage : "استان سکونت الزامی است"})
               return false
          }
          if(!city) {
               requestError({error : null , defaultMessage : "شهر سکونت الزامی است"})
               return false   
          }
          const house_number = formik.values.house_number.replace(/["'()]/g,"").replace(/\s/g, '').replace(/-/g, '');
               if(house_number.length > 0){
                    if(house_number.length < 11){
                         toast.error("شماره تلفن ثابت معتبر نیست")
                         return false;
                    }
               }
          dispatch(updateUser({values,profileImage,city,province,house_number,pageId}))
     }
    


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
          password : Yup.string()
               .min(6 , "رمز عبور نمی تواند کمتر از ۶ کاراکتر باشد")
               .max(24 , "رمز عبور نمی تواند بیشتر از ۲۴ نویسه باشد")
               .matches(PASSWORD_REGIX,"رمز عبور معتبر نیست | رمز عبور میتواند ترکیبی از عدد و حروف انگلیسی باشد"),
     })
    
     const formik = useFormik({
          onSubmit,
          validateOnMount : true,
          validationSchema,
          enableReinitialize : true,
          initialValues : {
               full_name : user && user.full_name || "",
               national_code : user && user.national_code || "",
               phone_number_primary : user && user.phone_number_primary || "",
               phone_number_secondary : user && user.phone_number_secondary || "",
               house_number : user && user.house_number || "",
               address_detail : user && user.address.detail || "",
               address_postcode : user && user.address.post_code || "",
               password : ''
          }
     })   


     return (  
          <Layout isFooter={true} pageTitle={"پنل مدیریت | ویرایش اطلاعات کاربر"}>
               <main className="w-full flex flex-col lg:flex-row  justify-between">
                    <AdminPageAside/>
                    <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                         <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                              <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                         </Modal>
                         {/* Modal For Profile Image */}
                         <Modal open={isImage_Modal} onClose={() => setIsImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                         <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                              <img alt="تصویر پروفایل کاربر" className="max-h-full w-auto" src={imageFile && imageFile.imageUrl || ""}/>
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
                              <h1 className="font-iranyekan-bold text-lg text-gray-800">ویرایش کاربر (خریدار)</h1>
                         </div>
                         <nav className="flex gap-x-2 items-center">
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
                              </nav>
                         </div>
                         <form onSubmit={formik.handleSubmit}>
                              <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                   <p className="font-iranyekan-bold text-gray-800"> مشخصات کاربر</p>
                                   <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                        <FormikInput maxLength={50} name={"full_name"} title={"نام و نام خانوادگی"} isRequired={true} formik={formik} placeholder={"نام و نام خانوادگی"} parentClassName="flex flex-col relative"/>
                                        <FormikInput maxLength={10} name={"national_code"} title={"کد ملی"} isRequired={true} formik={formik} placeholder={"کد ملی"} parentClassName="flex flex-col relative"/>
                                        <FormikInput maxLength={11} name={"phone_number_primary"} title={"شماره همراه"} isRequired={true} formik={formik} placeholder={"شماره همراه"} parentClassName="flex flex-col relative"/>
                                        <FormikInput maxLength={11} name={"phone_number_secondary"} title={"شماره همراه دوم"}  formik={formik} placeholder={"شماره همراه دوم"} parentClassName="flex flex-col relative"/>

                                        <div className="flex flex-col relative ">
                                             <p className="font-iranyekan-regular text-[13px] text-gray-800">تلفن ثابت :</p>
                                             <InputMask dir="ltr"  type={"text"} value={formik.values.house_number} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="(999) 9999 9999" name="house_number" maskPlaceholder="-" className={`${formik.errors.house_number && formik.touched.house_number ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-[13px]  font-iranyekan-regular bg-white text-gray-800 rounded-md`} maskchar={null}/>
                                             {formik.errors.house_number && formik.touched.house_number && <p className="mt-2 font-iranyekan-regular text-xs text-red-700">{formik.errors.house_number}</p>}
                                        </div>

                                        <div className="flex flex-col relative ">
                                             <p className="font-iranyekan-regular text-[13px] text-gray-800 before:content-['*'] before:text-red-600">استان :</p>
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
                                             <p className="font-iranyekan-regular text-gray-800 text-[13px] before:content-['*'] before:text-red-600">شهر :</p>
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

                                   <p className="font-iranyekan-bold text-gray-800">تصاویر و فایل ها</p>
                                   <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                   {/* Profile Image */}
                                   <div className="flex flex-col relative ">
                                        <p className="font-iranyekan-regular text-[13px] text-gray-800"> تصویر پروفایل :</p>
                                        <input 
                                             type={'file'}  
                                             id="chooseImage"  
                                             ref={image_input_ref} 
                                             accept={accept}
                                             className="hidden" 
                                             onChange={input => setImageFile_handler({
                                                  input , 
                                                  min : 16 , 
                                                  max : 1024,
                                                  state : setImageFile,
                                                  maxTitle:'۱,۰۲۴ مگابایت',
                                                  minTitle : "۱۶ کیلوبایت",
                                                  ref : image_input_ref,
                                                  title : "کاربر"
                                             })}
                                        />
                                        {imageFile ? (
                                             <section  className="flex justify-between h-[38px] items-center mt-2  ">
                                                  <button type={"button"} onClick={()=>setIsImage_Modal(true)} className="flex justify-between items-center w-full h-full rounded-r-md bg-green-50 border-l-0 hover:bg-green-100 hover:border-green-600 border border-green-500">
                                                       <span className="text-[13px] font-iranyekan-regular text-green-700 pr-2">نمایش تصویر پروفایل</span>
                                                  </button>
                                                  <button onClick={()=> {setImageFile(null) ; image_input_ref.current.value = null}}  type={"button"}  className="bg-red-50 h-full items-center hover:bg-red-100 border px-4 rounded-l-md border-red-500 hover:border-red-700">
                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                       </svg>
                                                  </button>
                                             </section>
                                        ) : (
                                             <label htmlFor="chooseImage"  className="flex justify-between items-center h-[38px] px-2 mt-2 cursor-pointer text-[13px] font-iranyekan-regular rounded-md  bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-400 ">
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

                              <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                   <p className="font-iranyekan-bold text-gray-800"> رمز عبور</p>
                                   <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                        <FormikInput maxLength={24} isRequired={false} name={"password"} title={"رمز عبور جدید"} formik={formik} placeholder={"شماره همراه دوم مالک فروشگاه"} parentClassName="flex flex-col relative"/>
                                   </section>
                              </div>

                              <section className="w-full flex justify-end my-4 gap-x-2 items-center ">
                                   {loading === true ? (
                                        <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />
                                   ) : (
                                        <button type={"button"} onClick={()=> dispatch(deleteUser(pageId))} className={buttonClassName({bgColor : user && user.is_active ? "green" : "red" , isOutline : true , isValid : true})}>تغییر وضعیت</button>
                                   )}
                                   <button disabled={loading} type={"submit"} className={buttonClassName({bgColor : "blue" , isValid : !loading , isOutline : false})}>
                                        تایید تغییرات
                                   </button>
                              </section>
                         </form>
                    </section>
               </main>
          </Layout>
     );
}

export default InsertStore;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {
     // Check Permission
     const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
          
     let ErrorCode = 0;
     if(token.includes("undefined")) return {notFound : true}

     // Fetch User      
     await http.get("user", {headers : {authorization : token}})
     .then(({data}) =>  {
          if(data.user.account_type !== 'admin') ErrorCode = 403
          else {
               dispatch(cartDetails(data))
               dispatch(authSuccess(data.user))
          }
     })  
     .catch(() => {
          ErrorCode = 403
          dispatch(authFailure("خطا در بخش احراز هویت"))    
     })
     if(ErrorCode === 403){ return{notFound : true}}

     // Fetch SearchBar Data With User Token
     await http.get(`public/searchbar`,{headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
     .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

     // Fetch One User 
     await http.get(encodeURI(`admin/users?id=${ctx.query.userId}`) , {headers : {authorization : token}})
     .then(({data}) => {dispatch(fetchOneUserSuccess(data.user))})
     .catch(error => dispatch(fetchOneUserFailure("خطای سرور در بخش گرفتن اطلاعات یک کاربر")))
     

     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})