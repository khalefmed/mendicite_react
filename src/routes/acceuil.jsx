import { Header } from "@/components/ui/common/header";
import { LineComponent } from "@/components/ui/graphs/line";
import { StatsCard } from "@/components/ui/shared/statsCard";
import { api } from "@/lib/api";
import {useState, useEffect} from 'react'
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsBank, BsBank2 } from "react-icons/bs";
import { FaMoneyBillWave, FaMoneyCheck, FaPeopleGroup, FaUsers } from "react-icons/fa6";
import { IoBusiness } from "react-icons/io5";

function Acceuil() {

  const { i18n, t } = useTranslation();

  const [donnees, setDonnees] = useState([]) 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("acceuil/"); 
      console.log("Les données")
      console.log(response.data.salaries_recents)
      setDonnees(response.data)
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }

  return (
    donnees.salaries_recents != undefined &&
      <div className="flex flex-col gap-4 px-10 max-sm:px-4 ">
        <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
          <StatsCard titre={t("Total des etablissements")} label={t("Etablissements")} valeur={donnees.total_etablissements} icon={IoBusiness}  />
          <StatsCard titre={t("Total des salariés")} label={t("Salariés")} valeur={donnees.total_salaries} icon={FaPeopleGroup}  />
          <StatsCard titre={t("Total des cheques")} label={t("Chèques")} valeur={donnees.total_cheques} icon={FaMoneyCheck}  />
        </div>
        <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
          {/* <StatsCard titre={t("Total des banques")} label={t("Banques")} valeur={donnees.total_banques} icon={BsBank2}  />
          <StatsCard titre={t("Total des cheques")} label={t("Chèques")} valeur={donnees.total_cheques} icon={FaMoneyCheck}  />
          <StatsCard titre={t("Total des etats de salaire")} label={t("Etats")} valeur={donnees.total_etats} icon={FaMoneyBillWave}  /> */}
        </div>
        {/* <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
          <StatsCard titre={t("Total des salaires")} label={t("MRU")} valeur={donnees.total_salaires} icon={FaMoneyBillWave}  />
          <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={donnees.moyenne_salaires} icon={FaMoneyBillWave}  />
          <StatsCard titre={t("Salaire plus élevé")} label={t("MRU")} valeur={donnees.plus_eleve} icon={FaMoneyBillWave}  />
        </div> */}
        <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
          <LineComponent stats={donnees.salaries_recents}/>
        </div>


    </div>
    
  );
}

export default Acceuil;
