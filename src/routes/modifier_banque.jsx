import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';


export const ModifierBanque = () => {
    const {id} = useParams()
    const {t} = useTranslation();


    const [code, setCode] = useState("");
    const [nom, setNom] = useState("");

    
    useEffect(() => {
        get()
        
      }, [])
  
      const get = async ()  => {
        try {
          const response = await api.get(`banques/${id}/`); 
          setCode(response.data.code_banque);
          setNom(response.data.nom_banque);
        }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }

    const modifier = async (e)  => {
        e.preventDefault();
        if (valider()) {
            try {
                const response = await api.put(
                    `banques/${id}/`,
                  {
                      "code_banque" : code,
                      "nom_banque" : nom ,
                  }
                  ); 
                  window.location = "/banques"
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
        if (code == "" || nom == ""){
            return false;
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Modifier la banque')}</h1>
            <p className='text-lg max-sm:text-sm text-textGreyColor font-medium '>{t('Veuillez remplir les champs suivant  pour modifier la banque')}</p>
            <form onSubmit={(e) => modifier(e)} className='w-[400px] max-sm:w-full flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Code')}</p>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("Entrez le code de la banque")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nom')}</p>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t("Entrez le nom de la banque")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>

                <input type="submit" onClick={modifier} value={t("Modifier la banque")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
