import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch } from 'react-redux';
import { deleteBrand } from '@/redux/admin/admin_manageBrand/admin_manageBrandActions';
import { useRouter } from 'next/router';

function Modal_deleteBrand({ id, isModal , setIsModal , title , description}) {

    const dispatch = useDispatch()
    const {query} = useRouter()
    const {limit,page,name : paramsName,company:paramsCompany,state,order} = query
    const deleteCategoryHandler = () => {
        setIsModal(false)
        dispatch(deleteBrand({id , page,limit,paramsName,order,paramsCompany,state}))
    }
    return (
        <Dialog open={isModal || false} onClose={()=>setIsModal(false)}>
            <p className='px-4 pt-4 font-iranyekan-bold'>{title ? title : "عنوان"}</p>
            <DialogContent>
                <p className='font-iranyekan-regular text-sm '>{description ? description : "توضیحات"}</p>
            </DialogContent>
            <DialogActions>
                <div className='w-full flex gap-x-4 justify-end pb-2 px-2'>
                    <button className='font-iranyekan-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                    <button className='font-iranyekan-bold text-sm text-orange-700' onClick={deleteCategoryHandler} >بله - تغییر وضعیت</button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
export default Modal_deleteBrand;