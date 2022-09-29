import Layout from '@/layout/Layout';
import axios from 'axios';
import Styles from './grid.module.css'
import SuggestedProducts from '@/components/productPage/SuggestedProducts';
import Cookies from 'universal-cookie';
import BreadCrump from '@/components/productPage/main/BreadCrump';
import Product from '@/components/productPage/main/Product';
import Chart from '@/components/productPage/main/Chart';
import Store from '@/components/productPage/main/Store';
import Properties from '@/components/productPage/main/Properties';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { insertHistory } from 'src/redux/history/historyActions';


const ProductPage = ({product , productSimilars}) => {
    const cookies = new Cookies();
    const token = cookies.get("userToken")
    const dispatch = useDispatch()
    const {query} = useRouter()
    const {hashId} = query;

    useEffect(()=>{
        dispatch(insertHistory(hashId))
    },[hashId])

    return (  
        <Layout>
            <section className="w-full px-2 md:px-8 flex justify-center">
                <div className='w-full max-w-7xl'>
                    <BreadCrump path={product.path}/>
                    <div className={`${Styles.gridParent}  mt-4 gap-5`}>
                        <Product product={product} token={token}/>
                        <Chart  chart={product.chart}/>
                        <Store product={product}/>
                        <Properties  product={product.product}/>
                    </div>
                </div>
            </section>

            <section className="mt-4 w-full px-2 md:px-8 flex justify-center">
                <div className='w-full max-w-7xl'>
                    <p className='font-sans font-bold text-lg w-full text-center text-gray-800'>محصولات مشابه</p>
                    {productSimilars.length > 0 && <SuggestedProducts data={productSimilars}/>}
                </div>
            </section>
        </Layout>
    );
}
export default ProductPage;


export const getServerSideProps = async(ctx) => {
    const {hashId} = ctx.query
    const cookies = new Cookies( ctx.req.headers.cookie);
    const token = cookies.get("userToken")
    const {data : product} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}`),{headers : {Authorization : `Bearer ${token}`} }).then(res => res.data)
    const {data : productSimilars} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}/similars?perPage=9&page=1`)).then(res => res.data)
    
    return{
        props : {product,productSimilars}
    }
}
