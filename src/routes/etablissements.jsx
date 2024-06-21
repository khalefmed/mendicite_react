import {useState, useEffect} from 'react'
import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import Salaries  from "../assets/icons/salaries.svg";
import Argent  from "../assets/icons/money_card.svg";
import { ListeEtablissements } from "@/components/ui/tables/listeEtablissements";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { IoIosAddCircle } from "react-icons/io";
import { Recherche } from '@/components/ui/shared/recherche';
import { NouveauBoutton } from '@/components/ui/shared/nouveau_boutton';


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
      toast("Une erreur s'est produite")
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
      toast("Une erreur s'est produite")
    }
  }


  return (
    <div className="flex flex-col gap-10 px-10 ">
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Total des etablissements")} label={t("Etablissements")} valeur={statistiques.total} icon={Company}  />
        <StatsCard titre={t("Nombre de salariés")} label={t("Salariés")} valeur={statistiques.nombre_salaries} icon={Salaries}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={statistiques.moyenne_salaires} icon={Argent}  />
      </div>

      <div className='flex flex-row justify-between items-center'>
        <Recherche rechercher={rechercher} recherche={recherche} setRecherche={setRecherche}/>
        <NouveauBoutton lien="etablissements"/>
      </div>
      {liste && <ListeEtablissements donnees={liste} setDonnees={setListe}/>}

    </div>
  );
}

export default Etablissements;



