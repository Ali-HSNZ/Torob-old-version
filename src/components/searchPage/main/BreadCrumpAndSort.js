import { removeHyphen } from '@/utils/global';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BreadCrumpAndSort = ({category , similarCategories}) => {

    const [currentFilter,setCurrentFilter] = useState("جدیدترین")
    const router = useRouter()
    const {query} = useRouter()
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const mainName = similarCategories && similarCategories.parent && removeHyphen(similarCategories.parent.title) !== removeHyphen(category) ? similarCategories.parent.title + " / " : "";
    const subName = similarCategories && similarCategories.sub1 && removeHyphen(similarCategories.sub1.title) !== removeHyphen(category) ? similarCategories.sub1.title + " / " : "";
    const sub_subName = similarCategories && similarCategories.sub2 && removeHyphen(similarCategories.sub2.title) !== removeHyphen(category) ? similarCategories.sub2.title + " / " : "";

    return (  
            <div className={`w-full flex ${category ? " justify-between" : "justify-end"}   z-0 font-iranyekan-regular relative items-center`}>
                {/* //? BreadCrump */}
                {query.category &&  <p className="py-4 text-xs text-gray-500">همه دسته ها / {`${mainName} ${subName}  ${sub_subName} ${sub_subName === category  ? "" : " / ",removeHyphen(category)}`}</p>}
                {/* //? Sort */}
                <div className="max-w-fit py-2 relative  cursor-pointer hidden  md:flex flex-col justify-end  items-end">
                
                    <Button sx={{fontFamily : 'iranyekan-medium' , fontSize : "14px", color : '#545353'}} id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} className="rounded-md text-sm">
                        {currentFilter}
                        <svg  className={`w-5 h-5 mr-2 ${anchorEl ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <div className="flex flex-col">
                            <section  onClick={() => router.push({pathname : '/search' , query : {...query , sort : "mostFavorite"}}) &  handleClose() & setCurrentFilter("محبوب‌‌ترین")}>
                                <p className={`${query.sort && query.sort === "mostFavorite" ? "bg-gray-200" : ""} py-1.5 px-4 w-full font-iranyekan-regular cursor-pointer text-sm text-gray-600 text-center hover:bg-gray-100`}>محبوب‌‌ترین</p>
                            </section>
                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "dateRecent"}}) & handleClose() & setCurrentFilter("جدید‌ترین")}>
                                <p className={`${query.sort && query.sort === "dateRecent" ? "bg-gray-200" : ""} py-1.5 px-4 w-full font-iranyekan-regular cursor-pointer text-sm text-gray-600 text-center hover:bg-gray-100`}>جدید‌ترین</p>
                            </section>
                            <section onClick={() =>  router.push({pathname : '/search' , query : {...query , sort : "priceMin"}}) & handleClose() & setCurrentFilter("ارزان‌ترین")}>
                                <p className={`${query.sort && query.sort === "priceMin" ? "bg-gray-200" : ""} py-1.5 px-4 w-full font-iranyekan-regular cursor-pointer text-sm text-gray-600 text-center hover:bg-gray-100`}>ارزان‌ترین</p>
                            </section>
                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "priceMax"}}) & handleClose() & setCurrentFilter("گران‌ترین")}>
                                <p className={`${query.sort && query.sort === "priceMax" ? "bg-gray-200" : ""} py-1.5 px-4 w-full font-iranyekan-regular cursor-pointer text-sm text-gray-600 text-center hover:bg-gray-100`}>گران‌ترین</p>
                            </section>
                        </div>
                    </Menu>
                </div>
            </div>
    );
}
export default BreadCrumpAndSort;