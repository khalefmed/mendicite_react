import React from 'react'
import Account from "../../../assets/icons/account_image.jpg";
import { useTranslation } from "react-i18next";
import MenuCompte from './popover';

export const Header = () => {
    const { i18n, t } = useTranslation();

    return (
        <div className='w-full h-[40px] flex flex-row justify-between align-center items-center py-6 px-10  '>
           
            <div className='h-full w-full flex flex-row justify-between  gap-2 items-center cursor-pointer '>
                <div></div>
                <MenuCompte/>
            </div>
            

            
        </div>
    )
}
