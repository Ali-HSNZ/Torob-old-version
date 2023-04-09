import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Styles from "@/common/productsParent_grid.module.css";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import ProductCommon from "@/common/ProductCommon";
import http from "src/services/http";

const Product = ({ data }) => {
     const [products, setProducts] = useState(data);
     const [pageCount, setPageCount] = useState(2);
     const [isProducts, setIsProducts] = useState(false);
     const { query } = useRouter();
     const { slug } = query;

     useEffect(() => {
          setIsProducts(true);
          setProducts(data ? data : []);
          window.scroll({ top: 1 });
          setPageCount(2);
     }, [slug]);

     const getMorePost = async () => {
          setPageCount(pageCount + 1);
          const { data: productSimilars } = await http.get(encodeURI(`product/${slug}/similars?limit=9&page=${pageCount}`))
          .then(({data}) => data);
          productSimilars.length === 0 && setIsProducts(false);
          setProducts(product => [...product, ...productSimilars]);
     };

     const hasMoreHandler = () => {
          if(isProducts) {
               if(products.length < 9) return false ; else return true;
          } else return isProducts;
     };
     return (
          <div className='w-full '>
               <p className='font-iranyekan-regular font-iranyekan-bold text-lg w-full text-center  text-gray-800'>محصولات مشابه</p>
               <InfiniteScroll
                    dataLength={products.length}
                    next={getMorePost}
                    hasMore={hasMoreHandler()}
                    loader={
                         <div className="w-full flex justify-center my-8">
                              <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                         </div>
                    }
                    endMessage={
                         <h4 className="w-full text-center font-iranyekan-regular my-4 text-gray-800">محصولات بیشتری یافت نشد.</h4>
                    }>
                    {products && products.length > 0 && <article className={Styles.productsParent}>
                         {products.map((product, index) => <ProductCommon key={index} product={product}/>)}
                    </article>}
               </InfiniteScroll>
          </div>
     );
};
export default Product;