// import { useState, React, forwardRef } from "react";

import { useState, forwardRef } from "react";
import Logo from "../assets/logo.jpg";
import Person from "../assets/icons/person.svg";
import Password from "../assets/icons/password.svg";
import Eye from "../assets/icons/eye.svg";
import EyeSlashed from "../assets/icons/eye_slashed.svg";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";



function Connexion() {

  const {t} = useTranslation()
  const [nom_utilisateur, setNomUtilisateur] = useState();
  const [mot_de_passe, setMotDePasse] = useState();

  const [show, setShow] = useState(false)

  const connexion = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("connexion/", {
        "telephone" : nom_utilisateur,
        "mot_de_passe" : mot_de_passe
      });
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("prenom", response.data.utilisateur.first_name);
      window.localStorage.setItem("nom", response.data.utilisateur.last_name);
      window.localStorage.setItem("role", response.data.role);
      window.location = "/"
    }
    catch (exception){
      console.log(exception.response.status)
      if (exception.response.status === 401){
        toast("Mot de passe Incorrecte");
      }
      else if (exception.response.status = 404){
        toast("Vous n'etes pas autorisés");

      }
      else {
        toast("Une erreur s'est produite");
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center bg-bgGreyColor h-screen max-md:px-4 px-12 py-12 relative font-arabic ">
        <div className="w-[800px] max-lg:w-fit flex flex-row bg-white rounded-lg shadow-2xl shadow-shadowColor overflow-hidden ">
            <div className="w-[60%] p-10  flex flex-col max-lg:hidden justify-center  bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-white font-normal">
              <h1 className="font-semibold text-3xl h-12">{t('Bienvenue')}</h1>
              <p className="font-light text-bgGreyColor">{t('Connexion text')}</p>
            </div>

            
            <form onSubmit={connexion} className="lg:w-[40%] flex flex-col px-8 py-16 items-center justify-center align-center gap-8 ">
              <img src={Logo} height={30} width={120} className="mb-4" alt="" />
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <img src={Person} alt="" />
                  <input type="text" value={nom_utilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} placeholder={t("Nom utilisateur")} name="nom_utilisateur" className="outline-none placeholder-inputTextColor bg-inherit" />
                </div>
                <div className="flex flex-row justify-between gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <div className="flex flex-row  gap-2">
                    <img src={Password} alt="" />
                    <input type={show ? "text" : "password"} value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} placeholder={t("Mot de passe")} name="password" className="outline-none placeholder-inputTextColor bg-inherit" />
                  </div>
                  <img src={show ? EyeSlashed : Eye} onClick={() => {setShow(!show); console.log("Changed")} } width={18} alt="" />
                </div>
                
              </div>
              <div className="w-full flex flex-row align-center justify-center gap-2 cursor-pointer  text-sm font-md px-4 py-3 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary hover:bg-gradient-to-l  text-white font-normal rounded-md ">
                <input type="submit" value={t("Connexion")} className="cursor-pointer text-white"/>
              </div>

            </form>
        </div>
        <Toaster />
    </div>
  );
}

export default Connexion;
