import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import { toPersianDigits } from "@/utils/toPersianDigits";
import {Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "src/redux/user/userActions";
import Login from "./Login";
const Header = () => {
    
    const [data , setData] = useState(null)
    const [isOpen , setIsOpen] = useState(false)
    const [isModal , setIsModal] = useState(false)
    const [userModal , setUserModal] = useState(false)
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

    const {user , loading} = useSelector(state => state.userSignup)
    const dispatch = useDispatch()
    
    return (  
        <>
    
            <div onClick={()=>{closeCategory() } } className={`fixed ${isOpen? "" : "hidden"}  inset-0  h-full w-full z-10`}></div>
            <div onClick={()=>{setUserModal(false) } } className={`fixed ${userModal? "" : "hidden"} bg-[#44444438] inset-0  h-full w-full z-10`}></div>
    
            <header className="flex relative  justify-between md:px-10  px-4 py-2 bg-gray-50 items-center z-10">

                {user && user.phone_number ? <></> : (
                    <Modal
                    open={isModal}
                    onClose={()=>setIsModal(false)}
                    className="flex justify-center items-center px-4"
                    >
                        <>
                            <Login setIsModal={setIsModal}/>
                        </>
                    </Modal>   
                )}
                
                {/* //? LapTop Menu */}
                <section className="hidden sm:flex  gap-x-6 ">
                    {data && data.length > 0 && data.map((category,index) =>  <BigScreenMenu handleCategory={handleCategory} setUserModal={setUserModal} setIsModal={setIsModal}  category={category} key={index} customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-14"} />)}
                </section>


                {/* //? Mobile Menu Button  */}
                {data && data.length > 0 && <section className="sm:hidden">
                    <button className="flex items-center justify-center p-2 bg-white" onClick={()=>setIsOpen(!isOpen) & setUserModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </section>}

                {/* //? User Modal */}
                <section className="w-full sm:w-fit flex justify-end relative ">
                    {user && user.phone_number ? (
                        <>
                            <button onClick={()=>closeCategory() & setUserModal(!userModal)} className="bg-white px-6 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >{toPersianDigits(user.phone_number)}</button> 
                            <div className={`bg-gray-50 rounded-b-md ${userModal ? "" : "hidden"} absolute  top-[37px] left-0  whitespace-nowrap py-2`}>
                                <Link href={'#'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">تغیرات قیمت</a>
                                </Link>
                                <Link href={'/user/favorites'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">محبوب‌ها</a>
                                </Link>
                                <Link href={'#'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">مشاهدات اخیر</a>
                                </Link>
                                <button onClick={()=> {dispatch(userLogout()) ; setUserModal(false)}} className="text-xs cursor-pointer hover:bg-red-100 px-6 font-bold text-red-600 w-full py-1.5 text-center font-sans ">
                                   خروج
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {!loading ? (
                                <button onClick={()=>closeCategory() & setIsModal(true)} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >ورود / ثبت نام</button> 
                            ) : (
                                <button className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >...</button> 
                            )}
                        </>
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