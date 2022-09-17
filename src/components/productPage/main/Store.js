import ChooseCity from '@/common/ChooseCity';
import { toEnDigits, toPersianDigits } from '@/utils/toPersianDigits';

import { useEffect } from 'react';
import { useState } from 'react';
import Styles from '/src/pages/product/[hashId]/grid.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import StoreCommon from '@/common/StoreCommon';


const Store = ({product}) => {

    const {query} = useRouter()
    const {hashId} = query

    const [selectedCities,setSelectedCities] = useState([])
    const [chooseCity_Modal , setChooseCity_Modal] = useState(false)
    const [showAllStors , setShowAllStore] = useState(false)
    const [cityStore,setCityStore] = useState(null)

    useEffect(()=>{
        setSelectedCities([])
    },[hashId])

    useEffect( ()=>{
        const getData = async () => {
            const {data : resualt} = CitiesToText.length > 0 && await axios.get(encodeURI(`https://project-torob-clone.iran.liara.run/api/product/${hashId}/sales?cities=${CitiesToText}`)).then(res => res.data)
            resualt&&  setCityStore(resualt.filtered)
        }
        getData()
    },[selectedCities])


    let storeList;
    if(!showAllStors){
        storeList =  product.sales.length > 6 ? product.sales.slice(0,6) : product.sales
    }else{
        storeList = product.sales
    }

    let CitiesToText = ""; 
    selectedCities && selectedCities.map(e =>CitiesToText+=e+"|")

    const citiesNameHandler = () => {
        if(selectedCities.length === 1){
            return selectedCities[0]
        }else if(selectedCities.length > 1){
            return selectedCities[0] + " و " +  toPersianDigits(selectedCities.length -1)  +  " شهر دیگر "
        }
        return "انتخاب شهر"
    }

    return (  
        <div className={`${Styles.store}  `}>
            {/* //? Header */}
            
            {selectedCities && selectedCities.length > 0 && (
                <div className='w-full bg-white flex mb-6 flex-col '>
                    <div className='py-5 mb-5  flex flex-row  whitespace-nowrap justify-between px-4 md:px-8'>
                        <div className='w-full flex justify-start '>
                            <div className='flex flex-col  lg:flex-row'>
                                <h4 className='font-sans text-lg font-bold text-gray-800'>فروشگاه‌های اینترنتی در شهر</h4>
                                <button onClick={()=> setChooseCity_Modal(true)}  className=' lg:mt-0 lg:mr-6 bg-gray-800 hover:bg-gray-700 rounded-full text-white font-sans px-2 mt-4  py-1.5 flex text-sm items-center justify-between'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>

                                    <p className='mx-2 '>{citiesNameHandler()}</p>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p className={`font-sans text-sm text-red-600`}>راهنمای خرید امن</p>
                    </div>

                    {/* //? city Store */}
                    <div className='w-full'>
                        {cityStore && cityStore.length > 0 ? cityStore.map((store,index) =>  <StoreCommon key={index} store={store} index={"cityStore_"+index}/>) : (
                            <div className='mb-4 w-full flex justify-center'>
                                <p className='text-center font-sans  px-4 py-2 rounded-md  text-sm bg-[#FFEEBF] text-[#85660E]'  >فروشگاهی با این شرایط پیدا نشد.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <div className='bg-white py-5 scroll-smooth '>
                <section className='w-full flex peer  justify-between items-start md:items-center mb-8 px-8'>
                    <div className={`flex flex-col md:flex-row gap-x-8 items-center`}>
                        <span className='font-sans font-bold text-gray-800'>{selectedCities && selectedCities.length > 0 ? "فروشگاه‌های اینترنتی در سایر شهرها" : "فروشگاه‌های اینترنتی"}</span>
                        <button onClick={()=> setChooseCity_Modal(true)}  className={` ${selectedCities && selectedCities.length > 0 && "hidden"}  bg-gray-800 hover:bg-gray-700 rounded-full text-white font-sans px-2 mt-4 md:mt-0 py-1.5 flex text-sm items-center justify-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <p className='mx-2 '>انتخاب شهر</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <ChooseCity setIsModal={setChooseCity_Modal} setCityStore={setCityStore} isModal={chooseCity_Modal} setSelectedCities={setSelectedCities}/>
                    </div>
                    <p className={`font-sans ${selectedCities && selectedCities.length > 0 && "hidden"} text-sm text-red-600`}>راهنمای خرید امن</p>
                </section>

                {/* //? Store */}
                    {storeList.map((store,index) => <StoreCommon key={index} store={store} index={index}/>)}
                <div className='w-full px-4'>
                    <button onClick={() => setShowAllStore(!showAllStors)} className='mt-4 rounded-md font-sans text-sm bg-[#d73948] w-full py-3 text-white'> 
                        {showAllStors ? "نمایش کمتر" :  `نمایش تمام ${toPersianDigits(product.sales.length)} فروشگاه `}
                    </button>
                </div>
            </div>

        </div>
    );
}
 
export default Store;