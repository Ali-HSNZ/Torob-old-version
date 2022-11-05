import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import {updateCategory } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useRouter } from 'next/router';

export default function DialogAlert_updateCategory({categoryName , id, isModal , setIsModal , title , submitBtnTitle}) {
    
    const dispatch =  useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,state} = query
    const onSubmit = ({updateCategoryName}) => {
        setIsModal(false)
        dispatch(updateCategory({id , name:updateCategoryName,limit,page,paramsName,state}))
    }
    
    const validationSchema = Yup.object({
        updateCategoryName: Yup.string().required("عنوان دسته ‌بندی نمی تواند خالی باشد.").min(3 , "عنوان دسته بندی نمی تواند کم تر از 3 نویسه باشد.").max(50 , "عنوان دسته بندی نمی تواند بیشتر از 50 نویسه باشد.").trim(),
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
            <p className='px-4 pt-4 font-sans font-bold'>{title}</p>
            <form onSubmit={formik.handleSubmit}>
                <section className='px-4 pt-4'>
                    <section className=" flex items-center gap-x-1 pb-0">
                        <input
                            type="text" 
                            name='updateCategoryName'
                            onChange={formik.handleChange}
                            value={formik.values.updateCategoryName}
                            onBlur={formik.handleBlur} 
                            className="w-[300px] border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "/>
                    </section>
                    {formik.errors.updateCategoryName && formik.touched.updateCategoryName && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors.updateCategoryName}</p>}
                </section>
                <DialogActions>
                    <div className='w-full flex gap-x-4 justify-end p-2'>
                        <button className='font-sans font-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                        <button type={'submit'}  className={` text-sm font-sans py-[6px] px-5 rounded-md ${formik.errors.updateCategoryName? "cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700" : " bg-blue-600 text-white hover:bg-blue-700 "}  `} >{submitBtnTitle ? submitBtnTitle : "تایید"}</button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
}