// Used in Search Page And Similar Products - Used When Rendering List of Products

import { toPersianDigits } from "@/utils/toPersianDigits";
import { toPersianPrice } from "@/utils/toPersianPrice";
import Link from "next/link";

const ProductCommon = ({product}) => {
     return (  
          <>
               {product.is_available ? (
                    <Link href={encodeURI(`/product/${product.title.replace(/\s+/g, '-')}`)}>
                         <a  className="bg-white rounded-md w-full h-full min-w-[200px] p-4 flex flex-col sm:items-center">
                              <div className="flex flex-row sm:flex-col sm:items-center">
                                   <section className="w-40 lg:w-36 flex justify-center pt-4 relative  ">
                                        <img src={product.image_url} alt={`تصویر ${product.title}`} className="w-full h-auto font-iranyekan-regular text-sm"/>
                                   </section>
                                   {/* Product Title */}
                                   <p className="font-iranyekan-regular text-xs text-right w-full sm:mt-4 text-gray-700  leading-7">{product.title}</p>
                              </div>
                              <div className="h-full flex  flex-row justify-between items-end w-full mt-4  sm:gap-y-2">
                                   <h6 className="font-iranyekan-regular whitespace-nowrap text-xs text-gray-500">در {toPersianDigits(product.shops_count)} فروشگاه</h6>
                                   <div className={`font-iranyekan-regular whitespace-nowrap text-sm  ${!product.is_available ? "text-red-600" : "text-gray-800"}`}>
                                        {!product.is_available ? <h5>ناموجود</h5> : <h5><strong className="ml-1">{toPersianPrice(product.price_start)}</strong>تومان</h5>} 
                                   </div>
                              </div>
                         </a>
                    </Link>
               ) : (
                    <section  className="bg-white rounded-md w-full h-full min-w-[200px] p-4 flex flex-col sm:items-center">
                         <div className="flex flex-row sm:flex-col sm:items-center">
                              <section className="w-40 lg:w-36 flex justify-center pt-4 relative  ">
                                   <img src={product.image_url}  alt={`تصویر ${product.title}`} className="w-full h-auto font-iranyekan-regular text-sm"/>
                              </section>
                              {/* Product Title */}
                              <p className="font-iranyekan-regular text-xs text-right w-full sm:mt-4 text-gray-700  leading-7">{product.title}</p>
                         </div>
                         <div className="h-full flex  flex-row justify-between items-end w-full mt-4  sm:gap-y-2">
                              <h6 className="font-iranyekan-regular whitespace-nowrap text-xs text-gray-500">در {toPersianDigits(product.shops_count)} فروشگاه</h6>
                              <div className={`font-iranyekan-regular whitespace-nowrap text-sm  ${!product.is_available ? "text-red-600" : "text-gray-800"}`}>
                                   {!product.is_available ? <h5 className="font-iranyekan-bold">ناموجود</h5> : <h5><strong className="ml-1">{toPersianPrice(product.price_start)}</strong>تومان</h5>} 
                              </div>
                         </div>
                    </section>
               )}
          </>
     );
}
export default ProductCommon;