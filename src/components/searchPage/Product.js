import { toPersianDigits } from "@/utils/toPersianDigits";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Styles from './product.module.css'
import ReactLoading from 'react-loading';
import { useRouter } from "next/router";
import Link from "next/link";

const Product = ({ data}) => {
  const [products, setProducts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [pageCount,setPageCount] = useState(1)
  const [isProducts , setIsProducts] = useState(true)
  const {query} = useRouter()

  const {
    query : productName, 
    fromPrice, 
    toPrice, 
    category,
    available,
    sort,
    brand
} = query;


useEffect(()=>{
    setIsProducts(true)
    setProducts(data ? data : [])
    window.scroll({top : 1})
    setPageCount(1)
},[query])

    const getMorePost = async () => {
        setPageCount(pageCount+1)
        const res = await fetch(
            encodeURI(`https://project-torob-clone.iran.liara.run/api/search?${productName?"&q="+productName:""}&perPage=9&page=${pageCount}${brand ? "&brand="+brand : ""}${available ? "&available="+brand : ""}${category ? "&category="+category : ""}${sort ? `&sort=${sort}` : "" }${fromPrice ? "&fromPrice="+fromPrice : ""}${toPrice ? "&toPrice="+toPrice : ""}`)
        );
        const newProducts = await res.json();

        newProducts.data.products.length === 0 && setIsProducts(false)
        setProducts(product => [...product, ...newProducts.data.products]);
    };

  return (
    <>
        <InfiniteScroll
            dataLength={products.length}
            next={getMorePost}
            hasMore={isProducts}
            loader={
                <div className="w-full flex justify-center my-8">
                    <ReactLoading  type="spinningBubbles" height={50} width={50} color='red'/>
                </div>
                // <p className="font-sm font-sans text-center font-black text-red-800 my-8">محصول بیشتری یافت نشد</p>
    }
            endMessage={<h4 className="w-full text-center font-sans my-8">محصولات بیشتری یافت نشد</h4>
        }>
        <article className={Styles.productsParent}>
            {products.map((product,index) => {

                return(
                    <Link  key={index} href={`/product/${product.hash_id}/${product.title.replace(/\s+/g, '-')}`}>
                        <a>
                            <div className="bg-white rounded-md w-full h-auto min-w-[200px] px-4 flex flex-col items-center">
                                <div className="w-24 lg:w-28 flex justify-center pt-4 ">
                                    <img src={product.image_url} className="w-full h-auto"/>
                                </div>
                            
                                <h3 className="font-sans text-sm text-right w-full mt-5">{product.title}</h3>
                            
                                <div className=" flex flex-col justify-end w-full mt-5 flex-1 gap-y-2">
                                    <h6 className={`font-sans text-sm  ${product.price_start===0 ? "text-red-600" : "text-gray-700"}`}>{product.price_start === 0 ? "ناموجود" :  toPersianDigits(product.price_start)+" تومان " }</h6>
                                    <h6 className="font-sans text-sm text-gray-500">در {toPersianDigits(product.shops_count)} فروشگاه</h6>
                                </div>
                                <div className="flex my-4 justify-between w-full px-9">
                                    <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </div>
                                    <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </article>

      </InfiniteScroll>

    </>
  );
};

export default Product;
