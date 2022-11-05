import AdminPageAside from "@/components/adminPage/Aside";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import ReactLoading from 'react-loading';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchCategories, fetchSub1, fetchSub2, fetchSub3,  deleteProduct, insertProduct } from "@/redux/admin/admin_manageProducts/admin_manageProductsActions";
import { useRouter } from "next/router";
import SelectBoxForCategories from "@/common/admin/manage-category/SelecBoxForCategories";

const InsertProduct = () => {
    const productData = useSelector(state => state.admin_products)
    const {product} = productData.product
    const productLoading = productData.product.loading
    
    const [isEditCategory , setIsEditCategory] = useState(false)
    const {brands} = useSelector(state => state.admin_products.brands)
    const {categories} = useSelector(state => state.admin_products.categories)
    const sub1 = useSelector(state => state.admin_products.sub1)
    const sub2 = useSelector(state => state.admin_products.sub2)
    const sub3 = useSelector(state => state.admin_products.sub3)
    const router = useRouter()
    const id = Number(1)
    const dispatch = useDispatch();

    const [onChangeFile , setOnChangeFile] = useState({selectedFile: null})


    const [selectedCategory_main, setSelectedCategory_main] = useState("")
    const [categoryQuery_main, setCategoryQuery_main] = useState("")

    const [selectedCategory_sub1, setSelectedCategory_sub1] = useState("")
    const [categoryQuery_sub1, setCategoryQuery_sub1] = useState("")

    const [selectedCategory_sub2, setSelectedCategory_sub2] = useState("")
    const [categoryQuery_sub2, setCategoryQuery_sub2] = useState("")

    const [selectedCategory_sub3, setSelectedCategory_sub3] = useState("")
    const [categoryQuery_sub3, setCategoryQuery_sub3] = useState("")

    const [selectedBrand, setSelectedBrand] = useState("")
    const [brandQuery, setBrandQuery] = useState('')
    
    const filteredCategories = categoryQuery_main === '' ? categories : categories && categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_main.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub1 = categoryQuery_sub1 === '' ? sub1.categories : sub1.categories && sub1.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub1.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub2 = categoryQuery_sub2 === '' ? sub2.categories : sub2.categories && sub2.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub2.toLocaleLowerCase().replace(/\s+/g, '')))
    const filteredsub3 = categoryQuery_sub3 === '' ? sub3.categories : sub3.categories && sub3.categories.filter((category) => category.name.toLowerCase().replace(/\s+/g, '').includes(categoryQuery_sub3.toLocaleLowerCase().replace(/\s+/g, '')))
    
    const filteredBrands = brandQuery === '' ? brands : brands.filter((brand) => brand.name.toLowerCase().replace(/\s+/g, '').includes(brandQuery.toLocaleLowerCase().replace(/\s+/g, '')))

    const validationSchema = Yup.object({
        product_title : Yup.string().min(10, "نام کالا نمی‌تواند کم تر از 10 نویسه باشد").max(30 , 'نام کالا نمی تواند بیشتر از 30 نویسه باشد').trim().required("نام کالا نمی تواند خالی باشد"),
        product_description : Yup.string().min(20,"توضیحات کالا نمیتواند کم تر از 20 نویسه باشد").max(500,"توضیحات کالا نمی تواند بیشتر از 500 نویسه باشد").trim().required("توضیحات کالا نمی تواند خالی باشد"),
    
    })
    const onSubmit = ({product_title , product_description}) => {
        const categoryId = selectedCategory_sub3.id || selectedCategory_sub2.id || selectedCategory_sub1.id || selectedCategory_main.id

        const brandId = selectedBrand.id || null
        const productImage = onChangeFile.selectedFile;
        const payload = {categoryId,brandId,product_title,product_description,productImage,id}
        dispatch(insertProduct(payload))
    }

    useEffect(()=>{
        if(selectedCategory_main && selectedCategory_main.id) dispatch(fetchSub1(selectedCategory_main.id))
        setSelectedCategory_sub1("")
    },[selectedCategory_main])
    
    useEffect(()=>{
        if(selectedCategory_sub1 && selectedCategory_sub1.id) dispatch(fetchSub2(selectedCategory_sub1.id))
        setSelectedCategory_sub2("")
    },[selectedCategory_sub1])

    useEffect(()=>{
        if(selectedCategory_sub2 && selectedCategory_sub2.id) dispatch(fetchSub3(selectedCategory_sub2.id))
        setSelectedCategory_sub3("")
    },[selectedCategory_sub2])

    useEffect(()=>{
        dispatch(fetchBrands())
        dispatch(fetchCategories())
    },[])

    const formik = useFormik({
        onSubmit,
        validationSchema,
        enableReinitialize : true,
        initialValues : {
            product_title :  "",
            product_description :  "",
        }
    })

    return (  
        <Layout isFooter={true}>
            <div className="w-full flex flex-col lg:flex-row  justify-between ">
                <AdminPageAside/>
            
            <form onSubmit={formik.handleSubmit} className=" w-full lg:w-4/5 flex-0 h-max p-4">
                <div className="flex justify-between w-full items-center">
                    <h1 className="font-sans font-bold text-lg">ثبت کالا</h1>
                    <Link href={'/admin'}>
                            <a className="gap-x-1 items-center bg-blue-50 flex border border-[#184e77] text-[#184e77] rounded-md py-2 px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </a>
                        </Link>
                </div>
                {productLoading  && (
                    <div className="w-full flex justify-center my-8">
                        <ReactLoading type="spinningBubbles" height={50} width={50} color="red" />
                    </div>
                )}
                <section className="grid grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col relative ">
                        <p className="font-sans text-sm">عنوان کالا :</p>
                        <input type="text" name="product_title"  value={formik.values.product_title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="عنوان کالا" className="border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                        <button className="px-1 py-2 absolute top-[29px] left-0">
                            <svg className=" text-gray-600 w-5 h-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {formik.errors.product_title && formik.touched.product_title && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.product_title}</p>}
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-sans text-sm"> برند :</p>
                        <div className="w-full">
                            <Combobox value={selectedBrand} onChange={setSelectedBrand }>
                                <div className="relative">
                                    <div className="relative w-full cursor-default  rounded-lg   text-left   focus:outline-none ">
                                        <Combobox.Input placeholder={!selectedBrand===" " ? returnBrandName() : "نمایش همه"} onChange={(event) => setBrandQuery(event.target.value) } className=" w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md" displayValue={(brand) => brand?.name || brand }/>
                                        
                                        <Combobox.Button className="absolute inset-y-0 top-[7px] pl-1 left-0 flex items-center group">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-gray-700 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                            </svg>
                                        </Combobox.Button>

                                        <button type={"button"} onClick={()=>setSelectedBrand('')} className="absolute group inset-y-0 top-[7px] left-7 flex  items-center ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`group-hover:text-gray-700 text-gray-400 w-5 h-5`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setBrandQuery('')}>
                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredBrands && filteredBrands.length === 0 && brandQuery !== '' ? (
                                            <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700 font-sans">برندی یافت نشد.</div>
                                        ) : (
                                            <>
                                                {filteredBrands && filteredBrands.map((brand) => (
                                                    <Combobox.Option  value={brand} key={brand.id} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-700 text-white' : 'text-gray-900'}`}>
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span className={`  font-sans text-sm block truncate ${ selected && 'font-bold' }`}> {brand.name} </span>
                                                                {selected ? (
                                                                    <span className={`absolute  cursor-pointer inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-700'}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                                        </svg>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </>
                                        )}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </div>
                    </div>
                    <div className="flex flex-col relative ">
                        <p className="font-sans text-sm text-gray-800"> تصویر (لوگو) برند :</p>
                        <input type={'file'} id="chooseImage" accept="image/*" className="hidden" name='brandImage' onChange={event => setOnChangeFile({ selectedFile: event.target.files[0] })} onBlur={formik.handleBlur}/>
                        <label htmlFor="chooseImage" className="flex justify-between mt-2 cursor-pointer text-sm font-sans rounded-md p-2 bg-blue-50 hover:bg-blue-100 hover:border-blue-700 border border-blue-500 ">
                            <span className="text-blue-700">انتخاب تصویر</span>
                            <svg className="w-5 h-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                        </label>
                    </div>
                </section>
                <div className="flex flex-col mt-4">
                    <p className="font-sans text-sm">توضیحات (در سایت نمایش داده نمی‌شود) :</p>
                    <textarea value={formik.values.product_description} name='product_description' onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="توضیحات..." className="leading-8 max-h-[250px] min-h-[50px] w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm mt-2 font-sans bg-white text-gray-800 rounded-md "/>
                    {formik.errors.product_description && formik.touched.product_description && <p className="mt-2 font-sans text-xs text-red-700">{formik.errors.product_description}</p>}

                </div>

                <div className="flex flex-col mt-4 gap-x-4">
                    <input type="checkbox" className="peer hidden" id="category_section" />
                        <section className="flex items-center">
                            <p className="font-sans text-sm "> دسته‌بندی :</p>
                            {sub1.loading || sub2.loading && <ReactLoading className="mr-2" type="spinningBubbles" height={20} width={20} color="red" />}
                        </section>
                        <section className="grid mt-2  grid-cols-5 gap-x-2">
                            <SelectBoxForCategories placeholder={"دسته اصلی"} categoryQuery={categoryQuery_main} filteredCategories={filteredCategories} selectedCategory={selectedCategory_main} setCategoryQuery={setCategoryQuery_main} setSelectedCategory={setSelectedCategory_main}/>
                            {selectedCategory_main && sub1.categories && (
                                <SelectBoxForCategories placeholder={'زیردسته اول'} categoryQuery={categoryQuery_sub1} filteredCategories={filteredsub1} selectedCategory={selectedCategory_sub1} setCategoryQuery={setCategoryQuery_sub1} setSelectedCategory={setSelectedCategory_sub1}/>
                            )} 
                            {selectedCategory_sub1 && sub2.categories && (
                                <SelectBoxForCategories placeholder={'زیردسته دوم'} categoryQuery={categoryQuery_sub2} filteredCategories={filteredsub2} selectedCategory={selectedCategory_sub2} setCategoryQuery={setCategoryQuery_sub2} setSelectedCategory={setSelectedCategory_sub2}/>
                            )}
                            {selectedCategory_sub2 && sub3.categories && (
                                <SelectBoxForCategories placeholder={'زیردسته سوم'} categoryQuery={categoryQuery_sub3} filteredCategories={filteredsub3} selectedCategory={selectedCategory_sub3} setCategoryQuery={setCategoryQuery_sub3} setSelectedCategory={setSelectedCategory_sub3}/>
                            )}
                        </section>
                </div>

                <div className="mt-6 w-full flex justify-end gap-x-2">
                    <button  type={"submit"} className="bg-blue-600 hover:bg-blue-700 border border-blue-600 text-blue-50 rounded-md py-[6px] px-4 font-sans text-sm">ثبت کالا</button>
                </div>

            </form>
            </div>
        </Layout>
    );
}
 
export default InsertProduct;