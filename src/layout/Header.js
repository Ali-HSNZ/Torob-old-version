import { Modal } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io";

const Header = () => {
    const [data,setData] = useState(null)
    const [isOpen , setIsOpen] = useState(false)
    const [isModal , setIsModal] = useState(false)
    const router = useRouter()
    const {query} = router.query || ""
    
    const [inputValue , setInputValue] = useState(query)
    
    const  closeCategory = () => {
        const allData = [...data]
        allData.forEach(category => {
            category.status = false;
        });
        setData(allData);
        setIsOpen(false)
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



    useEffect(()=> {
        const getData = async() => {
            const {data} = await axios.get('https://project-torob-clone.iran.liara.run/api/categories').then(res => res.data)
            setData(data)
        }
        getData()
    },[])


    return (  
            <section className=" py-4 bg-gray-50">
                <div onClick={()=>{closeCategory() } } className={`fixed ${isOpen? "" : "hidden"}  inset-0 mt-36  h-full w-full z-10`}></div>

                <Modal
                open={isModal}
                onClose={()=>setIsModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <section className="w-full absolute top-[50%] px-4 left-[50%] translate-y-[-50%]  translate-x-[-50%] sm:w-[500px] ">
                    <div className="bg-[#ffffff] rounded-md p-4">
                        <button className="flex w-fit justify-end float-left" onClick={()=> setIsModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <hr className="mt-8 border border-gray-200"/>
                        <div className="mt-[-15px] font-sans w-full flex justify-center">
                            <span className="bg-white px-3 text-gray-600 text-sm">ورود یا ثبت نام</span>
                        </div>
                        <section className="mt-4 px-10">
                            <p className="font-sans text-sm font-bold  ">شماره موبایل</p>
                            <input dir="ltr" className="w-full mt-3 font-sans  py-2 bg-gray-50 text-sm p-4  rounded-md border border-gray-300 outline-none"/>
                            <div className="w-full flex justify-center items-center mt-6 ">
                                <button className="w-10/12 py-1.5 text-gray-200 rounded-md font-sans bg-red-700 text-sm">دریافت کد تایید</button>
                            </div>
                            <p className="text-xs w-full font-sans mt-4">
                                <span>ثبت نام در ترب به معنی موافقت</span>
                                <span className="text-blue-700"> با شرایط استفاده از ترب</span>
                                <span> است. </span> 
                            </p>
                            <p className="text-xs text-center pb-4 w-full font-sans mt-4 text-blue-700">قبلا در ترب حساب کاربری داشتم</p>

                        </section>
                    </div>
                </section>
            </Modal>   

            
                <div className="flex justify-between items-center px-4 md:px-8">
                    <button className="p-2 rounded-md bg-white md:hidden" onClick={()=>setIsOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <section className="flex items-center justify-end">
                        <div className="w-14 md:w-16">
                            <img className="w-full h-auto" src={'https://storage.irantalent.com/brand-data/brand_data_7903eDd_603e2f4ab6949.png?w=120'}/>
                        </div>
                        <span className="text-[#d73948] font-bold text-[24px] font-sans mr-1">ترب</span>
                    </section>
                    <section className="w-full hidden pr-6 md:flex md:justify-center lg:justify-start items-center">
                            <input className="w-1/2 py-3 sm:w-9/12 font-sans border lg:w-[420px] border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                            <button className="bg-[#d73948] py-3 px-5 rounded-l-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                    </section>
                    <button onClick={()=> setIsModal(true)} className="whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">ورود / ثبت نام</button>
                </div>
                <section className="w-full flex md:hidden px-4 md:px-8 mt-4 md:justify-center items-center">
                            <input className="w-full py-2  font-sans border  border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                            <button className="bg-[#d73948] py-2 px-5 rounded-l-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                </section>
                <section className="hidden md:flex  gap-x-6 mt-4 font-sans px-4 md:px-8 text-sm">
                            {
                                data&&data.map((category,index) => {
                                    return(
                                        <nav className="flex gap-x-4 " key={index}>
                                            <a  className="hover:text-red-500  cursor-pointer font-sans text-gray-700" onClick={()=> handleCategory(category.id)}>{category.name}</a>
                                            <div className={`${category.status ? "" : "hidden"} z-40 absolute  mx-10 right-0 left-0 rounded-md top-36`}>
                                            
                                                <div className="pb-4 bg-gray-50">
                                                    <nav className="px-5 py-4">
                                                        <a href="#" className="hover:text-red-500 font-bold font-sans text-gray-700">{category.name}</a>
                                                    </nav>
                                                    <hr/>
                                                        {category.sub_categories.length > 0 && category.sub_categories.map((sub,index) => {
                                                                return(
                                                                    <div className="mr-100 mt-4 w-fit pr-4 " key={index}>
                                                                        <nav className="flex gap-x-4 ">
                                                                            <a className="hover:text-red-500 font-sans font-bold cursor-pointer " >{sub.name}</a>
                                                                        </nav>
                                                                        {sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,index) => {
                                                                            return(
                                                                                <nav className="flex gap-x-4 mr-4 mt-2 text-gray-600" key={index}>
                                                                                    <a className="hover:text-red-500 font-sans cursor-pointer" >{sub_sub.name}</a>
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

                <section className={`fixed  ${isOpen ? "" : "hidden"} mt-5 overflow-y-scroll z-40 sm:hidden w-1/2 bg-gray-50 h-full`}>

                    <p className="relative  font-sans text-sm text-gray-600  top-3 px-5">دسته بندی ها : </p>

                    <div className="flex py-4 gap-x-4 mt-4 z-20 w-full whitespace-nowrap overflow-x-auto px-3">                    
                        {data&&data.map((category,index) => {
                            return(
                                <a key={index}  className="hover:text-red-500 text-sm bg-gray-100 border px-4 py-1 rounded-md border-gray-300 cursor-pointer flex font-sans text-gray-500" onClick={()=> handleCategory(category.id)}>{category.name}</a>
                            )
                        })}
                    </div>
                    {
                    data&&data.map((category,index) => {
                        return(
                            <aside className="flex gap-x-4 h-auto overflow-y-auto" key={index}>

                                <div className={`${category.status ? "" : "hidden"} z-30 h-full absolute px-5 right-0 left-0 rounded-md`}>
                                
                                    <div className="bg-gray-50 ">
                                        <nav className="py-4">
                                            <a href="#" className="hover:text-red-500 font-bold font-sans text-gray-700">{category.name}</a>
                                        </nav>
                                        <hr/>
                                        <div className=" overflow-y-auto h-full overflow-x-auto">
                                            {category.sub_categories.length > 0 && category.sub_categories.map((sub,index) => {
                                                    return(
                                                        <div className="mt-4 overflow-x-auto pb-3" key={index}>
                                                            <nav className="flex gap-x-4 ">
                                                                <a className="hover:text-red-500 font-sans font-bold cursor-pointer " >{sub.name}</a>
                                                            </nav>
                                                            {sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,index) => {
                                                                return(
                                                                <nav className="flex gap-x-4 mt-2 text-gray-600  whitespace-nowrap" key={index}>
                                                                    <a className="hover:text-red-500  cursor-pointer" >{sub_sub.name}</a>
                                                                </nav>
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
                    
                </section>


            </section>

        
    );
}
 
export default Header;