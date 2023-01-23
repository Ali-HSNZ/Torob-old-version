import { addProductToCart, decreaseProductToCart, increaseProductToCart } from "@/redux/cart/cart/cartActions";
import { authPanel } from "@/redux/user/userActions";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

const StoreCommon = ({store , index}) => {
     const dispatch = useDispatch()
     const {cart , increaseOrDecreaseProductCartLoading} = useSelector(state => state.cart)
     const {user} = useSelector(state => state.auth)

     const availableStoreInCart = ({store_id}) => {
          if(cart.data && cart.data.length > 0){
               return cart.data.find(store => store.store_id === store_id)
          }return false
     }
     const isIncreaseProductLoading = ({store_id}) => {
          if(increaseOrDecreaseProductCartLoading.length > 0){
               const availableStore = increaseOrDecreaseProductCartLoading.find(store => store.store_id === store_id)
               if(availableStore) return true ; else return false
          }else return false
     }
     return (  
          <section>
               { index > 0 && <hr/>}
               <input type="checkbox"  id={`discount_${store.store_id}`} className="peer hidden"/>
               <section  className='  flex flex-row justify-between mt-0 group p-4  hover:bg-gray-50 '>
                    <section className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center">
                         <div className="flex ">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                              </svg>
                              <div className='mr-2 whitespace-nowrap flex w-fit gap-y-1 flex-row  items-center xl:items-start '>
                                   <p className='font-sans font-bold text-gray-800'>{store.title}</p>
                                   <p className='font-sans text-xs text-gray-500 mr-1'>({store.province})</p>
                              </div>
                         </div>
                         {store.discounts.length > 0 && <label htmlFor={`discount_${store.store_id}`} className="py-2 px-4 bg-gray-50 hover:border-red-600 group-hover:bg-white rounded-lg flex items-center  border cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                              </svg>
                              <span className="whitespace-nowrap font-sans text-sm mr-1">تخفیف پله‌ایی</span>
                         </label>}
                    </section>
                    <section className="flex flex-col sm:flex-row items-center gap-x-5 justify-between    sm:mr-4">
                         <p className={`text-red-600   font-bold whitespace-nowrap font-sans mb-4 sm:m-0`}>{toPersianPrice(store.price) +" تومان " }</p>
                         {availableStoreInCart({store_id : store.store_id}) ? (
                         <div className="flex bg-white  border-2 border-red-500 rounded-md items-center">
                              {/* increase */}
                              <button onClick={()=>dispatch(increaseProductToCart({product_id : store.product_id , store_id : store.store_id}))} className="font-sans text-sm p-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                   </svg>
                              </button>
                              {isIncreaseProductLoading({store_id : store.store_id}) ? (
                                   <ReactLoading type="spinningBubbles" height={20} width={20} color="red" />
                              ) : (
                                   <span className="font-sans text-sm px-1">{toPersianDigits(availableStoreInCart({store_id : store.store_id}).count)}</span>
                              )}
                              {/* Decrease */}
                              <button onClick={()=>dispatch(decreaseProductToCart({product_id : store.product_id , store_id : store.store_id}))} className="font-sans text-sm p-2">
                                   {availableStoreInCart({store_id : store.store_id}).count <= 1 ? (
                                        // Trash Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                   ) : (
                                        // Decrease Icon
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                        </svg>
                                   )}
                              </button>
                         </div> 
                         ) : (
                         <button onClick={()=> user ? dispatch(addProductToCart({product_id : store.product_id , store_id : store.store_id})) : dispatch(authPanel({type : 'userPath' , isOpen : true}))} className={` whitespace-nowrap  bg-red-600 border-red-600  py-1.5 text-white   border  font-sans rounded-md font-bold  text-sm px-4 `}>افزودن به سبد</button>
                         )}
                    </section>
               </section>
               <section className="peer-checked:inline-block  hidden w-full px-4 ">
                    {store.discounts.length > 0 && <div className="w-full mt-2 border border-gray-200 overflow-hidden rounded-lg pt-2 mb-4">
                         <div className="w-full grid grid-cols-3 px-4 mb-2">
                         <p className="font-sans text-sm font-bold">نوع</p>
                         <p className="font-sans text-sm font-bold">مقدار </p>
                         <p className="font-sans text-sm font-bold">قیمت نهایی</p>
                         </div>
                         {store.discounts.map((discount,index) => (
                              <div key={index} className="px-4 w-full grid grid-cols-3 py-2 odd:bg-gray-200 even:bg-gray-100">
                                   <p className="font-sans text-sm px-1 sm:p-0">{discount.discount_type === 'count' ? "تعداد" : 'قیمت'}</p>
                                   <p className="font-sans text-sm px-1 sm:p-0">{toPersianPrice(discount.discount_value)} {discount.discount_type === 'price' ? "تومان" : ''} </p>
                                   <p className="font-sans text-sm px-1 sm:p-0">{toPersianPrice(discount.final_price)} تومان</p>
                              </div>
                         ))}
                    </div>}
               </section>
          </section>
     );
}
 
export default StoreCommon;