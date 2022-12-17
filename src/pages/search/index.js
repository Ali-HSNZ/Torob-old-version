import Layout from "@/layout/Layout";
import axios from "axios";
import Cookies from 'universal-cookie';
import { useState } from "react";
import { useRouter } from "next/router";
import Brands from "@/components/searchPage/aside/desk/Brands";
import Categories from "@/components/searchPage/aside/desk/Categories";
import Price from "@/components/searchPage/aside/desk/Price";
import Available from "@/components/searchPage/aside/desk/Available";
import Product from "@/components/searchPage/Product";
import MainMenu from "@/components/searchPage/main/Menu";
import BreadCrumpAndSort from "@/components/searchPage/main/BreadCrumpAndSort";
import MainTags from "@/components/searchPage/main/Tags";
import { removeHyphen } from "@/utils/global";

const SearchQuery = ({categories , similarCategories , brands , mainSearch}) => {
    const [isFilterTaggle , setIsFilterTaggle] = useState(false)    
    const {query} = useRouter()
    const {category , priceMin , priceMax} = query
    
    return (  
        <Layout pageTitle={"ترب | بهترین قیمت بازار"}>
            <div className={`w-full h-full fixed bg-[#00000018] inset-0  z-30  ${isFilterTaggle ? "" : "hidden"}`} onClick={()=> setIsFilterTaggle(false)}></div>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                
                <aside className="hidden lg:flex min-w-[350px] max-w-[400px]  bg-white h-screen flex-col sticky top-0 bottom-0 overflow-y-auto">
                    {brands && <Brands brands={brands}/>}
                    <hr />
                    {mainSearch && mainSearch.categories && <Categories categories={mainSearch.categories || null} similarCategories={similarCategories}/>}
                    <hr />  
                    <Price price={mainSearch && mainSearch.price_range || null}/>
                    <hr />
                    <Available/>
                </aside>

                <MainMenu price={mainSearch && mainSearch.price_range || null} brands={brands} categories={mainSearch && mainSearch.categories || null} similarCategories={similarCategories}/>

                <section className="w-full flex-0 h-max px-4 "> 
                    <BreadCrumpAndSort category={category} similarCategories={similarCategories && similarCategories.data.data}/>
                    <hr/>
                    <MainTags priceMin={priceMin} priceMax={priceMax}/>                               
                    {!query.query && query.category && <p className="font-sans font-bold text-md lg:text-lg  text-gray-800"> قیمت انواع {removeHyphen(query.category)} </p>}
                    <article>
                        {mainSearch && mainSearch.products && <Product data={mainSearch.products} query={query}/>}
                        {!mainSearch && <p className="mt-4 text-center font-sans text-sm text-gray-600">کالایی با این مشخصات یافت نشد.</p>}
                    </article>
                </section>
            </div>
        </Layout>
    );
}
export default SearchQuery;


export  async function getServerSideProps(ctx){
    if(!ctx.query.category && !ctx.query.brand && !ctx.query.query){
        return {notFound : true};
    }
    const {query : productName , price_from , price_to , category , available , sort , brand } = ctx.query;
    const token = new Cookies(ctx.req.headers.cookie).get("userToken");
    const categories =  await axios.get(encodeURI(`https://market-api.iran.liara.run/api/public/search?q=${productName}`)).then(res => res.data)
    const brands  =   await axios.get(encodeURI(`https://market-api.iran.liara.run/api/public/brands`)).then(res => res.data)
    const similarCategories  = category &&  await axios.get(encodeURI(`https://market-api.iran.liara.run/api/public/categories/${category}/sub`)).then(res => res.data)
    const mainSearch =  await axios.get(encodeURI(`https://market-api.iran.liara.run/api/public/search${productName?"?q="+productName:""}
                                                                                                                                                                              &limit=10
                                                                                                                                                                              &page=1
                                                                                                                                                                              ${brand ? "&brand="+brand : ""}
                                                                                                                                                                              ${available ? "&available="+available : ""}
                                                                                                                                                                              ${category ? "&category="+category : ""}
                                                                                                                                                                              ${sort ? `&sort=${sort}` : "" }
                                                                                                                                                                              ${price_from ? "&price_from="+price_from : ""}
                                                                                                                                                                              ${price_to ? "&price_to="+price_to : ""}`)
                                                                                                                                                                              ).then(res =>res.data).catch(err => console.log("OKKggggggggggggggggggggggggggggggggggggggggKKKKKK : ",err.response))
    return {     
        props: {
            categories : categories.data || [],
            brands : brands && brands.data ||null,
            similarCategories : similarCategories  || null ,
            mainSearch : mainSearch && mainSearch.data || null
        }
    }
}