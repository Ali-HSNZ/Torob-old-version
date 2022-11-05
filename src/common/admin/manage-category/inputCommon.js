import { insertCategories } from "@/redux/admin/admin_manageCategory/admin_manageCategoryActions";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'

const InsertCategoryForm = ({category , sub_sub , id , sub}) => {
    const {query} = useRouter()
    const {limit,page,name : paramsName,state} = query
    const dispatch = useDispatch()
    const onSubmit = ({categoryName}) => {
        dispatch(insertCategories({id , name:categoryName,limit,page,paramsName,state}))
    }
    const validationSchema = Yup.object({
        categoryName: Yup.string()
            .required("عنوان دسته ‌بندی نمی تواند خالی باشد.")
            .min(2 , "عنوان دسته بندی نمی تواند کم تر از 2 نویسه باشد.")
            .max(50 , "عنوان دسته بندی نمی تواند بیشتر از 50 نویسه باشد.")
            .trim(),
    })
    const formik = useFormik({
        onSubmit,
        initialValues : {categoryName : ""},
        validationSchema,
        validateOnMount : true,
    })
    const substringNum = 27;
    
    const substringHandler = ()=>{
        if(category && !sub && !sub_sub){
            return category.length > substringNum ? category.substring(0,substringNum)+'.../' : category+"/" 
        }
        if(category && sub && !sub_sub){
            const category_placeholder = category.length > (substringNum/2) ? category.substring(0,substringNum/2)+'.../' : category+"/" 
            const sub_placeholder = sub.length > (substringNum/2) ? sub.substring(0,substringNum/2)+'.../' : sub+"/" 
            return category_placeholder+""+sub_placeholder
        }
        if(category && sub && sub_sub){
            const category_placeholder = category.length >( substringNum/3) ? category.substring(0,substringNum/3)+'.../' : category+"/" 
            const sub_placeholder = sub.length >( substringNum/3) ? sub.substring(0,substringNum/3)+'.../' : sub+"/" 
            const sub_sub_placeholder = sub_sub.length >( substringNum/3) ? sub_sub.substring(0,substringNum/3)+'.../' : sub_sub+"/" 
            return category_placeholder+""+sub_placeholder+""+sub_sub_placeholder
        }
    }

    return (  
        <section className="flex flex-col w-full">
            <form onSubmit={formik.handleSubmit} className="flex w-full ">
                <input 
                    type="text" 
                    name="categoryName" 
                    onBlur={formik.handleBlur} 
                    id={id}
                    onChange={formik.handleChange}
                    placeholder={substringHandler()} 
                    className={` w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-r-md `}
                />
                <button type={"submit"} disabled={!formik.isValid} className={` text-sm font-sans py-[6px] px-4 rounded-l-md ${formik.errors.categoryName? "cursor-not-allowed bg-gray-600 text-white hover:bg-gray-700  " : " bg-blue-600 text-white hover:bg-blue-700 "}  `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`text-white w-6 h-6`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>
            </form>
            {formik.errors.categoryName && formik.touched.categoryName && <p className={'text-red-600 font-sans text-xs pt-2 pb-1'}>{formik.errors.categoryName}</p>}
        </section>
    );
}
 
export default InsertCategoryForm;