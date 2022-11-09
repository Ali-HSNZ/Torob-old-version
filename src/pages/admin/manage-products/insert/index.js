import AdminPageAside from "@/components/adminPage/Aside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import ReactLoading from 'react-loading';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCategories, fetchSub1, fetchSub2, fetchSub3, insertProduct } from "@/redux/admin/admin_manageProducts/admin_manageProductsActions";
import SelectBox from "@/common/admin/SelectBox";
import Cookies from "universal-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "@mui/material";
import { useRef } from "react";

const InsertProduct = () => {
    const productData = useSelector(state => state.admin_products)
    const productLoading = productData.product.loading
    const {subCategoryLoading} = productData
    const {brands} = useSelector(state => state.admin_products.brands)
    const {categories} = useSelector(state => state.admin_products.categories)
    const sub1 = useSelector(state => state.admin_products.sub1)
    const sub2 = useSelector(state => state.admin_products.sub2)
    const sub3 = useSelector(state => state.admin_products.sub3)
    const id = Number(1)
    const dispatch = useDispatch();

    
    const [isProductImage_Modal , setIsProductImage_Modal] = useState(false)

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
    
    const filteredCategories = categoryQuery_main === '' ? categories : categories && categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_main.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub1 = categoryQuery_sub1 === '' ? sub1.categories : sub1.categories && sub1.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub1.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub2 = categoryQuery_sub2 === '' ? sub2.categories : sub2.categories && sub2.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub2.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub3 = categoryQuery_sub3 === '' ? sub3.categories : sub3.categories && sub3.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub3.toLocaleLowerCase().replace(/\s+/g, '')))
    
    const filteredBrands = brandQuery === '' ? brands : brands.filter((brand) => brand.name.toLowerCase().replace(/\s+/g, '').includes(brandQuery.toLocaleLowerCase().replace(/\s+/g, '')))

    const validationSchema = Yup.object({
        product_title : Yup.string().min(10, "نام کالا نمی‌تواند کم تر از ۱۰ نویسه باشد").max(250 , 'نام کالا نمی تواند بیشتر از ۲۵۰ نویسه باشد').trim().required("نام کالا نمی تواند خالی باشد"),
        product_description : Yup.string().min(20,"توضیحات کالا نمیتواند کم تر از ۲۰ نویسه باشد").trim().required("توضیحات کالا نمی تواند خالی باشد"),
        barcode : Yup.string().length(12,"بارکد باید ۱۲ رقم باشد").required("مقدار بارکد نمی تواند خالی باشد").matches(/^[0-9]{12}\d*$/,"مقدار بارکد باید عدد باشد").trim()
    })
    const [onChangeFile , setOnChangeFile] = useState(null)
    const imageInput_ref = useRef()

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
            setOnChangeFile({selectedFile : image , imageUrl : URL.createObjectURL(image)})
        }
    }

    const onSubmit = ({product_title ,barcode, product_description}) => {
        const categoryId = selectedCategory_sub3.id || selectedCategory_sub2.id || selectedCategory_sub1.id || selectedCategory_main.id
        const brandId = selectedBrand.id || null
        const productImage = onChangeFile && onChangeFile.selectedFile || null;
        // Check Product Image
        if(productImage){
            if(!checkImageFormat(productImage.name)){
                toast.error('تصویر کالا معتبر نیست')
                return false
            }
            if(Number(productImage.size) < 16000){
                toast.error('تصویر کالا نمی تواند کمتر از ۱۶kb باشد')
                return false
            } 
            if(Number(productImage.size) > 1024000){
                toast.error("تصویر کالا نمی تواند بیشتر از ۱۰۲۴kb باشد")
                return false
            }
        }
        // Check Brand
        if(!brandId){
            toast.error('مقدار برند نمی تواند خالی باشد')
            return false
        }
        // Check Category
        if(!categoryId){
            toast.error('مقدار دسته‌بندی نمی تواند خالی باشد')
            return false
        }
            const payload = {categoryId,brandId,product_title,barcode,product_description,productImage,id}
            dispatch(insertProduct(payload))
        
    }

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

    useEffect(()=>{
        dispatch(fetchBrands())
        dispatch(fetchCategories())
    },[])

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
        <Layout isFooter={true}>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <AdminPageAside/>
            
                <section  className=" w-full lg:w-4/5 flex-0 h-max p-4">
                    <div className="flex justify-between w-full items-center">
                    <h1 className="font-sans font-bold text-lg">ثبت کالا</h1>
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
                    {productLoading  && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}
                    {!productLoading && <form onSubmit={formik.handleSubmit}>
                        <section className="grid grid-cols-3 gap-4 mt-6">
                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">عنوان :</p>
                                <input type="text" name="product_title"  value={formik.values.product_title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="عنوان کالا" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.product_title && formik.touched.product_title && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.product_title}</p>}
                            </div>
                            <div className="flex flex-col relative">
                                <p className="font-sans text-sm"> برند :</p>
                                <div className="w-full mt-2">
                                    <SelectBox notFoundTitle="برند مورد نظر یافت نشد." placeholder={'انتخاب عنوان برند'} query={brandQuery} setQuery={setBrandQuery} filteredData={filteredBrands} selected={selectedBrand} setSelected={setSelectedBrand}/>
                                </div>
                            </div>


                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm text-gray-800"> تصویر (لوگو) برند :</p>
                                <input type={'file'} id="chooseImage" ref={imageInput_ref} accept="image/*" className="hidden" name='brandImage' onChange={event => changeFIleAction_input(event)} onBlur={formik.handleBlur}/>
                                {onChangeFile? (
                                    <section className="flex justify-between items-center mt-2  ">
                                        <button type={"button"} onClick={()=>setIsProductImage_Modal(true)} className="flex justify-between w-full rounded-r-md bg-green-100 p-2 border-l-0 hover:bg-green-200 hover:border-green-700 border border-green-500">
                                            <span className="text-sm font-sans text-green-800 ">تصویر کالا انتخاب شده است.</span>
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
                                    <>
                                        <label htmlFor="chooseImage" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                                            <span className="text-blue-700">انتخاب تصویر</span>
                                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                            </svg>
                                        </label>
                                    </>
                                )}
                                <Modal open={isProductImage_Modal} onClose={() => setIsProductImage_Modal(false)} className=" h-full w-full flex justify-center items-center">
                                    <section className=" bg-white w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                        <img className="max-h-full w-auto" src={onChangeFile && onChangeFile.imageUrl || ""}/>
                                        <button onClick={() => setIsProductImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </section>
                                </Modal>
                            </div>

                            <div className="flex flex-col relative ">
                                <p className="font-sans text-sm">بارکد :</p>
                                <input type="text" name="barcode"  value={formik.values.barcode} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="بارکد کالا" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                {formik.errors.barcode && formik.touched.barcode && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.barcode}</p>}
                            </div>

                        </section>
                        <div className="flex flex-col mt-4">
                            <p className="font-sans text-sm">توضیحات (در سایت نمایش داده نمی‌شود) :</p>
                            <textarea value={formik.values.product_description} name='product_description' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="توضیحات..." className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                            {formik.errors.product_description && formik.touched.product_description && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.product_description}</p>}
                        </div>

                        <div className="flex flex-col mt-4 gap-x-4">
                            <input type="checkbox" className="peer hidden" id="category_section" />
                            <section className="flex items-center">
                                <p className="font-sans text-sm "> دسته‌بندی :</p>
                                {subCategoryLoading && <ReactLoading className="mr-2" type="spinningBubbles" delay={0} height={20} width={20} color="red" />}
                            </section>
                            <section className="grid mt-2  grid-cols-5 gap-x-2">
                                <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." placeholder={"دسته اصلی"} query={categoryQuery_main} setQuery={setCategoryQuery_main} filteredData={filteredCategories} selected={selectedCategory_main} setSelected={setSelectedCategory_main}/>
                                {selectedCategory_main && sub1.categories && <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته اول'} query={categoryQuery_sub1} setQuery={setCategoryQuery_sub1} filteredData={filteredsub1} selected={selectedCategory_sub1} setSelected={setSelectedCategory_sub1}/>}
                                {selectedCategory_sub1 && sub2.categories && <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته دوم'} query={categoryQuery_sub2} setQuery={setCategoryQuery_sub2} filteredData={filteredsub2} selected={selectedCategory_sub2} setSelected={setSelectedCategory_sub2}/>}
                                {selectedCategory_sub2 && sub3.categories && <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'زیردسته سوم'} query={categoryQuery_sub3} setQuery={setCategoryQuery_sub3} filteredData={filteredsub3} selected={selectedCategory_sub3} setSelected={setSelectedCategory_sub3}/>}
                            </section>
                        </div>

                        <div className="mt-6 w-full flex justify-end gap-x-2">
                            <button  type={"submit"} className={`${formik.isValid ? "bg-blue-600 hover:bg-blue-700 border border-blue-600 text-blue-50" : "cursor-not-allowed bg-gray-700 hover:bg-gray-800 border border-black text-gray-200"} rounded-md py-[6px] px-4 font-sans text-sm`}>ثبت کالا</button>
                        </div>
                    </form>}
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