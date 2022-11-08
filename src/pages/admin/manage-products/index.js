import Layout from "@/layout/Layout";
import { Modal, Pagination } from "@mui/material";
import { useState } from "react";
import AdminPageAside from "@/components/adminPage/Aside";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchBrands, fetchCategories, fetchProducts } from "@/redux/admin/admin_manageProducts/admin_manageProductsActions";
import * as Yup from 'yup'
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import Warning from "@/common/alert/Warning";

import Cookies from "universal-cookie";
import axios from "axios";
import SelectBox from "@/common/admin/SelectBox";

const ManageProduct = () => {
    const router = useRouter()
    
    const [isAsideModal , setIsAsideModal] = useState(false)
    const [status , setStatus] = useState('all')

    const {loading,products,pagination} = useSelector(state => state.admin_products.products)
    const {brands} = useSelector(state => state.admin_products.brands)
    const {categories} = useSelector(state => state.admin_products.categories)

    
    const [selectedCategory, setSelectedCategory] = useState("")
    const [categoryQuery, setCategoryQuery] = useState("")

    const [selectedBrand, setSelectedBrand] = useState('')
    const [brandQuery, setBrandQuery] = useState('')
    
    const filteredCategories = categoryQuery === '' ? categories : categories && categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredBrands = brandQuery === '' ? brands : brands.filter((brand) => brand.name.toLowerCase().replace(/\s+/g, '').includes(brandQuery.toLocaleLowerCase().replace(/\s+/g, '')))

    
    const dispatch = useDispatch()
    const page = Number(useRouter().query.page || 1);
    const limit = 5
    
    useEffect(()=> {
        window.scroll({top : 0 , behavior : 'smooth'})
        const {state , page , brand,category,name,barcode} = router.query;
        const payload = {state : state || "all" ,page,limit,paramsBrand :  brand || "" ,barcode: barcode || "", paramsCategory :  category || "",name: name || ""}

        dispatch(fetchProducts(payload))
        dispatch(fetchBrands())
        dispatch(fetchCategories()) 
    },[router.query])

    const onSubmit = ({ product_title ,barcode}) => {
        router.push(`/admin/manage-products?page=1&state=${status || "all"}&barcode=${barcode || ""}&category=${selectedCategory && selectedCategory.id || ""}&brand=${selectedBrand && selectedBrand.id || ""}&name=${product_title || ""}&limit=${limit}`)
    }
    const validationSchema = Yup.object({
        product_title : Yup.string().min(2 , 'عنوان برند نمی تواند کمتر از 2 نویسه باشد').max(50 , 'عنوان برند نمی تواند بیشتر از 250 نویسه باشد').trim(),
        barcode : Yup.string().max(12,"بارکد نمی‌تواند بیشتر از ۱۲ رقم باشد").matches(/^[0-9]\d*$/,"مقدار بارکد باید عدد باشد").trim()
    })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            product_title : router.query.name || "",
            barcode : router.query.barcode ||  ""
        }
    })

    
    return (  
        <Layout isFooter={true}>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <AdminPageAside/>

                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                    </Modal>

                    <div className="flex justify-between w-full items-center mt-4">
                        <h1 className="font-sans font-bold text-lg">مدیریت کالاها</h1>
                        <div className="flex gap-x-2 items-center">
                            <Link href={{pathname:"/admin/manage-products"}}>
                                <a className="items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <Link href={'/admin/manage-products/insert'}>
                                <a className="gap-x-1 items-center hover:bg-green-200 bg-green-100 flex border border-green-700  rounded-md py-2 px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
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
                    <form className="w-full " onSubmit={formik.handleSubmit}>
                        <section className="w-full p-4 bg-white mt-3 rounded-lg shadow-md">
                            <section className="mt-2 grid grid-cols-3 gap-4">
                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm">نام کالا :</p>
                                    <input type="text" name="product_title" value={formik.values.product_title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="بر اساس نام محصول" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                    {formik.errors.product_title && formik.touched.product_title && <p className={'text-red-600 font-sans text-xs pt-2 pb-1'}>{formik.errors.product_title}</p>}
                                </div>
                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm"> برند :</p>
                                    <div className="w-full mt-2">
                                        <SelectBox notFoundTitle="برند مورد نظر یافت نشد." placeholder={'انتخاب برند'} query={brandQuery} setQuery={setBrandQuery} filteredData={filteredBrands} selected={selectedBrand} setSelected={setSelectedBrand}/>
                                    </div>
                                </div>

                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm"> دسته‌بندی :</p>
                                    <div className="w-full mt-2">
                                        <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." placeholder={'انتخاب دسته بندی'} query={categoryQuery} setQuery={setCategoryQuery} filteredData={filteredCategories} selected={selectedCategory} setSelected={setSelectedCategory}/>
                                    </div>
                                </div>

                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm">بارکد :</p>
                                    <input type="text" name="barcode" value={formik.values.barcode} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="بر اساس نام محصول" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                                    {formik.errors.barcode && formik.touched.barcode && <p className={'text-red-600 font-sans text-xs pt-2 pb-1'}>{formik.errors.barcode}</p>}
                                </div>
                                
                                <div className="flex flex-col relative">
                                    <p className="font-sans text-sm">وضعیت :</p>
                                    <select defaultValue={ router.query.state || 'all'} onChange={event => setStatus(event.target.value)} className=" cursor-pointer border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md">
                                        <option className="py-2 text-sm font-sans" value={'active'}>تایید شده‌ها</option>
                                        <option className="py-2 text-sm font-sans" value={'trashed'}>رد شده‌ها</option>
                                        <option className="py-2 text-sm font-sans" value={'all'} >نمایش همه وضعیت ها</option>
                                    </select>
                                </div>

                            </section>
                            <div className="w-full flex items-center justify-end mt-3">
                                <button type={"submit"} className={`${formik.isValid ? "hover:bg-blue-200 bg-blue-100 border border-blue-600 text-blue-800 cursor-pointer " : "cursor-not-allowed hover:bg-gray-800 bg-gray-700 border border-gray-600 text-gray-100"}  py-[6px] px-6 font-sans  text-sm rounded-md`}>جستجو</button>
                            </div>
                        </section>
                    </form>

                    {loading && (
                        <div className="w-full flex justify-center my-8">
                            <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                        </div>
                    )}
                    {!products && !loading && <Warning text={'کالا یافت نشد! میتوانید کالای جدیدی ثبت کنید.'}/>}
                    {products && (
                        <>
                            <section className="w-full mt-3 rounded-lg shadow-md flex flex-col ">
                                <section className="grid grid-cols-6 rounded-t-md shadow-md items-center bg-gray-600 text-white px-4 py-2 font-sans text-sm">
                                    <p className="w-10 h-full ">تصویر</p>
                                    <p className="font-sans text-sm">عنوان </p>
                                    <p className="font-sans text-sm ">برند </p>
                                    <p className="font-sans text-sm ">دسته‌بندی</p>
                                    <p className="font-sans text-sm ">وضعیت نمایش</p>
                                    <p className="font-sans text-sm ">بیشتر</p>
                                </section>
                                {products && products.map(product => {
                                    return(
                                        <section key={product.id}>
                                            <div className="p-2 bg-white w-full">
                                                <input type={"checkbox"} id={`detail_${product.id}`} className="peer hidden"/>
                                                <section className="grid grid-cols-6 w-full">
                                                    <div className=" h-full ">
                                                        <img className="w-1/2 h-auto" src={product.image_url}/>
                                                    </div>
                                                    <p className="font-sans text-sm flex items-center">{product.title.length > 22 ? product.title.substring(0,22)+'...' : product.title} </p>
                                                    <p className="font-sans text-sm flex items-center ">{product.brand.name && product.brand.name.length > 22 ? product.brand.name.substring(0,22)+'...' : product.brand.name}</p>
                                                    <div className="pl-1 ">
                                                        {product.categories.map((category,index) => <span key={index} className=" font-sans text-sm">{index >0 && " / "}{category.name}</span>)}
                                                    </div>
                                                    <div className=" flex items-center">
                                                        {product.is_show ? (
                                                            <p className="whitespace-nowrap font-sans text-sm max-w-min bg-green-50 text-green-600 rounded-lg px-3 py-1">تایید شده</p>
                                                        ) : (
                                                            <p className="font-sans text-sm bg-red-50 text-red-600 rounded-lg px-3 py-1">رد شده</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <label htmlFor={`detail_${product.id}`} className="p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 peer-checked:rota">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                </section>
                                                {/* Description */}
                                                <section className="w-full peer-checked:flex flex-col hidden flex-wrap gap-y-2 p-4 pb-0">
                                                    <div className="flex flex-col gap-y-2">
                                                        <p className="font-sans text-sm"><b>عنوان : </b>{product.title.length ===0 ? "نامشخص" : product.title}</p>
                                                        <p className="font-sans text-sm">
                                                            <b>دسته‌بندی : </b>
                                                            {product.categories.map((category,index) => <span key={index} className="font-sans text-sm">{index >0 && " / "}{category.name}</span>)}
                                                        </p>
                                                        <p className="font-sans text-sm"><b>برند : </b>{product.brand.name && product.brand.name.length ===0 ? "نامشخص" : product.brand.name}</p>
                                                        <p className="font-sans text-sm"><b>بارکد : </b>{product.barcode}</p>
                                                        <p className="font-sans text-sm"><b>توضیحات : </b> {product.description.length === 0 ? "نامشخص" : product.description}</p>
                                                    </div>

                                                    <div className="flex justify-end w-full mt-4 mb-4">
                                                        <Link href={`/admin/manage-products/edit/${product.id}`} >
                                                            <a className=" font-sans text-sm hover:bg-blue-200 bg-blue-100 text-blue-700 border border-blue-500 px-4 py-1 rounded-md">ویرایش</a>
                                                        </Link>
                                                    </div>
                                                </section>
                                            </div>
                                            <hr/>
                                        </section>
                                    )
                                })}
                            </section>

                            <section dir="ltr" className=" w-full flex justify-center py-4">
                                <Pagination size="large" color="primary" page={page} count={pagination.last} onChange={(event , page)=> {
                                    router.push(`/admin/manage-products?page=${page}&state=${router.query.state || ''}&name=${router.query.name || ""}&limit=${limit || 12}&category=${router.query.category || ""}&brand=${router.query.brand || ""}`)
                                }}/>
                            </section>
                        </>
                    )}
                </section>

            </div>
        </Layout>
    );
}
 
export default ManageProduct;

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