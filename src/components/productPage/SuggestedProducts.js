import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Styles from "./product.module.css";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import axios from "axios";
import ProductCommon from "@/common/ProductCommon";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "src/redux/like/likeActions";

const Product = ({ data }) => {
  const [products, setProducts] = useState(data);
  const [pageCount, setPageCount] = useState(2);
  const [isProducts, setIsProducts] = useState(false);
  const { likes, likesLoading } = useSelector((state) => state.likes);
  const { analytics, analyticsLoading } = useSelector(
    (state) => state.analytics
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { hashId } = query;

  useEffect(() => {
    dispatch(fetchLikes());
  }, []);
  useEffect(() => {
    setIsProducts(true);
    setProducts(data ? data : []);
    window.scroll({ top: 1 });
    setPageCount(2);
  }, [hashId]);

  const getMorePost = async () => {
    setPageCount(pageCount + 1);
    const { data: productSimilars } = await axios
      .get(
        encodeURI(
          `https://project-torob-clone.iran.liara.run/api/product/${hashId}/similars?perPage=9&page=${pageCount}`
        )
      )
      .then((res) => res.data);
    productSimilars.length === 0 && setIsProducts(false);
    setProducts((product) => [...product, ...productSimilars]);
  };

  const hasMoreHandler = () => {
    if (isProducts) {
      if (products.length < 9) {
        return false;
      }
      return true;
    } else {
      return isProducts;
    }
  };
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={getMorePost}
      hasMore={hasMoreHandler()}
      loader={
        <div className="w-full flex justify-center my-8">
          <ReactLoading
            type="spinningBubbles"
            height={50}
            width={50}
            color="red"
          />
        </div>
      }
      endMessage={
        <h4 className="w-full text-center font-sans my-8 text-gray-800">
          محصولات بیشتری یافت نشد
        </h4>
      }
    >
      <article className={Styles.productsParent}>
        {products &&
          products.map((product, index) => {
            const isLiked = () => {
              const likedProduct =
                likes && likes.find((item) => item.hash_id === product.hash_id);
              if (likedProduct) {
                return true;
              }
              return false;
            };
            const isAnalyze = () => {
              const analyticsProduct =
                analytics &&
                analytics.find((item) => item.hash_id === product.hash_id);
              if (analyticsProduct) {
                return true;
              }
              return false;
            };
            const isLikeLoading = () => {
              const loadingProduct =
                likesLoading &&
                likesLoading.length > 0 &&
                likesLoading.find((item) => item.hash_id === product.hash_id);
              if (loadingProduct) {
                return true;
              }
            };
            const isAnalyzeLoading = () => {
              const loadingProduct =
                analyticsLoading &&
                analyticsLoading.length > 0 &&
                analyticsLoading.find(
                  (item) => item.hash_id === product.hash_id
                );
              if (loadingProduct) {
                return true;
              }
            };
            return (
              <ProductCommon
                user={user && user.phone_number_primary ? true : false}
                isLikeLoading={isLikeLoading()}
                isAnalyzeLoading={isAnalyzeLoading()}
                isLiked={isLiked()}
                isAnalyze={isAnalyze()}
                likes={likes}
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
