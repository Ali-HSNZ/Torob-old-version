import image1 from '@/images/indexPage/category/101.png'
import image2 from '@/images/indexPage/category/102.png'
import image3 from '@/images/indexPage/category/103.png'
import image4 from '@/images/indexPage/category/104.png'
import image5 from '@/images/indexPage/category/105.png'
import image6 from '@/images/indexPage/category/106.png'
import image7 from '@/images/indexPage/category/107.png'
import image8 from '@/images/indexPage/category/108.png'
import image9 from '@/images/indexPage/category/109.png'
import image10 from '@/images/indexPage/category/110.png'
import image11 from '@/images/indexPage/category/111.png'

const Category = () => {
    return (  
        <section className='px-10'>
            <h3 className="font-sans text-gray-600 font-bold tracking-wide text-xl w-full text-center mt-10">دسته‌بندی‌های ترب</h3>
            <section className='flex transition-all duration-150 flex-wrap gap-8 justify-center mt-10'>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image1.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>خودرو، ابزار و تجهیزات صنعتی</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image2.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کالای دیجیتال</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image3.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>موبایل</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image4.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>مد و پوشاک</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image5.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کالاهای سوپرمارکتی</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image6.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>محصولات بومی و محلی</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image7.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>اسباب بازی، کودک و نوزاد</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image8.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>زیبایی و سلامت</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image9.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>خانه و آشپزخانه</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image10.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>کتاب، لوازم تحریر و هنر</h6>
                </div>
                <div className='select-none w-[120px] md:w-[160px]'>
                    <img className='w-full h-auto' src={image11.src}/>
                    <h6 className='mt-4 text-gray-600 leading-6 text-center font-sans text-sm'>ورزش و سفر</h6>
                </div>

            </section>
        </section>
    );
}
 
export default Category;