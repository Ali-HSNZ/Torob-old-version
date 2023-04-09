import Link from "next/link";
import myket_Logo from '/src/images/myket_logo.png'

import { TiSocialLinkedin , TiSocialTwitter } from 'react-icons/ti';
import { IoLogoInstagram } from 'react-icons/io';


const Footer = () => {
    return (  
       <>
            <section className="w-full h-auto bg-gray-50 flex justify-between flex-col lg:flex-row">
                <section className="w-full lg:w-1/2 flex lg:gap-0 gap-x-16 lg:justify-between p-5 md:p-10">
                    <div className="flex flex-col gap-y-2">
                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">پنل فروشگاه‌ها</a>
                        </Link>
                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">ثبت فروشگاه</a>
                        </Link>
                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">فروشگاه‌ها</a>
                        </Link>
                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">پیگیری سفارش از فروشگاه</a>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">قوانین و مقررات</a>
                        </Link>

                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">درباره ترب</a>
                        </Link>

                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">تماس با ما</a>
                        </Link>

                        <Link href={"#"}>
                            <a className="hover:text-red-600 font-iranyekan-regular text-xs sm:text-sm text-gray-600 py-1">پیشنهادات و گزارش خطا</a>
                        </Link>
                    </div>
                </section>
                <section className="w-full lg:w-1/2 flex  justify-center lg:justify-end gap-x-5 px-3 pb-10 lg:p-10">
                    {/* // E-namad */}
                    <Link href={"https://trustseal.enamad.ir/?id=138365&amp;Code=2OsRoKxZQ7hUgxPQJnPc"}>
                        <a className="p-4 bg-white rounded-md  hover:opacity-80 cursor-pointer">
                            <img className="w-24 font-iranyekan-regular text-sm" alt="لوگو E-namd" src="https://bsma.ir/wp-content/uploads/2017/08/enamad_icon__text_color_blue_1024-768x768-180x180.png"/> 
                        </a>
                    </Link>
                    <Link href={"https://trustseal.enamad.ir/?id=138365&amp;amp;Code=2OsRoKxZQ7hUgxPQJnPc"}>
                        <a className="p-4 bg-white rounded-md  hover:opacity-80 cursor-pointer">
                            <img className="w-24 font-iranyekan-regular text-sm" alt="لوگو ساماندهی پایگاه های اینترنتی" src="https://www.p30web.org/wp-content/uploads/2017/02/p30web-samandehi.png"/> 
                        </a>
                    </Link>
                    <Link href={"https://ecunion.ir/verify/torob.com?token=25505395eb0f464137f1"}>
                        <a className="p-4 bg-white rounded-md  hover:opacity-80 cursor-pointer">
                            <img className="w-24 font-iranyekan-regular text-sm" alt="لوگو اتحادیه کشوری کسب و کارهای مجاز" src="https://torob.com/static/images/etehadiye.png"/>
                        </a>
                    </Link>
                </section>
            </section>

            <hr/>

            <section className="bg-gray-50 w-full flex flex-col lg:flex-row justify-between p-5 md:p-10 items-center">
                <div className="w-full lg:w-1/2 flex items-center justify-between lg:justify-start">
                    <h5 className="text-gray-600 font-iranyekan-regular text-xs sm:text-base">ترب، موتور جستجوی هوشمند خرید</h5>
                    <div className="flex mr-5 gap-x-2">
                        <Link href={"https://www.linkedin.com/company/torob/"}>
                            <a>
                                <TiSocialLinkedin size={25} className="cursor-pointer hover:text-red-600 text-gray-500 "/>
                            </a>
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href={"https://twitter.com/torob_ir"}>
                            <a>
                                <TiSocialTwitter size={25} className="cursor-pointer hover:text-red-600 text-gray-500 "/>
                            </a>
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href={"https://www.instagram.com/torob_official"}>
                            <a>
                                <IoLogoInstagram size={25} className="cursor-pointer hover:text-red-600 text-gray-500 "/>
                            </a>
                        </Link>
                    </div>

                </div>
                <div className="flex w-full h-auto lg:w-1/2 justify-center lg:justify-end gap-x-2  sm:gap-x-5 mt-5 lg:m-0">
                    {/* Google Play */}
                    <Link href={"https://play.google.com/store/apps/details?id=ir.torob"}>
                        <a className=" hover:opacity-80 w-1/3 h-auto  sm:w-40 sm:h-12">
                            <img className="h-full cursor-pointer font-iranyekan-regular text-sm" alt="لوگو گوگل پلی" src="https://lh3.googleusercontent.com/RyLoNcOmb91IxHIP9NWfC82chbsCsT-5R25efns1FmuM8xz6znE4CRjIEBosZ1FH2xG1UqH6Axyp-vPFnm4sazbrsaB-S0QT_cN9uWU9UKoSQYCjYQ=s0"/>
                        </a>
                    </Link>

                    {/* Cafe Bazzar */}
                    <Link href={"https://cafebazaar.ir/app/ir.torob"}>
                        <a className="hover:opacity-80 w-1/3 h-auto  sm:w-40 sm:h-12">
                            <img className=" cursor-pointer font-iranyekan-regular text-sm" src="https://cdn.developers.cafebazaar.ir/2021/05/bazaar-badge2.png" alt="لوگو کافه بازار" />
                        </a>
                    </Link>

                    {/* Myket */}
                    <Link href={"https://myket.ir/app/ir.torob"}>
                        <a className=" hover:opacity-80 w-1/3 h-auto  sm:w-40 sm:h-12  ">
                            <img className="cursor-pointer font-iranyekan-regular text-sm" src={myket_Logo.src} alt="لوگو مایکت" />
                        </a>
                    </Link>
                </div>
            </section>
       </>
    );
}
 
export default Footer;