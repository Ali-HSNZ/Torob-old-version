import Styles from '/src/pages/product/grid.module.css'
import ChartJs from '../Chartjs'
import { Modal } from '@mui/material';
import { useState } from 'react';
import ChartDetail from '../ChartDetail';

const Chart = ({chart}) => {
    const [isModal , setIsModal] = useState(false)


    return (  
        <div className={`${Styles.chart} bg-white  font-sans p-4 relative`}>
            <p className='w-full text-right'>تغییرات قیمت</p>
                <div className=' relative ' >
                    <ChartJs chart={chart} />
                </div>
            <div className='w-full flex justify-end  '>
                <button onClick={()=>setIsModal(true)} className='p-2 absolute bottom-2 left-2 hover:bg-gray-100 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-800 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                    <Modal className="flex items-center px-2 md:px-0 justify-center relative" open={isModal} onClose={()=>setIsModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                            <div className='bg-white w-full p-4 md:w-4/6 rounded-md'>
                                <div onClick={()=>setIsModal(false)} className='p-2 hover:bg-gray-200 hover:cursor-pointer bg-gray-50 rounded-full relative top-2 right-2 w-fit'>
                                    <svg  className=" w-6 text-black h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <ChartDetail chart={chart} page="product"/>
                            </div>
                    </Modal>
            </div>
        </div>
    );
}
 
export default Chart;