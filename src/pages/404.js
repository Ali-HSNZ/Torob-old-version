import Link from "next/link";

const notFoundPage = () => {
    return ( 
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="px-4">
                <title>Page Not Found</title>
                <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" className="p-2"/>
                <h1 className="error-text mt-5 font-sans text-2xl font-bold">صفحه مورد نظر یافت نشد</h1>
                <p className="text font-sans mt-4  font-bold">لطفا بررسی کنید که آدرس سایت به درستی نوشته شده باشد. </p>
                <Link href="/">
                    <a class="error block font-sans mt-4 font-bold text-red-600" > به فروشگاه بازگردید </a>
                </Link>

            </div>
        </div>
     );
}
 
export default notFoundPage;