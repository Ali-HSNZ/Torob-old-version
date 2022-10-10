import { toPersianPrice } from "@/utils/toPersianPrice";

const StoreCommon = ({store , index}) => {
    return (  
        <>
            <section key={index} className='  flex xl:items-center flex-col xl:flex-row justify-between mt-0 group py-3 px-3 md:px-8 hover:bg-gray-50 cursor-pointer'>
                
                <section className="flex w-full justify-between  items-center">
                    <div className="flex w-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        <div className='mr-2 whitespace-nowrap flex w-fit gap-y-1 flex-row  items-center xl:items-start '>
                            <p className='font-sans font-bold text-gray-800'>{store.shop.title}</p>
                            <p className='font-sans text-xs text-gray-500 mr-1'>({store.shop.province})</p>
                        </div>
                    </div>

                    <div className=' xl:w-1/2 text-right xl:mx-8 '>
                        <span className='text-xs mt-3 font-sans text-gray-500'>{store.offer.is_mobile_registered ? " رجیستر شده " : " "}</span>
                        {store.offer.guarantee && store.offer.is_mobile_registered && <span className="text-xs mt-3 font-sans text-gray-500"> | </span>}
                        {store.offer.guarantee && <span className='text-xs mt-3 font-sans text-gray-500'>{store.offer.guarantee}</span>}
                    </div>
                </section>

                <section className="flex items-center gap-x-5 justify-between xl:justify-end  mt-3 xl:mt-0">
                    <p className={`text-red-600 xl:text-gray-700  font-bold whitespace-nowrap font-sans`}>
                        {toPersianPrice(store.offer.price) +" تومان " }
                    </p>
                    <button className={` whitespace-nowrap  group-hover:bg-red-600 border-red-600 text-red-600  py-1.5 group-hover:text-white   border  font-sans rounded-md font-bold  text-sm px-4 `}>افزودن به سبد</button>
                </section>

            </section>
            <hr/>
        </>
    );
}
 
export default StoreCommon;