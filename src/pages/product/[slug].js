import Layout from '@/layout/Layout';
import SuggestedProducts from '@/components/productPage/SuggestedProducts';
import BreadCrump from '@/components/productPage/main/BreadCrump';
import Product from '@/components/productPage/main/Product';
import Store from '@/components/productPage/main/Store';
import { wrapper } from '@/redux/store';
import http, { returnTokenInServerSide } from 'src/services/http';
import { authFailure, authRequest, authSuccess } from '@/redux/user/userActions';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from '@/redux/categories/categoriesActions';
import { cartDetails } from '@/redux/cart/cart/cartActions';
import { fetchLikeFailure, fetchLikeSuccess } from '@/redux/like/likeActions';
import { fetchSearchDataFailure, fetchSearchDataSuccess } from '@/redux/userSearch/userSaerch_actions';

const ProductPage = ({product , productSimilars}) => {
     return (  
          <Layout isFooter={true} pageTitle={`ترب | ${product.product.title}`}>
               <main className="w-full px-4 flex justify-center">
                    <div className='w-full '>
                         <BreadCrump path={product.path}/>
                         <div className={` mt-4 gap-4 flex flex-col lg:flex-row `}>
                         <Product product={product}/>
                         <Store product={product}/>
                         </div>
                    </div>
               </main>
               <section className="mt-4 w-full px-2 md:px-8 flex justify-center">
                    <SuggestedProducts data={productSimilars}/>
               </section>
          </Layout>
    );
}
export default ProductPage;


export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) =>  async({req , query}) => {
     const {slug} = query
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     
     // Fetch User Data
     if(!token.includes("undefined")){
          dispatch(authRequest())
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) => {
               dispatch(authSuccess(data.user))
               dispatch(cartDetails(data))
          })
          .catch(error => dispatch(authFailure("خطا در بخش احراز هویت")))

          // Add To History
          await http.put(encodeURI(`user/history/${query.slug}`), {} , {headers : {authorization : token}})

          // Fetch Likes
          await http.get(`user/favorites`, {headers : {authorization : token}})
          .then(({data}) => dispatch(fetchLikeSuccess(data.products)))
          .catch(error => dispatch(fetchLikeFailure("خطا در بخش گرفتن محصولات پسندیده شده")))

          // Fetch SearchBar Data With User Token
          await http.get(`public/searchbar`,{headers : {authorization : token}})
          .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
          .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
     }else{
          // Fetch SearchBar Data With User Token
          await http.get(`public/searchbar`)
          .then(({data}) => dispatch(fetchSearchDataSuccess(data)))
          .catch(error => dispatch(fetchSearchDataFailure("خطای سرور در بخش گرفتن دیتای جستجو ")))
     }


     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(error => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
     
     const {data : product} = await http.get(encodeURI(`public/product/${slug}`)).then(res => res.data)
     const {data : productSimilars} = await http.get(encodeURI(`public/product/${slug}/similars?limit=9&page=1`)).then(res => res.data)
     return{
          props : {
               product ,
               productSimilars,
          }
     }
})

