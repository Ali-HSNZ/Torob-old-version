import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { authPanel, changePanelType, userSignin, userSignin_withUserPass, userSignup } from "src/redux/user/userActions";
import { Modal } from "@mui/material";
import ReactLoading from 'react-loading';
import { ONLY_DIGIT_REGIX, PASSWORD_REGIX} from "@/utils/Regex";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const {loading, panel ,panelType} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter()
  const onSubmit = (values) => {
    dispatch(userSignin_withUserPass(values))
  };

  const validationSchema = Yup.object({
    national_code : Yup.string()
        .required("نام کاربری الزامی است")
        .length(10 , "نام کاربری نامعتبر است")
        .matches(ONLY_DIGIT_REGIX , "نام کاربری نامعتبر است")
        .trim(),
    password : Yup.string()
        .matches(PASSWORD_REGIX , "رمز عبور باید شامل 1 عدد و 1 حرف و 6 تا 12 نویسه باشد.")
        .required('رمز عبور الزامی است')
        .min(6, "رمز عبور باید بیشتر از 6 نویسه باشد")
        .max(20 , 'رمز عبور نمیتواند بیشتر از 20 نویسه باشد')
  })

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: { 
      national_code: "", 
      password: "" ,
      signupStatus : 'user'
    },
    onSubmit,
    validateOnMount: true,
    validationSchema,
  });


  return (
    <Modal open={panel || false} onClose={() => dispatch(authPanel(false))} className="flex justify-center items-center px-4">
        {panelType === "normal" ? (
            <form  className="bg-[#ffffff] rounded-md p-4 w-full sm:w-[400px]" >
                <a onClick={() => dispatch(authPanel(false))} className="flex w-fit justify-end float-left cursor-pointer" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </a>
              <hr className="mt-8 border border-gray-200" />
              <div className="mt-[-15px] font-sans w-full flex justify-center">
                <span className="bg-white px-3 text-gray-600 text-sm"> ثبت نام</span>
              </div>
              <section className="mt-4 ">
                    <div>
                      <input type="radio" checked={formik.values.signupStatus === 'user'} name="signupStatus" value={'user'} onChange={formik.handleChange} id="user" className="peer hidden"/>
                      <label htmlFor="user" className={`cursor-pointer flex items-start rounded-xl bg-white p-4 border-2 peer-checked:border-red-500 border-white hover:border-red-300 `}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                          <h2 className="font-semibold font-sans mr-4">کاربر</h2>
                          <p className="mt-2 mr-4 text-xs font-sans text-gray-500">خرید کالا | پسندیده ها | تغیییرات قیمت و ...</p>
                        </div>
                    </label>
                  </div>
                  <div className="mt-4">
                    <input type="radio" checked={formik.values.signupStatus === 'store'} value={'store'} name="signupStatus" id="store" onChange={formik.handleChange} className="peer hidden" />
                    <label htmlFor="store" className={`cursor-pointer flex items-start rounded-xl bg-white p-4 border-2 peer-checked:border-red-500 border-white hover:border-red-300 `}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                            <svg className="h-6 w-6 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                          <h2 className="font-semibold font-sans mr-4">فروشگاه</h2>
                          <p className="mt-2 mr-4 text-xs font-sans text-gray-500">ثبت کالا | مدیریت محصولات | مدیریت سفارشات</p>
                        </div>
                    </label>

                </div>
                <div className="w-full flex justify-center relative items-center mt-6 ">
                    <button type={"button"} onClick={()=> dispatch(authPanel({isOpen : false , type : 'normal'})) & router.push({pathname:formik.values.signupStatus === 'user' ? "/signup/user" : "/signup/store"})}  className="text-center w-10/12 py-1.5 disabled:bg-gray-700 disabled:hover:bg-gray-800 disabled:cursor-not-allowed text-gray-200 rounded-md font-sans bg-red-700 hover:bg-[#ac1d1d]  shadow-md text-sm">
                          ثبت نام 
                    </button>
                    {loading && <ReactLoading  className="absolute top-1 left-[-13px]" type="spinningBubbles" height={25} width={25} color="red" />}
                </div>
                <button type={"button"} onClick={()=> dispatch(changePanelType('userPass'))} className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700 hover:underline hover:underline-offset-4">ورود با نام کاربری و رمز عبور</button>
              </section>
            </form>
        ) : (
          <form onSubmit={formik.handleSubmit} className="bg-[#ffffff] rounded-md p-4 w-full sm:w-[400px]" >
              <a onClick={() => dispatch(authPanel(false))} className="flex w-fit justify-end float-left cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
              </a>
              <hr className="mt-8 border border-gray-200" />
              <div className="mt-[-15px] font-sans w-full flex justify-center">
                <span className="bg-white px-3 text-gray-600 text-sm"> ورود با نام کاربری و رمز عبور</span>
              </div>
              <section className="mt-4">
                <div>
                  <p className="font-sans text-sm font-bold text-gray-800 ">نام کاربری :</p>
                  <input dir="ltr" name="national_code" onBlur={formik.handleBlur} value={formik.values.national_code} onChange={formik.handleChange} className={` w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4 text-gray-800 rounded-md border border-gray-300 outline-none`}/>
                </div>
                {formik.errors.national_code && formik.touched.national_code && <p className={" mt-2 w-full font-sans text-xs text-red-500"}>{formik.errors.national_code} </p>}
                <div className={`mt-4`}>
                  <p className="font-sans text-sm font-bold  ">رمز عبور :</p>
                  <div className="flex items-center mt-2 gap-x-2">
                      <input dir="ltr" name="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className={` w-full font-sans  py-2 px-4 bg-gray-50 text-sm  text-gray-800 rounded-md border border-gray-300 outline-none`}/>
                  </div>
                  {formik.errors.password && formik.touched.password && <p className={" mt-2 w-full font-sans text-xs text-red-500"}> {formik.errors.password} </p>}
                </div>
                <div className="w-full flex justify-center relative items-center mt-6 ">
                    <button type={"submit"} disabled={loading || !formik.isValid} className="w-10/12 py-1.5 disabled:bg-gray-700 disabled:hover:bg-gray-800 disabled:cursor-not-allowed text-gray-200 rounded-md font-sans bg-red-700 hover:bg-[#ac1d1d] text-sm">
                      ورود به حساب کاربری
                    </button>
                    {loading && <ReactLoading  className="absolute top-1 left-[-5px]" type="spinningBubbles" height={25} width={25} color="red" />}
                </div>
                <button type={"button"} onClick={()=> dispatch(changePanelType('normal'))} className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700 hover:underline hover:underline-offset-4">ثبت نام به عنوان کاربر / فروشگاه</button>
              </section>
          </form>

        )}
    </Modal>
  );
};

export default Login;
