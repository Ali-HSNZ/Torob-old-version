import Styles from '/src/pages/product/[hashId]/grid.module.css'

const Properties = ({product}) => {
    return (  
        <div className={`${Styles.properties}  bg-white max-h-[1200px] px-5 py-5`}>
            <p className='font-sans font-bold pb-3 text-right text-[18px]'>مشخصات {product.title}</p>
            
            <div className={`${Styles.properties_scroll}  overflow-y-auto max-h-[1200px]`}>
                <div className={` mt-4 w-full text-right`}>
                    <p className=' font-sans font-bold '>مشخصات کلی</p>
                    <hr className='mt-2'/>
                    {JSON.parse(product.specs).map((e,index) => {
                        const generalInformation = e.title === "مشخصات کلی" ? e.details : [];
                        return(
                            <div className='mt-3' key={index}>
                                {generalInformation.map((properties,newIndex) => {
                                    return(
                                        <div className='my-5' key={newIndex}>
                                            <p className='font-bold font-sans text-sm'>{properties.name}</p>
                                            <p className='mt-2 font-sans text-sm text-gray-500'>{properties.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>

                <div className='mt-4 w-full text-right'>
                    <p className=' font-sans font-bold '>مشخصات فنی </p>
                    <hr className='mt-2'/>
                    {JSON.parse(product.specs).map((e,index) => {
                        const generalInformation = e.title === "مشخصات فنی" ? e.details : [];
                        return(
                            <div className='mt-3' key={index}>
                                {generalInformation.map((properties,newIndex) => {
                                    return(
                                        <div className='my-5'  key={newIndex}>
                                            <p className='font-bold font-sans text-sm'>{properties.name}</p>
                                            <p className='mt-2 font-sans text-sm text-gray-500'>{properties.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    );
}
 
export default Properties;