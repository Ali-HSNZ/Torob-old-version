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
                <Link href={'/store/manage-products'}>
                    <a  className={` ${router.asPath.startsWith('/store/manage-products') ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-100"} flex items-center pr-8 py-3 hover:bg-gray-100`}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                        <span className="font-sans mr-2 font-bold text-sm text-gray-900">تنظیمات</span>
                    </a>
                </Link>


            </div>

        </aside>
    );
}
 
export default ManageStoreAside;