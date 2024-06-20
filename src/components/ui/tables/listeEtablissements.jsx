import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Supprimer from '../common/supprimer';
import toast, { Toaster } from 'react-hot-toast';

export const ListeEtablissements = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)

    useEffect(() => {
        setListe(liste)
    }, [])

    const supprimer = async (id)  => {
        try {
            const response = await api.delete(`etablissement/${id}/`); 
            const  d = donnees.filter((e) => {
                return e.id !== id;
            });
            setDonnees(d);
            }
        catch (exception){
          console.log(exception)
          toast("Une erreur s'est produite")
        }
    }

    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full border-separate border-spacing-y-2'>
                <thead className='bg-whiteColor'>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Code")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Nom")}</th>
                    <th className='py-4 text-center w-52 text-blackColor font-semibold text-sm rounded-tr-lg '>{t("Action")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 text-center text-textGreyColor font-normal text-xs rounded-lg'>{e.code_etablissement}</td>
                        <td className='py-4 text-center text-textGreyColor font-normal text-xs '>{e.nom_etablissement}</td>
                        <td className='py-4 w-60 flex flex-row gap-1 justify-center align-center  text-center text-textGreyColor font-normal  rounded-lg'>
                            <a href='/etablissements/modifier/4' className='px-3 py-2 min-w-24 flex flex-row items-center gap-1 rounded-md border border-1 border-blackColor text-blackColor hover:bg-blackColor hover:text-whiteColor duration-500 font-light'>
                                <MdEdit size={13}/>
                                <span className='text-xs'>{t("Modifier")}</span>
                            </a>
                            
                            <Supprimer supprimer={supprimer} id={e.id}/>
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
