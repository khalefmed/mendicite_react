import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Supprimer from '../common/supprimer';
import toast, { Toaster } from 'react-hot-toast';
import { ModifierBoutton } from '../shared/modifier_boutton';
import { VoirButton } from '../shared/voir_boutton';

export const ListeEtatsSalaries = ({donnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)

    useEffect(() => {
        setListe(liste)
    }, [])

    return (
        <div className='w-full overflow-x-scroll'>
            <table className='w-full border-separate border-spacing-y-2'>
                <thead className='bg-whiteColor'>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Salarie")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("NNI")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Banque")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Numero de compte")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Montant")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 min-w-[300px] text-center text-textGreyColor font-medium text-sm rounded-lg'>{e.salarie.nom_salarie}</td>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-medium text-sm '>{e.salarie.nni}</td>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-medium text-sm '>{e.salarie.banque.code_banque}</td>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-medium text-sm '>{e.salarie.numero_compte}</td>
                        <td className='py-4 min-w-[150px] text-center text-textGreyColor font-medium text-sm '>{e.montant_net}</td>
                        
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
