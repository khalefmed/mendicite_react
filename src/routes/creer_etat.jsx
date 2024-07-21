
import EtablissementChoix from '@/components/ui/common/EtablissementChoix';
import EtatsChoix from '@/components/ui/common/EtatsChoix';
import Spinner from '@/components/ui/shared/spinner';
import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'


export const CreerEtat = () => {
    const {t} = useTranslation();

    const [etablissement, setEtablissement] = useState({'id' : null, 'nom_etablissement' : t('Choisissez un établissement')});
    const [nom, setNom] = useState("");
    const [etablissements, setEtablissements] = useState([]);
    const [en_cours, setEnCours] = useState(false);

    useEffect(() => {
        get();
    }, [])

    const get = async ()  => {
        try {
          const response = await api.get("etablissements/"); 
          setEtablissements(response.data.liste)
          console.log(response)
        }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }

    const creer = async (e)  => {
        e.preventDefault();
        if (valider()) {
            setEnCours(true)
            try {
                const response = await api.post(
                  "creer_etat/",
                  {
                      "nom_etat" : nom,
                  }
                  ); 
                  window.location = "/etats_etablissement"
              }
              catch (exception){
                setEnCours(false)
                console.log(exception)
                toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
              }

        }
        else {
            toast.error(<p className="text-redColor">{t('Veuillez remplir les champs')}</p>);
        }
        
    }


    const valider = () => {
        if (nom == ""){
            return false;
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Nouveau  Etat')}</h1>
            <p className='text-lg max-sm:text-sm text-textGreyColor font-medium '>{t('Veuillez remplir les champs suivant pour créer un nouveau établissement')}</p>
            <form onSubmit={(e) => creer(e)} className='w-[400px] max-sm:w-full flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nom')}</p>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t("Entrez le nom de l'etat")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                
                <div className="w-full flex flex-row align-center items-center justify-center gap-2 cursor-pointer  text-sm  font-medium px-4 py-3 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary hover:bg-gradient-to-l  text-white  rounded-md ">
                    {en_cours ? <Spinner color="white" /> : <></>}
                    <input type="submit" onClick={(e) => creer(e)} value={t("Créer l'etat")} className="cursor-pointer w-full text-white font-medium"/>
                    <span></span>
                </div>
            </form>

        </div>
    )
}
