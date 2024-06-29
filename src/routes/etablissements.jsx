import {useState, useEffect} from 'react'
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import { ListeEtablissements } from "@/components/ui/listes/listeEtablissements";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';
import { IoBusiness } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";


function Etablissements() {
  const { i18n, t } = useTranslation();

  const [liste, setListe] = useState([]) 
  const [statistiques, setStatistiques] = useState([]) 
  const [recherche, setRecherche] = useState("") 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("etablissements/"); 
      setListe(response.data.liste)
      setStatistiques(response.data.statistiques)
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }


  const rechercher = async (e)  => {
    e.preventDefault();

    try {
      const response = await api.get(`recherche/etablissements?valeur=${recherche}`)  ; 
      setListe(response.data );
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }


  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4 ">
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Total des etablissements")} label={t("Etablissements")} valeur={statistiques.total} icon={IoBusiness}  />
        <StatsCard titre={t("Nombre de salariés")} label={t("Salariés")} valeur={statistiques.nombre_salaries} icon={FaPeopleGroup}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={statistiques.moyenne_salaires} icon={FaMoneyBillWave}  />
      </div>

      <div className='flex flex-row max-md:flex-col gap-3 justify-between items-center'>
        <Recherche rechercher={rechercher} recherche={recherche} setRecherche={setRecherche}/>
        <NouveauBoutton lien="etablissements"/>
      </div>
      {liste && <ListeEtablissements donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Etablissements;



