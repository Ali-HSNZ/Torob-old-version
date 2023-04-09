import Layout from "@/layout/Layout";
import { Modal } from "@mui/material";
import { useState } from "react";
import AdminAside from "@/components/Panel_Menu/AdminPanelMenu";
import Link from "next/link";
import FormikInput from "@/common/FormikInput";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { PASSWORD_REGIX } from "@/utils/Regex";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { changeAdminPasswordAction } from "@/redux/admin/admin_changePassword.js/admin_changePasswordActions";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";

import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { buttonClassName } from "@/utils/global";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";

const ChangeAdminPassword = () => {
    const [isAsideModal , setIsAsideModal] = useState(false)
    const {loading} = useSelector(state => state.admin_changePassword)
    const dispatch = useDispatch()
    
    const onSubmit = (values) => {
        dispatch(changeAdminPasswordAction(values))
    }

    const validationSchema = Yup.object({
        old_password : Yup.string()
            .min(6 , "رمز عبور نمی تواند کمتر از 6 کاراکتر باشد.")
            .max(24 , "رمز عبور نمی تواند بیشتر از 24 نویسه باشد.")
            .required("رمز عبور نمی تواند خالی باشد.")
            .matches(PASSWORD_REGIX,"رمز عبور معتبر نیست | رمز عبور میتواند ترکیبی از عدد و حروف انگلیسی باشد."),
        new_password : Yup.string()
            .min(6 , "رمز عبور نمی تواند کمتر از 6 کاراکتر باشد.")
            .max(24 , "رمز عبور نمی تواند بیشتر از 24 نویسه باشد.")
            .required("رمز عبور نمی تواند خالی باشد.")
            .matches(PASSWORD_REGIX,"رمز عبور معتبر نیست | رمز عبور میتواند ترکیبی از عدد و حروف انگلیسی باشد.")
            .test('check-newPassword-vs-oldPassword' , "رمز عبور جدید نمی تواند با رمز عبور فعلی یکسان باشد.", value => value !== formik.values.old_password),
        new_password_repeat : Yup.string()
            .required("رمز عبور نمی تواند خالی باشد.")
            .test('check-confirm-newPassword' , "رمز عبور جدید با تکرار آن همخوانی ندارد.", value => value === formik.values.new_password)
    })

    const formik = useFormik({
        onSubmit,
        initialValues : {
            old_password : '',
            new_password : '',
            new_password_repeat : '',
        },
        validationSchema,
        validateOnMount : true,
    })

    return (  
        <Layout isFooter={true} pageTitle="پنل مدیریت | تغییر رمز عبور">
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
                            <h1 className="font-iranyekan-bold text-lg text-gray-800">تغییر رمز عبور</h1>
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
                    <form onSubmit={formik.handleSubmit}>
                        <section className="w-full pb-4 ">
                            <div className="p-5 mt-4 bg-white rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <p className="font-iranyekan-bold text-gray-800"> رمز عبور</p>
                                <section  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
                                    <FormikInput  maxLength={24} isRequired={true} name={"old_password"} title={"رمز عبور فعلی"} formik={formik}  parentClassName="flex flex-col relative"/>
                                    <FormikInput maxLength={24} isRequired={true} name={"new_password"} title={"رمز عبور جدید" } formik={formik}  parentClassName="flex flex-col relative"/>
                                    <FormikInput maxLength={24} isRequired={true} name={"new_password_repeat"}title={"تکرار رمز عبور" } formik={formik} parentClassName="flex flex-col relative"/>
                                </section>
                                <div className="mt-4 w-full flex justify-end">
                                    {loading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                                    <button type={"submit"} disabled={loading} className={buttonClassName({bgColor : "blue" , isValid : loading ? !loading : formik.isValid , isOutline : false})}> تغییر رمز عبور</button>
                                </div>
                            </div>
                        </section>
                    </form>
                </section>
            </div>
        </Layout>
    );
}
export default ChangeAdminPassword;

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

    // Fetch SearchBar Data With User Token
    await http.get(`public/searchbar`,{headers : {authorization : token}})
    .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
    .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

     if(ErrorCode === 403){return{notFound : true}}
     
     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
})