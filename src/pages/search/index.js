import Layout from "@/layout/Layout";
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
import { wrapper } from "@/redux/store";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "@/redux/categories/categoriesActions";
import http, { returnTokenInServerSide } from "src/services/http";
import { authFailure, authSuccess } from "@/redux/user/userActions";
import { cartDetails } from "@/redux/cart/cart/cartActions";
import { fetchSearchDataFailure, fetchSearchDataSuccess } from "@/redux/userSearch/userSaerch_actions";

const SearchQuery = ({similarCategories , brands , mainSearch}) => {
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
                         {/* {!query.query && query.category && <p className="font-iranyekan-regular font-iranyekan-bold text-md lg:text-lg  text-gray-800"> قیمت انواع {removeHyphen(query.category)} </p>} */}
                         <article>
                         {mainSearch && <Product data={mainSearch.products} query={query}/>}
                         {!mainSearch && <p className="mt-4 text-center font-iranyekan-regular text-sm text-gray-600">کالایی با این مشخصات یافت نشد.</p>}
                         </article>
                    </section>
               </div>
          </Layout>
    );
}
export default SearchQuery;


export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query , req}) => {
     
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     
     if(!query.category && !query.brand && !query.query){
          return {notFound : true};
     }
     const {query : productName , price_from , price_to , category , available , sort , brand } = query;
     
     let mainSearch = null;

     if(!token.includes("undefined")){
          // Fetch User Data
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) => {
               dispatch(authSuccess(data.user))
               dispatch(cartDetails(data))
          })
          .catch(error => dispatch(authFailure("خطا در بخش احراز هویت")))

          mainSearch =  await http.get(encodeURI(`public/search?q=${productName ?? ""}&limit=10&page=1&brand=${brand ?? ""}&available=${available ?? ""}&category=${category ?? ""}&sort=${sort ?? ""}&price_from=${price_from ?? ""}&price_to=${price_to ?? ""}`),{headers : {authorization : token}}).then(res =>res.data)
     
          // Fetch SearchBar Data With User Token
          await http.get(`public/searchbar`,{headers : {authorization : token}})
          .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
          .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))

     }else{
          mainSearch =  await http.get(encodeURI(`public/search?q=${productName ?? ""}&limit=10&page=1&brand=${brand ?? ""}&available=${available ?? ""}&category=${category ?? ""}&sort=${sort ?? ""}&price_from=${price_from ?? ""}&price_to=${price_to ?? ""}`)).then(res =>res.data)

          // Fetch SearchBar Data Without User Token
          await http.get(`public/searchbar`)
          .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
          .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
     }
     
     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(error => dispatch(fetchCategoriesFailure("خطای سرور در بخش گرفتن لیست دسته بندی‌ها ")))

     // Fetch Brands
     const brands  =   await http.get(encodeURI(`public/brands`)).then(res => res.data)
     
     // Fetch Similar Categories
     const similarCategories  = category &&  await http.get(encodeURI(`public/categories/${category}/sub`)).then(res => res.data)
     
     // Fetch Products By Filters 
     return {     
          props: {
               brands : brands && brands.data ||null,
               similarCategories : similarCategories  || null,
               mainSearch : mainSearch && mainSearch.data || null
          }
     }
})