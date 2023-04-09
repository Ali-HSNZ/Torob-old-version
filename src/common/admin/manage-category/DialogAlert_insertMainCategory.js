import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import {insertCategories } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { buttonClassName } from '@/utils/global';
import FormikInput from '../FormikInput';

export default function DialogAlert_insertMainCategory({isModal , setIsModal , title}) {
    const dispatch =  useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,state,order} = query
    const onSubmit = ({mainCategoryName}) => {      
        setIsModal(false)
        dispatch(insertCategories({order,id : 0 , name:mainCategoryName,limit,page,paramsName,state}))
    }
    const validationSchema = Yup.object({
        mainCategoryName: Yup.string().required("عنوان دسته ‌بندی نمی تواند خالی باشد.").min(3 , "عنوان دسته بندی نمی تواند کم تر از ۳ نویسه باشد.").max(50 , "عنوان دسته بندی نمی تواند بیشتر از ۵۰ نویسه باشد.").trim()
    })
    const formik = useFormik({
        onSubmit,
        initialValues : { mainCategoryName: ""},
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })
    return (
        <Modal open={isModal || false} onClose={()=>setIsModal(false)} className='outline-none z-20 focus:outline-none flex items-center justify-center px-4'>
            <section className={`flex flex-col place-content-between bg-white  outline-none p-4 rounded-md w-full sm:w-[400px] h-auto`}>
                <p className='font-iranyekan-bold'>{title}</p>
                <form onSubmit={formik.handleSubmit} className='w-full mt-2'>
                    <FormikInput formik={formik} name={'mainCategoryName'} maxLength={50} />

                    <div className='w-full flex gap-x-4 justify-end mt-4'>
                        <button type={'button'} className='font-iranyekan-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                        <button type={'submit'}  className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : formik.isValid})}>ثبت</button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}