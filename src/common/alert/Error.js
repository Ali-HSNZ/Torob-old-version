const Error = ({text , children}) => {
    return (  
        <section className="mt-4 w-full flex items-center justify-between p-2 bg-red-100 border border-red-300 rounded-md shadow-md">
            <div className="flex ">
                <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span className="font-sans text-sm mr-4 text-red-800">{text}</span>
            </div>
            {children}
        </section>
    );
}
 
export default Error;