// import { useState, React, forwardRef } from "react";

import { useState, forwardRef } from "react";
import Logo from "../assets/logo.png";
import Person from "../assets/icons/person.svg";
import Password from "../assets/icons/password.svg";
import Eye from "../assets/icons/eye.svg";
import EyeSlashed from "../assets/icons/eye_slashed.svg";
import { useTranslation } from "react-i18next";
import { api } from "@/lib/api";
import { toast, Toaster } from "react-hot-toast";
import Spinner from "@/components/ui/shared/spinner";



function Connexion() {

  const {t} = useTranslation()
  const [nom_utilisateur, setNomUtilisateur] = useState();
  const [mot_de_passe, setMotDePasse] = useState();
  const [en_cours, setEnCours] = useState(false);

  const [show, setShow] = useState(false)

  const connexion = async (e) => {
    e.preventDefault()
    try {
      setEnCours(true)
      const response = await api.post("connexion/", {
        "telephone" : nom_utilisateur,
        "mot_de_passe" : mot_de_passe
      });
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("prenom", response.data.utilisateur.first_name);
      window.localStorage.setItem("nom", response.data.utilisateur.last_name);
      window.location = "/"
      
    }
    catch (exception){
      setEnCours(false)
      console.log(exception.response.status)
      if (exception.response.status === 401){
        toast.error(<p className="text-redColor"> تأكد من كلمة المرور </p>);
      }
      else if (exception.response.status = 404){
        toast.error(<p className="text-redColor">ليس لديكم الصلاحيات</p>);
      }
      else {
        toast.error(<p className="text-redColor">حدث خطأ</p>);
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center bg-bgGreyColor h-screen max-md:px-4 px-12 py-12 relative font-arabic ">
        <div className="w-[800px] max-lg:w-fit flex flex-row bg-white rounded-lg shadow-2xl shadow-shadowColor overflow-hidden ">
            <div className="w-[60%] p-10  flex flex-col max-lg:hidden justify-center  bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-white font-normal">
              <h1 className="font-semibold text-3xl h-12">مرحبا !</h1>
              <p className="font-light text-bgGreyColor text-xl">هذه المنصة أنشأها البرنامج الوطني لمكافحة التسول لتسيير ومتابعة بيانات المستفيدين والإجراءات المتعلقة بالدعم.</p>
            </div>

            
            <form onSubmit={connexion} className="lg:w-[40%] flex flex-col px-8 py-16 items-center justify-center align-center gap-4 ">
              <img src={Logo} height={50} width={220} className="mb-4" alt="" />
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <img src={Person} alt="" />
                  <input type="text" value={nom_utilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} placeholder='اسم المستخدم' name="nom_utilisateur" className="outline-none placeholder-inputTextColor bg-inherit" />
                </div>
                <div className="flex flex-row justify-between gap-2 bg-bgGreyColor px-4 py-3 text-sm w-full font-light rounded-md">
                  <div className="flex flex-row  gap-2">
                    <img src={Password} alt="" />
                    <input type={show ? "text" : "password"} value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} placeholder='كلمة المرور' name="password" className="outline-none placeholder-inputTextColor bg-inherit" />
                  </div>
                  <img src={show ? EyeSlashed : Eye} onClick={() => {setShow(!show); console.log("Changed")} } width={18} alt="" />
                </div>
                
              </div>
              <div className="w-full flex flex-row align-center items-center justify-center gap-2 cursor-pointer  text-sm font-medium px-4 py-3 bg-buttonColor  text-white font-normal rounded-md ">
                {en_cours ? <Spinner color="white" /> : <></>}
                <input type="submit" onClick={(e) => connexion(e)} value='تسجيل الدخول' className="cursor-pointer w-full text-white font-medium"/>
                <span></span>
              </div>

            </form>
        </div>
        <Toaster />
    </div>
  );
}

export default Connexion;
