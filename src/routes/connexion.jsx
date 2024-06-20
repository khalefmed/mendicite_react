// import { useState, React, forwardRef } from "react";

import { useState, forwardRef } from "react";
import Logo from "../assets/logo.jpg";
import Person from "../assets/icons/person.svg";
import Password from "../assets/icons/password.svg";
import Eye from "../assets/icons/eye.svg";
import EyeSlashed from "../assets/icons/eye_slashed.svg";


function Connexion() {

  const [show, setShow] = useState(false)


  return (
    <div className="flex flex-col items-center justify-center bg-bgGreyColor h-screen max-md:px-4 px-12 py-12 relative font-arabic ">
        <div className="w-[800px] max-lg:w-fit flex flex-row bg-white rounded-lg shadow-2xl shadow-shadowColor overflow-hidden ">
            <div className="w-[60%] p-10  flex flex-col max-lg:hidden justify-center  bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-white font-normal">
              <h1 className="font-semibold text-3xl h-12">Bienvenue !</h1>
              <p className="font-light text-bgGreyColor">Cette plateforme est une plateforme créée par le Trésor pour gérer les fiches de paie des employés travaillant dans les établissements partenaires du Trésor.</p>
            </div>

            
            <form className="lg:w-[40%] flex flex-col px-8 py-16 items-center justify-center align-center gap-8 ">
              <img src={Logo} height={30} width={120} className="mb-4" alt="" />
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <img src={Person} alt="" />
                  <input type="text" placeholder="Nom d'utilisateur" name="nom_utilisateur" className="outline-none placeholder-inputTextColor bg-inherit" />
                </div>
                <div className="flex flex-row gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <div className="flex flex-row gap-2">
                    <img src={Password} alt="" />
                    <input type={show ? "text" : "password"} placeholder="Mot de passe" name="password" className="outline-none placeholder-inputTextColor bg-inherit" />
                  </div>
                  <img src={show ? EyeSlashed : Eye} onClick={() => {setShow(!show); console.log("Changed")} } width={18} alt="" />
                </div>
                
              </div>
              <div className="w-full flex flex-row align-center justify-center gap-2 cursor-pointer  text-sm font-md px-4 py-3 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary hover:bg-gradient-to-l  text-white font-normal rounded-md ">
                <input type="submit" value="Connexion" className="cursor-pointer text-white"/>
              </div>

            </form>
        </div>
    </div>
  );
}

export default Connexion;
