import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";

export const Recherche = ({rechercher, recherche, setRecherche, placeholder}) => {
    const {t} = useTranslation()
    return (
        <form action="" className='flex flex-row gap-1 max-sm:w-full' onSubmit={rechercher}>
            <div className='bg-white rounded-lg px-4 py-1 flex flex-row align-center justify-center items-center' >
                <FaSearch color='grey'/>
                <input type="text" placeholder={placeholder} value={recherche} onChange={(e) => rechercher(e)} className='w-[200px] max-sm:w-full placeholder:text-sm text-sm px-4 py-2 rounded-md outline-none' />
            </div>
            
        </form>
    )
}
