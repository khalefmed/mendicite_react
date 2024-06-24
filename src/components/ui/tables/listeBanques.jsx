import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Supprimer from '../common/supprimer';
import toast, { Toaster } from 'react-hot-toast';
import { ModifierBoutton } from '../shared/modifier_boutton';

export const ListeBanques = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)

    useEffect(() => {
        setListe(liste)
    }, [])

    const supprimer = async (id)  => {
        try {
            const response = await api.delete(`banques/${id}/`); 
            const  d = donnees.filter((e) => {
                return e.id !== id;
            });
            setDonnees(d);
            }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }

    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full border-separate border-spacing-y-2'>
                <thead className='bg-whiteColor'>
                    <th className='py-4 text-center min-w-[100px] text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Code")}</th>
                    <th className='py-4 text-center min-w-[300px] text-blackColor font-semibold text-sm '>{t("Nom")}</th>
                    <th className='py-4 text-center  w-52 text-blackColor font-semibold text-sm rounded-tr-lg '>{t("Action")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-normal text-xs rounded-lg'>{e.code_banque}</td>
                        <td className='py-4 min-w-[300px] text-center text-textGreyColor font-normal text-xs '>{e.nom_banque}</td>
                        <td className='py-4  w-60 flex flex-row gap-1 justify-center align-center  text-center text-textGreyColor font-normal  rounded-lg'>
                            <ModifierBoutton lien="banques" id={e.id} />
                            <Supprimer supprimer={supprimer} id={e.id}/>
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
