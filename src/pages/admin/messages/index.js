import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AdminAside from "@/components/adminPage/Aside";
import Link from "next/link";
import FormikInput from "@/common/admin/FormikInput";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { Pagination } from "@mui/material";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { admin_fetchNofifcationsRequest,deleteAdminNotificationsViaId, fetchAdminNotifications } from "@/redux/admin/admin_notifications/adminNotifications_actions";
import { timeStampToPersianDate, timeStampToPersianTime } from "@/utils/timeStampToPersianDate";
import { useRouter } from "next/router";
import Warning from "@/common/alert/Warning";
import ReactLoading from "react-loading";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";


const AdminMessages = () => {
    const [isAsideModal , setIsAsideModal] = useState(false)
    const {data , loading , deleteLoading} = useSelector(state => state.admin_notifications)
    const router = useRouter()
    const page = Number(useRouter().query.page || 1);


    const dispatch = useDispatch()

    const [selectedId , setSelectedId] = useState([])

    //! Use This in 'نمایش همه' & 'لغو نمایش همه'
    const isSelectedAll = () => data?.notifications?.length === selectedId.length


    const selectNotificate = (id) => {
        const availableId = selectedId.includes(id);
        if(availableId){
            const cloneData = [...selectedId]
            const filterData = cloneData.filter(state => state !== id)
            setSelectedId(filterData)
        }else{
            const cloneData = [...selectedId]
            cloneData.push(id)
            setSelectedId(cloneData)
        }
    }



    const selectedAllId = () => {
        const cloneData = []
        if(data && data.notifications.length > 0){
            const pushId = data.notifications.forEach(state => cloneData.push(state.id))
            setSelectedId(cloneData)
        }
    }


        
    useEffect(()=> {
        window.scroll({top : 0 , behavior : 'smooth'})
        dispatch(fetchAdminNotifications(router.query))
    },[router])

    const onSubmit = ({order,store}) => {
        router.push(`/admin/messages?page=1&order=${order || 'desc'}&store=${store || ""}`)
    }



    const validationSchema = Yup.object({
        store : Yup.string()
            .min(2 , 'نام فروشگاه نمی تواند کمتر از ۲ نویسه باشد')
            .max(250 , 'نام فروشگاه نمی تواند بیشتر از ۲۵۰ نویسه باشد')
            .trim(),
    })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            store : router?.query?.name || "",
            order : router?.query?.order || "desc"
        }
    })
    return (  
        <Layout isFooter={true} pageTitle="پنل مدیریت | اطلاعیه ها">
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <AdminAside/>
                    
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>
                    <div className="flex justify-between w-full items-center mt-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">اطلاعیه ها</h1>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            {/* Home SVG */}
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
                                <FormikInput name={"store"} title={"نام فروشگاه"} formik={formik} placeholder={"بر اساس نام فروشگاه"} parentClassName="flex flex-col relative"/>

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


                            </section>
                            <div className="w-full flex items-center justify-end mt-3">
                                <button type={"submit"} className={buttonClassName({bgColor : "blue" , isValid : formik.isValid , isOutline : false})}>جستجو</button>
                            </div>
                        </section>
                    </form>
                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}
                    {data?.notifications?.length<=0 && !loading && <Warning text={'اطلاعیه‌ایی یافت نشد!'}/>}

                    {data?.notifications?.length > 0 && (
                        <>
                            <section className="sticky top-0 z-20 rounded-md mt-4 bg-white p-4 overflow-hidden  w-full shadow-md flex flex-row justify-end gap-x-4">
                                {deleteLoading && <ReactLoading type="spinningBubbles" height={30} width={30} color="red" />}
                                {isSelectedAll() ? (
                                    <button onClick={() => setSelectedId([])} className={`${buttonClassName({bgColor : "yellow" , isValid : true , isOutline : true})}`} >لغو انتخاب شده‌ها</button>
                                    ) : (
                                    <button onClick={() => selectedAllId()} className={`${buttonClassName({bgColor : "blue" , isValid : true , isOutline : true})}`} >انتخاب همه</button>
                                )}
                                <button disabled={selectedId.length > 0 ? false : true || loading || deleteLoading} onClick={() => dispatch(deleteAdminNotificationsViaId(selectedId)) & setSelectedId([])} className={`${buttonClassName({bgColor : "red" , isValid : selectedId.length > 0 ? true : false , isOutline : true})}`} >حذف</button>
                            </section>

                            <section className="rounded-md bg-white p-4 gap-y-4 overflow-hidden w-full mt-4  shadow-md flex flex-col">
                                {data?.notifications?.map(notificate => (
                                    <div key={notificate.id} className="flex justify-between items-center ">
                                        <input type="checkbox" onChange={() => selectNotificate(notificate.id)} checked={selectedId.includes(notificate.id)} id={`notificate_${notificate.id}`} value="option1" className="rounded-full peer  ml-4 appearance-none h-5 w-5 border border-gray-300  bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none ring-current focus:ring-0    mt-1 align-top  cursor-pointer"/>
                                        <label  htmlFor={`notificate_${notificate.id}`} className="peer-checked:border-red-500 peer-checked:bg-red-50 relative rounded-md cursor-pointer border-2 border-gray-200 select-none p-4 bg-[#fcfcfc] w-full">
                                            <div className="w-full flex justify-between">
                                                <p className="font-sans text-xs">{notificate.store}</p>
                                                <p className="font-sans text-xs">{timeStampToPersianDate(notificate.time)} | {timeStampToPersianTime(notificate.time)}</p>
                                            </div>
                                            <p className="font-sans text-xs leading-7 sm:text-sm  text-gray-700 mt-4">{notificate.message}</p>
                                            {notificate.is_new && <div className=" animate-ping absolute top-0 right-0 block w-1 h-1 rounded-full ring-2 ring-red-400 bg-red-600"></div>}
                                        </label>
                                    </div>
                                ))}
                            </section>
                        </>
                    )}
                    {data?.notifications?.length > 0 && <section dir="ltr" className=" w-full flex justify-center py-4">
                        <Pagination size="large" color="primary" page={page} count={data?.pagination?.last} onChange={(event , page)=> {
                            router.push(`/admin/messages?page=${page}&store=${router.query.store || ""}&order=${router.query.order || 'desc'}`)
                        }}/>
                    </section>}
                </section>
            </div>
        </Layout>
    );
}
export default AdminMessages;

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
            dispatch(cartDetails(data))
            dispatch(authSuccess(data.user))
        }
    })  
    .catch(() => {
        ErrorCode = 403
        dispatch(authFailure("خطا در بخش احراز هویت"))    
    })
    if(ErrorCode === 403){return{notFound : true}}

    // Fetch SearchBar Data With User Token
    await http.get(`public/searchbar`,{headers : {authorization : token}})
    .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
    .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

    // DIspatch This For Showing Loading
    dispatch(admin_fetchNofifcationsRequest())
    
    // Fetch Navbar Categories
    await http.get(`public/categories`)
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})