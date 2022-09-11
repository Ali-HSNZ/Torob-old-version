import { allCities } from "@/common/cities";
import {Modal } from "@mui/material";
import { useState } from "react";

const ChooseCity = ({isModal , setIsModal}) => {
    const [currentCity , setCurrentCity] = useState("")
    const [selectedCity , setSelectedCity] = useState([])
    const [inputValue , setInputValue] = useState('')


    function removeDuplicate(key) {
        let check = new Set();
        return searchCity().filter(obj => !check.has(obj[key]) && check.add(obj[key]));
    }
    function returnCity(){
        return searchCity().filter(item => item.state === currentCity)
    }
    function checkSelectedCity(city){
        const resualt = selectedCity.find(item => item == city)
        if(resualt) return true ; else return false
    }
    function insertOrDeleteCity(city){
        const finedCity_index = selectedCity.findIndex(e => e === city);
        if(finedCity_index >= 0){
            setSelectedCity(selectedCity.filter(e => e !== city))
        }else{
            setSelectedCity([...selectedCity,city])
        }
    }
    function searchCity(){
        if(inputValue === "" || inputValue === " " || inputValue===null || inputValue=== undefined){
            return allCities
        }
        return allCities.filter(item => item.city.includes(inputValue))
    }



    return ( 
        <div>
            <Modal className="flex items-center justify-center " open={isModal} onClose={()=>setIsModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div  className="font-sans rounded-md w-full sm:w-[420px] bg-white h-auto">
                    <div className="w-full  flex justify-between px-5 py-3">
                        <h6>انتخاب شهر</h6>
                        <button onClick={()=>setIsModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <hr/>
                    {/* //? Tags */}
                    {selectedCity.length > 0 && (
                        <div className="whitespace-nowrap py-2 gap-x-2 overflow-x-auto flex text-white mt-4 px-4">                                
                        {selectedCity.map((item,index) => {
                            return(
                                <div key={index} onClick={()=>insertOrDeleteCity(item)} className="cursor-pointer flex px-3 py-2 rounded-full bg-gray-700 gap-x-3">
                                    <p className="font-sans text-xs">{item}</p>
                                    <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )
                        })}
                    </div>
                    )}
                    <div className="relative px-3 mt-4">
                        <svg  className="w-6 h-6 text-gray-400 absolute top-2 right-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input value={inputValue} onChange={input => setInputValue(input.target.value)} className="w-full pr-10 text-sm border border-gray-300 rounded-md" type='text' placeholder="جستجوی شهر"/>
                    </div>
                    <div className=" mt-4 px-3 ">
                        {!currentCity ? (
                            <p className="font-sans font-bold text-sm ">استان‌های پربازدید</p>
                        ) : (
                            <>
                                <button onClick={()=> {setCurrentCity('') & setInputValue("")}} className="flex gap-x-1 py-2 pl-5 pr-1 cursor-pointer hover:bg-gray-100 w-fit rounded-l-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p>بازگشت</p>
                                </button>
                                <p className="font-bold px-4 my-4"> استان {currentCity}</p>
                            </>
                        )}
                    </div>
                    {/* //? List Of Provience */}
                    <section className="mt-4 w-full max-h-[250px] overflow-auto">
                        {!currentCity ? (
                            <>
                                {removeDuplicate('state').map((item,index) => {
                                    return(
                                        <div key={index}>
                                            <button onClick={() => setCurrentCity(item.state)} className="flex w-full justify-between items-center py-3 px-3 hover:bg-gray-100">
                                                <span className="text-sm">{item.state}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                </svg>
                                            </button>
                                            <hr/>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {returnCity().map((item,index) => {
                                    return(
                                        <div key={index}>
                                            <input id={`name_${index}`} onChange={()=>insertOrDeleteCity(item.city)}  className=" hidden" type={'checkbox'}/>
                                            <label htmlFor={`name_${index}`}   className={`${checkSelectedCity(item.city) ? "bg-gray-700 text-white " : "hover:bg-gray-100"} cursor-pointer peer-checked: flex justify-between items-center py-3 px-4 `}>
                                                <div className="w-full flex justify-start items-center">
                                                    <span className="text-sm">{item.city}</span>
                                                </div>
                                                <svg className="w-4 h-4  " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>

                                            </label>
                                            <hr/>
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    </section>
                    {/* //? Submit */}
                    <section className="py-3 flex gap-x-4 px-4">
                        <button className={`py-2.5 w-3/4 ${selectedCity.length > 0 ? "bg-gray-700 text-white" : " border-gray-600 bg-gray-500 text-white"} border rounded-md text-sm `}>تایید</button>
                        <button onClick={()=> setIsModal(false)} className={`py-2.5 w-1/4 bg-gray-100 border border-gray-300 rounded-md text-sm `}>انصراف</button>
                    </section>
                </div>
            </Modal>
        </div>
     );
}
 
export default ChooseCity;