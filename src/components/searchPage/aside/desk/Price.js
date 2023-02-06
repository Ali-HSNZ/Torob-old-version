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

    const rotateChevron = (button) => {
        const svg = button.children[0];
        if(document){
             if(svg.classList.contains('rotate-90')){
                  svg.classList.remove("rotate-90")
                  svg.classList.add("rotate-0")
             }else{
                  svg.classList.remove("rotate-0")
                  svg.classList.add("rotate-90")
             }
        }
    }

    return ( 
        <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
            <div onClick={(button)=> rotateChevron(button.currentTarget) & setIsPriceTaggle(!isPriceTaggle) }  className={`py-6 select-none flex items-center cursor-pointer w-full`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-800 rotate-0 mr-4 duration-100 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span className="font-sans mr-2 text-gray-800">قیمت (تومان) </span>
            </div>
            <div className={`${isPriceTaggle ? "" : "hidden"} flex gap-x-4 px-4 w-full`}>
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
            <div className="w-full px-4">
                <button type="submit" className={`w-full ${isPriceTaggle ? "" : "hidden"} ${formik.isValid ? "hover:bg-gray-100 bg-gray-50 text-gray-800 " : "hover:bg-gray-700 bg-gray-600 text-gray-50 cursor-not-allowed"}   text-center  text-sm rounded-md font-sans py-3 my-4 `}>اعمال فیلتر قیمت</button>
            </div>
        </form>
    );
}
export default Price;