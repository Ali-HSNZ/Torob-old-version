import AdminPageAside from "@/components/adminPage/Aside";
import DialogAlert_deleteBrand from "@/components/adminPage/manage-brand/DialogAlert_deleteBrand";
import Layout from "@/layout/Layout";
import { admin_fetchBrandsRequest, fetchBrands } from "@/redux/admin/admin_manageBrand/admin_manageBrandActions";
import { Modal, Pagination } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogAlert_updateBrand from "@/components/adminPage/manage-brand/DialogAlert_updateBrand";
import DialogAlert_insertBrand from "@/components/adminPage/manage-brand/DialogAlert_insertBrand";
import { useRouter } from "next/router";
import Warning from "@/common/alert/Warning";
import * as Yup from 'yup'
import { useFormik } from "formik";
import Link from "next/link";
import ReactLoading from 'react-loading';
import FormikInput from "@/common/admin/FormikInput";
import SelectBox_withoutSearch from "@/common/admin/SelectBox_withoutSearch";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { addToCartSuccess } from "@/redux/cart/cart/cartActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";


const ManageBrands = () => {

    const {brands , pagination  , loading} = useSelector(state => state.admin_brands)
    const router = useRouter()
    const page = Number(useRouter().query.page || 1)
    const limit = 12
    
    const dispatch = useDispatch();

    const returnState = (type) => allState.find(state => state.type === type);
    const allState = [
        {type : "all" , name:"نمایش همه وضعیت ها" },
        {type : "trashed" , name:"رد شده‌ها"},
        {type : "active" , name:"تایید شده‌ها"},
    ]
    const [status , setStatus] = useState(allState[0])

    const [isAsideModal , setIsAsideModal] = useState(false)
    const [isImage , setIsImage] = useState(false)
    const [isImage_photoSrc , setIsImage_photoSrc] = useState("ImageNotSelected")

    const [isModal_deleteBrand , setIsModal_deleteBrand] = useState(false)
    const [modalDetail_deleteBrand , setModalDetail_deleteBrand] = useState({})

    const [isModal_updateBrand , setIsModal_updateBrand] = useState(false)
    const [modalDetail_updateBrand , setModalDetail_updateBrand] = useState({})

    const [isModal_insertBrand , setIsModal_insertBrand] = useState(false)
    const [modalDetail_insertBrand , setModalDetail_insertBrand] = useState({})

    function showDialogAlert_reduxActions(){
        if(isModal_deleteBrand === true){
            return <DialogAlert_deleteBrand page={page} limit={limit} isModal={isModal_deleteBrand} setIsModal={setIsModal_deleteBrand} id={modalDetail_deleteBrand.id} title={modalDetail_deleteBrand.title} description={modalDetail_deleteBrand.description} />
        }
        if(isModal_updateBrand === true){
            return <DialogAlert_updateBrand is_brand_image={modalDetail_updateBrand.is_brand_image} imageUrl={modalDetail_updateBrand.imageUrl}  isModal={isModal_updateBrand} setIsModal={setIsModal_updateBrand} id={modalDetail_updateBrand.id} title={modalDetail_updateBrand.title} faName={modalDetail_updateBrand.faName} enName={modalDetail_updateBrand.enName} company={modalDetail_updateBrand.company} />
        }
        if(isModal_insertBrand === true){
            return <DialogAlert_insertBrand isModal={isModal_insertBrand} setIsModal={setIsModal_insertBrand} title={modalDetail_insertBrand.title} page={page} limit ={limit} />
        }
    }

    useEffect(()=>{
        setStatus(router.query.state ? returnState(router.query.state) : allState[0])
        window.scroll({top : 0,behavior:'smooth'})
        const {state , page , limit,order} = router.query;
        const payload = { state, page,order, limit, paramsName : router.query.name  || "", paramsCompany : router.query.company  || ""}
        dispatch(fetchBrands(payload))
    },[router.query])

    const  showImageHandler = (src) => {
        setIsImage(true)
        setIsImage_photoSrc(src)
    }
    
    const onSubmit = (values) => {
        const  { name , company ,order} = values;
        router.push(`/admin/manage-brands?state=${status.type || "all"}&order=${order || 'desc'}&name=${name || ""}&page=1&company=${company || ""}&limit=${limit}`)
    }
    const validationSchema = Yup.object({
        name : Yup.string().min(2 , 'عنوان برند نمی تواند کمتر از ۲ نویسه باشد').max(50 , 'عنوان برند نمی تواند بیشتر از ۵۰ نویسه باشد').trim(),
        company : Yup.string().min(2 , 'نام شرکت نمی تواند کمتر از ۲ نویسه باشد').max(50 , 'نام شرکت نمی تواند بیشتر از ۵۰ نویسه باشد').trim()
    })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true, 
        enableReinitialize : true,
        initialValues : {
            name : router.query.name || "",
            company : router.query.company  || "",
            order : router.query.order || 'desc'
        },
    })

    return (  
        <Layout isFooter={true} pageTitle={"پنل مدیریت | مدیریت برند"}>
            <Modal open={isImage} onClose={() => setIsImage(false)} className="p-4 h-full w-full flex justify-center items-center">
                <section className=" bg-white rounded-md sm:w-1/2 h-1/2 flex justify-center items-center p-4 relative">
                    <img className="max-h-full w-auto"  src={isImage_photoSrc}/>
                    <button onClick={() => setIsImage(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                </section>
            </Modal>
                {showDialogAlert_reduxActions()}
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <AdminPageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-3 sm:px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>


                    <div className="flex justify-between w-full items-center mt-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">مدیریت برند</h1>
                        </div>
                        <nav className="flex gap-x-2 items-center">
                            <Link href={{pathname:"/admin/manage-brands"}}>
                                <a className="items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <button onClick={()=>  {setIsModal_insertBrand(true) & setModalDetail_insertBrand({title:`افرودن برند جدید `})}} className=" items-center hover:bg-green-200 bg-green-100 flex border border-green-700  rounded-md py-2 px-3"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </button>
                            <Link href={'/admin'}>
                                <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </a>
                            </Link>
                        </nav>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-full  p-4 bg-white mt-3 rounded-lg shadow-md">
                        <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            <FormikInput formik={formik} name={'name'} placeholder="عنوان برند را وارد کنید" title={"عنوان برند"} parentClassName={"flex flex-col relative"} />
                            <FormikInput formik={formik} name={'company'} placeholder="نام شرکت را وارد کنید" title={"نام شرکت"}  parentClassName={"flex flex-col relative"}/>
                            
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
                                <SelectBox_withoutSearch selected={status} setSelected={setStatus} data={allState}/>
                            </div>
                        </section>

                        <section className="w-full flex justify-end mt-3 items-center">
                            <button type={"submit"} className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : formik.isValid})}>جستجو</button>
                        </section>
                    </form>
                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}

                    {!brands && !loading  && <Warning text={"برندی یافت نشد! می توانید برند جدیدی ثبت کنید."}></Warning>}
                    {brands && (
                        <>
                            <section className={` w-full grid sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4`}>
                                {brands.map(brand => {
                                    return(
                                        <div key={brand.id} className={`flex flex-col bg-white pb-4  ${!brand.is_show &&  "border border-red-300"}   relative rounded-md shadow-md h-min overflow-hidden`}>
                                            <div className="flex  w-full justify-end mb-4 mt-4 px-4  ">
                                                <div className="flex gap-x-2 items-center">
                                                    <button onClick={()=> {
                                                        setIsModal_deleteBrand(true) & 
                                                        setModalDetail_deleteBrand({
                                                                id : brand.id,
                                                                title:`${brand.name}`,
                                                                description :  `از تغییر وضعیت برند ${brand.name} مطمئن هستید؟.`,
                                                            })
                                                        }} 
                                                        className=" font-sans text-xs hover:underline underline-offset-4 text-orange-700 ">
                                                        تغییر وضعیت
                                                    </button>
                                                    <button onClick={()=>  {
                                                        setIsModal_updateBrand(true) & 
                                                        setModalDetail_updateBrand({
                                                                id : brand.id,
                                                                title:`ویرایش مشخصات`,
                                                                faName : brand.name,
                                                                enName : brand.english_name,
                                                                company : brand.company,
                                                                imageUrl : brand.logo_url,
                                                                is_brand_image : brand.is_brand_image
                                                            })
                                                        }} 
                                                        className=" font-sans text-xs hover:underline underline-offset-4 text-blue-700 ">
                                                            ویرایش
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center justify-between px-4">
                                                <div className="w-32 h-full" onClick={() => brand.is_brand_image && showImageHandler(brand.logo_url)}>
                                                    <Image   placeholder="blur" layout={'responsive'} alt={`لوگو`} blurDataURL={brand.logo_url} loader={()=>brand.logo_url } unoptimized src={brand.logo_url} objectFit='cover' width={600} height={500} />
                                                </div>
                                                <div className="flex flex-col items-left gap-y-4 justify-between w-full pr-6 min-h-max">
                                                    <p className={`text-gray-700 w-full text-right font-sans text-sm ${!brand.is_show &&  "text-red-700"}`}>{brand.name}</p>
                                                    <p className={`text-gray-700 w-full text-right font-sans text-sm ${!brand.is_show &&  "text-red-700"}`}>{brand.english_name}</p>
                                                </div>
                                            </div>
                                            <hr className="mt-4"/>
                                            <p className={`font-sans text-sm mt-4 w-full text-right px-4 text-gray-700 ${!brand.is_show &&  "text-red-700"}`}>{brand.company}</p>
                                        </div>
                                    )
                                })}

                            </section>
                            {brands && <section dir="ltr" className=" w-full flex justify-center py-4">
                                <Pagination size="large" color="primary" page={page} count={pagination.last} onChange={(event , page)=> {
                                    router.push(`/admin/manage-brands?page=${page}&state=${router.query.state || 'all'}&name=${router.query.name || ""}&company=${router.query.company || ''}&limit=${limit || 12}`)
                                }}/>
                            </section>}
                        </>
                    )}
                </section>
            </div>
        </Layout>
    );
}
export default ManageBrands;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {

     // Check Permission
     const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
     
     let ErrorCode = 0;
     if(token.includes("undefined")) return {notFound : true}

     // Fetch User Data     
     await http.get("user", {headers : {authorization : token}})
     .then(({data}) =>  {
          if(data.user.account_type !== 'admin') ErrorCode = 403; 
          else {
               dispatch(authSuccess(data.user))
               dispatch(addToCartSuccess(data))
          }
     })  
     .catch(() => {
          ErrorCode = 403
          dispatch(authFailure("خطا در بخش احراز هویت"))    
     })
     
     // Dispatch This For Showing Loading
     dispatch(admin_fetchBrandsRequest())

     if(ErrorCode === 403){return{notFound : true}}

     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})