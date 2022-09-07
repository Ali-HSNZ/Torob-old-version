import Layout from "@/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Brands from "@/components/searchPage/aside/desk/Brands";
import Categories from "@/components/searchPage/aside/desk/Categories";
import Price from "@/components/searchPage/aside/desk/Price";
import Available from "@/components/searchPage/aside/desk/Available";
import { useState } from "react";
// import Styles from './index.module.css'
//? INdex Imports 


import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { toPersianDigits } from "@/utils/toPersianDigits";
import MobileBrands from "@/components/searchPage/aside/mobile/MobileBrands";
import Product from "@/components/searchPage/Product";
import MobileCategories from "@/components/searchPage/aside/mobile/MobileCategories";
import MobilePrice from "@/components/searchPage/aside/mobile/MobilePrice";
import MobileAvailable from "@/components/searchPage/aside/mobile/MobileAvailable";
import MobileSort from "@/components/searchPage/aside/mobile/MobileSort";

const SearchQuery = ({categories , similarCategories , brands , mainSearch , infinitProducts}) => {

    
    const [isFilterTaggle , setIsFilterTaggle] = useState(false)    
    const [currentFilter,setCurrentFilter] = useState("محبوب ترین")

    const {query} = useRouter()
    const router = useRouter()

    const {category , priceMin , priceMax , available} = query

// ? Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
// ! Menu

const [isMobileMenu , setIsMobileMenu] = useState("")

//* categories Path

const returnSubcategory = (name) => {
    if(category){
        if(similarCategories && similarCategories.name === name){
            return { 
                mainName : similarCategories.name, 
                text:"دسته های پیشنهادی",
                data : similarCategories.sub_categories
            }
        }
        if(!similarCategories.sub_categories.name){
            return{
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : category,
                text:"دسته های مشابه",
                data : [{name : "زیر دسته ایی وجود ندارد" , status : false}]

            }
        }
         else if(similarCategories && similarCategories.sub_categories.name === name){
            return {
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                text:"دسته های مشابه",
                data :  similarCategories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories
            }
        }else if(similarCategories && similarCategories.sub_categories.sub_categories.name === name){
            return {
                type : "sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text:"دسته‌بندی دقیق‌تر",
                data :  similarCategories.sub_categories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories.sub_categories
            }
        }

        const sub_sub_sub =  similarCategories.sub_categories.sub_categories.sub_categories  && similarCategories.sub_categories.sub_categories.sub_categories.find(e => e.name === category)
        if(sub_sub_sub){
            return {
                type : "sub_sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text: "دسته‌بندی دقیق‌تر",
                data :  similarCategories.sub_categories.sub_categories.sub_categories 
            }
        }
        else if(!sub_sub_sub){
            return {
                type : "sub_sub_sub",
                mainName :  similarCategories.name,
                subName : similarCategories.sub_categories.name,
                sub_subName : similarCategories.sub_categories.sub_categories.name,
                text:"دسته های مشابه",
                data :  similarCategories.sub_categories.sub_categories 
            }
        }
    }
    return false
}
const mainName = returnSubcategory(category).mainName && returnSubcategory(category).mainName !== category ? returnSubcategory(category).mainName + " / " : "";
const subName = returnSubcategory(category).subName && returnSubcategory(category).subName !== category?  returnSubcategory(category).subName  + " / "  : "";
const sub_subName = returnSubcategory(category).sub_subName && returnSubcategory(category).sub_subName !== category ? returnSubcategory(category).sub_subName  + " / "  : "";

// ! categories Path 


    return (  
                <Layout>
                    <div className={`w-full h-full fixed bg-[#00000018] inset-0  z-30  ${isFilterTaggle ? "" : "hidden"}`} onClick={()=> setIsFilterTaggle(false)}></div>
                    <div className={`w-full h-full fixed bg-[#0000002d] inset-0  z-30  ${isMobileMenu.length > 0 ? "" : "hidden"}`} onClick={()=> setIsMobileMenu('')}></div>
  
                    <div className="w-full flex flex-col lg:flex-row  justify-between ">
                        
                        <aside className="hidden lg:flex min-w-[350px] max-w-[400px]  bg-white h-screen flex-col sticky top-0 bottom-0 overflow-y-auto">
                            {brands && brands.length > 0 && <Brands brands={brands}/>}
                            <hr />
                             <Categories query={query} categories={categories} similarCategories={similarCategories}/>
                            <hr />  
                            <Price query={query}/>
                            <hr />
                            <Available query={query}/>
                        </aside>

                        {/* //? Aside */}
                        <aside className="overflow-x-auto whitespace-nowrap flex flex-nowrap w-full lg:hidden gap-x-6 bg-[#ececec] py-3 relative px-8">
                           {brands && brands.length > 0 && (
                             <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("brands")}>
                                برند
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                           )}
                            { isMobileMenu === "brands" && <MobileBrands brands={brands} closeHandler={()=> setIsMobileMenu("")}/>}

                            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("category")}>
                                دسته‌بندی
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            { isMobileMenu === "category" && <MobileCategories categories={categories} similarCategories={similarCategories} query={query} closeHandler={()=> setIsMobileMenu("")}/>}

                            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("price")}>
                                قیمت    
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            { isMobileMenu === "price" && <MobilePrice categories={categories} similarCategories={similarCategories} query={query} closeHandler={()=> setIsMobileMenu("")}/>}

                            <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("availableProducts")}>
                                وضعیت کالا    
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            { isMobileMenu === "availableProducts" && <MobileAvailable categories={categories} similarCategories={similarCategories} query={query} closeHandler={()=> setIsMobileMenu("")}/>}

                            <div className="max-w-fit py-2  cursor-pointer flex  md:hidden flex-col justify-end  items-end">
                                <button className="gap-x-1 flex justify-center text-sm items-center text-gray-700 font-sans" onClick={()=> setIsMobileMenu("mobileSort")}>
                                    مرتب سازی     
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                                {isMobileMenu === "mobileSort" && <MobileSort closeHandler={()=>setIsMobileMenu("")}/>}
                            </div>
                        </aside>

                        <section className="w-full flex-0 h-max px-4 "> 
                            {/* //? BreadCrump & Sort */}
                            <div className={`w-full flex ${category ? " justify-between" : "justify-end"}   z-10 relative items-center`}>
                            {/* //? BreadCrump */}
                                {category && <p className="font-sans py-4 text-xs text-gray-500">همه دسته ها / {`${mainName} ${subName}  ${sub_subName} ${sub_subName === category  ? "" : " / ",category}`}</p>}
                            {/* //? Sort */}
                                <div className="max-w-fit py-2  cursor-pointer hidden  md:flex flex-col justify-end  items-end">
                                
                                    <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} className="font-sans  text-sm text-gray-600 rounded-md">
                                        {currentFilter}
                                        <svg  className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </Button>
                                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                        <div className="flex flex-col  py-1">
                                            <section  onClick={() => router.push({pathname : '/search' , query : {...query , sort : "mostFavorite"}}) &  handleClose() & setCurrentFilter("محبوب‌ ترین")}>
                                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">محبوب‌ ترین</p>
                                            </section>

                                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "dateRecent"}}) & handleClose() & setCurrentFilter("جدید ترین")}>
                                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">جدید ترین</p>
                                            </section>

                                            <section onClick={() =>  router.push({pathname : '/search' , query : {...query , sort : "priceMin"}}) & handleClose() & setCurrentFilter("ارزان ترین")}>
                                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">ارزان ترین</p>
                                            </section>

                                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "priceMax"}}) & handleClose() & setCurrentFilter("گران ترین")}>
                                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">گران ترین</p>
                                            </section>
                                        </div>

                                    </Menu>
                                </div>

                            </div>

                            <hr/>

                            {/* //? Tags */}

                            <section className="overflow-x-auto py-4 flex gap-x-4 flex-nowrap whitespace-nowrap">
                                {query.category && (
                                    <div onClick={()=> {delete query.category ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                                            {query.category}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                    </div>
                                )}

                                {priceMin && priceMax && (
                                    <div onClick={()=> {delete query.priceMin ; delete query.priceMax ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                                        از {toPersianDigits(priceMin)} تا {toPersianDigits(priceMax)}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )} 
                              

                                {query.available && (
                                     <div  onClick={()=> {delete query.available ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                                        نمایش کالاهای موجود
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                                {query.brand && (
                                     <div  onClick={()=> {delete query.brand ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                                        {query.brand}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}

                                 {query.sort && (
                                     <div  onClick={()=> {delete query.sort ; router.push({pathname : "/search" , query : {...query}})}} className="bg-white text-xs font-sans rounded-full py-2 px-3 max-w-fit flex gap-x-3 cursor-pointer text-gray-700">
                                        {query.sort === "mostFavorite" && "محبوب‌ ترین"}
                                        {query.sort === "dateRecent" && "جدید ترین"}
                                        {query.sort === "priceMin" && "ارزان ترین"}
                                        {query.sort === "priceMax" && "گران ترین"}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                            </section>
                                    

                            {/* //? Products */}
                            <article>
                                   {mainSearch.data.products.length > 0 &&  <Product data={mainSearch.data.products} query={query}/>}
                                    {mainSearch.data.products.length === 0 && <p className="mt-4 text-center font-sans text-sm text-gray-600">گشتم نبود نگرد نیست.</p>}
                            </article>

                        </section>
                    </div>
                </Layout>
    );
}


export default SearchQuery;

export  async function getServerSideProps({query}) {
    const {
        query : productName, 
        fromPrice, 
        toPrice, 
        category,
        available,
        sort,
        brand
    } = query;

    const {data : categories} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/search?q=${productName}`)).then(res => res.data)
    const brands  = category &&  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/categories/${category}/brands`)).then(res => res.data)
    const similarCategories  = category &&  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/categories/${category}/sub`)).then(res => res.data)
    
    const mainSearch = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/search?${productName?"&q="+productName:""}&perPage=10&page=1${brand ? "&brand="+brand : ""}${available ? "&available="+brand : ""}${category ? "&category="+category : ""}${sort ? `&sort=${sort}` : "" }${fromPrice ? "&fromPrice="+fromPrice : ""}${toPrice ? "&toPrice="+toPrice : ""}`))

    return {
      props: {
        categories : categories ? categories : null,
        brands : brands ? brands.data : null,
        similarCategories : similarCategories ? similarCategories.data : null ,
        // infinitProducts : infinitProducts,
        mainSearch : mainSearch ? mainSearch.data : null  
      }
    }
  }