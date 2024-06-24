import { Header } from "@/components/ui/common/header";
import { StatsCard } from "@/components/ui/shared/statsCard";
import { api } from "@/lib/api";
import {useState, useEffect} from 'react'
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BsBank, BsBank2 } from "react-icons/bs";
import { FaMoneyBillWave, FaMoneyCheck, FaPeopleGroup, FaUsers } from "react-icons/fa6";
import { IoBusiness } from "react-icons/io5";

function AcceuilEtablissement() {

  const { i18n, t } = useTranslation();

  const [donnees, setDonnees] = useState([]) 
  
  useEffect(() => {
    get();
  }, [])

  const get = async ()  => {
    try {
      const response = await api.get("acceuil/etablissement");
      setDonnees(response.data)
    }
    catch (exception){
      console.log(exception)
      toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
    }
  }

  return (
    <div className="flex flex-col gap-10 px-10 max-sm:px-4 ">
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Total des salariés")} label={t("Salariés")} valeur={donnees.total_salaries} icon={FaPeopleGroup}  />
        <StatsCard titre={t("Total des etats de salaire")} label={t("Etats")} valeur={donnees.total_etats} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Total des salaires")} label={t("MRU")} valeur={donnees.total_salaires} icon={FaMoneyBillWave}  />
      </div>
      <div className="w-full flex flex-row max-sm:flex-col max-sm:gap-3 justify-between ">
        <StatsCard titre={t("Salaire moins élevé")} label={t("MRU")} valeur={donnees.moins_eleve} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Moyenne des salaires")} label={t("MRU")} valeur={donnees.moyenne_salaires} icon={FaMoneyBillWave}  />
        <StatsCard titre={t("Salaire plus élevé")} label={t("MRU")} valeur={donnees.plus_eleve} icon={FaMoneyBillWave}  />
      </div>

    </div>
    
  );
}

export default AcceuilEtablissement;
