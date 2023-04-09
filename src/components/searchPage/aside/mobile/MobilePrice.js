import { ONLY_DIGIT_REGIX } from "@/utils/Regex";
import { setComma } from "@/utils/setComma";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from 'yup'

const MobilePrice = ({closeHandler , isMobileMenu , price}) => {
    
    const router = useRouter()
    const {query} = useRouter()

    const validationSchema = Yup.object({
        price_from : Yup.string()
            .test("check-value-typeof","حداقل قیمت باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
        price_to : Yup.string()
            .test("check-value-typeof","حداکثر قیمت باید عدد باشد", value => ONLY_DIGIT_REGIX.test(value && value.replace(/,/g, '') || 0)),
    })
    const onSubmit = ({price_from , price_to}) => {
        const min = price_from.toString().replace(/,/g, '') || 0
        const max = price_to.toString().replace(/,/g, '') || 0
        router.push({pathname : "/search" , query : {...router.query , price_from : min , price_to : max }})
        closeHandler("")
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
        <Modal
        open={isMobileMenu}
        onClose={()=>closeHandler()}
        className="flex lg:hidden justify-center items-center px-4">
            <div className="bg-white   w-full sm:w-2/5 fixed z-50 right-0 bottom-0 top-0">
                <div className="px-4 mt-6 flex w-full">
                    <button onClick={()=> closeHandler(false)}>
                        <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h6 className="text-sm  text-center w-full font-iranyekan-regular text-gray-800 ">انتخاب قیمت</h6>
                </div>

                <hr className="mt-5"/>

                <form onSubmit={formik.handleSubmit} className="flex flex-col w-full  px-6 mt-8">

                    <div className={` flex gap-x-4 flex-between w-full`}>
                        <div className="flex w-1/2 relative">
                            <span className="absolute right-5 top-3 text-xs font-iranyekan-regular  text-gray-800 ">از</span>
                            <input dir="ltr" value={setComma(formik.values.price_from)} name="price_from"  onBlur={formik.handleBlur}   onChange={formik.handleChange}  type="text" className=" text-gray-800 border w-full font-iranyekan-regular border-gray-400 text-sm rounded-md"/>
                        </div>
                        <div className="flex w-1/2 relative">
                            <span className="absolute right-5 top-3 text-xs font-iranyekan-regular text-gray-800">تا</span>
                            <input dir="ltr" value={setComma(formik.values.price_to)} name="price_to"  onBlur={formik.handleBlur}   onChange={formik.handleChange} type="text" className=" text-gray-800 border w-full border-gray-400 text-sm rounded-md"/>
                        </div>
                    </div>
                        {!formik.isValid && <p className={'text-red-600 font-iranyekan-regular text-xs mt-4'}>قیمت باید عدد باشد</p>}

                    <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 left-0 py-4 px-4">

                        <button type="submit" className="bg-gray-700 font-iranyekan-regular text-sm text-gray-100 py-3 rounded-md w-3/4 text-center">اعمال فیلتر </button>
                        <button type="button" onClick={()=> {delete query.fromPrice & delete query.toPrice &  router.push({pathname : "/search" , query : {...query}}) & closeHandler("") }}  className="w-1/4 border border-gray-700 rounded-md text-sm font-iranyekan-regular text-gray-800  py-3">حذف</button>
                    </div>
                </form>
            </div>
        </Modal>

    );
}
 
export default MobilePrice;