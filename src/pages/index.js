import Category from '@/components/indexPage/category'
import MainSlider_indexPage from '@/components/indexPage/mainSlider'
import OffersSlider_indexPage from '@/components/indexPage/offersSldier'
import TorobOffer_categories from '@/components/indexPage/offer_torob_category'
import Layout from '@/layout/Layout'
import { cartDetails } from '@/redux/cart/cart/cartActions'
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from '@/redux/categories/categoriesActions'
import { home_fetchDataFailure, home_fetchDataRequest, home_fetchDataSuccess } from '@/redux/home/home_actions'
import { wrapper } from '@/redux/store'
import { authFailure, authRequest, authSuccess } from '@/redux/user/userActions'
import http, { returnTokenInServerSide } from 'src/services/http'

export default function Home(){

    return (
        <Layout pageTitle={"ترب | بهترین قیمت بازار"} isFooter={true}>
            <MainSlider_indexPage/>
            <OffersSlider_indexPage/>
            <Category/>
            <TorobOffer_categories/>
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

        dispatch(home_fetchDataRequest())
        await http.get("public/home" , {headers : {authorization : token}})
        .then(res => dispatch(home_fetchDataSuccess(res.data))) 
        .catch(error => dispatch(home_fetchDataFailure("خطا در بخش گرفتن اطلاعات صفحه اصلی")))
    }else{
        // Fetch Home Page Data
        dispatch(home_fetchDataRequest())
        await http.get("public/home")
        .then(res => dispatch(home_fetchDataSuccess(res.data))) 
        .catch(error => dispatch(home_fetchDataFailure("خطا در بخش گرفتن اطلاعات صفحه اصلی")))
    }
    // Fetch Navbar Categories
    await http.get(`public/categories`)
    .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
    .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))

});