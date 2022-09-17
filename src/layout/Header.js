import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import Login from "@/components/Login";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

const Header = () => {
    const [data,setData] = useState(null)
    const [isOpen , setIsOpen] = useState(false)
    const [isModal , setIsModal] = useState(false)
    const router = useRouter()
    const  {query} = useRouter()

    const user = useAuth()
    
    const [inputValue , setInputValue] = useState(query.query)
    
    const  closeCategory = () => {
        const allData = data && data.length > 0 ? [...data] : []
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

            {/* //? Header =>  */}
                <div className="flex justify-between items-center px-4 md:px-8">
                   
            {/* //? Logo =>  */}

                    <section className="flex items-center justify-end">
                        <button className="flex items-center sm:hidden ml-4 justify-center p-2 bg-white" onClick={()=>setIsOpen(!isOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>

                        <Link href={'/'}>
                            <a className="flex items-center justify-center">
                                <div className="w-14 md:w-16">
                                    <img className="w-full h-auto" src={'https://storage.irantalent.com/brand-data/brand_data_7903eDd_603e2f4ab6949.png?w=120'}/>
                                </div>
                                <span className="text-[#d73948] font-bold text-[24px] font-sans mr-1">ترب</span>
                            </a>
                        </Link>
                    </section>

            {/* //? Input Search =>  */}

                    <form onSubmit={(e)=> {e.preventDefault() ; router.push({pathname : "/search" , query : {query : inputValue}})}} method='get' className="w-full hidden lg:pr-6 sm:flex sm:justify-center lg:justify-start items-center">
                            <input className="bg-white text-gray-800 w-1/2 py-2 lg:py-3 sm:w-9/12 font-sans border lg:w-[420px] border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                            <button type={'submit'} className="bg-[#d73948] py-2 lg:py-3 px-5 rounded-l-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                    </form>

                    {user.data && user.data.phone_number ? (
                        <button  className="whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">{toPersianDigits(user.data.phone_number)}</button>
                    ) : (
                        <button onClick={()=> setIsModal(true)} className="whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">ورود / ثبت نام</button>
                    )}
               
                </div>

            {/* //? Mobile Search Input For Mediom With =>  */}
                <form onSubmit={(e)=> {e.preventDefault() ; router.push({pathname : "/search" , query : {query : inputValue}})}} method='get'  className="w-full flex sm:hidden px-4 sm:px-8 mt-4 sm:justify-center items-center">
                    <input className="bg-white text-gray-700 w-full py-2  font-sans border  border-gray-300 px-4" value={inputValue} onChange={input => setInputValue(input.target.value)} placeholder="نام کالا را وارد کنید"/>
                    <button className="bg-[#d73948] py-2 px-5 rounded-l-md  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
            
    
                {/* //?  Menu For Big Screen  ==> */}

                <section className="hidden sm:flex px-5 gap-x-6 font-sans text-sm mt-6">
                    {data&&data.map((category,index) => <BigScreenMenu key={index} handleCategory={handleCategory} setIsModal={setIsModal}  category={category}  customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-[150px]"} />)}
                </section>

                {/* //?  Menu For Responsive  ==> */}
                <SmallScreenMenu 
                    isOpen={isOpen} 
                    closeCategory={closeCategory} 
                    setIsOpen={setIsOpen} 
                    data={data} 
                    handleCategory={handleCategory}
                    setCurrentCategory={setCurrentCategory} 
                    currentCategory={currentCategory} 
                />


            </section>

        
    );
}
 
export default Header;