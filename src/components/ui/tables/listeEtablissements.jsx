import React from 'react'
import { useTranslation } from "react-i18next";

export const ListeEtablissements = ({donnees}) => {
    const { i18n, t } = useTranslation();
    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full border-separate border-spacing-y-2'>
                <thead className='bg-whiteColor'>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Code")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Nom")}</th>
                    <th className='py-4 text-center w-48 text-blackColor font-semibold text-sm rounded-tr-lg '>{t("Action")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 text-center text-textGreyColor font-normal text-xs rounded-lg'>{e.code_etablissement}</td>
                        <td className='py-4 text-center text-textGreyColor font-normal text-xs '>{e.nom_etablissement}</td>
                        <td className='py-4 w-48 flex flex-row gap-1 justify-center align-center  text-center text-textGreyColor font-normal text-xs rounded-lg'>
                            <button className='px-3 py-2 rounded-md border border-1 border-blackColor text-blackColor font-light'>
                                {t("Modifier")}
                            </button>
                            <button className='px-3 py-2 rounded-md border border-1 border-redColor text-redColor font-light'>
                                {t("Supprimer")}
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
