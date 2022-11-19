const FormikInput = ({formik,name,placeholder,title,parentClassName,isRequired}) => {
    return (  
        <div className={parentClassName}>
            <section className="w-auto flex flex-col items-right gap-x-1 pb-0">
                <p className={`font-sans text-sm text-gray-800 ${isRequired ? "before:content-['*'] before:text-red-600" : ""}`}>{title} :</p>
                <input 
                    type="text" 
                    name={`${name}`} 
                    placeholder={placeholder}
                    onChange={formik.handleChange} 
                    value={formik.values[name]} 
                    onBlur={formik.handleBlur} 
                    className="mt-2 w-full border-gray-300 hover:border-gray-600  focus:border-gray-600 focus:ring-0 text-sm  font-sans bg-white text-gray-800 rounded-md "
                />
            </section>
            {formik.errors[name] && formik.touched[name] && <p className={'text-red-600 font-sans text-xs pt-2'}>{formik.errors[name]}</p>}
        </div>
    )
}
 
export default FormikInput;