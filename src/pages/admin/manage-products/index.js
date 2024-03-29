import Layout from "@/layout/Layout";
import { Modal, Pagination } from "@mui/material";
import { useState } from "react";
import AdminPageAside from "@/components/Panel_Menu/AdminPanelMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { admin_fetchCategoriesFailure, admin_fetchCategoriesSuccess, fetchBrandsFailure, fetchBrandsSuccess, fetchProducts, fetchProductsRequest } from "@/redux/admin/admin_manageProducts/admin_manageProductsActions";
import * as Yup from 'yup'
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import Warning from "@/common/alert/Warning";
import SelectBox from "@/common/SelectBox";
import FormikInput from "@/common/FormikInput";
import SelectBox_withoutSearch from "@/common/SelectBox_withoutSearch";
import { buttonClassName, linkClassName, substringHandler } from "@/utils/global";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";


const ManageProduct = () => {
     const router = useRouter()
     
     const [isAsideModal , setIsAsideModal] = useState(false)

     const allState = [
          {id : 1 , type : "all" , name:"نمایش همه وضعیت ها" },
          {id : 2 , type : "trashed" , name:"حذف شده‌ها"},
          {id : 3 , type : "active" , name:"تایید شده‌ها"},
     ]

     const [status , setStatus] = useState(allState[0])

     const {loading,products,pagination} = useSelector(state => state.admin_products.products)
     const {brands} = useSelector(state => state.admin_products.brands)
     const {categories} = useSelector(state => state.admin_products.categories)

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
     const limit = 12

     const returnState = type => allState.find(state => state.type === type);

     const rotateChevron = (button) => {
          const svg = button.children[0];
          if(document){
               if(svg.classList.contains('rotate-90')){
                    svg.classList.remove("rotate-90")
                    svg.classList.add("rotate-0")
               }else{
                    svg.classList.remove("rotate-0")
                    svg.classList.add("rotate-90")
               }
          }
     }
     
     useEffect(()=> {
          window.scroll({top : 0 , behavior : 'smooth'})
          setStatus(router.query.state ? returnState(router.query.state) : allState[0])
          dispatch(fetchProducts(router.query))
     },[router.query])

     const onSubmit = ({ product_title ,barcode,order}) => {
          router.push(`/admin/manage-products?page=1&state=${status.type || "all"}&barcode=${barcode || ""}&order=${order || 'asc'}&category=${selectedCategory && selectedCategory.id || ""}&brand=${selectedBrand && selectedBrand.id || ""}&name=${product_title || ""}&limit=${limit}`)
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
          <Layout isFooter={true} pageTitle={"پنل مدیریت | مدیریت کالاها"}>
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <AdminPageAside/>

                    <section className="w-full lg:w-4/5 flex-0 h-max px-3 sm:px-4 "> 
                         <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                              <><AdminPageAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                         </Modal>

                         <div className="flex justify-between w-full items-center mt-4">
                              <div className="flex items-center">
                                   <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                   </button>
                                   <h1 className="font-iranyekan-bold text-lg text-gray-800">مدیریت کالاها</h1>
                              </div>
                              <nav className="flex gap-x-2 items-center">
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
                              </nav>
                         </div>
                         <form onSubmit={formik.handleSubmit} className="w-full p-4 bg-white mt-3 rounded-lg shadow-md">
                              <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                   <FormikInput formik={formik} placeholder={"بر اساس نام محصول"} title={"نام کالا"} name={"product_title"} parentClassName={"flex flex-col relative"}/>

                                   <div className="flex flex-col relative">
                                        <p className="font-iranyekan-regular text-sm text-gray-800"> برند :</p>
                                        <div className="w-full mt-2">
                                             <SelectBox notFoundTitle="برند مورد نظر یافت نشد."  query={brandQuery} setQuery={setBrandQuery} filteredData={filteredBrands} selected={selectedBrand} setSelected={setSelectedBrand}/>
                                        </div>
                                   </div>

                                   <div className="flex flex-col relative">
                                        <p className="font-iranyekan-regular text-sm text-gray-800"> دسته‌بندی :</p>
                                        <div className="w-full mt-2">
                                             <SelectBox notFoundTitle="دسته مورد نظر یافت نشد."  query={categoryQuery} setQuery={setCategoryQuery} filteredData={filteredCategories} selected={selectedCategory} setSelected={setSelectedCategory}/>
                                        </div>
                                   </div>

                                   <FormikInput formik={formik} placeholder={"بر اساس بارکد محصول"} title={"بارکد"} name={"barcode"} parentClassName={"flex flex-col relative"}/>

                                   <div className="flex flex-col relative">
                                        <p className="font-iranyekan-regular text-sm">ترتیب نمایش (تاریخ ثبت) :</p>
                                        <section className="flex justify-between mt-2 gap-x-2">
                                             <div className="flex w-1/2">
                                                  <input type="radio" value={'desc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'desc'} className="peer hidden" id="desc" />
                                                  <label htmlFor="desc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-iranyekan-regular text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">جدیدترین</label>
                                             </div>
                                             <div className="flex w-1/2">
                                                  <input type="radio" value={'asc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'asc'} className="peer hidden" id="asc" />
                                                  <label htmlFor="asc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-iranyekan-regular text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">قدیمی‌ترین</label>
                                             </div>
                                        </section>
                                   </div>
                                   
                                   <div className="flex flex-col relative">
                                        <p className="font-iranyekan-regular text-sm">وضعیت :</p>
                                        <SelectBox_withoutSearch selected={status} setSelected={setStatus} data={allState}/>
                                   </div>

                              </section>
                              <div className="w-full flex items-center justify-end mt-3">
                                   <button type={"submit"} className={buttonClassName({bgColor : "blue" , isValid : formik.isValid , isOutline : false})}>جستجو</button>
                              </div>
                         </form>

                         {loading && (
                         <div className="w-full flex justify-center my-8">
                              <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                         </div>
                         )}
                         {!products && !loading && <Warning text={'کالا یافت نشد! میتوانید کالای جدیدی ثبت کنید.'}/>}
                         {products && (
                         <>
                              <section className="rounded-md overflow-hidden w-full mt-3  shadow-md flex flex-col">
                              {/* Product Image Modal */}
                              <Modal open={isImage_Modal} onClose={() => setIsImage_Modal(false)} className="p-4 h-full w-full flex justify-center items-center">
                                        <section className=" bg-white sm:w-1/2 h-1/2 rounded-md  flex justify-center items-center p-4 relative">
                                             <img alt="تصویر کالا" className="max-h-full w-auto" src={modal_imageSrc}/>
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
                                                       <input  type={"checkbox"}  id={`detail_${product.id}`} className="peer hidden"/>
                                                       <section className=" flex flex-col sm:flex-row items-center  justify-between">
                                                            <div className=" h-full min-w-[150px]   max-w-[150px]  sm:max-w-[100px] sm:min-w-[100px]">
                                                                 <img alt="تصویر کالا" onClick={()=> {product.is_image_url && setIsImage_Modal(true) ; setModal_imageSrc(product.image_url)}} className="w-full h-auto" src={product.image_url}/>
                                                            </div>
                                                            <div className="w-full flex justify-start flex-col pr-4 gap-y-3 mt-4 sm:mt-0">
                                                                 <p className="font-iranyekan-regular leading-6 text-sm text-gray-800">
                                                                      <b className="whitespace-nowrap">عنوان کالا : </b>
                                                                      {substringHandler({title : product.title , count : 35})} 
                                                                 </p>
                                                                 <p className="font-iranyekan-regular leading-6 text-sm text-gray-800 ">
                                                                      <b className="whitespace-nowrap">برند : </b> 
                                                                      {substringHandler({title : product.brand.name , count : 35})}
                                                                 </p>
                                                                 <div className="font-iranyekan-regular leading-6 flex text-sm w-full">
                                                                      <b className="whitespace-nowrap pl-1 text-gray-800">دسته‌بندی : </b>
                                                                      <div>{product.categories.map((category,index) => <span key={index} className=" font-iranyekan-regular text-sm text-gray-800">{index >0 && " / "}{category.name}</span>)}</div>
                                                                 </div>
                                                            </div>
                                                            <div className="flex justify-between w-full mt-4 sm:m-0 sm:w-fit  sm:justify-end gap-x-4">
                                                                 <div className=" flex items-center">
                                                                      {!product.is_show &&<p className="whitespace-nowrap font-iranyekan-regular text-sm bg-red-50 text-red-600 rounded-md px-3 py-1">حذف شده</p>}
                                                                 </div>
                                                                 <div className="flex items-center ">
                                                                      <label onClick={button => rotateChevron(button.currentTarget)} htmlFor={`detail_${product.id}`} className="p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-90 duration-100 w-5 h-5 text-gray-700 peer-checked:rota">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                           </svg>
                                                                      </label>
                                                                 </div>
                                                            </div>
                                                       </section>
                                                       {/* Description */}
                                                       <section className="w-full bg-gray-50 rounded-md mt-4 peer-checked:flex flex-col hidden flex-wrap gap-y-2 p-4 pb-0">
                                                                 <p className="font-iranyekan-regular text-sm flex text-gray-800">
                                                                      <b className="whitespace-nowrap mb-1 sm:m-0 pl-1 ">عنوان : </b>
                                                                      {product.title || "-"}
                                                                 </p>
                                                            <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                                 <div className="font-iranyekan-regular text-sm   flex ">
                                                                      <b className="whitespace-nowrap mb-1 sm:m-0 pl-1 text-gray-800">دسته‌بندی : </b>
                                                                      <div>{product.categories.map((category,index) => <span key={index} className="font-iranyekan-regular text-sm text-gray-800">{index >0 && " / "}{category.name}</span>)}</div>
                                                                 </div>
                                                                 <p className="font-iranyekan-regular text-sm flex text-gray-800">
                                                                      <b className="whitespace-nowrap mb-1 sm:m-0 pl-1 ">برند : </b>
                                                                      {product.brand.name || "-" }
                                                                 </p>
                                                                 <p className="font-iranyekan-regular text-sm flex text-gray-800">
                                                                      <b className="whitespace-nowrap mb-1 sm:m-0 pl-1">بارکد : </b>
                                                                      {product.barcode || "-"}
                                                                 </p>
                                                                 {/* Logo */}
                                                                 <div className="flex">
                                                                      <b className="font-iranyekan-regular text-sm pl-1 text-gray-800">تصویر اصلی کالا : </b>
                                                                      {product.is_image_url ? (
                                                                           <button onClick={()=> {setIsImage_Modal(true) ; setModal_imageSrc(product.image_url)}} className="hover:text-red-600 font-iranyekan-regular text-sm text-blue-600 underline">نمایش تصویر</button>                                                                    
                                                                      ) : <p className="font-iranyekan-regular text-sm mr-1 text-gray-800">-</p>}
                                                                 </div>
                                                            </div>
                                                            <p className="font-iranyekan-regular w-full mt-2 text-sm flex text-gray-800">
                                                                 <b className="whitespace-nowrap mb-1 sm:m-0  pl-2">توضیحات : </b>
                                                                 {product.description || "-"}
                                                            </p>
                                                            <div className="font-iranyekan-regular w-full mt-2 text-sm flex items-start">
                                                                 <b className="whitespace-nowrap sm:m-0 pl-1 text-gray-800">کلیدواژه : </b>
                                                                 {product?.tags?.length === 0 && <p className="font-iranyekan-regular text-sm text-gray-800 mr-1">-</p>}
                                                                 <div className="mr-1 w-full flex flex-wrap gap-x-2 leading-5">
                                                                      {product.tags.map((item,index) => (
                                                                           <>
                                                                                {index > 0 && <span className="font-iranyekan-regular text-sm text-gray-800">|</span>}
                                                                                <span className="font-iranyekan-regular text-sm text-gray-800">{item}</span>
                                                                           </>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                            <div className="flex justify-end w-full mt-4 mb-4">
                                                                 <Link href={`/admin/manage-products/edit/${product.id}`} >
                                                                      <a className={linkClassName({bgColor : "blue" , isOutline : true})}>ویرایش</a>
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
                                        router.push(`/admin/manage-products?page=${page}&state=${router.query.state || 'all'}&name=${router.query.name || ""}&limit=${limit || 12}&order=${router.query.order || 'desc'}&category=${router.query.category || ""}&brand=${router.query.brand || ""}`)
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {

     // Check Permission
     const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
     
     let ErrorCode = 0;
     if(token.includes("undefined")) return {notFound : true}

     // Fetch User Data     
     await http.get("user", {headers : {authorization : token}})
     .then(({data}) =>  {
          if(data.user.account_type !== 'admin') ErrorCode = 403; 
          else {
               dispatch(cartDetails(data))
               dispatch(authSuccess(data.user))
          }
     })  
     .catch(() => {
          ErrorCode = 403
          dispatch(authFailure("خطا در بخش احراز هویت"))    
     })

     if(ErrorCode === 403){return{notFound : true}}

     // Fetch SearchBar Data With User Token
     await http.get(`public/searchbar`,{headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
     .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
     
     // Dispatch This For Showing Loading
     dispatch(fetchProductsRequest())

     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
     
     // Fetch Brands
     await http.get(`admin/brands` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchBrandsSuccess(data)))
     .catch(error => dispatch(fetchBrandsFailure("خطا در بخش گرفتن لیست برندها")))

     // Fetch Categories
     await http.get(`admin/categories?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(admin_fetchCategoriesSuccess(data)))
     .catch(error => dispatch(admin_fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته‌بندی")))

})