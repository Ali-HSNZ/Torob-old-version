import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { addToCartSuccess } from '@/redux/cart/cart/cartActions'
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from '@/redux/categories/categoriesActions'
import { wrapper } from '@/redux/store'
import { authFailure, authRequest, authSuccess } from '@/redux/user/userActions'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import http, { requestError, returnTokenInServerSide } from 'src/services/http'

export default function Home(){
     const [value , setValue] = useState("")
     const router = useRouter()
     const handlePath = (e,inputValue) => {
          e.preventDefault()
          router.push({pathname : "/search",search : "query="+inputValue})
     }
     return (
          <>
               <Head><title>ترب | بهترین قیمت بازار</title></Head>
               <Header/>
               <section className='absolute top-0 bottom-0  w-full flex justify-center flex-col items-center '>
                    <article className='flex items-center  justify-center px-4'>
                         <div className='w-24'>
                              <img className='w-full h-auto' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OCIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDg4IDg4Ij4KICAgIDxnIGZpbGw9Im5vbmUiPgogICAgICAgIDxwYXRoIGZpbGw9IiNFOTFFMzMiIGQ9Ik03OS4yNDUgMjAuMzIybC0uNjI3LjcyNmMtMi40NzQgMi42NTYtNS44MTQgNC4yLTkuNDYyIDQuMzEzLS4xNi4wMjMtLjM0Mi4wMjMtLjUwMi4wMjMtLjQ1NiAwLS44NzgtLjAyMy0xLjMxLS4wNjggOC41OTUgMTAuMSA5Ljg5NSAyNC45NjggMi4yMjIgMzYuNTc5LTcuNjM4IDExLjU0Mi0yMS43NzQgMTYuMjUyLTM0LjQyOCAxMi40ODRoLS4wOGMtNS4xMy0xLjM0LTEwLjk0NC42OC0xNC4wMjIgNS40MTQgMy4xOTItNC44NDcgMi43MzYtMTEuMDU1LS43OTgtMTUuMzIydi0uMDQ1Yy04LjMzMy0xMC4wNzktOS40NzMtMjQuNzItMS44Ny0zNi4xNkMyNi42OTIgMTUuNjcgNDIuNzY2IDExLjIyIDU2LjE5NSAxNy4wMzFjLS41Ny0xLjQ3Ni0uOTM1LTMuMDY1LTEuMDI2LTQuNjg4LS4xMTQtMi45NS43NDEtNS43ODggMi4zNzEtOC4xNzEtMTguMDEyLTUuOTAyLTM4LjUzMi41NjctNDkuNDc2IDE3LjEzN0MtNS4xMDQgNDEuMTcxLjQyNSA2Ny44NDIgMjAuMjYxIDgwLjg5M2MxOS44ODIgMTMuMDY0IDQ2LjU5MiA3LjUwMiA1OS43MDItMTIuMjQ2IDEwLjAzMi0xNS4xNzQgOS4xNzctMzQuMzMxLS43MDctNDguMzQ4bC0uMDExLjAyM3oiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjQkYwRjIyIiBkPSJNMzEuOTY5IDEwLjIyYy0xMC45MSAxLjA4LTIwLjQ2MyA1LjcyMS0yNC4wNTQgMTEuMTkxQy01LjE5NSA0MS4yMTYuMyA2Ny44NTMgMjAuMTkzIDgwLjkwNWwuNzMtMS4xMTJjMy4xOTEtNC44NDcgMi43MzUtMTEuMDU1LS43OTktMTUuMzIydi0uMDQ1Yy04LjIyLTEwLjA3OS05LjM2LTI0LjcyLTEuODM1LTM2LjE2QzI2LjYxIDE1LjY3IDQyLjY4NSAxMS4yMiA1Ni4xMTQgMTcuMDMxYzAgMC0xMS40LTguMDU5LTI0LjEyMi02LjgxaC0uMDIzeiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM2RkJDMjMiIGQ9Ik02Mi41NDQgMjIuMzJzLS4zNDItNC4wODYgMS40ODItNy4wMzdjMS44MjQtMi45NTEgNS43LTUuODQ1IDEwLjYwMi01LjUzOSA0LjkyNS4zMDcgNS43MjMgMS40NDIgNS43MjMgMS40NDJzLjExNCAzLjk3Mi0xLjI1NCA2LjI0Mi00LjIxOCA1LjYwNi04LjMyMiA2LjQ0NmMtNC4xMDQuODI5LTguMjMxLTEuNTU1LTguMjMxLTEuNTU1eiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM1MTlBMjMiIGQ9Ik02MS4wNjIgMjEuMTczcy0uNDU2LTMuOTcyIDIuMjgtNy45NDRjMi43MzYtMy45NzMgNS43LTQuNTYzIDUuNy00LjU2M1M2OC43IDMuMjE4IDY2LjA3OC42MDhjLjIyOC0uMDU3LTMuMTI0LjA4LTYuMDQyIDMuMjkxLTIuNTc3IDIuODE1LTQuMTA0IDcuMjY0LTIuOTY0IDExLjU3NyAxLjE0IDQuMzEyIDMuOTkgNS42OTcgMy45OSA1LjY5N3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=='/>
                         </div>
                         <div className='mr-4 flex flex-col gap-y-2'>
                         <p className='text-[#d73948] text-[35px] sm:text-[40px] font-sans font-bold'>ترب</p>
                         <p className='text-gray-500 text-sm font-sans'>مقایسه قیمت میلیون ها محصول بین هزاران فروشگاه</p>
                         </div>
                    </article>
                    <main className='mt-8 w-full flex justify-center relative '>
                         <form method='get' className='w-full flex  justify-center' onSubmit={(e)=>handlePath(e,value)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 relative right-10 top-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" >
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>
                              <input onChange={input => setValue(input.target.value)} className='bg-white text-gray-700 w-9/12 sm:w-[470px] font-sans  h-12 focus:ring-0 text-base pr-12 focus:outline-none focus:border-gray-300 rounded-md border-gray-300 outline-none' type="text" placeholder='نام کالا را وارد کنید'/>
                         </form>
                    </main>
               </section>
               <Footer/>
          </>
     )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({req}) => {
     const token = returnTokenInServerSide({cookie : req.headers.cookie})
     if(!token.includes("undefined")){
          // Fetch User Data
          await http.get("user", {headers : {authorization : token}})
          .then(({data}) => {
               dispatch(addToCartSuccess(data))
               dispatch(authSuccess(data.user))
          })
          .catch(error => dispatch(authFailure("خطا در بخش احراز هویت")))
     }
     // Fetch Categories
     await http.get(`public/categories`)
     .then(({data}) => dispatch(fetchCategoriesSuccess(data)))
     .catch(() => dispatch(fetchCategoriesFailure("خطا در بخش گرفتن لیست دسته بندی‌ها ")))
});