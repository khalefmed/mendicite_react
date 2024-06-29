import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdEdit } from 'react-icons/md'

export const ModifierBoutton = ({lien, id}) => {
    const {t} = useTranslation()
    return (
        <a href={`${lien}/modifier/${id}`} className='px-3 py-2 min-w-24 flex flex-row items-center justify-center align-center gap-1 rounded-md border border-1 border-blackColor text-blackColor hover:bg-blackColor hover:text-whiteColor duration-500 text-lg font-medium'>
            <MdEdit size={13}/>
            <span className='text-xs text-center'>{t("Modifier")}</span>
        </a>
    )
}
