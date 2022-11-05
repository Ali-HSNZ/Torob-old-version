import AdminPageAside from "@/components/adminPage/Aside";
import DialogAlert_deleteBrand from "@/components/adminPage/manage-brand/DialogAlert_deleteBrand";
import Layout from "@/layout/Layout";
import { fetchBrands } from "@/redux/admin/admin_manageBrand/admin_manageBrandActions";
import { Modal, Pagination } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import DialogAlert_updateBrand from "@/components/adminPage/manage-brand/DialogAlert_updateBrand";
import DialogAlert_insertBrand from "@/components/adminPage/manage-brand/DialogAlert_insertBrand";
import { useRouter } from "next/router";
import Warning from "@/common/alert/Warning";
import * as Yup from 'yup'
import { useFormik } from "formik";
import Link from "next/link";
import ReactLoading from 'react-loading';


const ManageBrands = () => {

    const {brands , pagination  , loading} = useSelector(state => state.admin_brands)
    const router = useRouter()
    const page = Number(useRouter().query.page || 1)
    const limit = 12
    
    const dispatch = useDispatch();

    const [status , setStatus] = useState( 'all')
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
            return <DialogAlert_updateBrand  isModal={isModal_updateBrand} setIsModal={setIsModal_updateBrand} id={modalDetail_updateBrand.id} title={modalDetail_updateBrand.title} faName={modalDetail_updateBrand.faName} enName={modalDetail_updateBrand.enName} company={modalDetail_updateBrand.company} />
        }
        if(isModal_insertBrand === true){
            return <DialogAlert_insertBrand isModal={isModal_insertBrand} setIsModal={setIsModal_insertBrand} title={modalDetail_insertBrand.title} page={page} limit ={limit} />
        }
    }

    useEffect(()=>{
        window.scroll({top : 0,behavior:'smooth'})
        const {state , page , limit} = router.query;
        const payload = { state, page, limit, paramsName : router.query.name  || "", paramsCompany : router.query.company  || ""}
        dispatch(fetchBrands(payload))
    },[router.query])

    const  showImageHandler = (src) => {
        setIsImage(true)
        setIsImage_photoSrc(src)
    }
    
    const onSubmit = (values) => {
        const  { name , company } = values;
        router.push(`/admin/manage-brands?state=${status || "all"}&name=${name || ""}&page=1&company=${company || ""}&limit=${limit}`)
    }
    const validationSchema = Yup.object({
        name : Yup.string().min(2 , 'عنوان برند نمی تواند کمتر از 2 نویسه باشد').max(50 , 'عنوان برند نمی تواند بیشتر از 50 نویسه باشد').trim(),
        company : Yup.string().min(2 , 'نام شرکت نمی تواند کمتر از 2 نویسه باشد').max(50 , 'نام شرکت نمی تواند بیشتر از 50 نویسه باشد').trim()
    })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true, 
        enableReinitialize : true,
        initialValues : {
            name : router.query.name || "",
            company : router.query.company  || "",
        },
    })

    return (  
        <Layout isFooter={true}>
            <Modal open={isImage} onClose={() => setIsImage(false)} className="h-full w-full flex justify-center items-center">
                <section className=" bg-white w-1/2 h-1/2 flex justify-center items-center p-4 relative">
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
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>
                        {loading && (
                            <div className="w-full flex justify-center my-8">
                                <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                            </div>
                        )}
                    {!loading && (
                        <>
                            <button onClick={()=>  {setIsModal_insertBrand(true) & setModalDetail_insertBrand({title:`افرودن برند جدید `})}} className=" font-sans mt-3 text-sm hover:underline underline-offset-4 text-blue-700"> افزودن برند جدید</button>
                            <form onSubmit={formik.handleSubmit} className="w-full p-4 bg-white mt-3 rounded-lg shadow-md">
                                <section className="mt-3 grid grid-cols-3 gap-4">
                                    <div className="flex flex-col relative">
                                        <p className="font-sans text-sm"> عنوان برند :</p>
                                        <input type={"text"} value={formik.values.name} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange}  placeholder="عنوان برند را وارد کنید" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                        {formik.errors.name && formik.touched.name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.name}</p>}
                                    </div>
                                    <div className="flex flex-col relative">
                                        <p className="font-sans text-sm">نام شرکت :</p>
                                        <input type={"text"} name="company" value={formik.values.company} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="نام شرکت را وارد کنید" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                        {formik.errors.company && formik.touched.company && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.company}</p>}
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
        
                                <section className="w-full flex justify-end mt-3 items-center">
                                    <Link href={{pathname:"/admin/manage-brands"}}>
                                        <a className="font-sans ml-4 text-orange-700 hover:underline text-sm rounded-md">
                                            نمایش همه برندها
                                        </a>
                                    </Link>
                                    <button type={"submit"} className={`${formik.isValid ? "hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>جستجو</button>
                                </section>
                            </form>
                        </>
                    )}
                    {!brands && !loading  &&(
                        <Warning text={"برندی یافت نشد! می توانید برند جدیدی ثبت کنید."}></Warning>
                    )}
                    {brands && (
                        <>
                            <section className={` w-full grid grid-cols-3 mt-4 gap-4`}>

                                {brands.map(brand => {
                                    return(
                                        <div key={brand.id} className="flex flex-col bg-white pb-4  relative rounded-md shadow-md h-min overflow-hidden">

                                            <div className="flex  w-full justify-between mb-4 mt-4 px-4">
                                                <div className={`shadow-xl w-2 h-2 ${!brand.is_show &&  "bg-red-600"} rounded-full`}></div>
                                                <div className="flex gap-x-2 items-center">
                                                    <button 
                                                        onClick={()=>  {
                                                            setIsModal_deleteBrand(true) & 
                                                            setModalDetail_deleteBrand({
                                                                    id : brand.id,
                                                                    title:`${brand.name}`,
                                                                    description :  `از تغییر وضعیت برند ( ${brand.name} ) مطمئن هستید؟.`,
                                                                })
                                                            }} 
                                                        className=" font-sans text-xs hover:underline underline-offset-4 text-orange-700 ">تغییر وضعیت</button>
                                                    <button
                                                        onClick={()=>  {
                                                            setIsModal_updateBrand(true) & 
                                                            setModalDetail_updateBrand({
                                                                    id : brand.id,
                                                                    title:`ویرایش مشخصات`,
                                                                    faName : brand.name,
                                                                    enName : brand.english_name,
                                                                    company : brand.company
                                                                })
                                                            }} 
                                                        className=" font-sans text-xs hover:underline underline-offset-4 text-blue-700 ">ویرایش</button>
                                                </div>
                                            </div>
                                            <div className="flex flex-row items-center justify-between px-4">
                                                <div className="w-32 h-full" onClick={() => showImageHandler(brand.logo_url)}>
                                                    <Image   placeholder="blur" layout={'responsive'} alt={`لوگو`}
                                                        blurDataURL={brand.logo_url} 
                                                        loader={()=>brand.logo_url }
                                                        unoptimized
                                                        src={brand.logo_url}
                                                        objectFit='cover'
                                                        width={600}
                                                        height={500}
                                                    />
                                                </div>
                                                <div className="flex flex-col items-left gap-y-4 justify-between w-full pr-6 min-h-max">
                                                    <p className="text-gray-700 w-full text-right font-sans text-sm">{brand.name}</p>
                                                    <p className="text-gray-700 w-full text-right font-sans text-sm">{brand.english_name}</p>
                                                </div>
                                            </div>
                                            <hr className="mt-4"/>
                                            <p className="font-sans text-sm mt-4 w-full text-right px-4 text-gray-700">{brand.company}</p>
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

export const getServerSideProps = async(ctx) => {
    // Check Premission
    let errorCode=0;
    const token =  new Cookies( ctx.req.headers.cookie).get("userToken");
    if(!token) return{notFound : true}
    await axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
    .then(response =>  {if(!response.data.user.account_type === 'admin') errorCode = Number(403)})
    .catch( () => errorCode = Number(403))
    if(errorCode === 403) return{notFound : true};
    
    return {
        props : {}
    }
    // Get Brands
    // const {name , company , state , page , limit} = ctx.query
    // const data =  await axios.get(encodeURI(`https://market-api.iran.liara.run/api/admin/brands?name=${name ? name : ""}&company=${company ? company : ""}&state=${state ? state : "all"}&page=${page ? page : 1}&limit=${limit ? limit : 12}`) , {headers : {authorization : `Bearer ${token}`}})
    // .then((response) => response.data)    
    // return { 
    //     props : {
    //         pagination : data.pagination ,
    //         brands : data.brands

    //     }
    // }
}