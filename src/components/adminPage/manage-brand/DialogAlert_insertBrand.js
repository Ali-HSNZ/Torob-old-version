import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { insertBrand } from '@/redux/admin/admin_manageBrand/admin_manageBrandActions';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import FormikInput from '@/common/admin/FormikInput';

export default function DialogAlert_insertBrand({isModal,setIsModal,title , page , limit}) {
    const {query} = useRouter()
    const dispatch =  useDispatch();
    const imageInput_ref = useRef();
    const [isProductImage_Modal , setIsProductImage_Modal] = useState(false)
    const [onChangeFile , setOnChangeFile] = useState(null)


    const onSubmit = ({faName , enName , companyName}) => {
        dispatch(insertBrand({ order : query.order || 'desc' ,page , limit, faName,enName,companyName , brandImage:onChangeFile && onChangeFile.selectedFile ||null}))
        setIsModal(false)
    }
  
    const validationSchema = Yup.object({
        faName: Yup.string().required("نام فارسی برند نمی تواند خالی باشد.").min(3 , "نام فارسی برند نمی تواند کم تر از ۳ نویسه باشد.").max(30 , "نام فارسی برند نمی تواند بیشتر از ۳۰ نویسه باشد.").trim(),
        enName: Yup.string().required("نام انگلیسی برند نمی تواند خالی باشد.").min(3 , "نام انگلیسی برند نمی تواند کم تر از ۳ نویسه باشد.").max(30 , "نام انگلیسی برند نمی تواند بیشتر از ۳۰ نویسه باشد.").trim(),
        companyName:Yup.string().required("نام شرکت نمی تواند خالی باشد.").min(2 , "نام شرکت نمی تواند کم تر از ۳ نویسه باشد.").max(30 , "نام شرکت نمی تواند بیشتر از ۳۰ نویسه باشد.").trim(),
    })
    const formik = useFormik({
        onSubmit,
        initialValues : {faName : "",enName : "",companyName : "",brandImage : ''},
        validationSchema,
        validateOnMount : true,
        enableReinitialize: true
    })

    const checkImageFormat = (fileName) => {
        const type =  fileName.split('.').pop();
        const valid = ['png','jpg','jpeg','webp']
        if(!valid.includes(type.toLocaleLowerCase())){
            return false
        }
        return true
    }

    const changeFIleAction_input = (input) => {
        const image = input.target.files[0]
        if(input.target.files && image){
            if(!checkImageFormat(image.name)){
                toast.error('لوگو برند معتبر نیست')
                imageInput_ref.current.value = null
                return false
            }
            if(Number(image.size) < 16000){
                toast.error('لوگو برند نمی تواند کمتر از ۱۶kb باشد')
                imageInput_ref.current.value = null
                return false
            } 
            if(Number(image.size) > 512000){
                toast.error("لوگو برند نمی تواند بیشتر از ۵۱۲kb باشد")
                imageInput_ref.current.value = null
                return false
            }
            setOnChangeFile({selectedFile : image , imageUrl : URL.createObjectURL(image)})
        }
    }


    return (
        <Dialog open={isModal || false} fullWidth={true} maxWidth='xs' onClose={()=>setIsModal(false)} className={""}>
            <div className='flex px-4 pt-4 justify-between items-center'>
                <p className=' font-sans font-bold '>{title}</p>
                <button onClick={()=>setIsModal(false)} className='p-1 hover:bg-gray-100 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full ">
                <section className='px-4 '>
                    <FormikInput parentClassName={"flex flex-col relative mt-4"} formik={formik} name={"faName"} title="نام فارسی برند" placeholder={"نام فارسی برند"} />
                    <FormikInput parentClassName={"flex flex-col relative mt-4"} formik={formik} name={"enName"} title="نام انگلیسی برند" placeholder={"نام انگلیسی برند"} />
                    <FormikInput parentClassName={"flex flex-col relative mt-4"} formik={formik} name={"companyName"} title="نام شرکت" placeholder={"نام شرکت"} />

                    <div className="flex flex-col relative mt-4">
                        <p className="font-sans text-sm text-gray-800"> تصویر (لوگو) برند :</p>
                        <input type={'file'} id="chooseImage" ref={imageInput_ref} accept="image/*" className="hidden" name='brandImage' onChange={event => changeFIleAction_input(event)} onBlur={formik.handleBlur}/>
                        {onChangeFile? (
                            <section className="flex justify-between items-center mt-2  ">
                                <button type={"button"} onClick={()=>setIsProductImage_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                    <span className="text-sm font-sans text-green-800 ">تصویر برند انتخاب شده است.</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <button onClick={()=> {setOnChangeFile(null) ; imageInput_ref.current.value = null}}  type={"button"}className="bg-red-200 hover:bg-red-300 border py-2 px-4 rounded-l-md border-red-500 hover:border-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  text-red-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </section>
                        ) : (
                            <label htmlFor="chooseImage" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                <span className="text-blue-700">انتخاب تصویر</span>
                                <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                </svg>
                            </label>
                        )}
                        <Modal open={isProductImage_Modal} onClose={() => setIsProductImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                            <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                <img className="max-h-full w-auto" src={onChangeFile && onChangeFile.imageUrl || ""}/>
                                <button onClick={() => setIsProductImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </section>
                        </Modal>
                    </div>

                </section>
                <DialogActions>
                    <div className='w-full flex gap-x-4 justify-end p-2'>
                        <button type={'button'} className='font-sans font-bold text-sm '  onClick={() => setIsModal(false)}>بستن</button>
                        <button type={'submit'}  className={` text-sm font-sans py-[6px] px-5 rounded-md ${!formik.isValid? "cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700" : " bg-blue-600 text-white hover:bg-blue-700 "}  `} >تایید</button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
}