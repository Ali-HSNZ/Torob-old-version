import { ONLY_DIGIT_REGIX } from "@/utils/Regex";
import { setComma } from "@/utils/setComma";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from 'yup'

const Price = ({price}) => {
    const router = useRouter()
    const [isPriceTaggle, setIsPriceTaggle] = useState(true)
    const validationSchema = Yup.object({
        price_from : Yup.string()
            .test("check-value-typeof","قیمت باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
        price_to : Yup.string()
            .test("check-value-typeof","قیمت باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
    })
    const onSubmit = ({price_from , price_to}) => {
        const min = price_from.toString().replace(/,/g, '') || 0
        const max = price_to.toString().replace(/,/g, '') || 0
        router.push({pathname : "/search" , query : {...router.query , price_from : min , price_to : max }})
    }
    const formik = useFormik({
        onSubmit,
        initialValues : {
            price_from : price && price.min || 0,
            price_to : price && price.max || 0,
        },
        enableReinitialize : true,
        validationSchema,
        validateOnMount : true,
    })

    return ( 
        <form className="flex flex-col w-full  px-6" onSubmit={formik.handleSubmit}>
            <div onClick={()=>setIsPriceTaggle(!isPriceTaggle) }  className={`py-6 flex items-center cursor-pointer w-full`}>
                <div className={`${isPriceTaggle ? "" : "rotate-90"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-800 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sans mr-2 text-gray-800">قیمت (تومان) </span>
            </div>
            <div className={`${isPriceTaggle ? "" : "hidden"} flex gap-x-4 w-full`}>
                <div className="flex w-full">
                    <span className="relative right-5 top-[13px] text-xs font-sans  text-gray-800">از</span>
                    <input dir="ltr" value={setComma(formik.values.price_from)} name="price_from"  onBlur={formik.handleBlur}   onChange={formik.handleChange} className="border text-gray-800 outline-none py-2 pl-2 text-sm w-full font-sans border-gray-400 rounded-md"/>
                </div>
                <div className="flex w-full">
                    <span className="relative right-5 top-[13px] text-xs font-sans  text-gray-800">تا</span>
                    <input dir="ltr" value={setComma(formik.values.price_to)} name="price_to" onBlur={formik.handleBlur}  onChange={formik.handleChange} className="border text-gray-800 font-sans outline-none py-2 pl-2 text-sm w-full border-gray-400 rounded-md"/>
                </div>
            </div>
            {!formik.isValid && <p className={'text-red-600 font-sans text-xs mt-4'}>قیمت باید عدد باشد</p>}
            <button type="submit" className={`${isPriceTaggle ? "" : "hidden"} ${formik.isValid ? "hover:bg-gray-100 bg-gray-50 text-gray-800" : "hover:bg-gray-700 bg-gray-600 text-gray-50 cursor-not-allowed"}   text-center  text-sm rounded-md font-sans py-3 my-5 `}>اعمال فیلتر قیمت</button>
        </form>
    );
}
export default Price;