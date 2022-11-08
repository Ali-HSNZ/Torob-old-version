import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'

const SelectBox = ({placeholder ,notFoundTitle, selected , query , setSelected , filteredData , setQuery}) => {
    return ( 
        <div className="flex">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <div className="relative  focus:outline-none ">
                        <Combobox.Input   placeholder={placeholder || ""}  onChange={(event) => setQuery(event.target.value)}  className="z-0 relative w-full border-gray-300 hover:border-gray-600 pl-12 focus:border-gray-600 focus:ring-0 text-sm font-sans bg-white text-gray-800 rounded-md" displayValue={(brand) => brand.name}/>
                        <Combobox.Button className="absolute inset-y-0 top-[0px] pl-1 left-0 flex items-center group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-gray-700 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>
                        </Combobox.Button>
                        <button type={"button"} onClick={()=>setSelected("") } className="absolute group inset-y-0 top-[0px] left-7 flex  items-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`group-hover:text-gray-700 text-gray-400 w-5 h-5`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredData && filteredData.length === 0 && query !== '' ? (
                                <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700 font-sans">{notFoundTitle}</div>
                            ) : (
                                filteredData && filteredData.map((category) => (
                                    <Combobox.Option  value={category} key={category.id} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-700 text-white' : 'text-gray-900'}`}>
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`  font-sans text-sm block truncate ${ selected && 'font-bold' }`}> {category.name} </span>
                                                {selected && (
                                                    <span className={`absolute  cursor-pointer inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-gray-700'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
 
export default SelectBox;