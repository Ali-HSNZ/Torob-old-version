import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import { toPersianDigits } from "@/utils/toPersianDigits";
import {Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";
import Login from "./Login";
const Header = () => {
    
    const [data , setData] = useState(null)
    const [isOpen , setIsOpen] = useState(false)
    const [isModal , setIsModal] = useState(false)
    const router = useRouter()
    const {query} = useRouter()
    const [currentCategory , setCurrentCategory] = useState("")


    useEffect(()=> {
        const getData = async () => {
            const {data} =await axios.get('https://project-torob-clone.iran.liara.run/api/categories').then(res => res.data)
            setData(data)
        }
        getData()
    },[])

    const  closeCategory = () => {
        const allData = data && data.length > 0 ? [...data] : []
        allData.forEach(category => {
            category.status = false;
        });
        setData(allData);
        setIsOpen(false)
        setIsModal()
    }

    function handleCategory(id){
        closeCategory()
        const index = data.findIndex(p => p.id === id)
        const category = {...data[index]}
        category.status = true
        const allData = [...data]
        allData[index] = category;
        setData(allData);
        setIsOpen(true)
    }


    const user = useAuth()
    return (  
        <>
    
            <div onClick={()=>{closeCategory() } } className={`fixed ${isOpen? "" : "hidden"}  inset-0  h-full w-full z-10`}></div>
    
            <header className="flex relative  justify-between md:px-10  px-4 py-2 bg-gray-50 items-center z-10">

                {user.data && user.data.phone_number ? <></> : (
                    <Modal
                    open={isModal}
                    onClose={()=>setIsModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="flex justify-center items-center px-4"
                    >
                        <>
                            <Login setIsModal={setIsModal}/>
                        </>
                    </Modal>   
                )}
                
                {/* //? LapTop Menu */}
                <section className="hidden sm:flex  gap-x-6 ">
                    {data && data.length > 0 && data.map((category,index) =>  <BigScreenMenu handleCategory={handleCategory} setIsModal={setIsModal}  category={category} key={index} customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-14"} />)}
                </section>


                {/* //? Mobile Menu Button  */}
                {data && data.length > 0 && <section className="sm:hidden">
                    <button className="flex items-center justify-center p-2 bg-white" onClick={()=>setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </section>}

                <section className="w-full sm:w-fit flex justify-end">
                    {user.data && user.data.phone_number ? (
                        <button onClick={()=>closeCategory()} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >{toPersianDigits(user.data.phone_number)}</button> 
                    ) : (
                        <button onClick={()=>closeCategory() & setIsModal(true)} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >ورود / ثبت نام</button> 
                    )}
                </section>
            </header>

            

            {/* //? MenuMobile =>  */}
                <SmallScreenMenu 
                    setCurrentCategory={setCurrentCategory} 
                    currentCategory={currentCategory} 
                    isOpen={isOpen} 
                    closeCategory={closeCategory} 
                    setIsOpen={setIsOpen} 
                    data={data} 
                    handleCategory={handleCategory}
                />
        </>
    );
}
 
export default Header;