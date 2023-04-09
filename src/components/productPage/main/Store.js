import Styles from '/src/pages/product/grid.module.css'
import StoreCommon from '@/common/StoreCommon';

const Store = ({product}) => {

    return (  
        <div className={`${Styles.store}  w-full`}>
            
            <div className='bg-white pt-4 mt-4 lg:m-0  rounded-lg'>
                <h4 className='font-iranyekan-bold text-gray-800 pr-4 mb-4'>فروشگاه‌های اینترنتی</h4>

                {/* //? Store */}
                {product.stores.map((store,index) => <StoreCommon key={store.id} store={store} index={index}/>)}
            </div>

        </div>
    );
}
export default Store;