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
import { fetchUsers } from "@/redux/admin/admin_manageUsers/admin_manageUsersActions";
import Cookies from "universal-cookie";
import axios from "axios";
import FormikInput from "@/common/admin/FormikInput";

const ManageStores = () => {
    const dispatch = useDispatch()
    const {users , loading  , pagination} = useSelector(state => state.admin_users)
    const router = useRouter() 
    
    const [Image_Modal , setImage_Modal] = useState(false)


    const [modal_imageSrc , setModal_imageSrc] = useState("")

    const [isStoreBannerImage_Modal , setIsStoreBannerImage_Modal] = useState(false)

    const [isLicenseImage_Modal , setIsLicenseImage_Modal] = useState(false)
    const [isAsideModal , setIsAsideModal] = useState(false)
    const [status , setStatus] = useState('all')

    const page = Number(useRouter().query.page || 1);
    const limit = 5
    
    useEffect(()=> {
        window.scroll({top : 0 , behavior : 'smooth'})
        const {state , page , national_code,full_name,number,order} = router.query;
        const payload = {state,page,limit,order,national_code,number,full_name}

        dispatch(fetchUsers(payload))
    },[router.query])

    const onSubmit = ({ full_name ,national_code,number,order}) => {
        router.push(`/admin/manage-users?page=1&state=${status || "all"}&full_name=${full_name || ""}&national_code=${national_code || ""}&number=${number || ""}&order=${order || 'desc'}&limit=${limit}`)
    }

    const PHONE_NUMBER_REGIX = /^09[0|1|2|3][0-9]{8}$/;
    const ONLY_DIGIT_REGIX = /^\d+$/;
    const POSTAL_CODE_REGIX = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;

    const validationSchema = Yup.object({
        full_name : Yup.string()
            .min(2, "نام و نام خانوادگی نمی تواند کمتر از ۲ نویسه باشد")
            .max(50,"نام و نام خانوادگی نمی تواند بیشتر از ۵۰ نویسه باشد")
            .trim(),
        national_code : Yup.string()
            .max(10 , "کد ملی نامعتبر است")
            .min(2 , "کد ملی نمی تواند کمتر از ۲ نویسه باشد")
            .matches(ONLY_DIGIT_REGIX , "کد ملی نامعتبر است")
            .trim(),
        number : Yup.string()
            .max(11 , "شماره نامعتبر است")
            .min(2 , "شماره نمی تواند کمتر از ۲ نویسه باشد")
            .trim(),
        })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            full_name : router.query.full_name || "",
            national_code : router.query.national_code ||  "",
            number : router.query.number || "",
            order : router.query.order || "desc"
        }
    })

    return (  
        <Layout isFooter={true} pageTitle={" پنل مدیریت | مدیریت کاربران"}>
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
                            <h1 className="font-sans font-bold text-lg">مدیریت کاربران</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Link href={{pathname:"/admin/manage-users"}}>
                                <a className="items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <Link href={'/admin/manage-users/insert'}>
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
                        <section className="w-full p-4 bg-white mt-3 rounded-lg shadow-md">
                            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                <FormikInput name={"full_name"} title={"نام و نام خانوادگی"} formik={formik} placeholder={"بر اساس نام و نام خانوادگی"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"national_code"} title={"کد ملی"} formik={formik} placeholder={"بر اساس کد ملی"} parentClassName="flex flex-col relative"/>
                                <FormikInput name={"number"} title={"شماره همراه یا ثابت"} formik={formik} placeholder={"بر اساس شماره همراه یا ثابت"} parentClassName="flex flex-col relative"/>

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
                    {!users && !loading && <Warning text={'کاربری با این مشخصات یافت نشد!'}/>}
                    {users && !loading && (
                        <>
                            <section className="w-full mt-3 rounded-md overflow-hidden shadow-md flex flex-col ">

                                {users && users.map(user => {
                                    return(
                                        <section key={user.id}>
                                            <div className="p-2 bg-white w-full">
                                                <input type={"checkbox"} id={`detail_${user.id}`} className="peer hidden"/>
                                                <section className=" flex flex-col sm:flex-row items-center  justify-between">
                                                    <div className=" h-full min-w-[150px]   max-w-[150px]  sm:max-w-[100px] sm:min-w-[100px]">
                                                        <img onClick={()=> {user.is_profile_image && setImage_Modal(true) ; setModal_imageSrc(user.profile_image)}} className="w-full h-auto" src={user.profile_image}/>
                                                    </div>
                                                    <div className="w-full flex justify-start flex-col pr-4 gap-y-3 mt-4 sm:mt-0">
                                                        <p className="font-sans leading-6 text-sm flex-col items-start sm:flex-row flex">
                                                            <b className="whitespace-nowrap pl-2">نام و نام خانوادگی : </b>
                                                                {user.full_name.length >0 ?  user.full_name : "نامشخص"} </p>
                                                        <p className="font-sans leading-6 text-sm flex-col items-start sm:flex-row flex ">
                                                            <b className="whitespace-nowrap pl-2">کد ملی : </b> 
                                                            {user.national_code.length > 0 ? user.national_code : "نامشخص"}</p>
                                                        <div className="font-sans leading-6 text-sm flex flex-col w-full sm:flex-row pl-3">
                                                            <b className="whitespace-nowrap pl-2">کد پستی : </b>
                                                            {user.address.post_code&& user.address.post_code.length > 0 ? user.address.post_code : "نامشخص"}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between w-full mt-4 sm:m-0 sm:w-fit  sm:justify-end gap-x-4">
                                                        <div className=" flex items-center">
                                                            {user.is_active ? (
                                                                <p className="whitespace-nowrap font-sans text-sm max-w-min bg-green-50 text-green-600 rounded-lg px-3 py-1">تایید شده</p>
                                                            ) : (
                                                                <p className="whitespace-nowrap font-sans text-sm bg-red-50 text-red-600 rounded-lg px-3 py-1">رد شده</p>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center ">
                                                            <label htmlFor={`detail_${user.id}`} className="p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 peer-checked:rota">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </section>
                                                {/* Description */}
                                                <section className="mt-4 rounded-md bg-gray-50 w-full peer-checked:flex flex-col hidden flex-wrap gap-y-2 p-4 pb-0">
                                                    <div className="flex flex-col gap-y-2">
                                                        <p className="font-sans text-sm"><b>نام و نام خانوادگی : </b>{user.full_name}</p>
                                                        <p className="font-sans text-sm"><b>کد ملی : </b>{user.national_code}</p>
                                                        <p className="font-sans text-sm"><b>شماره موبایل : </b>{user.phone_number_primary}</p>
                                                        <p className="font-sans text-sm"><b>شماره همراه دوم : </b>{user.phone_number_secondary.length > 0 ? user.phone_number_secondary : "نامشخص"}</p>
                                                        <p className="font-sans text-sm"><b>تلفن ثابت : </b>{user.house_number.length > 0 ? user.house_number : "نامشخص"  }</p>
                                                        <p className="font-sans text-sm"><b>استان : </b>{user.address.province && user.address.province.length > 0 ? user.address.province : "نامشخص"}</p>
                                                        <p className="font-sans text-sm"><b>شهر : </b>{user.address.city && user.address.city.length > 0 ? user.address.city : "نامشخص"}</p>
                                                        <p className="font-sans text-sm"><b>آدرس : </b>{user.address.detail && user.address.detail.length > 0 ? user.address.detail : "نامشخص"}</p>
                                                        <p className="font-sans text-sm"><b>کد پستی : </b>{user.address.post_code && user.address.post_code.length > 0 ? user.address.post_code : "نامشخص"}</p>
                                                        {/* User Profile Image */}
                                                        <div className="flex">
                                                            <b className="font-sans text-sm">عکس کاربر : </b>
                                                            {user.profile_image ? (
                                                                <>
                                                                    <button onClick={()=> {setImage_Modal(true) ; setModal_imageSrc(user.profile_image)}} className="hover:text-red-600 font-sans text-sm text-blue-600 underline">نمایش تصویر</button>
                                                                    <Modal open={Image_Modal} onClose={() => setImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                                                                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                                                            <img className="max-h-full w-auto" src={modal_imageSrc}/>
                                                                            <button onClick={() => setImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        </section>
                                                                    </Modal>
                                                                </>
                                                            ) : <p className="font-sans text-sm mr-1">نامشخص</p>}
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end w-full mt-4 mb-4">
                                                        <Link href={`/admin/manage-users/edit/${user.id}`} >
                                                            <a className=" font-sans text-sm hover:bg-blue-200 bg-blue-100 text-blue-700 border border-blue-500 px-4 py-1 rounded-md">ویرایش</a>
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
                                    router.push(`/admin/manage-users?page=${page }&state=${status || "all"}&full_name=${router.query.full_name || ""}&national_code=${router.query.national_code || ""}&number=${router.query.number || ""}&order=${router.query.order || 'desc'}&limit=${router.query.limit || limit}`)
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