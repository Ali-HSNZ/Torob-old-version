import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/redux/admin/admin_manageCategory/admin_manageCategoryActions';
import { useRouter } from 'next/router';

export default function DialogAlert_deleteCategory({id, isModal , setIsModal , title,}) {

    const dispatch = useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,state,order} = query
    const deleteCategoryHandler = () => {
        setIsModal(false)
        dispatch(deleteCategory({id,limit,page,paramsName,state,order}))
    } 
    return (
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-iranyekan-bold'>{title ? title : "عنوان"}</p>
            <DialogContent>
                <p className='font-iranyekan-regular text-sm leading-6'><b>نکته : </b>برای دسته‌بندی هایی که <b>غیر فعال</b> باشند نمی توان زیردسته اضافه کرد.</p>
                <p className='font-iranyekan-regular text-sm leading-6 mt-4'>آیا مایل به تغییر وضعیت این دسته‌بندی هستید؟.</p>
            </DialogContent>
            <DialogActions>
                <div className='w-full flex gap-x-4 justify-end pb-2 px-2'>
                    <button className='font-iranyekan-bold text-sm '  onClick={() => setIsModal(false)}>خیر</button>
                    <button className='font-iranyekan-bold text-sm text-red-700' onClick={deleteCategoryHandler} >بله - تغییر وضعیت</button>
                </div>
            </DialogActions>
        </Dialog>
    );
}