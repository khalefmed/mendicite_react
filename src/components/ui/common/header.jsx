import React from 'react'
import Account from "../../../assets/icons/account_image.jpg";
import { useTranslation } from "react-i18next";
import MenuCompte from './popover';
import { FaLanguage } from "react-icons/fa6";
import { RiMenu2Fill, RiMenu3Line } from "react-icons/ri";
import Logo from "../../../assets/logo.png";

export const Header = ({ouvrir}) => {
    const { i18n, t } = useTranslation();

    const switchLanguage = lang => {
        window.localStorage.setItem("lang", lang);
        window.location.reload();
      };

    return (
        <div className='w-full bg-white  flex flex-row justify-center align-center items-center py-6 px-10 max-md:px-2 max-lg:bg-whiteColor  '>
           
            <img src={Logo} width={220}  alt="" />
        </div>
    )
}
