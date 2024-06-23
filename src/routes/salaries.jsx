import {useState, useEffect} from 'react'
import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';
import { BsBank2 } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { ListeSalarie } from '@/components/ui/tables/listeSalaries';


function Salaries() {
  const { i18n, t } = useTranslation();

  const [liste, setListe] = useState([]) 
  const [statistiques, setStatistiques] = useState([]) 
  const [recherche, setRecherche] = useState("") 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("salaries/"); 
      setListe(response.data.liste)
      setStatistiques(response.data.statistiques)
    }
    catch (exception){
      console.log(exception)
      toast("Une erreur s'est produite")
    }
  }


  const rechercher = async (e)  => {
    e.preventDefault();

    try {
      const response = await api.get(`recherche/salaries?valeur=${recherche}`)  ; 
      setListe(response.data );
    }
    catch (exception){
      console.log(exception)
      toast("Une erreur s'est produite")
    }
  }


  return (
    <div className="flex flex-col gap-10 px-10 ">
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Total des salariés")} label={t("Salaries")} valeur={statistiques.total} icon={BsBank2}  />
        <StatsCard titre={t("Total des salaires")} label={t("MRU")} valeur={statistiques.total_salaires} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={statistiques.moyenne_salaires} icon={FaMoneyBillWave}  />
      </div>

      <div className='flex flex-row justify-between items-center'>
        <Recherche rechercher={rechercher} recherche={recherche} setRecherche={setRecherche}/>
        <NouveauBoutton lien="salaries"/>
      </div>
      {liste && <ListeSalarie donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Salaries;



