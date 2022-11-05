import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { updateBrand } from '@/redux/admin/admin_manageBrand/admin_manageBrandActions';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function DialogAlert_updateBrand({faName, enName, company, id, isModal , setIsModal, title, submitBtnTitle}) {

    const {query} = useRouter()

    const {limit,page,name : paramsName,company:paramsCompany,state} = query

    const dispatch =  useDispatch()

    const [onChangeFile , setOnChangeFile] = useState({selectedFile: null})
    const onSubmit = ({faName , enName , companyName}) => {
        setIsModal(false)
        dispatch(updateBrand({
            page,
            limit,
            id,
            faName,
            enName,
            paramsName,
            state,
            paramsCompany,
            companyName,
            brandImage : onChangeFile.selectedFile
        }))
    }

    const validationSchema = Yup.object({
        faName: Yup.string().required("نام فارسی برند نمی تواند خالی باشد.").min(3 , "نام فارسی برند نمی تواند کم تر از 3 نویسه باشد.").max(50 , "نام فارسی برند نمی تواند بیشتر از 50 نویسه باشد.").trim(),
        enName: Yup.string().required("نام انگلیسی برند نمی تواند خالی باشد.").min(3 , "نام انگلیسی برند نمی تواند کم تر از 3 نویسه باشد.").max(50 , "نام انگلیسی برند نمی تواند بیشتر از 50 نویسه باشد.").trim(),
        companyName:Yup.string().required("نام شرکت نمی تواند خالی باشد.").min(3 , "نام شرکت نمی تواند کم تر از 3 نویسه باشد.").max(50 , "نام شرکت نمی تواند بیشتر از 50 نویسه باشد.").trim(),
    })
    const formik = useFormik({
        onSubmit,
        initialValues : { 
            faName,
            enName,
            companyName : company,
            brandImage : ''
        },
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })
    return (
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-sans font-bold'>{title}</p>
            <form onSubmit={formik.handleSubmit}>
                <section className='px-4'>

                    <div className='mt-4'>
                        <section className=" flex flex-col items-right gap-x-1 pb-0">
                            <p className='font-sans text-sm text-gray-800'>نام فارسی برند :</p>
                            <input
                                type="text" 
                                name='faName'
                                placeholder='نام فارسی برند'
                                onChange={formik.handleChange}
                                value={formik.values.faName}
                                onBlur={formik.handleBlur} 
                                className="mt-2 w-[300px] border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "/>
                        </section>
                        {formik.errors.faName && formik.touched.faName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.faName}</p>}
                    </div>

                    <div className='mt-4'>
                        <section className=" flex flex-col items-right gap-x-1 pb-0">
                            <p className='font-sans text-sm text-gray-800'>نام  انگلیسی برند :</p>
                            <input
                                type="text" 
                                name='enName'
                                placeholder='نام انگلیسی برند'
                                onChange={formik.handleChange}
                                value={formik.values.enName}
                                onBlur={formik.handleBlur} 
                                className="mt-2 w-[300px] border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "/>
                        </section>
                        {formik.errors.enName && formik.touched.enName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.enName}</p>}
                    </div>

                    <div className='mt-4'>
                        <section className=" flex flex-col items-right gap-x-1 pb-0">
                            <p className='font-sans text-sm text-gray-800'>نام شرکت :</p>
                            <input
                                type="text" 
                                name='companyName'
                                placeholder='نام شرکت'
                                onChange={formik.handleChange}
                                value={formik.values.companyName}
                                onBlur={formik.handleBlur} 
                                className="mt-2 w-[300px] border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "/>
                        </section>
                        {formik.errors.companyName && formik.touched.companyName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.companyName}</p>}
                    </div>

                    <div className='mt-4'>
                        <section className=" flex flex-col items-right gap-x-1 pb-0">
                                <p className="font-sans text-sm text-gray-800"> تصویر (لوگو) برند :</p>
                                <input type={'file'} id="chooseImage" accept="image/*" className="hidden" name='brandImage' onChange={event => setOnChangeFile({ selectedFile: event.target.files[0] })} onBlur={formik.handleBlur}/>
                                <label htmlFor="chooseImage" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                    <span className="text-blue-700">انتخاب تصویر</span>
                                    <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                </label>
                            </section>
                    </div>

                </section>
                <DialogActions>
                    <div className='w-full flex gap-x-4 justify-end p-2'>
                        <button  className='font-sans font-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                        <button disabled={!formik.isValid} type={'submit'}  className={` text-sm font-sans py-[6px] px-5 rounded-md ${formik.errors.faName? "cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700" : " bg-blue-600 text-white hover:bg-blue-700 "}  `} >{submitBtnTitle ? submitBtnTitle : "تایید"}</button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
}