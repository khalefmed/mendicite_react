import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'


export const MotDePasse = () => {
    const {t} = useTranslation();


    const [ancien, setAncien] = useState("");
    const [nouveau, setNouveau] = useState("");
    const [confirmation, setConfirmation] = useState("");


    const modifier = async (e)  => {
        e.preventDefault();
        if (valider()) {
            
            try {
                const response = await api.put(
                    `modifier_mot_de_passe/`,
                  {
                      "ancien" : ancien,
                      "nouveau" : nouveau ,
                  }
                  ); 
                  window.location.reload()
              }
              catch (exception){
                console.log(exception)
                toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
              }

        }
        else {
            toast.error(<p className="text-redColor">{t('Veuillez remplir les champs')}</p>);
        }
        
    }


    const valider = () => {
        if (ancien == "" || nouveau == "" ||  confirmation == ""){
            return false;
        }
        else {
            if (nouveau != confirmation){
                return false;
            }
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Modifier le mot de passe')}</h1>
            <p className='text-lg text-textGreyColor font-medium'>{t('Veuillez remplir les champs suivant  pour modifier votre mot de passe')}</p>
            <form onSubmit={(e) => modifier(e)} className='w-[400px] flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Ancien')}</p>
                    <input type="text" value={ancien} onChange={(e) => setAncien(e.target.value)} placeholder={t("Entrez l\'ancien mot de passe")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nouveau')}</p>
                    <input type="text" value={nouveau} onChange={(e) => setNouveau(e.target.value)} placeholder={t("Entrez le nouveau mot de passe")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nouveau')}</p>
                    <input type="text" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder={t("Entrez le nouveau mot de passe")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>

                <input type="submit" onClick={modifier} value={t("Modifier le mot de passe")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
