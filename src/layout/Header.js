import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import Login from "@/components/Login";
import { toPersianDigits } from "@/utils/toPersianDigits";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { userLogout , authPanel} from "src/redux/user/userActions";

const Header = () => {
    const [categories,setCategories] = useState(null)
    const [isCategoryPanel , setIsCategoryPanel] = useState(false)
    const router = useRouter()
    const  {query} = useRouter()
    const {user , loading} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [inputValue , setInputValue] = useState(query.query)
    const [userPanel , setUserPanel] = useState(false)

    const  closeCategory = () => {
        const allCategories = categories && categories.length > 0 ? [...categories] : []
        allCategories.forEach(category =>category.status = false);
        setCategories(allCategories);
        setIsCategoryPanel(false)
    }

    function handleCategory(id){
        closeCategory()
        const index = categories.findIndex(p => p.id === id)
        const category = {...categories[index]}
        category.status = true
        const allCategories = [...categories]
        allCategories[index] = category;
        setCategories(allCategories);
        setIsCategoryPanel(true)
    }

    const [currentCategory , setCurrentCategory] = useState('')


    useEffect(()=> {
        const getData = async() => {
            const {data} = await axios.get('https://project-torob-clone.iran.liara.run/api/categories').then(res => res.data)
            setCategories(data)
        }
        getData()
    },[])

    return (  
        <section className=" py-4 bg-gray-50">
            <div onClick={()=>{closeCategory() } } className={`fixed ${isCategoryPanel? "" : "hidden"}  inset-0 mt-36  h-full w-full z-10`}></div>
            <div onClick={()=> setUserPanel(false)} className={`fixed ${userPanel? "" : "hidden"} bg-[#44444438] inset-0  h-full w-full z-10`}></div>

            {user && user.phone_number ? <></> : <Login/>} 

            {/* //? Header =>  */}
            <div className="flex justify-between items-center px-4 md:px-8">
                   
            {/* //? Logo =>  */}

                <section className="flex items-center justify-end">
                    {categories && categories.length > 0 && <button className="flex items-center sm:hidden ml-4 justify-center p-2 bg-white" onClick={()=>setIsCategoryPanel(!isCategoryPanel)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>}

                    <Link href={'/'}>
                        <a className="flex items-center justify-center">
                            <div className="w-12 md:w-14">
                                <img className="w-full h-auto" src={'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OCIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDg4IDg4Ij4KICAgIDxnIGZpbGw9Im5vbmUiPgogICAgICAgIDxwYXRoIGZpbGw9IiNFOTFFMzMiIGQ9Ik03OS4yNDUgMjAuMzIybC0uNjI3LjcyNmMtMi40NzQgMi42NTYtNS44MTQgNC4yLTkuNDYyIDQuMzEzLS4xNi4wMjMtLjM0Mi4wMjMtLjUwMi4wMjMtLjQ1NiAwLS44NzgtLjAyMy0xLjMxLS4wNjggOC41OTUgMTAuMSA5Ljg5NSAyNC45NjggMi4yMjIgMzYuNTc5LTcuNjM4IDExLjU0Mi0yMS43NzQgMTYuMjUyLTM0LjQyOCAxMi40ODRoLS4wOGMtNS4xMy0xLjM0LTEwLjk0NC42OC0xNC4wMjIgNS40MTQgMy4xOTItNC44NDcgMi43MzYtMTEuMDU1LS43OTgtMTUuMzIydi0uMDQ1Yy04LjMzMy0xMC4wNzktOS40NzMtMjQuNzItMS44Ny0zNi4xNkMyNi42OTIgMTUuNjcgNDIuNzY2IDExLjIyIDU2LjE5NSAxNy4wMzFjLS41Ny0xLjQ3Ni0uOTM1LTMuMDY1LTEuMDI2LTQuNjg4LS4xMTQtMi45NS43NDEtNS43ODggMi4zNzEtOC4xNzEtMTguMDEyLTUuOTAyLTM4LjUzMi41NjctNDkuNDc2IDE3LjEzN0MtNS4xMDQgNDEuMTcxLjQyNSA2Ny44NDIgMjAuMjYxIDgwLjg5M2MxOS44ODIgMTMuMDY0IDQ2LjU5MiA3LjUwMiA1OS43MDItMTIuMjQ2IDEwLjAzMi0xNS4xNzQgOS4xNzctMzQuMzMxLS43MDctNDguMzQ4bC0uMDExLjAyM3oiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjQkYwRjIyIiBkPSJNMzEuOTY5IDEwLjIyYy0xMC45MSAxLjA4LTIwLjQ2MyA1LjcyMS0yNC4wNTQgMTEuMTkxQy01LjE5NSA0MS4yMTYuMyA2Ny44NTMgMjAuMTkzIDgwLjkwNWwuNzMtMS4xMTJjMy4xOTEtNC44NDcgMi43MzUtMTEuMDU1LS43OTktMTUuMzIydi0uMDQ1Yy04LjIyLTEwLjA3OS05LjM2LTI0LjcyLTEuODM1LTM2LjE2QzI2LjYxIDE1LjY3IDQyLjY4NSAxMS4yMiA1Ni4xMTQgMTcuMDMxYzAgMC0xMS40LTguMDU5LTI0LjEyMi02LjgxaC0uMDIzeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM2RkJDMjMiIGQ9Ik02Mi41NDQgMjIuMzJzLS4zNDItNC4wODYgMS40ODItNy4wMzdjMS44MjQtMi45NTEgNS43LTUuODQ1IDEwLjYwMi01LjUzOSA0LjkyNS4zMDcgNS43MjMgMS40NDIgNS43MjMgMS40NDJzLjExNCAzLjk3Mi0xLjI1NCA2LjI0Mi00LjIxOCA1LjYwNi04LjMyMiA2LjQ0NmMtNC4xMDQuODI5LTguMjMxLTEuNTU1LTguMjMxLTEuNTU1eiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM1MTlBMjMiIGQ9Ik02MS4wNjIgMjEuMTczcy0uNDU2LTMuOTcyIDIuMjgtNy45NDRjMi43MzYtMy45NzMgNS43LTQuNTYzIDUuNy00LjU2M1M2OC43IDMuMjE4IDY2LjA3OC42MDhjLjIyOC0uMDU3LTMuMTI0LjA4LTYuMDQyIDMuMjkxLTIuNTc3IDIuODE1LTQuMTA0IDcuMjY0LTIuOTY0IDExLjU3NyAxLjE0IDQuMzEyIDMuOTkgNS42OTcgMy45OSA1LjY5N3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=='}/>
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

                    <section className="w-full sm:w-fit flex justify-end relative z-20">
                    {user && user.phone_number ? (
                        <>
                            <button  onClick={()=>closeCategory() & setUserPanel(!userPanel)} className="whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm min-w-[121px] max-w-[121px]">{toPersianDigits(user.phone_number)}</button>
                            <div className={`bg-white rounded-b-md ${userPanel ? "" : "hidden"} absolute  top-[39px] left-[1px]  whitespace-nowrap py-2`}>
                                <Link href={'/user/analytics'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">تغیرات قیمت</a>
                                </Link>
                                <Link href={'/user/favorites'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">محبوب‌ها</a>
                                </Link>
                                <Link href={'/user/history'} >
                                    <a className="text-xs cursor-pointer hover:bg-gray-200 px-[22px] font-bold text-gray-700 py-1.5 text-center font-sans block">مشاهدات اخیر</a>
                                </Link>
                                <button onClick={()=> {dispatch(userLogout()) ; dispatch(authPanel(false)) ;  dispatch(authPanel(false))}} className="text-xs cursor-pointer hover:bg-red-100 px-6 font-bold text-red-600 w-full py-1.5 text-center font-sans ">
                                   خروج
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {!loading ? (
                                <button onClick={()=>  dispatch(authPanel(true))} className="whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">ورود / ثبت نام</button>
                            ) : (
                                <button className="whitespace-nowrap rounded-md border  text-gray-800  border-gray-300 bg-white px-4 md:py-3 py-2 font-sans text-sm">...</button>
                            )}
                        </>
                    )}
                </section>
               
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
                    {categories && categories.length > 0 && categories.map((category,index) => <BigScreenMenu setUserPanel={setUserPanel} closeCategory={closeCategory} key={index} handleCategory={handleCategory}  category={category}  customClassname={"z-40 absolute mx-10 right-0 left-0 rounded-md top-[150px]"} />)}
                </section>

                {/* //?  Menu For Responsive  ==> */}
                <SmallScreenMenu isCategoryPanel={isCategoryPanel} setIsCategoryPanel={setIsCategoryPanel} closeCategory={closeCategory} categories={categories} handleCategory={handleCategory} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory}/>


            </section>

        
    );
}
 
export default Header;