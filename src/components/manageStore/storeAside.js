import Link from "next/link";
import { useRouter } from "next/router";

const ManageStoreAside = ({isMobileScreen , setIsMobileScreen  , mobileScreenClassName }) => {

    const router = useRouter()

    return (  
        <aside className={`${mobileScreenClassName ? mobileScreenClassName : "w-1/5"}   h-screen bg-white ${isMobileScreen ? "lg:hidden" : "hidden"} sticky top-0 lg:flex flex-col overflow-y-auto`}>
            
           {isMobileScreen && (
                <section>
                    <div className="px-4 mt-6 flex w-full">
                        <button onClick={()=> setIsMobileScreen(false)}>
                            <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h6 className="text-sm  text-center w-full font-sans text-gray-800 ">منو</h6>
                    </div>
                    <hr className="mt-5"/>
                </section>
           )}

            <div className="py-3">
                <Link href={'/store/manage-product'}>
                    <a  className={` ${router.asPath.startsWith('/admin/store/manage-product') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت کالا</span>
                    </a>
                </Link>
                

                <Link href={'/store/manage-order'}>
                    <a className={` ${router.asPath.startsWith('/store/manage-order') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                        <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        <span className="font-sans mr-2 font-bold text-sm text-gray-900">مدیریت سفارشات</span>
                    </a>
                </Link>

                <Link href={'/store/setting'}>
                    <a className={` ${router.asPath.startsWith('/store/setting') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
                        <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                        <span className="font-sans mr-2 font-bold text-sm text-gray-900">تنظیمات</span>
                    </a>
                </Link>


            </div>

        </aside>
    );
}
 
export default ManageStoreAside;