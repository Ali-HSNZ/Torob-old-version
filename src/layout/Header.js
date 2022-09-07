import { Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
    const [data,setData] = useState(null)
    const [isOpen , setIsOpen] = useState(false)
    const [isModal , setIsModal] = useState(false)
    const router = useRouter()
    const  {query} = useRouter()
    
    const [inputValue , setInputValue] = useState(query.query)
    
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

    const [currentCategory , setCurrentCategory] = useState('')


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

            {/* //? Header =>  */}
                <div className="flex justify-between items-center px-4 md:px-8">
                   
            {/* //? Logo =>  */}

                    <section className="flex items-center justify-end">
                        <div onClick={()=> setIsOpen(true)} className="md:hidden">
                            <svg  className="w-6 h-6 ml-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>

                        <div className="w-14 md:w-16">
                            <img className="w-full h-auto" src={'https://storage.irantalent.com/brand-data/brand_data_7903eDd_603e2f4ab6949.png?w=120'}/>
                        </div>
                        <span className="text-[#d73948] font-bold text-[24px] font-sans mr-1">ترب</span>
                    </section>

            {/* //? Input Search =>  */}

                    <form onSubmit={(e)=> {e.preventDefault() ; router.push({pathname : "/search" , query : {query : inputValue}})}} method='get' className="w-full hidden pr-6 md:flex md:justify-center lg:justify-start items-center">
                            <input className="w-1/2 py-3 sm:w-9/12 font-sans border lg:w-[420px] border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                            <button className="bg-[#d73948] py-3 px-5 rounded-l-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                    </form>


                    <button onClick={()=> setIsModal(true)} className="whitespace-nowrap rounded-md border border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">ورود / ثبت نام</button>
               
                </div>

            {/* //? Mobile Search Input For Mediom With =>  */}
                <section className="w-full flex md:hidden px-4 md:px-8 mt-4 md:justify-center items-center">
                            <input className="w-full py-2  font-sans border  border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                            <button className="bg-[#d73948] py-2 px-5 rounded-l-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                </section>
            
    
                {/* //?  Menu For Windows  ==> */}

                <section className="hidden md:flex px-5 gap-x-6 font-sans text-sm mt-6">
                        {
                            data&&data.map((category,index) => {
                                return(
                                    <nav className="flex gap-x-4 rela" key={index}>
                                        <button  className="hover:text-red-500  cursor-pointer font-sans text-gray-500" onClick={()=> handleCategory(category.id) & setIsModal(false)}>{category.name}</button>
                                        <div className={`${category.status ? "" : "hidden"} z-40 absolute mx-10 right-0 left-0 rounded-md top-[150px]`}>
                                        
                                            <div className="bg-gray-50 pb-4">
                                                <nav className="px-5 py-4">
                                                    <Link href={{pathname : '/search' , query : {query:category.name}}}>
                                                        <a className="hover:text-red-500 font-bold font-sans text-gray-700">{category.name}</a>
                                                    </Link>
                                                </nav>
                                                <hr/>
                                                {category.sub_categories.length > 0 && category.sub_categories.map((sub,index) => {
                                                        return(
                                                            <div className="mr-10 mt-4" key={index}>
                                                                <nav className="flex gap-x-4 ">
                                                                <Link href={{pathname : '/search' , query : {query:sub.name}}}>
                                                                    <a className="hover:text-red-500 font-sans font-bold cursor-pointer " >{sub.name}</a>
                                                                </Link>
                                                                </nav>
                                                                {sub.sub_categories && sub.sub_categories.length > 0 && sub.sub_categories.map((sub_sub,index) => {
                                                                    return(
                                                                        <nav className="flex gap-x-4 mr-4 mt-2 text-gray-600" key={index}>
                                                                            <Link href={{pathname : '/search' , query : {query:sub_sub.name}}}>
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
                {/* //?  Menu For Responsive  ==> */}


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

            </section>

        
    );
}
 
export default Header;