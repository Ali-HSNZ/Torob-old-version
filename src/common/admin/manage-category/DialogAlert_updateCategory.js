import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import {updateCategory } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { buttonClassName } from '@/utils/global';

export default function DialogAlert_updateCategory({categoryName , id, isModal , setIsModal , title , submitBtnTitle}) {
    const dispatch =  useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,state,order} = query
    const onSubmit = ({updateCategoryName}) => {
        setIsModal(false)
        dispatch(updateCategory({id ,order, name:updateCategoryName,limit,page,paramsName,state}))
    }
    
    const validationSchema = Yup.object({
        updateCategoryName: Yup.string().required("عنوان دسته‌بندی نمی تواند خالی باشد.").min(3 , "عنوان دسته‌بندی نمی تواند کم تر از ۳ نویسه باشد.").max(50 , "عنوان دسته بندی نمی تواند بیشتر از ۵۰ نویسه باشد.").trim(),
    })

    const formik = useFormik({
        onSubmit,
        initialValues : { updateCategoryName :  categoryName || ""},
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })
    return (
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-iranyekan-regular font-iranyekan-bold'>{title}</p>
            <form onSubmit={formik.handleSubmit}>
                <section className='px-4 pt-4'>
                    <section className=" flex items-center gap-x-1 pb-0">
                        <input
                            type="text" 
                            name='updateCategoryName'
                            autoComplete='off'
                            onChange={formik.handleChange}
                            value={formik.values.updateCategoryName}
                            onBlur={formik.handleBlur} 
                            className={`${formik.errors.updateCategoryName && formik.touched.updateCategoryName ?  "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} w-[300px]  focus:ring-0 text-sm  font-iranyekan-regular bg-white text-gray-800 rounded-md `}/>
                        </section>
                    {formik.errors.updateCategoryName && formik.touched.updateCategoryName && <p className={'text-red-600 font-iranyekan-regular text-xs pt-2'}>{formik.errors.updateCategoryName}</p>}
                </section>
                <DialogActions>
                    <div className='w-full flex gap-x-4 justify-end p-2'>
                        <button type={'button'} className='font-iranyekan-regular font-iranyekan-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                        <button type={'submit'}  className={buttonClassName({bgColor : "blue" , isOutline : false , isValid : formik.isValid})} >ثبت</button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
}