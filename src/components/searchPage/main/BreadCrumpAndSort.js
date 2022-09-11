import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BreadCrumpAndSort = ({category , similarCategories}) => {

    const [currentFilter,setCurrentFilter] = useState("محبوب ترین")

    const router = useRouter()
    const {query} = useRouter()
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const returnSubcategory = (name) => {
        if(category){
            if(similarCategories && similarCategories.name === name){
                return { 
                    mainName : similarCategories.name, 
                    text:"دسته های پیشنهادی",
                    data : similarCategories.sub_categories
                }
            }
            if(!similarCategories.sub_categories.name){
                return{
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : category,
                    text:"دسته های مشابه",
                    data : [{name : "زیر دسته ایی وجود ندارد" , status : false}]
    
                }
            }
             else if(similarCategories && similarCategories.sub_categories.name === name){
                return {
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    text:"دسته های مشابه",
                    data :  similarCategories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories
                }
            }else if(similarCategories && similarCategories.sub_categories.sub_categories.name === name){
                return {
                    type : "sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text:"دسته‌بندی دقیق‌تر",
                    data :  similarCategories.sub_categories.sub_categories.sub_categories.length === 0 ? [{name : "زیر دسته ایی وجود ندارد" , status : false}] : similarCategories.sub_categories.sub_categories.sub_categories
                }
            }
    
            const sub_sub_sub =  similarCategories.sub_categories.sub_categories.sub_categories  && similarCategories.sub_categories.sub_categories.sub_categories.find(e => e.name === category)
            if(sub_sub_sub){
                return {
                    type : "sub_sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text: "دسته‌بندی دقیق‌تر",
                    data :  similarCategories.sub_categories.sub_categories.sub_categories 
                }
            }
            else if(!sub_sub_sub){
                return {
                    type : "sub_sub_sub",
                    mainName :  similarCategories.name,
                    subName : similarCategories.sub_categories.name,
                    sub_subName : similarCategories.sub_categories.sub_categories.name,
                    text:"دسته های مشابه",
                    data :  similarCategories.sub_categories.sub_categories 
                }
            }
        }
        return false
    }

    const mainName = returnSubcategory(category).mainName && returnSubcategory(category).mainName !== category ? returnSubcategory(category).mainName + " / " : "";
    const subName = returnSubcategory(category).subName && returnSubcategory(category).subName !== category?  returnSubcategory(category).subName  + " / "  : "";
    const sub_subName = returnSubcategory(category).sub_subName && returnSubcategory(category).sub_subName !== category ? returnSubcategory(category).sub_subName  + " / "  : "";

    return (  
            <div className={`w-full flex ${category ? " justify-between" : "justify-end"}   z-10 relative items-center`}>
                {/* //? BreadCrump */}
                {query.category &&  <p className="font-sans py-4 text-xs text-gray-500">همه دسته ها / {`${mainName} ${subName}  ${sub_subName} ${sub_subName === category  ? "" : " / ",category}`}</p>}
                {/* //? Sort */}
                <div className="max-w-fit py-2  cursor-pointer hidden  md:flex flex-col justify-end  items-end">
                
                    <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} className="font-sans  text-sm text-gray-600 rounded-md">
                        {currentFilter}
                        <svg  className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <div className="flex flex-col  py-1">
                            <section  onClick={() => router.push({pathname : '/search' , query : {...query , sort : "mostFavorite"}}) &  handleClose() & setCurrentFilter("محبوب‌ ترین")}>
                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">محبوب‌ ترین</p>
                            </section>

                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "dateRecent"}}) & handleClose() & setCurrentFilter("جدید ترین")}>
                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">جدید ترین</p>
                            </section>

                            <section onClick={() =>  router.push({pathname : '/search' , query : {...query , sort : "priceMin"}}) & handleClose() & setCurrentFilter("ارزان ترین")}>
                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">ارزان ترین</p>
                            </section>

                            <section onClick={() => router.push({pathname : '/search' , query : {...query , sort : "priceMax"}}) & handleClose() & setCurrentFilter("گران ترین")}>
                                <p className="py-1.5 px-4 w-full cursor-pointer font-sans text-sm text-center hover:bg-gray-100">گران ترین</p>
                            </section>
                        </div>

                    </Menu>
                </div>
            </div>
    );
}
export default BreadCrumpAndSort;