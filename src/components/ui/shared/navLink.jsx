import React from 'react'
import { NavLink } from 'react-router-dom'
import { components } from 'react-select'


export const MyNavLink = ({route, label, icon: Icon}) => {
    return (
        <li className="flex  items-center gap-2">
                <NavLink
                  to={`/${route}`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "flex items-center gap-2 fill-textGreyColor px-[15px] py-[10px] rounded-lg w-[150px] hover:bg-bgGreyColor"
                      : isActive
                      ? "flex items-center gap-2 px-[15px] py-[10px] rounded-lg w-[150px] bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-white font-normal fill-whiteColor"
                      : "flex items-center gap-2 fill-textGreyColor px-[15px] py-[10px] rounded-lg w-[150px] hover:bg-bgGreyColor"
                  }>
                  <Icon />

                  <p>{label}</p>
                </NavLink>
              </li>
    )
}
