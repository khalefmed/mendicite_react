import EtablissementChoix from '@/components/ui/common/EtablissementChoix';
import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'


export const ModifierInformations = () => {
    const {t} = useTranslation();

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [nom_utilisateur, setNomUtilisateur] = useState("");
    const [telephone, setTelephone] = useState("");
    

    useEffect(() => {
        get();
    }, [])

    const get = async ()  => {
        try {
          const response = await api.get("profil/"); 
          setPrenom(response.data.first_name)
          setNom(response.data.last_name)
          setTelephone(response.data.telephone)
          setNomUtilisateur(response.data.username)
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
                  "modifier_informations/",
                  {
                    'first_name' : prenom,
                    'last_name' : nom,
                    'username' : nom_utilisateur,
                    'telephone' : telephone,
                  }
                  ); 
                  window.location = "/profil"
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
        if (prenom == "" || nom == "" || telephone == "" || nom_utilisateur == ""){
            return false;
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Modification des informations')}</h1>
            <p className='text-lg max-sm:text-sm text-textGreyColor font-medium '>{t('Veuillez remplir les champs suivant pour modifier vos informations personnelles')}</p>
            <form onSubmit={(e) => modifier(e)} className='w-[400px] max-sm:w-full flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Prenom')}</p>
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder={t('Entrez le prenom')} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nom')}</p>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t('Entrez le nom')} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t("Nom d'utilisateur")}</p>
                    <input type="text" value={nom_utilisateur} onChange={(e) => setNomUtilisateur(e.target.value)} placeholder={t("Entrez le nom de l'utilisateur")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Telephone')}</p>
                    <input type="number" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder={t("Entrez le numero de telephone")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>


                <input type="submit" onClick={modifier} value={t("Modifier")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
