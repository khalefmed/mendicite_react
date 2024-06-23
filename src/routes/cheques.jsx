import {useState, useEffect} from 'react'
import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import Salaries  from "../assets/icons/salaries.svg";
import Argent  from "../assets/icons/money_card.svg";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';
import { ListeBanques } from '@/components/ui/tables/listeBanques';
import { BsBank2 } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import { ListeCheques } from '@/components/ui/tables/listeCheques';


function Cheques() {
  const { i18n, t } = useTranslation();

  const [liste, setListe] = useState([]) 
  const [statistiques, setStatistiques] = useState([]) 
  const [recherche, setRecherche] = useState("") 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("cheques/"); 
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
      const response = await api.get(`recherche/cheques?valeur=${recherche}`)  ; 
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
        <StatsCard titre={t("Total des cheques")} label={t("Cheques")} valeur={statistiques.total} icon={BsBank2}  />
        <StatsCard titre={t("Nombre de comptes")} label={t("Comptes")} valeur={statistiques.nombre_comptes} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={statistiques.moyenne} icon={FaMoneyBillWave}  />
      </div>

      <div className='flex flex-row justify-between items-center'>
        <Recherche rechercher={rechercher} recherche={recherche} setRecherche={setRecherche}/>
        <NouveauBoutton lien="cheques"/>
      </div>
      {liste && <ListeCheques donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Cheques;



