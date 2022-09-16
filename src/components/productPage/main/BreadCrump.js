import Link from "next/link";


const BreadCrump = ({path}) => {
    return (  
        <div className='flex whitespace-nowrap overflow-x-auto  pb-4'>
            <Link href="/">
                <a className='hover:text-red-500 before:hover:text-gray-500 cursor-pointer mt-4 before:content-["›"] before:px-2 first:before:content-none text-xs text-gray-500 font-sans'>ترب</a>
            </Link>                    
            {path.map((path,index) => {
                const handlePath = path.type === 'brand' ? {category : path.category , brand : path.brand} : {category : path.title}
                return(
                    <Link key={index} href={{pathname : "/search" , query : handlePath}}>
                        <a className='hover:text-red-500 before:hover:text-gray-500 cursor-pointer mt-4 before:content-["›"] before:px-2 first:before:content-none text-xs text-gray-500 font-sans'>{path.title}</a>
                    </Link>
                )
        })}
        </div>
    );
}
 
export default BreadCrump;