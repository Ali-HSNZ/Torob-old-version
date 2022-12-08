import Layout from "@/layout/Layout";
import { Modal, Pagination } from "@mui/material";
import { useState } from "react";
import StorePageAside from "@/components/manageStore/storeAside";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Yup from 'yup'
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import Warning from "@/common/alert/Warning";
import Cookies from "universal-cookie";
import axios from "axios";
import FormikInput from "@/common/admin/FormikInput";
import { fetchBaseProducts, fetchBrands, fetchCategories } from "@/redux/manage-store/manageStore/manageStore_actions";
import SelectBox from "@/common/admin/SelectBox";

const ManageStores = () => {
    const router = useRouter()
    
    const [isAsideModal , setIsAsideModal] = useState(false)

    const {loading,products,pagination} = useSelector(state => state.manage_store.products)
    const {brands} = useSelector(state => state.manage_store.brands)
    const {categories} = useSelector(state => state.manage_store.categories)

    const [isImage_Modal , setIsImage_Modal] = useState(false);
    const [modal_imageSrc ,setModal_imageSrc] = useState("")
    
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
        const {page , brand,category,name,barcode,order} = router.query;
        const payload = {page,limit,paramsBrand :  brand,barcode, paramsCategory :  category ,name}

        dispatch(fetchBaseProducts(payload))
        dispatch(fetchBrands())
        dispatch(fetchCategories()) 
    },[router.query])

    const onSubmit = ({ product_title ,barcode,order}) => {
        router.push(`/store/manage-products/insert?page=1&barcode=${barcode || ""}&category=${selectedCategory && selectedCategory.id || ""}&brand=${selectedBrand && selectedBrand.id || ""}&name=${product_title || ""}&limit=${limit}`)
    }
    const validationSchema = Yup.object({
        product_title : Yup.string().min(2 , 'عنوان کالا نمی تواند کمتر از ۲ نویسه باشد').max(250 , 'عنوان کالا نمی تواند بیشتر از ۲۵۰ نویسه باشد').trim(),
        barcode : Yup.string().min(2 , 'بارکد کالا نمی تواند کمتر از ۲ نویسه باشد').max(12,"بارکد نمی‌تواند بیشتر از ۱۲ رقم باشد").matches(/^[0-9]\d*$/,"مقدار بارکد باید عدد باشد").trim()
    })

    const formik = useFormik({ 
        onSubmit, 
        validationSchema, 
        validateOnMount : true,
        enableReinitialize : true,
        initialValues : {
            product_title : router.query.name || "",
            barcode : router.query.barcode ||  "",
            order : router.query.order || "desc"
        }
    })

    
    return (  
        <Layout isFooter={true} pageTitle={" پنل فروشگاه | مدیریت محصولات | ثبت کالا"}>
            <div className="w-full flex flex-col lg:flex-row  justify-between">
                <StorePageAside/>
                <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                    <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                        <><StorePageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/2 w-full'}/></>
                    </Modal>

                    <div className="flex flex-col sm:flex-row justify-between w-full  sm:items-center mt-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <h1 className="font-sans font-bold text-lg">مدیریت محصولات | ثبت کالا</h1>
                        </div>
                        <div className="flex gap-x-2 my-2 sm:m-0 justify-end  sm:items-center">
                            <Link href={'/store/manage-products'}>
                                <a className=" items-center hover:bg-orange-200 bg-orange-100 flex border border-orange-800 text-orange-800 rounded-md py-2 px-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </a> 
                            </Link>
                            <Link href={{pathname:"/store/manage-products/insert"}}>
                                <a className="items-center hover:bg-red-200 bg-red-100 flex border border-red-800 text-red-800 rounded-md py-2  px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </a>
                            </Link>
                            <Link href={'/store'}>
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
                            <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                <FormikInput formik={formik} placeholder={"بر اساس نام محصول"} title={"نام کالا"} name={"product_title"} parentClassName={"flex flex-col relative"}/>

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

                                <FormikInput formik={formik} placeholder={"بر اساس بارکد محصول"} title={"بارکد"} name={"barcode"} parentClassName={"flex flex-col relative"}/>

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
                    {!products && !loading && <Warning text={'کالایی یافت نشد!'}/>}
                    {products && (
                        <>
                        <section className="rounded-md overflow-hidden w-full mt-3  shadow-md flex flex-col">
                        {/* isImage_Modal */}
                        <Modal open={isImage_Modal} onClose={() => setIsImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                            <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                <img className="max-h-full w-auto" src={modal_imageSrc}/>
                                <button onClick={() => setIsImage_Modal(false)} className="absolute top-2 right-2 hover:bg-gray-100 bg-white p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </section>
                        </Modal>
                            {products && products.map(product => {
                                return(
                                    <section key={product.id}>
                                        <div className="p-4 bg-white w-full">
                                            <input  type={"checkbox"} id={`detail_${product.id}`} className="peer hidden"/>
                                            <section className=" flex flex-col sm:flex-row items-center  justify-between">
                                                <div className=" h-full min-w-[150px]   max-w-[150px]  sm:max-w-[100px] sm:min-w-[100px]">
                                                    <img onClick={()=> {product.is_image_url && setIsImage_Modal(true) ; setModal_imageSrc(product.image_url)}} className="w-full h-auto" src={product.image_url}/>
                                                </div>
                                                <div className="w-full flex justify-start flex-col pr-4 gap-y-3 mt-4 sm:mt-0">
                                                    <p className="font-sans leading-6 text-sm flex-row flex">
                                                        <b className="whitespace-nowrap pl-1">عنوان کالا : </b>
                                                         {product.title.length > 35 ? product.title.substring(0,35)+'...' : product.title} </p>
                                                    <p className="font-sans leading-6 text-sm flex-row flex ">
                                                        <b className="whitespace-nowrap pl-1">برند : </b> 
                                                        {product.brand.name && product.brand.name.length > 22 ? product.brand.name.substring(0,22)+'...' : product.brand.name}</p>
                                                    <div className="font-sans leading-6 text-sm flex w-full flex-row">
                                                        <b className="whitespace-nowrap pl-1">دسته‌بندی : </b>
                                                        <div>{product.categories.map((category,index) => <span key={index} className=" font-sans text-sm">{index >0 && " / "}{category.name}</span>)}</div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between w-full mt-4 sm:m-0 sm:w-fit  sm:justify-end gap-x-4">
                                                   {product.is_created ? (
                                                        <p className="text-green-800 whitespace-nowrap font-sans text-sm gap-x-1 items-center  bg-green-50 flex rounded-md py-1.5 px-3">
                                                            ثبت شده
                                                        </p>          
                                                   ) : (
                                                        <Link href={`/store/manage-products/insert/${product.id}`}>
                                                            <a className=" text-green-800 whitespace-nowrap font-sans text-sm gap-x-1 items-center hover:bg-green-100 bg-green-50 flex border border-green-600  rounded-md py-1.5 px-3">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-800">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                                                </svg>
                                                                ثبت کالا
                                                            </a>                                                    
                                                        </Link>
                                                   )}
                                                    <div className="flex items-center ">
                                                        <label htmlFor={`detail_${product.id}`} className="p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700 peer-checked:rota">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </label>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* Description */}
                                            <section className="w-full bg-gray-50 shadow-inner rounded-md mt-4 peer-checked:flex flex-col hidden flex-wrap gap-y-2 p-4">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <p className="font-sans text-sm flex flex-row"><b className="whitespace-nowrap mb-1 sm:m-0 pl-1">عنوان : </b>{product.title}</p>
                                                    
                                                    <div className="font-sans text-sm   flex flex-row">
                                                        <b className="whitespace-nowrap mb-1 sm:m-0 pl-1">دسته‌بندی : </b>
                                                        <div>{product.categories.map((category,index) => <span key={index} className="font-sans text-sm">{index >0 && " / "}{category.name}</span>)}</div>
                                                    </div>
                                                    <p className="font-sans text-sm  flex flex-row "><b className="whitespace-nowrap mb-1 sm:m-0 pl-1">برند : </b>{product.brand.name && product.brand.name.length ===0 ? "نامشخص" : product.brand.name}</p>
                                                    <p className="font-sans text-sm flex flex-row"><b className="whitespace-nowrap mb-1 sm:m-0 pl-1">بارکد : </b>{product.barcode}</p>
                                                    {/* Logo */}
                                                    <div className="flex">
                                                        <b className="font-sans text-sm pl-1">تصویر کالا : </b>
                                                        {product.is_image_url ? (
                                                            <button onClick={()=> {setIsImage_Modal(true) ; setModal_imageSrc(product.image_url)}} className="hover:text-red-600 font-sans text-sm text-blue-600 underline">نمایش تصویر</button>
                                                        ) : <p className="font-sans text-sm mr-1">نامشخص</p>}
                                                    </div>
                                                </div>
                                                <p className="font-sans text-sm flex flex-row mt-2"><b className="whitespace-nowrap mb-1 sm:m-0 pl-1">توضیحات : </b> {product.description.length === 0 ? "نامشخص" : product.description}</p>
                                            </section>
                                        </div>
                                        <hr/>
                                    </section>
                                )
                            })}
                        </section>
                        <section dir="ltr" className=" w-full flex justify-center py-4">
                            <Pagination size="large" color="primary" page={page} count={pagination && pagination.last || 1} onChange={(event , page)=> {
                                router.push(`/store/manage-products/insert?page=${page}&state=${router.query.state || ''}&name=${router.query.name || ""}&limit=${limit || 12}&order=${router.query.order || 'asc'}&category=${router.query.category || ""}&brand=${router.query.brand || ""}`)
                            }}/>
                        </section>
                    </>
                    )}


                </section>
            </div>
        </Layout>
    );
}
 
export default ManageStores;

export const getServerSideProps = async(ctx) => {
    // Check Permission
    const token =  new Cookies( ctx.req.headers.cookie).get("userToken");
    let ErrorCode = 0;
    if(!token) return{notFound : true}
    await axios.get("https://market-api.iran.liara.run/api/user", {headers : {Authorization : `Bearer ${token}`}})
    .then(({data}) =>  {
        if(data.user.account_type !== 'store') ErrorCode = 403;
        if(data.user.is_pending === true ) ErrorCode = 403;
    })
    .catch( () => ErrorCode = 403)
    if(ErrorCode === 403){
        return{notFound : true}
    }
    return { props : {}}
}