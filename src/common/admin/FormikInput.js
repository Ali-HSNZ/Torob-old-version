import { setComma } from "@/utils/setComma";
import { TextField } from "@mui/material";

const FormikInput = ({isComma , formik,name,placeholder,title,parentClassName,isRequired}) => {
    return (  
        <div className={parentClassName}>
            <section className="w-auto flex flex-col items-right gap-x-1">
                <p className={`font-sans text-[13px] text-gray-800 ${isRequired ? "before:content-['*'] before:text-red-600" : ""}`}>{title} :</p>
                <input 
                    type="text" 
                    name={name} 
                    onChange={formik.handleChange} 
                    value={isComma ? setComma(formik.values[name]) : formik.values[name]} 
                    onBlur={formik.handleBlur} 
                    className={`${formik.errors[name] && formik.touched[name] ? "border-red-400 hover:border-red-600  focus:border-red-600" : "border-gray-300 hover:border-gray-600  focus:border-gray-600"} mt-2 w-full  focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md`}
                />
            </section>
            {formik.errors[name] && formik.touched[name] && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors[name]}</p>}
        </div>
    )
}
export default FormikInput;