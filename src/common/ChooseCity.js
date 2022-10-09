import { allCities } from "@/common/cities";
import { removeStoreData } from "@/redux/store/storeActions";
import {Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from "react-redux";

const ChooseCity = ({isModal , setIsModal , setSelectedCities}) => {
    const [currentProvince , setCurrentProvince] = useState("")
    const [inputValue , setInputValue] = useState('')
    const [selectedCity , setSelectedCity] = useState([])
    const hashId = useRouter().query.hashId;
    const dispatch = useDispatch()

    useEffect(()=> {
        setCurrentProvince ("")
        setSelectedCity([])
    } , [hashId])
    

    function searchCity(){
        if(inputValue === "" || inputValue === " ") {
            return {searchMode : false , data : allCities}
        }else{
            const findCity_list = allCities.filter(item => item.city.includes(inputValue))
            return {searchMode : true , data : findCity_list}
        }
    }

    function removeDuplicate(key) {
        let check = new Set();
        return searchCity().data.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
    }
    function returnCity(){
        return searchCity().data.filter(item => item.state === currentProvince)
    }
    function checkSelectedCity(city){
        const resualt = selectedCity.find(item => item === city)
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

    return ( 
        <div>
            <Modal className="flex items-center justify-center " open={isModal} onClose={()=>setIsModal(false) & setInputValue('')} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div  className="font-sans rounded-md w-full sm:w-[420px] bg-white h-auto">
                    <div className="w-full  flex justify-between px-5 py-3">
                        <h6 className=" text-gray-800 ">انتخاب شهر</h6>
                        <button onClick={()=>setIsModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-800 ">
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
                                    <p className="font-sans text-xs   ">{item}</p>
                                    <svg  className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )
                        })}
                    </div>
                    )}
                    <div className="relative px-3 mt-4">
                        <svg  className="w-6 h-6 text-gray-400 absolute top-[7px] right-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input value={inputValue} onChange={input => setInputValue(input.target.value)} className="w-full pr-10 pl-8 text-sm border  text-gray-800  border-gray-300 rounded-md" type='text' placeholder="جستجوی شهر"/>                            
                        <button onClick={()=> setInputValue('')}>
                            <IoMdClose size={'1.2rem'} className="hover:bg-gray-50 hover:text-gray-500 text-gray-400 absolute top-[10px] left-5"/>
                        </button>
                    </div>
                    <div className="mt-4 px-3 ">
                        {/* //? List Of Province
                            اگر استانی انتخاب نشده باشد و کاربر شهری را جستجو نکرده باشد لیست همه استان هارا نمایش میدهیم
                        */}
                        {!currentProvince && !searchCity().searchMode ? (
                            <>
                                <p className="font-sans font-bold text-sm  text-gray-800 ">استان‌ها</p>
                                <section className="mt-4 w-full max-h-[250px] overflow-auto">
                                    {removeDuplicate('state').map((item,index) => {
                                        return(
                                            <div key={index}>
                                                <button onClick={() => setCurrentProvince(item.state)} className="flex w-full justify-between items-center py-3 px-3 hover:bg-gray-100">
                                                    <span className="text-sm text-gray-800 ">{item.state}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-gray-800 ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                    </svg>
                                                </button>
                                                <hr/>
                                            </div>
                                        )
                                    })}
                                </section>
                            </>
                            /* 
                                اگر استانی انتخاب شده باشد و کاربر شهری را جستجو نکرده باشد لیست همه شهر های استان انتخاب شده را نمایش میدهیم
                            */
                        ) : !searchCity().searchMode &&(
                            <>
                                <button onClick={()=> {setCurrentProvince('') & setInputValue("")}} className="flex gap-x-1 py-2 pl-5 pr-1 cursor-pointer hover:bg-gray-100 w-fit rounded-l-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-gray-800 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                    <p className=" text-gray-800 ">بازگشت</p>
                                </button>
                                <p className="font-bold px-4 my-4  text-gray-800 "> استان {currentProvince}</p>
                                <section className="mt-4 w-full max-h-[250px] overflow-auto">
                                    {returnCity().map((item,index) => {
                                        return(
                                            <div key={index}>
                                                <input id={`name_${index}`} onChange={()=>insertOrDeleteCity(item.city)}  className=" hidden" type={'checkbox'}/>
                                                <label htmlFor={`name_${index}`}   className={`${checkSelectedCity(item.city) ? "bg-gray-700 text-white " : "hover:bg-gray-100  text-gray-800 "} cursor-pointer peer-checked: flex justify-between items-center py-3 px-4 `}>
                                                    <div className="w-full flex justify-start items-center">
                                                        <span className="text-sm">{item.city}</span>
                                                    </div>
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </label>
                                                <hr/>
                                            </div>
                                        )
                                    })}
                                </section>
                            </>
                        )}
                    </div>
                    <section className="mt-4 w-full max-h-[250px] overflow-auto">
                        {/* //? List Of Cities */}
                        {/* 
                            اگر استانی انتخاب نشده باشد و کاربر شهری را جستجو کرده باشد همه شهر هایی که با نام وارد شده توسط کاربر پیدا شده را نمایش میدهیم
                        */}
                        {searchCity().data.length > 0 && searchCity().searchMode === true ?(
                            <>
                                {searchCity().data.map((item,index) => {
                                    return(
                                        <div key={index}>
                                            <input id={`name_${index}`} onChange={()=>insertOrDeleteCity(item.city)}  className=" hidden" type={'checkbox'}/>
                                            <label htmlFor={`name_${index}`}   className={`${checkSelectedCity(item.city) ? "bg-gray-700 text-white " : "hover:bg-gray-100  text-gray-800 "} cursor-pointer peer-checked: flex justify-between items-center py-3 px-4 `}>
                                                <div className="w-full flex justify-start items-center">
                                                    <span className="text-sm">{item.city}</span>
                                                </div>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </label>
                                            <hr/>
                                        </div>
                                    )
                                })}
                            </>
                        ) :  searchCity().searchMode === true && <p className="text-center w-full text-red-600 text-sm">شهری به اسم ({inputValue.length > 10 ? inputValue.substring(0,10)+'...' : inputValue}) پیدا نشد.</p>}
                    </section>

                    {/* //! Submit */}
                    <section className="py-3 flex gap-x-4 px-4">
                        <button onClick={()=> {setSelectedCities(selectedCity) ; setIsModal(false)}} className={`py-2.5 ${selectedCity.length > 0 ? "bg-gray-700 text-white  w-3/4" : " hidden border-gray-600 bg-gray-500 text-white"} border rounded-md text-sm `}>تایید</button>
                        <button onClick={()=>{setSelectedCity([]) & dispatch(removeStoreData())  & setIsModal(false) & setInputValue("") & setSelectedCities([])}} className={`${selectedCity.length === 0 ? "w-full" : "w-1/4"} py-2.5  text-gray-800  bg-gray-100 border border-gray-300 rounded-md text-sm `}>لغو</button>
                    </section>
                </div>
            </Modal>
        </div>
     );
}
 
export default ChooseCity;