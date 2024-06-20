import {useState, useEffect} from 'react'
import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import Company  from "../assets/icons/company.svg";
import Salaries  from "../assets/icons/salaries.svg";
import Argent  from "../assets/icons/money_card.svg";
import { ListeEtablissements } from "@/components/ui/tables/listeEtablissements";
import { api } from "@/lib/api";
import toast, { Toaster } from 'react-hot-toast';


function Etablissements() {

  const [liste, setListe] = useState([]) 
  const [statistiques, setStatistiques] = useState([]) 
  
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


  return (
    <div className="w-full h-screen flex flex-col gap-10  px-12 max-sm:px-4">
      <Header/>

      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre="Total des etablissements" label="Etablissements" valeur={liste.length} icon={Company}  />
        <StatsCard titre="Nombre de salariés" label="Salariés" valeur={statistiques.nombre_salaries} icon={Salaries}  />
        <StatsCard titre="Moyenne des salaires" label="MRU" valeur={statistiques.moyenne_salaires} icon={Argent}  />
      </div>

      <ListeEtablissements donnees={liste }/>


    </div>
  );
}

export default Etablissements;



