import React from 'react'
import Account from "../../../assets/icons/account_image.jpg";
import { useTranslation } from "react-i18next";

export const Header = () => {
    const { i18n, t } = useTranslation();

    return (
        <div className='w-full h-[40px] flex flex-row justify-between align-center items-center py-6  '>
            <div>
                <form action="" className='flex flex-row gap-1'>
                    <input type="text" placeholder='Rechercher ...' className=' placeholder:text-xs px-4 py-1 rounded-md' />
                    <input type="submit" value="Rechercher" className='px-4 py-1 rounded-md bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor text-xs cursor-pointer font-light' />
                </form>
            </div>
            <div className='w-full h-full flex flex-row justify-end gap-2 items-center cursor-pointer'>
                <div className='w-[27px] h-[27px] bg-black rounded-full'>
                    <img src={Account} height={30} className="rounded-full border-1 border-blackColor" alt="" />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='font-semibold text-blackColor text-xs'>{t("Nine Oumar")}</p>
                    <p  className=' font-normal text-textGreyColor text-[0.65rem]'>{t("Agent Trésor")}</p>
                </div>
            </div>
            

            
        </div>
    )
}
