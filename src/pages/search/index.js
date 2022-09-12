import Layout from "@/layout/Layout";
import axios from "axios";
import { useState } from "react";
import Router, { useRouter } from "next/router";

import Brands from "@/components/searchPage/aside/desk/Brands";
import Categories from "@/components/searchPage/aside/desk/Categories";
import Price from "@/components/searchPage/aside/desk/Price";
import Available from "@/components/searchPage/aside/desk/Available";
import Product from "@/components/searchPage/Product";
import MainMenu from "@/components/searchPage/main/Menu";
import BreadCrumpAndSort from "@/components/searchPage/main/BreadCrumpAndSort";
import MainTags from "@/components/searchPage/main/Tags";
import { useEffect } from "react";

const SearchQuery = ({categories , similarCategories , brands , mainSearch}) => {


    const [isFilterTaggle , setIsFilterTaggle] = useState(false)    

    const {query} = useRouter()
    const {category , priceMin , priceMax} = query
    return (  
                <Layout>
                    <div className={`w-full h-full fixed bg-[#00000018] inset-0  z-30  ${isFilterTaggle ? "" : "hidden"}`} onClick={()=> setIsFilterTaggle(false)}></div>
  
                    <div className="w-full flex flex-col lg:flex-row  justify-between ">
                        
                        <aside className="hidden lg:flex min-w-[350px] max-w-[400px]  bg-white h-screen flex-col sticky top-0 bottom-0 overflow-y-auto">
                            {brands && brands.length > 0 && <Brands brands={brands}/>}
                            <hr />
                             <Categories categories={categories} similarCategories={similarCategories}/>
                            <hr />  
                            <Price/>
                            <hr />
                            <Available/>
                        </aside>

                        <MainMenu brands={brands} categories={categories} similarCategories={similarCategories}/>

                        <section className="w-full flex-0 h-max px-4 "> 
                            <BreadCrumpAndSort category={category} similarCategories={similarCategories}/>
                            <hr/>
                            <MainTags priceMin={priceMin} priceMax={priceMax}/>                               
                            {!query.query && query.category && <p className="font-sans font-bold text-lg mt-4"> قیمت انواع {query.category} </p>}
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

    if(!query.category && !query.brand && !query.query){
        return {
            notFound : true,
        };
    }

    const {
        query : productName, 
        fromPrice, 
        toPrice, 
        category,
        available,
        sort,
        brand
    } = query;


    const categories =  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/search?q=${productName}`)).then(res => res.data)
    const brands  =  category &&  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/categories/${category}/brands`)).then(res => res.data)
    const similarCategories  = category &&  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/categories/${category}/sub`)).then(res => res.data)
    const mainSearch =  await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/search?${productName?"&q="+productName:""}&perPage=10&page=1${brand ? "&brand="+brand : ""}${available ? "&available="+brand : ""}${category ? "&category="+category : ""}${sort ? `&sort=${sort}` : "" }${fromPrice ? "&fromPrice="+fromPrice : ""}${toPrice ? "&toPrice="+toPrice : ""}`))



    return {
        
        props: {
            categories : categories ? categories.data : null,
            brands : brands ? brands.data : null,
            similarCategories : similarCategories ? similarCategories.data : null ,
            mainSearch : mainSearch ? mainSearch.data : null  
        }
        
    }
  }