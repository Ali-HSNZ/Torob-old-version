
import { useAuth, useAuthDispacher } from "../contexts/Auth";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const Login = ({setIsModal , verification_code}) => {
    const dispatch = useAuthDispacher()
    const {data , loading} = useAuth()
    const onSubmit = (values) => {
        const {phoneNumber , validationCode} = values
        if(data){
            return dispatch({type : "SIGNIN" , payload : {phoneNumber : phoneNumber , verification_code : validationCode}})
        }else{
            return dispatch({type : "SIGNUP" , payload : phoneNumber})
        }
    }

    const phoneRegExp = /^(?:98|\+98|0098|0)?9[0-9]{9}$/

    const withUserVerifyCode_Validation = Yup.object({
        phoneNumber : Yup.string().required("شماره موبایل نمی تواند خالی باشد").matches(phoneRegExp , "شماره موبایل معتبر نیست"),
    })
    const withOutUserVerifyCode_Validation = Yup.object({
        phoneNumber : Yup.string().required("شماره موبایل نمی تواند خالی باشد").matches(phoneRegExp , "شماره موبایل معتبر نیست"),
        validationCode : Yup.string().required("کد تایید نمی تواند خالی باشد").min(4 , "کد تایید نمیتواند کمتر از 4 کاراکتر باشد")
    })
    const formik = useFormik({
        initialValues : {phoneNumber : '' , validationCode : ""},
        onSubmit,
        validationSchema : data ? withOutUserVerifyCode_Validation : withUserVerifyCode_Validation,
        validateOnMount : true,
    })

    return (  
        <form onSubmit={formik.handleSubmit} className="bg-[#ffffff] rounded-md p-4">
            <a onClick={() => setIsModal(false)} className="flex w-fit justify-end float-left" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </a>
            <hr className="mt-8 border border-gray-200"/>
            <div className="mt-[-15px] font-sans w-full flex justify-center">
                <span className="bg-white px-3 text-gray-600 text-sm">ورود یا ثبت نام</span>
            </div>
            <section className="mt-4 px-10">
                <div>
                    <p className="font-sans text-sm font-bold text-gray-800 ">شماره موبایل</p>
                    <input dir="ltr" name="phoneNumber" onBlur={formik.handleBlur}  value={formik.values['phoneNumber']} onChange={formik.handleChange}  className={` w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4 text-gray-800 rounded-md border border-gray-300 outline-none`}/>
                </div>
                    {formik.errors['phoneNumber'] && formik.touched['phoneNumber'] && (
                        <span className={' pt-2 w-full font-sans text-sm text-red-500'}>{formik.errors["phoneNumber"]}</span>
                    )}  
                <div className={`mt-4 ${data ? "" : "hidden"}`}>
                    <p className="font-sans text-sm font-bold  ">کد تایید</p>
                    <input dir="ltr" name="validationCode" onBlur={formik.handleBlur}  value={formik.values['validationCode']} onChange={formik.handleChange}  className={` w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4 text-gray-800 rounded-md border border-gray-300 outline-none`}/>
                </div>
                
                <div className="w-full flex justify-center items-center mt-6 ">
                    <button type={'submit'} disabled={!formik.isValid} className="w-10/12 py-1.5 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-200 rounded-md font-sans bg-red-700 text-sm">
                        {data ? `ورود به حساب کاربری${loading ? "..." : ""}` : `دریافت کد تایید${loading ? "..." : ""}`}
                    </button>
                </div>
                <p className="text-xs w-full font-sans mt-4 text-gray-800">
                    <span>ثبت نام در ترب به معنی موافقت</span>
                    <span className="text-blue-700"> با شرایط استفاده از ترب</span>
                    <span> است. </span> 
                </p>
                <p className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700">قبلا در ترب حساب کاربری داشتم</p>

            </section>
        </form>
    );
}
 
export default Login;