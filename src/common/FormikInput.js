import { setComma } from "@/utils/setComma";

const FormikInput = ({isComma , formik,name,maxLength,title,isRequired,parentClassName,isLtr , type}) => {
    return (  
        <div className={parentClassName || ""}>
            <section className="w-auto flex flex-col items-right">
                <p className={`font-iranyekan-regular ${title ? "" : "hidden"} text-[13px] text-gray-800 ${isRequired ? "before:content-['*'] before:text-red-600" : ""}`}>{title} :</p>
                <input 
                    type={type || "text"} 
                    name={name} 
                    dir={isLtr ? "ltr" : "rtl"}
                    autoComplete={"off"}
                    maxLength={maxLength || 5000}
                    onChange={formik.handleChange} 
                    value={isComma ? setComma(formik.values[name]) : formik.values[name]} 
                    onBlur={formik.handleBlur} 
                    className={`${formik.errors[name] && formik.touched[name] ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full border py-2 px-2 focus:outline-none focus:ring-0 text-sm  font-iranyekan-regular bg-white text-gray-800 rounded-md`}
                />
            </section>
            {formik.errors[name] && formik.touched[name] && <p className={'text-red-600 font-iranyekan-regular text-xs pt-2'}>{formik.errors[name]}</p>}
        </div>
    )
}
export default FormikInput;