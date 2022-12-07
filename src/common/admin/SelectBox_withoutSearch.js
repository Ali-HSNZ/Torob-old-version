import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const classNames = (...classes) => classes.filter(Boolean).join(' ')

const  SelectBox_withoutSearch = ({selected , setSelected , data}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-left  sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate font-sans">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 left-0 ml-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-gray-700 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" > 
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((state,index) => (
                  <Listbox.Option key={index}  className={({ active }) => `relative cursor-pointer select-none py-2 pl-10  pr-4 ${active ? 'bg-gray-700  text-white ' : 'text-gray-900'}`} value={state}>
                    {({ selected, active }) => (
                        <>
                        <div className="flex items-center">
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'font-sans ml-3 block truncate ')}>{state.name}</span>
                        </div>
                        {selected ? (
                          <span className={classNames(active ? 'text-white' : 'text-gray-600','absolute inset-y-0 left-2 flex items-center pr-4')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
      )}
    </Listbox>
  )
}
export default  SelectBox_withoutSearch