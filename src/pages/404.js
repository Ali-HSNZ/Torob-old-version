import Layout from "@/layout/Layout";
import Link from "next/link";
import Head from 'next/head'

const notFoundPage = () => {
    return ( 
        <Layout isFooter={true} pageTitle={"صفحه  یافت نشد | خطای ۴۰۴"}>
            <div className=" flex justify-center items-center mb-8">
                <div className="px-4">
                    <title>Page Not Found</title>
                    <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" className="p-2"/>
                    <h1 className="error-text mt-5 font-sans text-2xl font-bold">صفحه مورد نظر یافت نشد</h1>
                    <p className="text font-sans mt-4  font-bold">لطفا بررسی کنید که آدرس سایت به درستی نوشته شده باشد. </p>
                    <Link href="/">
                        <a className="error block font-sans mt-4 font-bold text-red-600" > به فروشگاه بازگردید </a>
                    </Link>
                </div>
            </div>
        </Layout>
     );
}
 
export default notFoundPage;