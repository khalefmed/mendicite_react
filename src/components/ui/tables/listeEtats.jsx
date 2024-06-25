import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Supprimer from '../common/supprimer';
import toast, { Toaster } from 'react-hot-toast';
import { ModifierBoutton } from '../shared/modifier_boutton';
import { VoirButton } from '../shared/voir_boutton';

export const ListeEtats = ({donnees, setDonnees, etablissement}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)

    useEffect(() => {
        setListe(liste)
    }, [])

    const supprimer = async (id)  => {
        try {
            const response = await api.delete(`etats/${id}/`); 
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
                    <th className='py-4 text-center text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Nom")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Date")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Chèque")}</th>
                    <th className='py-4 text-center w-52 text-blackColor font-semibold text-sm rounded-tr-lg '>{t("Action")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-normal text-xs rounded-lg'>{e.nom_etat}</td>
                        <td className='py-4 min-w-[300px] text-center text-textGreyColor font-normal text-xs '>{e.date_etat}</td>
                        <td className='py-4 min-w-[300px] text-center text-textGreyColor font-normal text-xs '>{e.cheque.nom_cheque}</td>
                        <td className='py-4 w-60 flex flex-row gap-1 justify-center align-center  text-center text-textGreyColor font-normal  rounded-lg'>
                            {/* {etablissement ? <VoirButton lien="etats" id={e.id} /> : <></>} */}
                            <VoirButton lien="etats" id={e.id} />
                            <Supprimer supprimer={supprimer} id={e.id}/>
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
