import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

const  SelectBox_withoutSearch = ({selected , setSelected , data}) => {
  return (
    <Listbox value={selected} onChange={setSelected} >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full rounded-md bg-white py-2 border border-gray-300 pr-4 text-right hover:border-gray-500 sm:text-sm cursor-pointer">
          <span  className="block truncate font-sans">{selected.name || selected}</span>
          <span className="pointer-events-none absolute inset-y-0 left-1 flex items-center pr-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-gray-700 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {data.map((data, dataIdx) => (
              <Listbox.Option key={dataIdx} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`} value={data}>
                {() => <span className={`block truncate font-sans text-gray-800`}>{data.name}</span>}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
export default  SelectBox_withoutSearch