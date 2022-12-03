import AdminPageAside from "@/components/adminPage/Aside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import ReactLoading from 'react-loading';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchMainCategories, fetchSub1, fetchSub2, fetchSub3, insertProduct } from "@/redux/admin/admin_manageProducts/admin_manageProductsActions";
import SelectBox from "@/common/admin/SelectBox";
import Cookies from "universal-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "@mui/material";
import { useRef } from "react";
import FormikInput from "@/common/admin/FormikInput";
import { toPersianDigits } from "@/utils/toPersianDigits";

const InsertProduct = () => {
    const productData = useSelector(state => state.admin_products)
    const productLoading = productData.product.loading
    const {subCategoryLoading} = productData
    const {brands} = useSelector(state => state.admin_products.brands)
    const {categories} = useSelector(state => state.admin_products.categories)
    const sub1 = useSelector(state => state.admin_products.sub1)
    const sub2 = useSelector(state => state.admin_products.sub2)
    const sub3 = useSelector(state => state.admin_products.sub3)
    const dispatch = useDispatch();

    const [isAsideModal,setIsAsideModal] = useState(false)

    const [selectedCategory_main, setSelectedCategory_main] = useState("")
    const [categoryQuery_main, setCategoryQuery_main] = useState("")

    const [selectedCategory_sub1, setSelectedCategory_sub1] = useState("")
    const [categoryQuery_sub1, setCategoryQuery_sub1] = useState("")

    const [selectedCategory_sub2, setSelectedCategory_sub2] = useState("")
    const [categoryQuery_sub2, setCategoryQuery_sub2] = useState("")

    const [selectedCategory_sub3, setSelectedCategory_sub3] = useState("")
    const [categoryQuery_sub3, setCategoryQuery_sub3] = useState("")

    const [selectedBrand, setSelectedBrand] = useState("")
    const [brandQuery, setBrandQuery] = useState('')
    
    const [productImages , setProductImages] = useState([])
    const [imageSrc_modal , setImageSrc_modal] = useState(null)
    const [isImage_modal , setIsImage_modal] = useState(false)

    const filteredCategories = categoryQuery_main === '' ? categories : categories && categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_main.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub1 = categoryQuery_sub1 === '' ? sub1.categories : sub1.categories && sub1.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub1.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub2 = categoryQuery_sub2 === '' ? sub2.categories : sub2.categories && sub2.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub2.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub3 = categoryQuery_sub3 === '' ? sub3.categories : sub3.categories && sub3.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub3.toLocaleLowerCase().replace(/\s+/g, '')))
    
    const filteredBrands = brandQuery === '' ? brands : brands.filter((brand) => brand.name.toLowerCase().replace(/\s+/g, '').includes(brandQuery.toLocaleLowerCase().replace(/\s+/g, '')))

    const imageInput_ref = useRef()



    useEffect(()=>{
        dispatch(fetchBrands())
        dispatch(fetchMainCategories())
    },[])
    useEffect(()=>{
        if(selectedCategory_main && selectedCategory_main.id) dispatch(fetchSub1(selectedCategory_main.id))
        setSelectedCategory_sub1("")
    },[selectedCategory_main])
    useEffect(()=>{
        if(selectedCategory_sub1 && selectedCategory_sub1.id) dispatch(fetchSub2(selectedCategory_sub1.id))
        setSelectedCategory_sub2("")
    },[selectedCategory_sub1])
    useEffect(()=>{
        if(selectedCategory_sub2 && selectedCategory_sub2.id) dispatch(fetchSub3(selectedCategory_sub2.id))
        setSelectedCategory_sub3("")
    },[selectedCategory_sub2])




    const checkImageFormat = (fileName) => {
        const type =  fileName.split('.').pop();
        const valid = ['png','jpg','jpeg','webp']
        if(!valid.includes(type.toLocaleLowerCase())){
            return false
        }
        return true
    }
    const deleteImageViaId = (id) => {
        const cloneArray = [...productImages]
        const currentImage_index = cloneArray.findIndex(image => image.id === id)
        const availableImages = cloneArray.filter(image => image.id !== id)
        if(cloneArray[currentImage_index].is_main === true){
            if(availableImages.length > 0){
                availableImages[0].is_main = true
                setProductImages(availableImages)
            }
            else{
                setProductImages(availableImages);
            }
        }else setProductImages(availableImages);

        setIsImage_modal(false)
    }
    const setOriginalImageViaId = (id) => {
        const cloneArray = [...productImages]
        cloneArray.forEach(image => image.is_main = false)
        const currentImage_index = cloneArray.findIndex(image => image.id === id)
        cloneArray[currentImage_index].is_main = true;
        setProductImages(cloneArray)
        setIsImage_modal(false)

    }

    const changeFIleAction_input = (input) => {
        const image = input.target.files[0]        
        if(input.target.files && image){
            if(!checkImageFormat(image.name)){
                toast.error('تصویر کالا معتبر نیست')
                imageInput_ref.current.value = null
                return false
            }
            if(Number(image.size) < 16000){
                toast.error('تصویر کالا نمی تواند کمتر از ۱۶kb باشد')
                imageInput_ref.current.value = null
                return false
            } 
            if(Number(image.size) > 1024000){
                toast.error("تصویر کالا نمی تواند بیشتر از ۱.۰۲۴mb باشد")
                imageInput_ref.current.value = null
                return false
            }
            setProductImages([...productImages , {id : Date.now() , image  , imageUrl : URL.createObjectURL(image) , is_main : productImages.length === 0 ? true : false}])
            imageInput_ref.current.value = null
        }
    }

    const validationSchema = Yup.object({
        product_title : Yup.string().min(3, "نام کالا نمی‌تواند کم تر از ۳ نویسه باشد").max(250 , 'نام کالا نمی تواند بیشتر از ۲۵۰ نویسه باشد').trim().required("نام کالا نمی تواند خالی باشد"),
        product_description : Yup.string().min(2,"توضیحات کالا نمیتواند کم تر از ۲ نویسه باشد").trim().required("توضیحات کالا نمی تواند خالی باشد"),
        barcode : Yup.string().length(12,"بارکد باید ۱۲ رقم باشد").required("مقدار بارکد نمی تواند خالی باشد").matches(/^[0-9]{12}\d*$/,"مقدار بارکد باید عدد باشد").trim()
    })

    const onSubmit = ({product_title ,barcode, product_description}) => {
        const categoryId = selectedCategory_sub3.id || selectedCategory_sub2.id || selectedCategory_sub1.id || selectedCategory_main.id
        const brandId = selectedBrand.id || null
        if(productImages.length === 0){
            toast.error('تصویر کالا الزامی می باشد')
            return false
        }
        // Check Brand
        if(!brandId){
            toast.error('مقدار برند الزامی می باشد')
            return false
        }
        // Check Category
        if(!categoryId){
            toast.error('مقدار دسته‌بندی الزامی می باشد')
            return false
        }
        const payload = {categoryId,brandId,product_title,barcode,product_description,productImages}
        dispatch(insertProduct(payload))
    }
    
    const formik = useFormik({
        onSubmit,
        validationSchema,
        validateOnMount : true,
        initialValues : {
            product_title :  "",
            product_description :  "",
            barcode : "",
        }
    })

    return (  
        <Layout isFooter={true} pageTitle={"پنل مدیریت | افزودن کالا"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <AdminPageAside/>
            
                <section  className=" w-full lg:w-4/5 flex-0 h-max p-4">
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>
                    {/* Image Modal */}
                    <Modal open={isImage_modal} onClose={() => setIsImage_modal(false)} className="outline-none p-4 h-full w-full flex justify-center items-center">
                        <section className=" bg-white outline-none sm:w-1/2 h-1/2 rounded-md  flex flex-col justify-center items-center p-4 relative">
                            <img className="max-h-full w-auto" src={imageSrc_modal && imageSrc_modal.imageUrl || ""}/>
                            <button onClick={() => setIsImage_modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="w-full flex justify-end gap-x-3 absolute bottom-2 left-0 py-1 px-3  bg-[#fffffff0]">
                                <button onClick={() => deleteImageViaId(imageSrc_modal.id)} className="text-xs font-sans rounded-md hover:underline underline-offset-4 text-red-600">حذف تصویر</button>
                                <button onClick={() => setOriginalImageViaId(imageSrc_modal.id)} className="text-xs font-sans rounded-md hover:underline underline-offset-4 text-blue-600">انتخاب به عنوان تصویر اصلی</button>
                            </div>
                        </section>
                    </Modal>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">ثبت کالا</h1>
                        </div>
                        <div className="flex gap-x-2">
                            <Link href={'/admin/manage-products'}>
                                <a className=" items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2 px-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </a>
                            </Link>
                            <Link href={'/admin'}>
                                <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        {/* Product Title - Brand - Barcode */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            <FormikInput title={"عنوان کالا"} formik={formik} placeholder={"عنوان کالا"} isRequired={true} name={"product_title"} parentClassName={"flex flex-col relative"}/>
                            <div className="flex flex-col relative">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">برند :</p>
                                <div className="w-full mt-2">
                                    <SelectBox notFoundTitle="برند مورد نظر یافت نشد." placeholder={'انتخاب عنوان برند'} query={brandQuery} setQuery={setBrandQuery} filteredData={filteredBrands} selected={selectedBrand} setSelected={setSelectedBrand}/>
                                </div>
                            </div>
                            <FormikInput title={"بارکد"} formik={formik} placeholder={"بارکد کالا"} isRequired={true} name={"barcode"} parentClassName={"flex flex-col relative"}/>
                        </section>
                        {/* توضیحات */}
                        <div className="flex flex-col mt-4">
                            <p className="font-sans text-sm before:content-['*'] before:text-red-600">توضیحات (در سایت نمایش داده نمی‌شود) :</p>
                            <textarea value={formik.values.product_description} name='product_description' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="توضیحات..." className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                            {formik.errors.product_description && formik.touched.product_description && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.product_description}</p>}
                        </div>
                        {/* Choose Product Images */}
                        <section className="sm:mt-4 w-full flex flex-row ">
                            <div className={`flex sm:flex-row flex-col flex-start w-full`}>
                            <input type={'file'} disabled={productImages.length > 19 ? true : false} ref={imageInput_ref} onChange={input => changeFIleAction_input(input)} id='chooseImageInput' accept=".jpg,.png,.jpeg,.webp" className="hidden peer"/>
                            <div className="sticky top-0 z-50 py-4  sm:p-0 bg-gray-100 sm:bg-transparent">
                                <label htmlFor="chooseImageInput" className={`  sm:h-28 p-2 sm:p-5 flex flex-row sm:flex-col justify-center items-center  border-dashed peer-disabled:cursor-not-allowed peer-disabled:text-gray-800 text-blue-700 peer-disabled:border-gray-800 cursor-pointer peer-disabled:bg-gray-300 hover:bg-blue-100 bg-blue-50 border-blue-600 border-2 rounded-md sm:rounded-lg `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p className="font-sans text-sm whitespace-nowrap w-full  font-bold mr-2 sm:mt-2">انتخاب تصویر</p>
                                    <p className="font-sans text-sm  font-bold  sm:absolute top-3 left-3">{toPersianDigits(`${productImages.length}/20`)}</p>
                                </label> 
                            </div>
                                <div className="class_grid_manage_products sm:mr-4 ">
                                    {productImages.map(image => {
                                        return(
                                            <div key={image.id} onClick={()=>{setImageSrc_modal(image) , setIsImage_modal(true)}} className="z-10 cursor-pointer group h-28 p-1 relative border-gray-500 border w-auto flex   rounded-md overflow-hidden items-center justify-center">
                                                <img src={image.imageUrl} className="h-full w-auto"/> 
                                                <button type={"button"} className="absolute  top-2 right-2 p-1 rounded-full shadow-lg group-hover:bg-gray-800 bg-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:text-gray-50 text-gray-800">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </button>
                                                {image.is_main && <p className="absolute bottom-0 font-sans text-xs text-gray-100 text-center p-1 bg-[#000000b7] w-full">تصویر اصلی</p>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>
                        {/* دسته بندی */}
                        <div className="flex flex-col mt-4 gap-x-4">
                            <input type="checkbox" className="peer hidden" id="category_section" />
                            <section className="flex items-center">
                                <p className="font-sans text-sm before:content-['*'] before:text-red-600">دسته‌بندی :</p>
                                {subCategoryLoading && <ReactLoading className="mr-2" type="spinningBubbles" delay={0} height={20} width={20} color="red" />}
                            </section>
                            <section className="flex flex-wrap gap-3 mt-2">
                                <SelectBox  isTitle={true} notFoundTitle="دسته مورد نظر یافت نشد." placeholder={"دسته اصلی"} query={categoryQuery_main} setQuery={setCategoryQuery_main} filteredData={filteredCategories} selected={selectedCategory_main} setSelected={setSelectedCategory_main}/>
                                {selectedCategory_main && sub1.categories && <SelectBox isTitle={true} notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته اول'} query={categoryQuery_sub1} setQuery={setCategoryQuery_sub1} filteredData={filteredsub1} selected={selectedCategory_sub1} setSelected={setSelectedCategory_sub1}/>}
                                {selectedCategory_sub1 && sub2.categories && <SelectBox isTitle={true} notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته دوم'} query={categoryQuery_sub2} setQuery={setCategoryQuery_sub2} filteredData={filteredsub2} selected={selectedCategory_sub2} setSelected={setSelectedCategory_sub2}/>}
                                {selectedCategory_sub2 && sub3.categories && <SelectBox isTitle={true} notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته سوم'} query={categoryQuery_sub3} setQuery={setCategoryQuery_sub3} filteredData={filteredsub3} selected={selectedCategory_sub3} setSelected={setSelectedCategory_sub3}/>}
                            </section>
                        </div>

                        <div className="mt-6 w-full flex justify-end gap-x-2">
                            {productLoading && <ReactLoading type="spinningBubbles" className="ml-2" height={30} width={30} color="red" />}
                            <section className=" flex justify-end  items-center ">
                                <button disabled={productLoading} type={"submit"} className={`flex items-center ${formik.isValid ? " hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>
                                    ثبت کالا
                                </button>
                            </section>
                        </div>
                    </form>
                </section>
            </div>
        </Layout>
    );
}
 
export default InsertProduct;

export const getServerSideProps = async(ctx) => {
    // Check Permission
    const token =  new Cookies( ctx.req.headers.cookie).get("userToken");
    let ErrorCode = 0;
    if(!token) return{notFound : true}
    await axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
    .then(({data}) =>  {
        if(data.user.account_type !== 'admin') ErrorCode = 403
    })
    .catch( () => ErrorCode = 403)
    if(ErrorCode === 403){
        return{notFound : true}
    }
    return { props : {}}
}