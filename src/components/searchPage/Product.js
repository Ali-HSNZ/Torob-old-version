import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Styles from "@/common/productsParent_grid.module.css";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import ProductCommon from "@/common/ProductCommon";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLikes } from "@/redux/like/likeActions";
import http from "src/services/http";
// import { fetchAnalytics } from "@/redux/analytics/analyticsActions";

const Product = ({ data }) => {
     const [products, setProducts] = useState(data);
     const [pageCount, setPageCount] = useState(2);
     const [isProducts, setIsProducts] = useState(false);
     const { query } = useRouter();
     // const dispatch = useDispatch();
     // const { likes, likesLoading } = useSelector((state) => state.likes);
     // const { analytics, analyticsLoading } = useSelector(state => state.analytics);
     const { query: productName,fromPrice,toPrice,category,available,sort,brand,} = query;
     //   const { user } = useSelector((state) => state.auth);

     // useEffect(() => {
     //   dispatch(fetchLikes());
     //   dispatch(fetchAnalytics());
     // }, []);

     useEffect(() => {
          setIsProducts(true);
          setProducts(data ? data : []);
          window.scroll({ top: 1 });
          setPageCount(2);
     }, [query]);

     const getMoreProducts = async () => {
          setPageCount(pageCount + 1);
          const { products } = await http.get(encodeURI(`search?${productName ? "&q=" + productName : ""}&limit=9&page=${pageCount}${brand ? "&brand=" + brand : ""}${available ? "&available=" + brand : ""}${category ? "&category=" + category : ""}${sort ? `&sort=${sort}` : ""}${fromPrice ? "&fromPrice=" + fromPrice : ""}${toPrice ? "&toPrice=" + toPrice : ""}`))
          .then((res) => res.data.data);
          pageCount === 2 && products.shift();
          products.length === 0 && setIsProducts(false);
          setProducts((product) => [...product, ...products]);
     };
     const hasMoreHandler = () => {
          if (isProducts) {
               if (products.length < 9) return false ; else return true;
          } else return isProducts;
     };

     return (
          <InfiniteScroll 
               dataLength={products.length} 
               next={getMoreProducts} 
               hasMore={hasMoreHandler()} 
               loader={
                    <div className="w-full flex justify-center my-8">
                         <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                    </div>
               } endMessage={
                    <h4 className="w-full text-center text-sm font-sans mt-4 text-gray-700">محصولات بیشتری یافت نشد.</h4>
               }
          >
               <article className={Styles.productsParent}>
                    {products &&products.map((product, index) => {
                         // const isLiked = () => {
                         //   const likedProduct = likes && likes.find((item) => item.hash_id === product.hash_id);
                         //   if (likedProduct) return true; else return false;
                         // };
                         // const isAnalyze = () => {
                         //   const analyticsProduct = analytics && analytics.find((item) => item.hash_id === product.hash_id);
                         //   if (analyticsProduct) return true;
                         //   return false;
                         // };
                         // const isLikeLoading = () => {
                         //   const loadingProduct = likesLoading && likesLoading.length > 0 && likesLoading.find((item) => item.hash_id === product.hash_id); 
                         //   if (loadingProduct) return true;
                         // };
                         // const isAnalyzeLoading = () => {
                         //   const loadingProduct = analyticsLoading && analyticsLoading.length > 0 && analyticsLoading.find((item) => item.hash_id === product.hash_id);
                         //   if(loadingProduct) return true;
                         // };
                         return (
                         <ProductCommon
                              // user={user ? true : false}
                              // isLikeLoading={isLikeLoading()}
                              // isAnalyzeLoading={isAnalyzeLoading()}
                              // isLiked={isLiked()}
                              // isAnalyze={isAnalyze()}
                              // likes={likes}
                              key={index}
                              product={product}
                         />
                         );
                    })}
               </article>
          </InfiniteScroll>
     );
};
export default Product;