import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Category from '@/components/indexPage/category'
import MainSlider_indexPage from '@/components/indexPage/mainSlider'
import OffersSlider_indexPage from '@/components/indexPage/offersSldier'
import Layout from '@/layout/Layout'
import { cartDetails } from '@/redux/cart/cart/cartActions'
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from '@/redux/categories/categoriesActions'
import { wrapper } from '@/redux/store'
import { authFailure, authRequest, authSuccess } from '@/redux/user/userActions'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import http, { requestError, returnTokenInServerSide } from 'src/services/http'

export default function Home(){

     return (
          <Layout pageTitle={"ترب | بهترین قیمت بازار"} isFooter={true}>
            <MainSlider_indexPage/>
            <OffersSlider_indexPage/>
            <Category/>
          </Layout>
     )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({req}) => {
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     if(!token.includes("undefined")){
          // Fetch User Data
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) => {
               dispatch(cartDetails(data))
               dispatch(authSuccess(data.user))
          })
          .catch(error => dispatch(authFailure("خطا در بخش احراز هویت")))
     }
     // Fetch Navbar Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
});