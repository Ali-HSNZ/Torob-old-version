import AdminPageAside from "@/components/adminPage/Aside";
import Layout from "@/layout/Layout";
import {fetchCategories, filterCategories} from "@/redux/admin/admin_manageCategory/admin_manageCategoryActions";
import { Modal, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import InsertCategoryForm from "@/common/admin/manage-category/inputCommon";
import DialogAlert_deleteCategory from "@/common/admin/manage-category/DialogAlert_deleteCategory";
import DialogAlert_updateCategory from "@/common/admin/manage-category/DialogAlert_updateCategory";
import DialogAlert_insertMainCategory from "@/common/admin/manage-category/DialogAlert_insertMainCategory";
import Cookies from "universal-cookie";
import { wrapper } from "@/redux/store";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'
import Warning from "@/common/alert/Warning";
import { useRouter } from "next/router";
import Link from "next/link";

const ManageCategory = () => {

    const router = useRouter()
    const page = Number(useRouter().query.page || 1)
    const limit = 12

    const [status,setStatus] = useState('all')

    const {categories , pagination , loading , error} = useSelector(state => state.admin_categories)

    const [isModal_deleteCategory , setIsModal_deleteCategory] = useState(false)
    const [modalDetail_deleteCategory , setModalDetail_deleteCategory] = useState({})
    
    const [isModal_updateCategory , setIsModal_updateCategory] = useState(false)
    const [modalDetail_updateCategory , setModalDetail_updateCategory] = useState({})
    
    const [isModal_insertMainCategory , setIsModal_insertMainCategory] = useState(false)
    const [modalDetail_insertMainCategory , setModalDetail_insertMainCategory] = useState({})

    const [isAsideModal , setIsAsideModal] = useState(false)

    const dispatch = useDispatch()

    function showDialogAlert_reduxActions(){
        if(isModal_deleteCategory === true){
            return <DialogAlert_deleteCategory  isModal={isModal_deleteCategory} setIsModal={setIsModal_deleteCategory} id={modalDetail_deleteCategory.category_id} title={modalDetail_deleteCategory.title} description={modalDetail_deleteCategory.description}/>
        }
        if(isModal_updateCategory === true){
            return <DialogAlert_updateCategory  isModal={isModal_updateCategory} setIsModal={setIsModal_updateCategory} id={modalDetail_updateCategory.category_id} title={modalDetail_updateCategory.title} categoryName={modalDetail_updateCategory.categoryName} />
        }
        if(isModal_insertMainCategory === true){ 
            return <DialogAlert_insertMainCategory isModal={isModal_insertMainCategory} setIsModal={setIsModal_insertMainCategory} title={modalDetail_insertMainCategory.title}/>
        }
    }

    useEffect(()=>{
        window.scroll({top : 0,behavior:'smooth'})
        const {state , page , limit} = router.query;
        const payload = {state ,page,limit,paramsName : router.query.name || ""}
        dispatch(fetchCategories(payload))
    },[router.query])

    const onSubmit = ({name}) => {
        router.push(`/admin/manage-category?state=${status ? status : "all"}&name=${name ? name : ""}&limit=${limit}&page=1`)
    }

    const validationSchema = Yup.object({
        name : Yup.string().min(2 , 'عنوان برند نمی تواند کمتر از 2 نویسه باشد').max(50 , 'عنوان برند نمی تواند بیشتر از 50 نویسه باشد').trim()
    })

    const formik = useFormik({
        onSubmit,
        validationSchema,
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            name : router.query.name || "",
        }
    })

    
    return (  
        <Layout isFooter={true}>
            {showDialogAlert_reduxActions()}
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <AdminPageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>

                    <div className="flex justify-between w-full items-center mt-4">
                        <h1 className="font-sans font-bold text-lg">مدیریت دسته‌بندی</h1>
                        <div className="flex gap-x-2 items-center">
                            <Link href={{pathname:"/admin/manage-category"}}>
                                <a className="items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <button
                                onClick={()=>  {setIsModal_insertMainCategory(true) & setModalDetail_insertMainCategory({title:`افرودن دسته‌بندی جدید `})}}
                                className=" items-center hover:bg-green-200 bg-green-100 flex border border-green-700  rounded-md py-2 px-3"> 
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
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="w-full p-4 bg-white mt-3 rounded-lg shadow-md">
                        <section className="mt-3 grid grid-cols-3 gap-4">
                            <div className="flex flex-col relative">
                                <p className="font-sans text-sm"> عنوان دسته‌بندی :</p>
                                <input type="text" value={formik.values.name} name="name" onBlur={formik.handleBlur} onChange={formik.handleChange}  placeholder="عنوان دسته‌بندی را وارد کنید" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.name && formik.touched.name && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.name}</p>}
                            </div>
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">وضعیت :</p>
                                <select defaultValue={ router.query.state || 'all'} onChange={event => setStatus(event.target.value)} className=" cursor-pointer border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md">
                                    <option className="py-2 text-sm font-sans" value={'active'}>تایید شده‌ها</option>
                                    <option className="py-2 text-sm font-sans" value={'trashed'}>رد شده‌ها</option>
                                    <option className="py-2 text-sm font-sans" value={'all'} >نمایش همه وضعیت ها</option>
                                </select>
                                </div>
                        </section>

                        <div className="w-full flex  items-center justify-end mt-3">
                            <button type={"submit"} className={`${formik.isValid ? "hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>جستجو</button>
                        </div>
                    </form>

                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}
                    {!categories && !loading && <Warning text={'دسته بندی یافت نشد! میتوانید دسته‌بندی جدیدی ثبت کنید.'}/>}
                    {categories && (
                        <>
                            <section className={` w-full grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 auto-rows-min`}>
                                {categories.map((category) => {
                                    return (
                                        <section key={category.id} className={` bg-white p-4 rounded-md  shadow-md`}>
                                            <section className="w-full ">
                                                <input type="checkbox" className="hidden peer"  id={`mainInput_${category.id}`} />
                                                <div className="w-full flex flex-row justify-between">
                                                    <p className={`w-full font-sans font-bold ${!category.is_show && "text-red-600"}`} title={category.name}>{category.name.length > 20 ? category.name.substring(0,20)+"..." : category.name}</p>
                                                    <div className="flex items-center gap-x-2">
                                                        {category.is_show ? (
                                                            <label htmlFor={`mainInput_${category.id}`} className="cursor-pointer whitespace-nowrap font-sans text-xs text-blue-700 hover:underline underline-offset-4"> زیردسته</label>
                                                        ) : (
                                                            <p className="cursor-not-allowed whitespace-nowrap font-sans text-xs text-blue-700 line-through"> زیردسته</p>
                                                        )}
                                                        <button onClick={()=>  {setIsModal_deleteCategory(true) & setModalDetail_deleteCategory({title:` تغییر وضعیت دسته بندی  :  ${category.name}`,description :  "آیا مایل به تغییر وضعیت این دسته‌بندی هستید؟.",categoryName: category.name, category_id : category.id })}} className=" font-sans text-xs hover:underline underline-offset-4 text-red-700">وضعیت</button>
                                                        <button onClick={()=>  {setIsModal_updateCategory(true) & setModalDetail_updateCategory({title:`ویرایش دسته بندی  :  ${category.name}`,categoryName: category.name, category_id : category.id })}} className="  font-sans text-xs hover:underline underline-offset-4 text-green-700">ویرایش</button>
                                                    </div>
                                                </div>
                                                <section className="peer-checked:flex hidden items-center gap-x-1 mt-3">
                                                    <InsertCategoryForm category={category.name} id={category.id}/>
                                                </section>
                                            </section>
                                            <div className="mt-2">
                                                {category.sub_categories && category.sub_categories.map(sub => {
                                                    return(
                                                        <section key={sub.id}>
                                                            <section className="group">
                                                                <input type={'checkbox'} className=" peer  hidden"  id={`subInput_${sub.id}`} />
                                                                <section className={`flex justify-between peer-checked:rounded-t-md peer-checked:rounded-none rounded-md peer-checked:bg-gray-200 hover:bg-gray-50  px-2 py-2`}>
                                                                    {sub.is_show ? (
                                                                        <p className=" before:content-['\2022'] before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub.name}>{sub.name.length > 20 ? sub.name.substring(0,20)+"..." : sub.name } </p>
                                                                    ) : (
                                                                        <p className=" before:content-['\2022'] before:text-red-600 before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub.name}>{sub.name.length > 20 ? sub.name.substring(0,20)+"..." : sub.name } </p>
                                                                    )}
                                                                    <div className=" items-center gap-x-2 peer-checked:flex group-hover:flex hidden">
                                                                        {category.is_show  &&  sub.is_show ? (
                                                                            <label htmlFor={`subInput_${sub.id}`} className="cursor-pointer whitespace-nowrap font-sans text-xs text-blue-700 hover:underline underline-offset-4"> زیردسته</label>
                                                                        ) : (
                                                                            <p className="cursor-not-allowed whitespace-nowrap font-sans text-xs text-blue-700 line-through"> زیردسته</p>
                                                                        )}                                                                    
                                                                        <button onClick={()=>  { setIsModal_deleteCategory(true) & setModalDetail_deleteCategory({title:` تغییر وضعیت دسته بندی  :  ${sub.name}`,description :  "آیا مایل به تغییر وضعیت این دسته‌بندی هستید؟.",categoryName: sub.name, category_id : sub.id })}} className=" font-sans text-xs hover:underline underline-offset-4 text-red-700">وضعیت</button>
                                                                        <button onClick={()=>  {setIsModal_updateCategory(true) & setModalDetail_updateCategory({title:`ویرایش دسته بندی  :  ${sub.name}`,categoryName: sub.name, category_id : sub.id })}} className=" font-sans text-xs hover:underline underline-offset-4 text-green-700">ویرایش</button>
                                                                    </div>
                                                                </section>
                                                                <section className="peer-checked:flex peer-checked:bg-gray-50 hidden items-center p-2 gap-x-1 rounded-b-md mb-2">
                                                                    <InsertCategoryForm category={category.name} sub={sub.name} id={sub.id} />
                                                                </section>
                                                            </section>
                                                            <div>
                                                                {sub.sub_categories && sub.sub_categories.map(sub_sub => {
                                                                    return(
                                                                        <section key={sub_sub.id}>
                                                                            <section className="group">
                                                                                <input type={'checkbox'}  className=" peer hidden"  id={`sub_subInput_${sub_sub.id}`} />
                                                                                <section className="flex group justify-between peer-checked:rounded-t-md peer-checked:rounded-none rounded-md peer-checked:bg-gray-200 hover:bg-gray-50  pl-2 pr-8 py-2 ">
                                                                                    {sub_sub.is_show ? (
                                                                                        <p className=" before:content-['\2022'] before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub_sub.name}>{sub_sub.name.length > 15 ? sub_sub.name.substring(0,15)+"..." : sub_sub.name } </p>
                                                                                    ) : (
                                                                                        <p className=" before:content-['\2022'] before:text-red-600 before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub_sub.name}>{sub_sub.name.length > 15 ? sub_sub.name.substring(0,15)+"..." : sub_sub.name } </p>
                                                                                    )}                                                                                
                                                                                    <div className="flex items-center gap-x-2">
                                                                                        {category.is_show  &&  sub.is_show && sub_sub.is_show ? (
                                                                                            <label htmlFor={`sub_subInput_${sub_sub.id}`} className="group-hover:block hidden cursor-pointer whitespace-nowrap font-sans text-xs text-blue-700 hover:underline underline-offset-4"> زیردسته</label>
                                                                                        ) : (
                                                                                            <p className="cursor-not-allowed group-hover:block hidden whitespace-nowrap font-sans text-xs text-blue-700 line-through"> زیردسته</p>
                                                                                        )}
                                                                                        <button onClick={()=>  {setIsModal_deleteCategory(true) & setModalDetail_deleteCategory({title:`وضعیت دسته بندی  :  ${sub_sub.name}`,description :  "با وضعیت دسته‌بندی تمام زیردسته های آن وضعیت خواهند شد.",categoryName: sub_sub.name, category_id : sub_sub.id })}} className="group-hover:block hidden font-sans text-xs hover:underline underline-offset-4 text-red-700">وضعیت</button>
                                                                                        <button onClick={()=>  {setIsModal_updateCategory(true) & setModalDetail_updateCategory({title:`ویرایش دسته بندی  :  ${sub_sub.name}`,categoryName: sub_sub.name, category_id : sub_sub.id })}} className="group-hover:block hidden font-sans text-xs hover:underline underline-offset-4 text-green-700">ویرایش</button>
                                                                                    </div>
                                                                                </section>
                                                                                <section className="peer-checked:flex rounded-b-md peer-checked:bg-gray-50 hidden items-center p-2 gap-x-1  mb-2">
                                                                                    <InsertCategoryForm category={category.name} sub={sub.name} sub_sub={sub_sub.name} id={sub_sub.id}/>
                                                                                </section>
                                                                            </section>

                                                                            {sub_sub.sub_categories && sub_sub.sub_categories.map(sub_sub_sub => {
                                                                                return (
                                                                                    <section key={sub_sub_sub.id} className="flex group gap-x-2 hover:bg-gray-50 rounded-md pl-2 pr-14 py-2 ">
                                                                                    {sub_sub_sub.is_show ? (
                                                                                        <p className=" before:content-['\2022'] before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub_sub_sub.name}>{sub_sub_sub.name.length > 15 ? sub_sub_sub.name.substring(0,15)+"..." : sub_sub_sub.name } </p>
                                                                                    ) : (
                                                                                        <p className=" before:content-['\2022'] before:text-red-600 before:ml-2 before:align-middle  before:text-2xl w-full font-sans text-sm " title={sub_sub_sub.name}>{sub_sub_sub.name.length > 15 ? sub_sub_sub.name.substring(0,15)+"..." : sub_sub_sub.name } </p>
                                                                                    )}         
                                                                                    <button onClick={()=>  {setIsModal_deleteCategory(true) & setModalDetail_deleteCategory({title:`وضعیت دسته بندی  :  ${sub_sub_sub.name}`,description :  "با وضعیت دسته‌بندی تمام زیردسته های آن وضعیت خواهند شد.",categoryName: sub_sub_sub.name, category_id : sub_sub_sub.id })}} className="group-hover:block hidden font-sans text-xs hover:underline underline-offset-4 text-red-700">وضعیت</button>
                                                                                        <button onClick={()=>  {setIsModal_updateCategory(true) & setModalDetail_updateCategory({title:`ویرایش دسته بندی  :  ${sub_sub_sub.name}`,categoryName: sub_sub_sub.name, category_id : sub_sub_sub.id })}} className="group-hover:block hidden font-sans text-xs hover:underline underline-offset-4 text-green-700">ویرایش</button>
                                                                                    </section>
                                                                                )
                                                                            })}
                                                                        </section>
                                                                    )
                                                                })}
                                                                </div>
                                                        </section>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    )
                                })}
                            </section>

                            {categories && <section dir="ltr" className=" w-full flex justify-center py-4">
                                <Pagination size="large" color="primary" page={page} count={pagination && pagination.last || 1} onChange={(event , page)=> {
                                    router.push(`/admin/manage-category?page=${page}&state=${router.query.state || ''}&name=${router.query.name || ""}&limit=${limit || 12}`)
                                }}/>
                            </section>}
                        </>
                    )}
                </section>
            </div>
        </Layout>
    );
}
export default ManageCategory;

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