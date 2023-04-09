import Layout from "@/layout/Layout";
import { Modal , Pagination} from "@mui/material";
import { useEffect, useState } from "react";
import ManageStoreAside from "@/components/manageStore/storeAside";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import http, { returnTokenInServerSide } from "src/services/http";
import { useFormik } from "formik";
import * as Yup from 'yup'
import FormikInput from "@/common/FormikInput";
import { buttonClassName } from "@/utils/global";
import SelectBox_withoutSearch from "@/common/SelectBox_withoutSearch";
import SelectBox from "@/common/SelectBox";
import { store_changeInvoiceState, store_fetchFactors, store_fetchFactorsFailure, store_fetchFactorsRequest, store_fetchFactorsSuccess } from "@/redux/manage-store/manageFactors/manageFactors_actions";
import { useSelector , useDispatch} from "react-redux";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import { fetchBrandsFailure, fetchBrandsSuccess, store_fetchCategoriesFailure, store_fetchCategoriesSuccess } from "@/redux/manage-store/manageStore/manageStore_actions";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import Warning from "@/common/alert/Warning";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";


const ManageFactors = () => {
     const [isAsideModal , setIsAsideModal] = useState(false)
     const {brands} = useSelector(state => state.manage_store.brands)
     const {categories} = useSelector(state => state.manage_store.categories)
     const {factors , loading , actionLoading} = useSelector(state => state.store_factor);
     const dispatch = useDispatch()
     const [comment , setComment] = useState(null)
     
     const handleInputChange = input => setComment({...comment ,  [input.target.name] : input.target.value})
     
     const router= useRouter()
     const page = Number(router.query.page || 1);
     const limit = 5

     const allState = [
          {type : "all" , name:"نمایش همه وضعیت ها"},
          {type : "pending" , name:"در حال بررسی"},
          {type : "accepted" , name:"تایید شده‌"},
          {type : "rejected" , name:"رد شده"},
          {type : "sending" , name:"در حال ارسال"},
          {type : "finished" , name:"ارسال شده"},
          {type : "canceled" , name:"کنسل شده (توسط کاربر)"},
     ]
     const returnState = (type) => allState.find(state => state.type === type);
     const [status , setStatus] = useState(allState[0])

     const isActionLoading = id =>  actionLoading.includes(id);


     const [selectedCategory, setSelectedCategory] = useState("")
     const [categoryQuery, setCategoryQuery] = useState("")

     const [selectedBrand, setSelectedBrand] = useState('')
     const [brandQuery, setBrandQuery] = useState('')
     
     const filteredCategories = categoryQuery === '' ? categories : categories && categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery.toLocaleLowerCase().replace(/\s+/g, '')))
     const filteredBrands = brandQuery === '' ? brands : brands.filter((brand) => brand.name.toLowerCase().replace(/\s+/g, '').includes(brandQuery.toLocaleLowerCase().replace(/\s+/g, '')))

         
    useEffect(()=> {
          window.scroll({top : 0 , behavior : 'smooth'})
          setStatus(router.query.state ? returnState(router.query.state) : allState[0])
          dispatch(store_fetchFactors(router.query))
      },[router])

     
     const onSubmit = ({title , name , number , order , tracking_number , bill_number}) => {
        router.push(encodeURI(`/store/manage-factors?page=1&state=${status.type || "all"}&title=${title || ""}&order=${order || 'desc'}&category=${selectedCategory && selectedCategory.id || ""}&brand=${selectedBrand && selectedBrand.id || ""}&name=${name || ""}&tracking_number=${tracking_number || ""}&bill_number=${bill_number || ""}&number=${number || ""}&limit=${limit}` ))
     } 

    const validationSchema = Yup.object({
        title : Yup.string()
            .min(2 , 'نام کالا نمی تواند کمتر از ۲ نویسه باشد')
            .max(250 , 'نام کالا نمی تواند بیشتر از ۲۵۰ نویسه باشد')
            .trim(),
        name : Yup.string()
            .min(2 , 'نام  نمی تواند کمتر از ۲ نویسه باشد')
            .max(250 , 'نام  نمی تواند بیشتر از ۲۵۰ نویسه باشد')
            .trim(),
        number : Yup.string()
            .min(3,"شماره موبایل  نمی تواند کم تر از ۳ رقم باشد")
            .max(11 , "شماره موبایل  نمی تواند بیشر از ۱۱ رقم باشد")
            .matches(/^[0-9]{3,}\d*$/,"شماره موبایل  معتبر نیست")
            .trim(),
        tracking_number : Yup.string()
            .min(2,"کد رهگیری نمی تواند کم تر از ۲ رقم باشد")
            .matches(/^[0-9]{2,}\d*$/,"کد رهگیری معتبر نیست")
            .trim(),
        bill_number : Yup.string()
            .min(2,"شماره فاکتور  نمی تواند کم تر از ۲ رقم باشد")
            .matches(/^[0-9]{2,}\d*$/,"شماره فاکتور  معتبر نیست")
            .trim(),
    })

     const formik = useFormik({
          initialValues : {
               order : "desc",
               title : router.query.title || "",
               name : router.query.name || "",
               number : router.query.number || "",
               tracking_number : router.query.tracking_number || '',
               bill_number : router.query.bill_number || '',
          },
          onSubmit,
          validateOnMount : true,
          enableReinitialize : true,
          validationSchema
     })

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
     
     return (  
          <Layout isFooter={true} pageTitle="پنل فروشگاه | مدیریت سفارشات">
               <div className="w-full flex flex-col lg:flex-row  justify-between ">
                    <ManageStoreAside/>
                         
                    <section className="w-full lg:w-4/5 flex-0 h-max px-4 "> 
                         <Modal open={isAsideModal} onClose={()=>setIsAsideModal(false)} className="lg:hidden">
                              <><ManageStoreAside isMobileScreen={true} setIsMobileScreen={setIsAsideModal} mobileScreenClassName={'sm:w-1/3 w-full'}/></>
                         </Modal>
                         <div className="flex justify-between w-full items-center mt-4">
                              <div className="flex items-center">
                                   <button onClick={() => setIsAsideModal(!isAsideModal)} className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" > 
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                   </button>
                                   <h1 className="font-iranyekan-bold text-lg text-gray-800">مدیریت سفارشات</h1>
                              </div>
                              <nav className="flex gap-x-2 my-2 sm:m-0 justify-end  sm:items-center">
                                   {/* Refresh */}
                                   <Link href={{pathname:"/store/manage-factors"}}>
                                        <a className="items-center hover:bg-red-200 bg-red-100 flex border border-red-800 text-red-800 rounded-md py-2  px-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                             </svg>
                                        </a>
                                   </Link>
                                   {/* Home */}
                                   <Link href={'/store'}>
                                        <a className=" items-center hover:bg-blue-200 bg-blue-100 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                             </svg>
                                        </a>
                                   </Link>
                              </nav>
                         </div>
                         <form onSubmit={formik.handleSubmit}>
                              <section className="w-full p-4 bg-white mt-4 rounded-lg shadow-md">
                                   <section className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                        <FormikInput  formik={formik} title={"نام کالا"} name={"title"}/>
                                        <FormikInput formik={formik} title={"نام خریدار"} name={"name"}/>
                                        <FormikInput formik={formik} title={"شماره موبایل خریدار"} name={"number"}/>
                                        <FormikInput formik={formik} title={"کد رهگیری"} name={"tracking_number"}/>
                                        <FormikInput formik={formik} title={"شماره فاکتور"} name={"bill_number"}/>

                                        <div className="flex flex-col relative">
                                             <p className="font-iranyekan-regular text-xs md:text-sm text-gray-800"> برند :</p>
                                             <div className="w-full mt-2">
                                                  <SelectBox notFoundTitle="برند مورد نظر یافت نشد." query={brandQuery} setQuery={setBrandQuery} filteredData={filteredBrands} selected={selectedBrand} setSelected={setSelectedBrand}/>
                                             </div>
                                        </div>

                                        <div className="flex flex-col relative">
                                             <p className="font-iranyekan-regular text-xs md:text-sm text-gray-800"> دسته‌بندی :</p>
                                             <div className="w-full mt-2">
                                                  <SelectBox notFoundTitle="دسته مورد نظر یافت نشد." query={categoryQuery} setQuery={setCategoryQuery} filteredData={filteredCategories} selected={selectedCategory} setSelected={setSelectedCategory}/>
                                             </div>
                                        </div>


                                        <div className="flex flex-col relative">
                                             <p className="font-iranyekan-regular text-xs md:text-sm text-gray-800">ترتیب نمایش (تاریخ ثبت) :</p>
                                             <section className="flex justify-between mt-2 gap-x-2">
                                                  <div className="flex w-1/2">
                                                       <input type="radio" value={'desc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'desc'} className="peer hidden" id="desc" />
                                                       <label htmlFor="desc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-iranyekan-regular text-xs md:text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">جدیدترین</label>
                                                  </div>
                                                  <div className="flex w-1/2">
                                                       <input type="radio" value={'asc'} name="order" onChange={formik.handleChange} checked={formik.values.order === 'asc'} className="peer hidden" id="asc" />
                                                       <label htmlFor="asc" className=" text-gray-500 peer-checked:text-black peer-checked:border-gray-700 font-iranyekan-regular text-xs md:text-sm hover:border-gray-400 cursor-pointer rounded-md border border-gray-300 w-full py-2 px-3">قدیمی‌ترین</label>
                                                  </div>
                                             </section>
                                        </div>
                                        
                                        <div className="flex flex-col relative">
                                             <p className="font-iranyekan-regular text-xs md:text-sm text-gray-800">وضعیت :</p>
                                             <SelectBox_withoutSearch selected={status} setSelected={setStatus} data={allState}/>                                 
                                        </div>

                                   </section>
                                   <div className="w-full flex items-center justify-end mt-4">
                                        <button type={"submit"} className={buttonClassName({bgColor : "blue" , isValid : formik.isValid , isOutline : false})}>جستجو</button>
                                   </div>
                              </section>
                         </form>

                         {loading && (
                              <div className="w-full flex justify-center my-8">
                                   <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                              </div>
                         )}

                         {factors?.users?.length === 0 && !loading && <Warning text={'سفارشی یافت نشد!'}/>}

                         <section className="rounded-md overflow-hidden w-full mt-3  shadow-md flex flex-col">
                              {factors && factors.users.length > 0 &&  factors.users.map((factor,index) => (
                                   <section key={index}>
                                        <div className="p-4 bg-white w-full">
                                             <input  type={"checkbox"}  id={`mainDetail_${index}`} className="peer hidden"/>
                                             <section className=" flex  flex-col md:flex-row items-center  justify-between">
                                                  <div className="w-full  mr-4  mt-4 sm:mt-0">
                                                       <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-y-3">
                                                            <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800">
                                                                 <b className="whitespace-nowrap">نام و نام خانوادگی : </b>
                                                                 {factor.full_name}
                                                            </p>
                                                            <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 ">
                                                                 <b className="whitespace-nowrap">شماره موبایل : </b> 
                                                                 {factor.phone_number_primary}    
                                                            </p>
                                                            <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 ">
                                                                 <b className="whitespace-nowrap">استان : </b> 
                                                                 {factor.address.province || "-"}    
                                                            </p>
                                                            <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 ">
                                                                 <b className="whitespace-nowrap">شهر : </b> 
                                                                 {factor.address.city || "-"}    
                                                            </p>
                                                            <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 ">
                                                                 <b className="whitespace-nowrap">کد پستی : </b> 
                                                                 {factor.address.post_code || "-"}    
                                                            </p>
                                                       </div> 
                                                       <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 mt-2">
                                                            <b className="whitespace-nowrap">آدرس دقیق : </b> 
                                                            {factor.address.detail || "-"}    
                                                       </p>
                                                  </div>
                                                  
                                                  <div className="w-full gap-x-4 md:w-fit flex items-center mt-4 md:mt-0 justify-between md:justify-end">
                                                       <p className="whitespace-nowrap font-iranyekan-regular text-xs md:text-sm bg-gray-50 text-gray-600 rounded-md px-3 py-1">{toPersianPrice(factor.invoices.length)} فاکتور</p>
                                                       <label onClick={button => rotateChevron(button.currentTarget)} htmlFor={`mainDetail_${index}`} className=" p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-90 duration-100 w-5 h-5 text-gray-700 peer-checked:rota">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                       </label>
                                                  </div>
                                             </section>

                                             {/* Description */}

                                             <section className="w-full bg-gray-50 rounded-md mt-4 peer-checked:flex flex-col hidden flex-wrap gap-y-4 p-4 ">
                                                  {factor.invoices.length > 0 && factor.invoices.map((factor) => (
                                                       <article key={factor.id} className="flex flex-row items-center w-full">
                                                            <section  htmlFor={`main_checkbox1_${factor.id}`} className=" w-full bg-white p-4  rounded-lg border border-gray-300 shadow-md peer-checked:border-red-600">
                                                            {/* input */}
                                                                 <input  type={"checkbox"}  id={`itemDetail_${factor.id}`} className="peer hidden"/>
                                                                 <section className=" flex flex-col md:flex-row  justify-between">

                                                                      <div className="w-full  grid sm:grid-cols-2 xl:grid-cols-3 mr-4 gap-y-3 mt-4 sm:mt-0">
                                                                           <span className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800">
                                                                                <b className="whitespace-nowrap">شماره فاکتور : </b>
                                                                                {toPersianDigits(factor?.bill_number)}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800 ">
                                                                                <b className="whitespace-nowrap">قیمت کل فاکتور : </b> 
                                                                                {toPersianPrice(factor?.total_price)}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">مالیات کل فاکتور : </b>
                                                                                {toPersianDigits(factor?.total_tax)}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">تخفیف کل فاکتور : </b>
                                                                                {toPersianDigits(factor?.total_discount ) || "-"}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">کد رهگیری : </b>
                                                                                {toPersianDigits(factor?.tracking_number ) || "-"}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">تعداد محصولات : </b>
                                                                                {toPersianPrice(factor?.items_count) || "-"}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">زمان تحویل : </b>
                                                                                {toPersianPrice(factor.delivery_time) || "-"}
                                                                           </span>
                                                                           <span className="font-iranyekan-regular leading-6  text-xs md:text-sm w-full text-gray-800">
                                                                                <b className="whitespace-nowrap pl-1">نوع پرداخت : </b>
                                                                                {factor.payment_type || "-"}
                                                                           </span>
                                                                      </div>
                                                                      <div className="flex justify-between md:max-w-[217px] md:min-w-[217px]  md:justify-end mt-4 md:mt-0 items-center gap-x-4">
                                                                           <p className="whitespace-nowrap inline-block h-fit w-fit font-iranyekan-regular text-xs md:text-sm bg-gray-50 text-gray-600 rounded-md px-3 py-1">{factor.state_persian}</p>
                                                                           <label onClick={button => rotateChevron(button.currentTarget)} htmlFor={`itemDetail_${factor.id}`} className=" p-2 flex  items-center justify-center w-fit h-fit   hover:bg-gray-50 rounded-full cursor-pointer">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-90 duration-100 w-5 h-5 text-gray-700 peer-checked:rota">
                                                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                                </svg>
                                                                           </label>
                                                                      </div>
                                                                 </section>

                                                                 <div className="hidden mt-4 peer-checked:block">
                                                                      <section className="flex  flex-col gap-y-4 w-full items-center bg-gray-50 rounded-md p-4">
                                                                           {factor.items.length > 0 && factor.items.map((item,index) => (
                                                                                <div key={index} className="w-full p-4 rounded-md border border-gray-300 bg-white  flex-col sm:flex-row items-center  justify-between">
                                                                                     <article htmlFor={`item_checkbox_${factor.id}`} className="w-full  flex  flex-col sm:flex-row items-center  justify-between">
                                                                                          <div className=" h-full min-w-[150px]   max-w-[150px]  sm:max-w-[100px] sm:min-w-[100px]">
                                                                                               <img alt="تصویر کالا" className="w-full h-auto" src={item.product.image_url || ""}/>
                                                                                          </div>
                                                                                          <div className="w-full flex justify-start flex-col mr-4 gap-y-3 mt-4 sm:mt-0">
                                                                                               <p className="font-iranyekan-regular leading-6 text-xs md:text-sm text-gray-800">
                                                                                                    <b className="whitespace-nowrap">عنوان کالا : </b>
                                                                                                    {item.product.title}
                                                                                               </p>
                                                                                               <p className="font-iranyekan-regular leading-6 text-xs md:text-sm  text-gray-800">
                                                                                                    <b className="whitespace-nowrap">برند : </b> 
                                                                                                    {item.product.brand.name}
                                                                                               </p>
                                                                                               <div className="font-iranyekan-regular flex leading-6 text-xs md:text-sm  ">
                                                                                                    <b className="whitespace-nowrap text-gray-800">دسته بندی : </b> 
                                                                                                    <div>{item.product.categories.map((category,index) => <span key={index} className="text-gray-800 font-iranyekan-regular text-xs md:text-sm">{index >0 && " / "}{category.name}</span>)}</div>
                                                                                               </div>
                                                                                          </div>
                                                                                     </article>
                                                                                     <hr className="mt-4 bg-red-300"/>
                                                                                     <div className="mt-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                                                                                          <p className="font-iranyekan-regular leading-6 text-xs text-gray-800 md:text-sm ">
                                                                                               <b className="whitespace-nowrap">قیمت : </b>
                                                                                               {toPersianPrice(item.price) || "-"}
                                                                                          </p>
                                                                                          <p className="font-iranyekan-regular leading-6 text-xs text-gray-800 md:text-sm ">
                                                                                               <b className="whitespace-nowrap">تعداد : </b>
                                                                                               {toPersianPrice(item.count) || "-"}
                                                                                          </p>
                                                                                          <p className="font-iranyekan-regular leading-6 text-xs text-gray-800 md:text-sm ">
                                                                                               <b className="whitespace-nowrap">تخفیف : </b>
                                                                                               {toPersianPrice(item.discount) || "-"}
                                                                                          </p>
                                                                                     </div>
                                                                                </div>
                                                                           ))}
                                                                      </section> 

                                                                      {factor.state === "canceled" ? (
                                                                           <div className="mt-4">
                                                                                <b className="font-iranyekan-regular text-xs md:text-sm text-gray-800">توضیحات خریدار : </b>
                                                                                <span className="font-iranyekan-regular text-xs md:text-sm text-gray-800">{factor.message || "-"}</span>
                                                                           </div>
                                                                      ) : factor.message.length > 0 ?(
                                                                           <div className="mt-4">
                                                                                <b className="font-iranyekan-regular text-xs md:text-sm text-gray-800">توضیحات فروشگاه : </b>
                                                                                <span className="font-iranyekan-regular text-xs md:text-sm text-gray-800">{factor.message || "-"}</span>
                                                                           </div>
                                                                      ) : null}

                                                                       {factor.state === "sending" || factor.state === "accepted"  || factor.state === "pending" ? (
                                                                           <textarea 
                                                                                name={factor.id} 
                                                                                disabled={factor.state === "finished" || factor.state === "rejected" || factor.state === "canceled"} 
                                                                                onChange={input => handleInputChange(input)} 
                                                                                className={`disabled:cursor-default disabled:hover:border-gray-300 border-gray-300 hover:border-gray-600  focus:border-gray-600 mt-4 w-full  focus:ring-0 text-xs md:text-sm  font-iranyekan-regular bg-white text-gray-800 rounded-md leading-8`}
                                                                           />
                                                                       ) : null}
                                                                 
                                                                      <section className="flex w-full items-center  justify-end gap-x-4 mt-4">
                                                                           {isActionLoading(factor.id) ? (
                                                                                     <ReactLoading type="spinningBubbles" height={26} width={26} color="red" />
                                                                           ) : (
                                                                                <>
                                                                                     {factor.state === "canceled" ? (
                                                                                          <p className="font-iranyekan-regular text-xs md:text-sm text-red-600">{factor.state_persian}</p>
                                                                                     ) : factor.state === "rejected" ? (
                                                                                          <p className="font-iranyekan-regular text-xs md:text-sm text-red-600">رد شده</p>
                                                                                     ) : factor.state === "accepted" ? (
                                                                                          <button onClick={() => dispatch(store_changeInvoiceState({comment , invoiceId : factor.id , state : "sending"}))} className={buttonClassName({bgColor : 'blue' , isValid : true , isOutline : true})}>در حال ارسال</button> 
                                                                                     ) :  factor.state === "sending" ? (
                                                                                          <button onClick={() => dispatch(store_changeInvoiceState({comment , invoiceId : factor.id , state : "finished"}))} className={buttonClassName({bgColor : 'blue' , isValid : true , isOutline : true})}>ارسال شده</button>
                                                                                     ) : factor.state === "finished" ?  (
                                                                                          <p className="font-iranyekan-regular text-xs md:text-sm text-green-600">ارسال شده</p>
                                                                                     ) : (
                                                                                          <>
                                                                                               <button onClick={() => dispatch(store_changeInvoiceState({comment , invoiceId : factor.id , state : "reject"}))} className={buttonClassName({bgColor : 'red' , isValid : true , isOutline : true})}>رد کردن</button>
                                                                                               <button  onClick={() => dispatch(store_changeInvoiceState({comment , invoiceId : factor.id , state : "accept"}))} className={buttonClassName({bgColor : 'green' , isValid : true , isOutline : true})}>تایید فاکتور</button>
                                                                                          </>
                                                                                     )}
                                                                                </>
                                                                           )}
                                                                      </section>
                                                                 </div>

                                                            </section>
                                                       </article>
                                                  ))}
                                             </section>
                                        </div>
                                        <hr/>
                                   </section>
                              ))}
                         </section>

                         {!loading && factors?.users?.length > 0 && <section dir="ltr" className=" w-full flex justify-center py-4">
                                <Pagination size="large" color="primary" page={page} count={factors?.pagination?.last || 1} onChange={(event , page)=> {
                                   router.push(`/store/manage-factors?page=${page || 1}&state=${router.query.state || 'all'}&number=${router.query.number || ""}&name=${router.query.name || ""}&limit=${limit || 5}&order=${router.query.order || 'desc'}&category=${router.query.category || ""}&brand=${router.query.brand || ""}&title=${router.query.title || ""}`)
                                }}/>
                         </section>}

                    </section>
               </div>
          </Layout>
     );
}
export default ManageFactors;

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {
     // Check Permission
     const token =  returnTokenInServerSide({cookie : ctx.req.headers.cookie});
     if(token.includes("undefined")) return {notFound : true}
          
     let ErrorCode = 0;

     if(!token.includes("undefined")){
          // Fetch User Data     
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) =>  {
               if(data.user.account_type !== 'store') ErrorCode = 403
               if(data.user.is_pending === true ) ErrorCode = 403;
               else {
                    dispatch(cartDetails(data))
                    dispatch(authSuccess(data.user))
               }
          })  
          .catch(() => {
               ErrorCode = 403
               dispatch(authFailure("خطا در بخش احراز هویت"))    
          })
     }
     if(ErrorCode === 403){return{notFound : true}}
          
     // Fetch SearchBar Data With User Token
     await http.get(`public/searchbar`,{headers : {authorization : token}})
     .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
     .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
     
     // dispatch Loading For Fetching Factors Data
     dispatch(store_fetchFactorsRequest())


     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))

     // Fetch Categories
     await http.get(`products/categories?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(store_fetchCategoriesSuccess(data)))
     .catch(error => dispatch(store_fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته‌بندی ها")))

     // Fetch Brands
     await http.get(`products/brands?list=1` , {headers : {authorization : token}})
     .then(({data}) => dispatch(fetchBrandsSuccess(data)))
     .catch(error => dispatch(fetchBrandsFailure("خطا در بخش گرفتن لیست برندها")))
})