import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import {insertCategories } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { buttonClassName } from '@/utils/global';

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
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-sans font-bold'>{title}</p>
                <form onSubmit={formik.handleSubmit}>
                    <section className='px-4 pt-4'>
                        <section className=" flex items-center gap-x-1">
                            <input
                                type="text" 
                                autoComplete='off'
                                name='mainCategoryName'
                                onChange={formik.handleChange}
                                value={formik.values.mainCategoryName}
                                onBlur={formik.handleBlur} 
                                className={`${formik.errors.mainCategoryName && formik.touched.mainCategoryName ?  "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} w-[300px]  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md `}/>
                        </section>
                        {formik.errors.mainCategoryName && formik.touched.mainCategoryName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.mainCategoryName}</p>}
                    </section>
                    <DialogActions>
                        <div className='w-full flex gap-x-4 justify-end p-2'>
                            <button type={'button'} className='font-sans font-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                            <button type={'submit'}  className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : formik.isValid})}>ثبت</button>
                        </div>
                    </DialogActions>
                </form>
        </Dialog>
    );
}