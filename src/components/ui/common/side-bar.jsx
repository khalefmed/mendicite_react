import Logo from "../../../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { MyNavLink } from "../shared/navLink";
import {TruckIcon} from "../../icons/truck.jsx";
import { IoHome } from "react-icons/io5";
import { IoMdBusiness } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa6";


function SideBar({changeVisibility}) {
  const { i18n, t } = useTranslation();

  const role = localStorage.getItem("role");

  if(role == null){
    window.location = "/connexion";
  }

  const frenshAnimation =
    "flex flex-col py-[30px] gap-10 w-[250px] bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarLeftAnimation max-md:animate-sideLeftBarAnimation max-sm:animate-sideLeftBarAnimation";
  const arabicAnimation =
    "flex flex-col py-[30px] gap-10 w-[250px] font-arabic bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarRightAnimation max-md:animate-sideBarRightAnimation max-sm:animate-sideBarRightAnimation";

  return (
    <>
      <div
        id="sideBar"
        className="w-[250px]  max-sm:absolute top-0 left sideBar justify-start h-[100vh] text-textGreyColor font-semibold max-lg:hidden max-sm:hidden max-md:hidden">
        <div
          className={i18n.language == "ar" ? arabicAnimation : frenshAnimation}>
            <div className={`lg-hidden px-10 h-fit flex justify-end text-blackColor`} onClick={changeVisibility}>
              <ImCancelCircle size={25} className="lg:hidden"/>
            </div>

          <div className="flex items-center justify-center">
            <img
              className="w-[100px] aspect-square"
              src={Logo}
              alt="logo images"
            />
          </div>
          <nav className="text-[12px]  pr-10 pl-10">
            <ul className="flex flex-col items-start gap-[15px] mx-auto list-none">
              <MyNavLink route="" label={t("Acceuil")} icon={IoHome}/>
              {role == "Administrateur" || role == "Agent Trésor" ? <MyNavLink route="etablissements" label={t("Etablissements")} icon={IoMdBusiness}/> : <></>}
              {role != "Administrateur" && role != "Agent Trésor" ? <MyNavLink route="salaries" label={t("Salariés")} icon={MdGroups}/> : <></>}
              {role == "Administrateur" || role == "Agent Trésor" ? <MyNavLink route="banques" label={t("Banques")} icon={BsBank2}/> : <></> }
              {role == "Administrateur" ? <MyNavLink route="utilisateurs" label={t("Utilisateurs")} icon={FaUsers}/> : <></>}
              {role == "Administrateur" || role == "Agent Trésor" ? <MyNavLink route="cheques" label={t("Chèques")} icon={FaMoneyCheck}/> : <></> }
              {role == "Administrateur" || role == "Agent Trésor" ? <MyNavLink route="etats" label={t("Etats")} icon={FaMoneyBillWave}/> : <MyNavLink route="etats_etablissement" label={t("Etats")} icon={FaMoneyBillWave}/> }
              

            </ul>
          </nav>

         
        </div>
      </div>
    </>
  );
}
export default SideBar;
