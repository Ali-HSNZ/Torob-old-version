import Layout from "@/layout/Layout";
import { Modal, Pagination } from "@mui/material";
import { useState } from "react";
import AdminPageAside from "@/components/adminPage/Aside";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Yup from 'yup'
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import Warning from "@/common/alert/Warning";
import { fetchStores } from "@/redux/admin/admin_manageStores/admin_manageStoresAction";
import Cookies from "universal-cookie";
import axios from "axios";
import FormikInput from "@/common/admin/FormikInput";

const ManageStores = () => {
    const dispatch = useDispatch()
    const {stores , loading  , pagination} = useSelector(state => state.admin_stores)
    const router = useRouter()
    
    const [isLogoImage_Modal , setIsLogoImage_Modal] = useState(false)


    const [modal_imageSrc , setModal_imageSrc] = useState("")

    const [isStoreBannerImage_Modal , setIsStoreBannerImage_Modal] = useState(false)

    const [isLicenseImage_Modal , setIsLicenseImage_Modal] = useState(false)
    const [isAsideModal , setIsAsideModal] = useState(false)
    const [status , setStatus] = useState('all')

    const page = Number(useRouter().query.page || 1);
    const limit = 5
    
    useEffect(()=> {
        window.scroll({top : 0 , behavior : 'smooth'})
        const {state , page , economic_code,name,number,city,province,order} = router.query;
        const payload = {state,page,limit,order,economic_code,number,name,province,city}

        dispatch(fetchStores(payload))
    },[router.query])

    const onSubmit = ({ name ,economic_code,number,city,province,order}) => {
        router.push(`/admin/manage-stores?page=1&state=${status || "all"}&economic_code=${economic_code || ""}&province=${province}&city=${city || ""}&number=${number || ""}&order=${order || 'asc'}&name=${name || ""}&limit=${limit}`)
    }
    const validationSchema = Yup.object({
        name : Yup.string().min(2 , 'عنوان کالا نمی تواند کمتر از ۲ نویسه باشد').max(250 , 'عنوان کالا نمی تواند بیشتر از ۲۵۰ نویسه باشد').trim(),
        economic_code : Yup.string().min(2,"کد اقتصادی نمی تواند کم تر  ۲ رقم باشد").max(12,"کد اقتصادی نمی تواند بیشتر از ۱۲ رقم باشد").matches(/^[0-9]{2,}\d*$/,"کد اقتصادی باید عدد باشد").trim(),
        number : Yup.string().min(3,"شماره تلفن نمی تواند کم تر از ۳ رقم باشد").max(11 , "شماره تلفن نمی تواند بیشر از ۱۱ رقم باشد").matches(/^[0-9]{3,}\d*$/,"شماره تلفن باید عدد باشد").trim(),
        province : Yup.string().min(2 , "نام استان نمی تواند کم تر از ۲ نویسه باشد").max(50,"نام استان نمی تواند بیشتر از ۵۰ نویسه باشد").matches(/^[\u0600-\u06FF\s]+$/,"نام استان را به فارسی وارد کنید").trim(),
        city :  Yup.string().min(2 , "نام شهر نمی تواند کم تر از ۲ نویسه باشد").max(50,"نام شهر نمی تواند بیشتر از ۵۰ نویسه باشد").matches(/^[\u0600-\u06FF\s]+$/,"نام شهر را به فارسی وارد کنید").trim(),
    })


    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            name : router.query.name || "",
            economic_code : router.query.economic_code ||  "",
            number : router.query.number || "",
            province : router.query.province || "",
            city : router.query.city || "",
            order : router.query.order || "desc"
        }
    })

    return (  
        <Layout isFooter={true} pageTitle={" پنل مدیریت | مدیریت فروشگاه‌ها"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <AdminPageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>


                    <div className="flex justify-between w-full items-center mt-4">
                    <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">مدیریت فروشگاه‌ها</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Link href={{pathname:"/admin/manage-stores"}}>
                                <a className="items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <Link href={'/admin/manage-stores/insert'}>
                                <a className="gap-x-1 items-center hover:bg-green-200 bg-green-100 flex border border-green-700  rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
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

                    <form className="w-full " onSubmit={formik.handleSubmit}>
                        <section className="w-full p-4 bg-white mt-3 rounded-lg shadow-md overflow-hidden">
                            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                                <FormikInput name={"name"} title={"نام فروشگاه"} formik={formik} placeholder={"بر اساس نام فروشگاه"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"economic_code"} title={"کد اقتصادی"} formik={formik} placeholder={"بر اساس کد اقتصادی"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"number"} title={"شماره تلفن"} formik={formik} placeholder={"بر اساس شماره تلفن"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"province"} title={"استان"} formik={formik} placeholder={"بر اساس استان"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"city"} title={"شهر"} formik={formik} placeholder={"بر اساس شهر"} parentClassName="flex flex-col relative"/>

                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm">ترتیب نمایش (تاریخ ثبت) :</p>
                                    <section className="flex justify-between mt-2 gap-x-2">
                                        <div className="flex w-1/2">
                                            <input type="radio" value={'desc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'desc'} className="peer hidden" id="desc" />
                                            <label htmlFor="desc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-sans text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">جدیدترین</label>
                                        </div>
                                        <div className="flex w-1/2">
                                            <input type="radio" value={'asc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'asc'} className="peer hidden" id="asc" />
                                            <label htmlFor="asc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-sans text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">قدیمی‌ترین</label>
                                        </div>
                                    </section>
                                </div>
                                
                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm">وضعیت :</p>
                                    <select defaultValue={ router.query.state || 'all'} onChange={event => setStatus(event.target.value)} className=" cursor-pointer border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md">
                                        <option className="py-2 text-sm font-sans" value={'active'}>تایید شده‌ها</option>
                                        <option className="py-2 text-sm font-sans" value={'trashed'}>رد شده‌ها</option>
                                        <option className="py-2 text-sm font-sans" value={'all'} >نمایش همه وضعیت ها</option>
                                    </select>
                                </div>

                            </section>
                            <div className="w-full flex items-center justify-end mt-3">
                                <button type={"submit"} className={`${formik.isValid ? "hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>جستجو</button>
                            </div>
                        </section>
                    </form>

                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}
                    {!stores && !loading && <Warning text={'فروشگاهی با این مشخصات یافت نشد!'}/>}
                    {stores && (
                        <>
                            <section className="w-full mt-3 rounded-lg overflow-hidden shadow-md flex flex-col ">
                                {stores && stores.map(store => {
                                    return(
                                        <section key={store.id}>
                                            <div className="p-2 bg-white w-full">
                                                <input type={"checkbox"} id={`detail_${store.id}`} className="peer hidden"/>

                                                <section className=" flex flex-col sm:flex-row items-center  justify-between">
                                                    <div className=" h-full min-w-[150px]   max-w-[150px]  sm:max-w-[100px] sm:min-w-[100px]">
                                                        <img onClick={()=> {store.is_logo_image && setIsLogoImage_Modal(true) ; setModal_imageSrc(store.logo_image)}} className="w-full h-auto" src={store.logo_image}/>
                                                    </div>
                                                    <div className="w-full flex justify-start flex-col pr-4 gap-y-3 mt-4 sm:mt-0">
                                                        <p className="font-sans leading-6 text-sm flex-col items-start sm:flex-row flex">
                                                            <b className="whitespace-nowrap pl-2">نام فروشگاه : </b>
                                                                {store.name.length >0 ?  store.name : "نامشخص"} </p>
                                                        <p className="font-sans leading-6 text-sm flex-col items-start sm:flex-row flex ">
                                                            <b className="whitespace-nowrap pl-2">نام صاحب فروشگاه : </b> 
                                                            {store.owner_full_name.length > 0 ? store.owner_full_name : "نامشخص"}</p>
                                                        <div className="font-sans leading-6 text-sm flex flex-col w-full sm:flex-row pl-3">
                                                            <b className="whitespace-nowrap pl-2">استان : </b>
                                                            {store.province&& store.province.length > 0 ? store.province : "نامشخص"}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between w-full mt-4 sm:m-0 sm:w-fit  sm:justify-end gap-x-4">
                                                        <div className=" flex items-center">
                                                            {store.is_show ? (
                                                                <p className="whitespace-nowrap font-sans text-sm max-w-min bg-green-50 text-green-600 rounded-lg px-3 py-1">تایید شده</p>
                                                            ) : (
                                                                <p className="whitespace-nowrap font-sans text-sm bg-red-50 text-red-600 rounded-lg px-3 py-1">رد شده</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center ">
                                                            <label htmlFor={`detail_${store.id}`} className="p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 peer-checked:rota">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </section>
                                                {/* Description */}
                                                <section className="bg-gray-50 rounded-md mt-4 w-full peer-checked:flex flex-col hidden flex-wrap gap-y-2 p-4 pb-0">
                                                    <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                                        <p className="font-sans text-sm"><b>نام فروشگاه : </b>{store.name}</p>
                                                        <p className="font-sans text-sm"><b>نام صاحب فروشگاه : </b>{store.owner_full_name}</p>
                                                        <p className="font-sans text-sm"><b>کد ملی صاحب فروشگاه : </b>{store.owner_national_code}</p>
                                                        <p className="font-sans text-sm"><b>شماره همراه صاحب فروشگاه : </b>{store.owner_phone_number}</p>
                                                        <p className="font-sans text-sm"><b>شماره همراه دوم صاحب فروشگاه : </b>{store.second_phone_number.length <= 0 ? "نامشخص" : store.second_phone_number}</p>
                                                        <p className="font-sans text-sm"><b>استان : </b>{store.province}</p>
                                                        <p className="font-sans text-sm"><b>شهر : </b>{store.city}</p>
                                                        <p className="font-sans text-sm"><b>کد اقتصادی : </b>{store.economic_code}</p>
                                                        <p className="font-sans text-sm"><b>آدرس دفتر مرکزی : </b>{store.office_address}</p>
                                                        <p className="font-sans text-sm"><b>تلفن دفتر مرکزی : </b>{store.office_number}</p>
                                                        <p className="font-sans text-sm"><b>آدرس انبار مرکزی : </b>{store.warehouse_address}</p>
                                                        <p className="font-sans text-sm"><b>تلفن انبار مرکزی : </b>{store.warehouse_number}</p>
                                                        <p className="font-sans text-sm"><b>بانک : </b>{store.bank_name}</p>
                                                        <p className="font-sans text-sm"><b>شعبه بانک : </b>{store.bank_code}</p>
                                                        <p className="font-sans text-sm"><b>شماره کارت : </b>{store.bank_card_number}</p>
                                                        <p className="font-sans text-sm"><b>شماره شبا : </b>{store.bank_sheba_number}</p>
                                                        {/* Logo */}
                                                        <div className="flex">
                                                            <b className="font-sans text-sm">تصویر لوگو : </b>
                                                            {store.is_logo_image ? (
                                                                <>
                                                                    <button onClick={()=> {setIsLogoImage_Modal(true) ; setModal_imageSrc(store.logo_image)}} className="hover:text-red-600 font-sans text-sm text-blue-600 underline">نمایش تصویر</button>
                                                                    <Modal open={isLogoImage_Modal} onClose={() => setIsLogoImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                                                                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                                                            <img className="max-h-full w-auto" src={modal_imageSrc}/>
                                                                            <button onClick={() => setIsLogoImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        </section>
                                                                    </Modal>
                                                                </>
                                                            ) : <p className="font-sans text-sm mr-1">نامشخص</p>}
                                                        </div>
                                                        {/* StoreBanner */}
                                                        <div className="flex">
                                                            <b className="font-sans text-sm">تصویر عکس سر در فروشگاه : </b>
                                                            {store.is_store_banner_image ? (
                                                                <>
                                                                    <button onClick={()=>{setIsStoreBannerImage_Modal(true)  ; setModal_imageSrc(store.banner_image)}} className="hover:text-red-600 font-sans text-sm text-blue-600 underline">نمایش تصویر</button>
                                                                    <Modal open={isStoreBannerImage_Modal} onClose={() => setIsStoreBannerImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                                                                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                                                            <img className="max-h-full w-auto" src={modal_imageSrc}/>
                                                                            <button onClick={() => setIsStoreBannerImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        </section>
                                                                    </Modal>
                                                                </>
                                                            ) : <p className="font-sans text-sm mr-1">نامشخص</p>}
                                                        </div>
                                                        {/* License */}
                                                        <div className=" flex">
                                                            <b className="font-sans text-sm">تصویر مجوز : </b>
                                                           {store.is_license_image ? (
                                                                <>
                                                                    <button onClick={()=>{setIsLicenseImage_Modal(true) ; setModal_imageSrc(store.license_image)}} className="hover:text-red-600 font-sans text-sm text-blue-600 underline">نمایش تصویر</button>
                                                                    <Modal open={isLicenseImage_Modal} onClose={() => setIsLicenseImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                                                                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                                                            <img className="max-h-full w-auto" src={modal_imageSrc}/>
                                                                            <button onClick={() => setIsLicenseImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        </section>
                                                                    </Modal>
                                                                </>
                                                           ) : <p className="font-sans text-sm mr-1"> نامشخص </p>}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end w-full mt-4 mb-4">
                                                        <Link href={`/admin/manage-stores/edit/${store.id}`} >
                                                            <a className=" font-sans  shadow-sm md:shadow-md  lg:shadow-lg text-sm hover:bg-blue-100 bg-blue-50 text-blue-700 border border-blue-500 px-4 py-2 rounded-md">ویرایش فروشگاه {store.name}</a>
                                                        </Link>
                                                    </div>
                                                </section>
                                            </div>
                                            <hr/>
                                        </section>
                                    )
                                })}
                            </section>

                            <section dir="ltr" className=" w-full flex justify-center py-4">
                                <Pagination size="large" color="primary" page={page} count={pagination && pagination.last || 100} onChange={(event , page)=> {
                                    router.push(`/admin/manage-stores?page=${page }&state=${status || "all"}&economic_code=${router.query.economic_code || ""}&province=${router.query.province || ""}&city=${router.query.city || ""}&number=${router.query.number || ""}&order=${router.query.order || 'asc'}&name=${router.query.name || ""}&limit=${router.query.limit}`)
                                }}/>
                            </section>
                        </>
                    )}


                </section>
            </div>
        </Layout>
    );
}
 
export default ManageStores;

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