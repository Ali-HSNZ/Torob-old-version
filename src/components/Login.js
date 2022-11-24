import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authPanel, changePanelType, userSignin, userSignin_withUserPass, userSignup } from "src/redux/user/userActions";
import { Modal } from "@mui/material";
import ReactLoading from 'react-loading';

const Login = () => {
  const { user, loading, panel ,panelType} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    if(user) return dispatch(userSignin(values));
    dispatch(userSignup(values.phone_number))
  };
  const onSubmit_userPass = (values) => {
    dispatch(userSignin_withUserPass(values))
  };
  const phoneRegExp = /^(?:98|\+98|0098|0)?9[0-9]{9}$/;
 
  const withUserVerifyCode_Validation = Yup.object({
    phone_number: Yup.string()
      .required("شماره موبایل نمی تواند خالی باشد")
      .matches(phoneRegExp, "شماره موبایل معتبر نیست"),
  });
  const withOutUserVerifyCode_Validation = Yup.object({
    phone_number: Yup.string()
      .required("شماره موبایل نمی تواند خالی باشد")
      .matches(phoneRegExp, "شماره موبایل معتبر نیست"),
    verification_code: Yup.string()
      .required("کد تایید نمی تواند خالی باشد")
      .min(4, "کد تایید نمیتواند کمتر  از 4 کاراکتر باشد")
      .max(4, "کد تایید نمیتواند بیشتر  از 4 کاراکتر باشد"),
  });

  const PHONE_NUMBER_REGIX = /^09[0|1|2|3][0-9]{8}$/;
  const ONLY_DIGIT_REGIX = /^\d+$/;
  const userPass_validation = Yup.object({
    national_code : Yup.string()
                                      .required("نام کاربری الزامی است")
                                      .length(10 , "نام کاربری نامعتبر است")
                                      .matches(ONLY_DIGIT_REGIX , "نام کاربری نامعتبر است")
                                      .trim(),
    password : Yup.string()
                              .required('رمز عبور الزامی است')
                              .matches(PHONE_NUMBER_REGIX,"رمز عبور معتبر نیست"),
  })
  const formik = useFormik({
    initialValues: { phone_number: "", verification_code: "" },
    onSubmit,
    validateOnMount: true,
    validationSchema: user ? withOutUserVerifyCode_Validation : withUserVerifyCode_Validation, 
  });

  const formik_userPass = useFormik({
    initialValues: { national_code: "", password: "" },
    onSubmit : onSubmit_userPass,
    validateOnMount: true,
    validationSchema: userPass_validation,
  });


  return (
    <Modal open={panel || false} onClose={() => dispatch(authPanel(false))} className="flex justify-center items-center px-4">
        {panelType === "normal" ? (
            <form onSubmit={formik.handleSubmit} className="bg-[#ffffff] rounded-md p-4" >
            <a onClick={() => dispatch(authPanel(false))} className="flex w-fit justify-end float-left cursor-pointer" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </a>
          <hr className="mt-8 border border-gray-200" />
          <div className="mt-[-15px] font-sans w-full flex justify-center">
            <span className="bg-white px-3 text-gray-600 text-sm"> ورود یا ثبت نام</span>
          </div>
          <section className="mt-4 px-10">
            <div>
              <p className="font-sans text-sm font-bold text-gray-800 ">شماره موبایل :</p>
              <input dir="ltr" name="phone_number" onBlur={formik.handleBlur} value={formik.values["phone_number"]} onChange={formik.handleChange} className={` w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4 text-gray-800 rounded-md border border-gray-300 outline-none`}/>
            </div>
            {formik.errors.phone_number && formik.touched.phone_number && <p className={" mt-2 w-full font-sans text-sm text-red-500"}>{formik.errors.phone_number} </p>}
            {user && <div className={`mt-4`}>
              <p className="font-sans text-sm font-bold  ">کد تایید :</p>
              <div className="flex items-center mt-2 gap-x-2">
                  <input dir="ltr" name="verification_code" onBlur={formik.handleBlur} value={formik.values.verification_code} onChange={formik.handleChange} className={` w-full font-sans  py-2 px-4 bg-gray-50 text-sm  text-gray-800 rounded-md border border-gray-300 outline-none`}/>
                  <button disabled={loading || formik.errors.phone_number} onClick={()=> !formik.errors.phone_number && dispatch(userSignup(formik.values.phone_number))} className={`flex border hover:bg-blue-100 bg-blue-50  border-blue-500 text-[#184e77]  disabled:bg-gray-700 disabled:hover:bg-gray-800 disabled:border-none disabled:text-gray-200 disabled:cursor-not-allowed rounded-md p-2 px-3 `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
              </div>
              {formik.errors.verification_code && formik.touched.verification_code && <p className={" mt-2 w-full font-sans text-sm text-red-500"}> {formik.errors.verification_code} </p>}
            </div>
            }
            <div className="w-full flex justify-center relative items-center mt-6 ">
                <button type={"submit"} disabled={loading || !formik.isValid} className="w-10/12 py-1.5 disabled:bg-gray-700 disabled:hover:bg-gray-800 disabled:cursor-not-allowed text-gray-200 rounded-md font-sans bg-red-700 hover:bg-[#ac1d1d]  shadow-md text-sm">
                    {user ? `ورود به حساب کاربری` : `دریافت کد تایید`} 
                </button>
                {loading && <ReactLoading  className="absolute top-1 left-[-13px]" type="spinningBubbles" height={25} width={25} color="red" />}
            </div>
            <p className="text-xs w-full font-sans mt-4 text-gray-800">
              <span>ثبت نام در ترب به معنی موافقت</span>
              <span className="text-blue-700"> با شرایط استفاده از ترب</span>
              <span> است. </span>
            </p>
            <button type={"button"} onClick={()=> dispatch(changePanelType('userPass'))} className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700 hover:underline hover:underline-offset-4">ورود با نام کاربری و رمز عبور</button>
          </section>
            </form>
        ) : (
          <form onSubmit={formik_userPass.handleSubmit} className="bg-[#ffffff] rounded-md p-4" >
          <a onClick={() => dispatch(authPanel(false))} className="flex w-fit justify-end float-left cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
          </a>
          <hr className="mt-8 border border-gray-200" />
          <div className="mt-[-15px] font-sans w-full flex justify-center">
            <span className="bg-white px-3 text-gray-600 text-sm"> ورود با نام کاربری و رمز عبور</span>
          </div>
          <section className="mt-4 px-10">
            <div>
              <p className="font-sans text-sm font-bold text-gray-800 ">نام کاربری :</p>
              <input dir="ltr" name="national_code" onBlur={formik_userPass.handleBlur} value={formik_userPass.values.national_code} onChange={formik_userPass.handleChange} className={` w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4 text-gray-800 rounded-md border border-gray-300 outline-none`}/>
            </div>
            {formik_userPass.errors.national_code && formik_userPass.touched.national_code && <p className={" mt-2 w-full font-sans text-sm text-red-500"}>{formik_userPass.errors.national_code} </p>}
            <div className={`mt-4`}>
              <p className="font-sans text-sm font-bold  ">رمز عبور :</p>
              <div className="flex items-center mt-2 gap-x-2">
                  <input dir="ltr" name="password" onBlur={formik_userPass.handleBlur} value={formik_userPass.values.password} onChange={formik_userPass.handleChange} className={` w-full font-sans  py-2 px-4 bg-gray-50 text-sm  text-gray-800 rounded-md border border-gray-300 outline-none`}/>
              </div>
              {formik_userPass.errors.password && formik_userPass.touched.password && <p className={" mt-2 w-full font-sans text-sm text-red-500"}> {formik_userPass.errors.password} </p>}
            </div>
            <div className="w-full flex justify-center relative items-center mt-6 ">
                <button type={"submit"} disabled={loading || !formik_userPass.isValid} className="w-10/12 py-1.5 disabled:bg-gray-700 disabled:hover:bg-gray-800 disabled:cursor-not-allowed text-gray-200 rounded-md font-sans bg-red-700 hover:bg-[#ac1d1d] text-sm">
                   ورود به حساب کاربری
                </button>
                {loading && <ReactLoading  className="absolute top-1 left-[-13px]" type="spinningBubbles" height={25} width={25} color="red" />}
            </div>
            <p className="text-xs w-full font-sans mt-4 text-gray-800">
              <span>ثبت نام در ترب به معنی موافقت</span>
              <span className="text-blue-700"> با شرایط استفاده از ترب</span>
              <span> است. </span>
            </p>
            <button type={"button"} onClick={()=> dispatch(changePanelType('normal'))} className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700 hover:underline hover:underline-offset-4">ورود / ثبت نام با شماره همراه</button>
          </section>
          </form>

        )}
    </Modal>
  );
};

export default Login;
