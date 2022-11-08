import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import {insertCategories } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/router';

export default function DialogAlert_insertMainCategory({isModal , setIsModal , title}) {
    const dispatch =  useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,state} = query
    const onSubmit = ({mainCategoryName}) => {      
        setIsModal(false)
        dispatch(insertCategories({id : 0 , name:mainCategoryName,limit,page,paramsName,state}))
    }
    const validationSchema = Yup.object({
        mainCategoryName: Yup.string().required("عنوان دسته ‌بندی نمی تواند خالی باشد.").min(2 , "عنوان دسته بندی نمی تواند کم تر از ۲ نویسه باشد.").max(50 , "عنوان دسته بندی نمی تواند بیشتر از ۵۰ نویسه باشد.").trim()})
    const formik = useFormik({
        onSubmit,
        initialValues : { mainCategoryName: ""},
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })
    return (
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-sans font-bold'>{title}</p>
                <form onSubmit={formik.handleSubmit}>
                    <section className='px-4 pt-4'>
                        <section className=" flex items-center gap-x-1">
                            <input
                                type="text" 
                                name='mainCategoryName'
                                onChange={formik.handleChange}
                                value={formik.values.mainCategoryName}
                                placeholder="نام دسته‌بندی را وارد کنید"
                                onBlur={formik.handleBlur} 
                                className="w-[300px] border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "/>
                        </section>
                        {formik.errors.mainCategoryName && formik.touched.mainCategoryName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.mainCategoryName}</p>}
                    </section>
                    <DialogActions>
                        <div className='w-full flex gap-x-4 justify-end p-2'>
                            <button className='font-sans font-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                            <button type={'submit'}  className={` text-sm font-sans py-[6px] px-5 rounded-md ${formik.errors.mainCategoryName? "cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700" : " bg-blue-600 text-white hover:bg-blue-700 "}  `} >تایید</button>
                        </div>
                    </DialogActions>
                </form>
        </Dialog>
    );
}