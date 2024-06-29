import {useState, useEffect} from 'react'
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import Supprimer from '../common/supprimer';
import toast, { Toaster } from 'react-hot-toast';
import { ModifierBoutton } from '../shared/modifier_boutton';

export const ListeUtilisateurs = ({donnees, setDonnees}) => {
    const { i18n, t } = useTranslation();
    const [liste, setListe] = useState(donnees)

    useEffect(() => {
        setListe(liste)
    }, [])

    const supprimer = async (id)  => {
        try {
            const response = await api.delete(`utilisateurs/${id}/`); 
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
                    <th className='py-4 text-center text-blackColor font-semibold text-sm rounded-tl-lg'>{t("Nom Complet")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Telephone")}</th>
                    <th className='py-4 text-center text-blackColor font-semibold text-sm '>{t("Etablissement")}</th>
                    <th className='py-4 text-center w-40 text-blackColor font-semibold text-sm rounded-tr-lg '>{t("Action")}</th>
                </thead>
                <tbody className=''>
                    {donnees.map((e) => 
                    <tr key={e.id} className='bg-whiteColor'>
                        <td className='py-4 min-w-[250px] text-center text-textGreyColor font-medium text-sm rounded-lg'>{e.first_name} {e.last_name}</td>
                        <td className='py-4 min-w-[100px] text-center text-textGreyColor font-medium text-sm '>{e.telephone}</td>
                        <td className='py-4 min-w-[150px] text-center text-textGreyColor font-medium text-sm '>{e.etablissement ? e.etablissement.code_etablissement : t("Trésor")}</td>
                        <td className='py-4 w-40 flex flex-row gap-1 justify-center align-center  text-center text-textGreyColor font-normal  rounded-lg'>
                            {/* <ModifierBoutton lien="utilisateurs" id={e.id} /> */}
                            <Supprimer supprimer={supprimer} id={e.id}/>
                        </td>
                    </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}
