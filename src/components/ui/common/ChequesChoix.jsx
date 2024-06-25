import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { useTranslation } from 'react-i18next'


export default function ChequesChoix({cheque, setCheque, cheques}) {
  const [t, i18n] = useTranslation()
  const [choix, setChoix] = useState(cheque)

  return (
    <div className="w-full">
      <Listbox value={choix} onChange={setCheque}>
        <div className="relative mt-1">
          
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-inputFieldColor py-3 pl-3 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-inpputFieldColor text-xl font-medium sm:text-sm z-0">
            <span className="block truncate">{t(cheque.nom_cheque)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2  shadow-lg ring-1 ring-black/5 font-medium text-xl focus:outline-none sm:text-sm">
              {cheques && cheques.map((e) => {
                  
                return <Listbox.Option
                    key={e.id}
                    className={({ active }) =>
                    `relative cursor-default text-xs select-none py-2 pl-4 pr-4 ${
                        active ? 'bg-inputFieldColor text-text-greyColor' : 'text-gray-900'
                    }`
                    }
                value={e}
              >
                {e.nom_cheque}
              </Listbox.Option> 
                })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
