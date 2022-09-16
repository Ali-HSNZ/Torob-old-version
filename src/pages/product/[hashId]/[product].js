import Layout from '@/layout/Layout';
import axios from 'axios';
import Styles from './grid.module.css'
import SuggestedProducts from '@/components/productPage/SuggestedProducts';

import BreadCrump from '@/components/productPage/main/BreadCrump';
import Product from '@/components/productPage/main/Product';
import Chart from '@/components/productPage/main/Chart';
import Store from '@/components/productPage/main/Store';
import Properties from '@/components/productPage/main/Properties';


const ProductPage = ({product , productSimilars}) => {
    return (  
        <Layout>
            <section className="w-full px-2 md:px-8 flex justify-center">
                <div className='w-full max-w-7xl'>
                        <BreadCrump path={product.path}/>
                        <div className={`${Styles.gridParent}  mt-4 gap-5`}>
                            <Product product={product}/>
                            <Chart  chart={product.chart}/>
                            <Store product={product}/>
                            <Properties  product={product.product}/>
                        </div>
                </div>
            </section>

            <section className="mt-4 w-full px-2 md:px-8 flex justify-center">
                <div className='w-full max-w-7xl'>
                        <p className='font-sans font-bold text-lg w-full text-center'>محصولات مشابه</p>
                        {productSimilars.length > 0 &&<SuggestedProducts data={productSimilars}/>}
                </div>
            </section>
            
        </Layout>
    );
}
export default ProductPage;

export const getServerSideProps = async({query}) => {
    const {hashId} = query
    const {data : product} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}`)).then(res => res.data)
    const {data : productSimilars} = await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}/similars?perPage=9&page=1`)).then(res => res.data)
    return{
        props : {
            product,
            productSimilars,
        }
    }
}
