import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const [value , setValue] = useState("")
  
  const router = useRouter()

  const handlePath = (e,inputValue) => {
      e.preventDefault()
      router.push({
        pathname : "/search",
        search : "query="+inputValue,
      })
  }

  return (
      <>
            <Header/>
              <section className='absolute top-0 bottom-0  w-full flex justify-center flex-col items-center '>
                  <article className='flex items-center  justify-center px-4'>
                      <div className='w-24'>
                        <img className='w-full h-auto' src='https://storage.irantalent.com/brand-data/brand_data_7903eDd_603e2f4ab6949.png?w=120'/>
                      </div>
                    <div className='mr-4 flex flex-col gap-y-2'>
                      <p className='text-[#d73948] text-[35px] sm:text-[40px] font-sans font-bold'>ترب</p>
                      <p className='text-gray-500 text-sm font-sans'>مقایسه قیمت میلیون ها محصول بین هزاران فروشگاه</p>
                    </div>
                  </article>
                  <section className='mt-8 w-full flex justify-center relative '>
                    
                    <form method='get' className='w-full flex  justify-center' onSubmit={(e)=>handlePath(e,value)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 relative right-10 top-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                          </svg>
                            <input onChange={input => setValue(input.target.value)} className='bg-white text-gray-700 w-9/12 sm:w-[470px] font-sans  h-12 focus:ring-0 text-base pr-12 focus:outline-none focus:border-gray-300 rounded-md border-gray-300 outline-none' type="text" placeholder='نام کالا را وارد کنید'/>
                    </form>

                  </section>
              </section>
            <Footer/>
      </>
  )
}
