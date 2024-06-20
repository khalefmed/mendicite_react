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
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";


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

    console.log("entered")

    try {
      
      
      const response = await api.get(`recherche/etablissements?valeur=${recherche}`)  ; 
      console.log(response)
      
      setListe(response.data );

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
        <StatsCard titre={t("Total des etablissements")} label={t("Etablissements")} valeur={statistiques.total} icon={Company}  />
        <StatsCard titre={t("Nombre de salariés")} label={t("Salariés")} valeur={statistiques.nombre_salaries} icon={Salaries}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={statistiques.moyenne_salaires} icon={Argent}  />
      </div>

      <div className='w-full flex flex-row justify-center align-center'>

        <div className=' justify-center'>
            
        </div>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <form action="" className='flex flex-row gap-1' onSubmit={rechercher}>
                <input type="text" placeholder={t('Rechercher')} value={recherche} onChange={(e) => setRecherche(e.target.value)} className='w-[300px] placeholder:text-sm text-sm px-4 py-2 rounded-md outline-none' />
                <input type="submit" value="" className=' rounded-md bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor text-xs cursor-pointer font-light' />
                <div className='flex items-center justify-center align-center px-4 py-1 rounded-md bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor text-xs cursor-pointer font-light' >
                  <FaSearch onClick={rechercher} />
                </div>
                
            </form>
        <button className='px-4 py-2 flex flex-row items-center gap-2 rounded-md bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor text-xs cursor-pointer font-light'>
          <IoIosAddCircle size={20} />
          <p className='font-medium'>{t('Nouveau')}</p>
        </button>
      </div>

      {liste && <ListeEtablissements donnees={liste} setDonnees={setListe}/>}


    </div>
  );
}

export default Etablissements;



