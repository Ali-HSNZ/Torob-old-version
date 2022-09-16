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
                
                <section className="hidden sm:flex  gap-x-6 font-sans text-sm">
                    {
                        data&&data.map((category,index) => {
                            return(
                                <nav className="flex gap-x-4 " key={index}>
                                    
                                    <button  className="hover:text-red-500  cursor-pointer font-sans text-gray-500" onClick={()=> handleCategory(category.id) & setIsModal(false)}>{category.name}</button>
                                    <div className={`${category.status ? "" : "hidden"} z-40 absolute mx-10 right-0 left-0 rounded-md top-14`}>
                                    
                                        <div className="bg-gray-50 pb-4">
                                            <nav className="px-5 py-4">
                                                <Link href={{pathname : '/search' , query : {category:category.name}}}>
                                                    <a className="hover:text-red-500 font-bold font-sans text-gray-700">{category.name}</a>
                                                </Link>
                                            </nav>
                                            <hr/>
                                            {category.sub_categories.length > 0 && category.sub_categories.map((sub,index) => {
                                                    return(
                                                        <div className="mr-10 mt-4" key={index}>
                                                            <nav className="flex gap-x-4 ">
                                                            <Link href={{pathname : '/search' , query : {category:sub.name}}}>
                                                                <a className="hover:text-red-500 font-sans font-bold cursor-pointer " >{sub.name}</a>
                                                            </Link>
                                                            </nav>
                                                            {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,index) => {
                                                                return(
                                                                    <nav className="flex gap-x-4 mr-4 mt-2 text-gray-600" key={index}>
                                                                        <Link href={{pathname : '/search' , query : {category:sub_sub.name}}}>
                                                                        <a className="hover:text-red-500 font-sans cursor-pointer" >{sub_sub.name}</a>
                                                                        </Link>
                                                                    </nav>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                )}
                                        </div>
                                    </div>
                                </nav>
                            )
                        })
                    }
                </section>

                <section className="sm:hidden">
                    <button className="flex items-center justify-center p-2 bg-white" onClick={()=>setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </section>

                <section className="w-full sm:w-fit flex justify-end">
                    {user.data && user.data.phone_number ? (
                        <button onClick={()=>closeCategory()} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >{toPersianDigits(user.data.phone_number)}</button> 
                    ) : (
                        <button onClick={()=>closeCategory() & setIsModal(true)} className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500" >ورود / ثبت نام</button> 
                    )}
                </section>
            </header>


            {/* //? MenuMobile =>  */}

                            <section className={`w-full sm:w-2/5  fixed  ${isOpen ? "" : "hidden"} inset-0  z-40 md:hidden w-full bg-white `}>

                    {/* <p className="relative  font-sans text-sm text-gray-600  top-3 px-5">دسته بندی ها : </p> */}

                    <div className="px-4 mt-6 flex w-full">
                        <button onClick={()=> {closeCategory &  setIsOpen(false)} }>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h6 className="text-sm  text-center w-full font-sans">همه‌ دسته‌بندی ها</h6>
                    </div>

                    <hr className="mt-5"/>


                    <div className="flex py-4 gap-x-4 mt-4 z-20 w-full whitespace-nowrap overflow-x-auto px-3">                    
                        {data&&data.map((category,index) => {
                            return(
                                <button key={index}  className="hover:text-red-500 text-sm border px-4 py-2 rounded-md border-gray-400 cursor-pointer flex font-sans text-gray-700" onClick={()=> handleCategory(category.id)}>{category.name}</button>
                            )
                        })}
                    </div>
                    {
                    data&&data.map((category,index) => {
                        return(
                            <aside className="flex gap-x-4 h-auto overflow-y-auto" key={index}>

                                <div className={`${category.status ? "" : "hidden"}  z-30 absolute px-5 right-0 left-0 rounded-md`}>
                                
                                    <div>
                                        <section className="py-4">
                                            <button onClick={()=>setCurrentCategory(category.name)} className={`hover:text-red-500 ${currentCategory === category.name && "text-red-500"} font-bold font-sans text-gray-700`}>{category.name}</button>
                                        </section>
                                        <hr/>
                                        <div className=" overflow-y-auto h-full overflow-x-auto ">
                                            {category.sub_categories && category.sub_categories.length > 0 && category.sub_categories.map((sub,index) => {
                                                    return(
                                                        <div className="mt-4 overflow-x-auto pb-3" key={index}>
                                                            <section className="flex gap-x-4 ">
                                                                <button  onClick={()=>setCurrentCategory(sub.name)} className={`hover:text-red-500 ${currentCategory === sub.name && "text-red-500"} font-sans font-bold cursor-pointer`}>{sub.name}</button>
                                                            </section>
                                                            {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,index) => {
                                                                return(
                                                                <section className="flex gap-x-4 mt-3 text-gray-600  whitespace-nowrap" key={index}>
                                                                    <button  onClick={()=>setCurrentCategory(sub_sub.name)} className={`hover:text-red-500 ${currentCategory === sub_sub.name && "text-red-500"} font-sans cursor-pointer`} >{sub_sub.name}</button>
                                                                </section>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        )
                    })}

                    <div className="bg-gray-100 flex gap-x-4 w-full h-auto absolute bottom-0 py-4 px-4">
                        <button onClick={()=>  router.push({pathname : "/search" , query : {...query , category:currentCategory }}) & closeCategory() & setIsOpen(false)} className="bg-gray-700 font-sans text-sm text-gray-100 py-3 rounded-md w-3/4 text-center" >
                                اعمال فیلتر 
                        </button>
                        <button onClick={()=> {delete query.priceMin & delete query.priceMax &  router.push({pathname : "/search" , query : {...query}}) & closeCategory() & setIsOpen(false)}}  className="w-1/4 border border-gray-700 rounded-md text-sm font-sans  py-3">حذف</button>

                    </div>
                </section>

        </>
    );
}
 
export default Header;