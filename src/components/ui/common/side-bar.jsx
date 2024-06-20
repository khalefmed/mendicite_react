import Logo from "../../../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { MyNavLink } from "../shared/navLink";
import {TruckIcon} from "../../icons/truck.jsx";



function SideBar(props) {
  const { i18n, t } = useTranslation();

  const switchLanguage = lang => {
    window.localStorage.setItem("lang", lang);
    window.location.reload();
  };

  const role = localStorage.getItem("role");

  if(role == null){
    window.location = "/connexion";

  }

  const frenshAnimation =
    "flex flex-col py-[30px] gap-10 w-[250px] bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarLeftAnimation max-md:animate-sideLeftBarAnimation max-sm:animate-sideLeftBarAnimation";
  const arabicAnimation =
    "flex flex-col py-[30px] gap-10 w-[250px] bg-whiteColor  h-full text-[12px] overflow-y-scroll z-50 max-lg:absolute max-md:absolute max-sm:absolute transform max-lg:animate-sideBarRightAnimation max-md:animate-sideBarRightAnimation max-sm:animate-sideBarRightAnimation";

  return (
    <>
      <div
        id="sideBar"
        className="w-[250px]  max-sm:absolute top-0 left sideBar justify-start h-[100vh] text-textGreyColor font-semibold max-lg:hidden max-sm:hidden max-md:hidden">
        <div
          className={i18n.language == "ar" ? arabicAnimation : frenshAnimation}>
          <div className="flex items-center justify-center">
            <img
              className="w-[100px] aspect-square"
              src={Logo}
              alt="logo images"
            />
          </div>
          <nav className="text-[12px]  pr-10 pl-10">
            <ul className="flex flex-col items-start gap-[15px] mx-auto list-none ">
              <MyNavLink route="acceuil" label="Acceuil" icon={TruckIcon}/>
              <MyNavLink route="etablissements" label="Etablissements" icon={TruckIcon}/>
              <MyNavLink route="salaries" label="Salariés" icon={TruckIcon}/>

            </ul>
          </nav>

         
        </div>
      </div>
    </>
  );
}
export default SideBar;
