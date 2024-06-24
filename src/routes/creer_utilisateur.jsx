import EtablissementChoix from '@/components/ui/common/EtablissementChoix';
import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'


export const CreerUtilisateur = () => {
    const {t} = useTranslation();

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [nom_utilisateur, setNomUtilisateur] = useState("");
    const [telephone, setTelephone] = useState("");
    const [etablissement, setEtablissement] = useState({'id' : null, 'nom_etablissement' : "Choisissez l'etablissement"});
    const [etablissements, setEtablissements] = useState([]);

    useEffect(() => {
        get();
    }, [])

    const get = async ()  => {
        try {
          const response = await api.get("etablissements/"); 
          setEtablissements(response.data.liste)
        }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }

    const creer = async (e)  => {
        e.preventDefault();
        if (valider()) {
            try {
                const response = await api.post(
                  "utilisateurs/",
                  {
                    'first_name' : prenom,
                    'last_name' : nom,
                    'username' : nom_utilisateur,
                    'telephone' : telephone,
                    'password' : '12345678',
                    'etablissement' : etablissement.id
                  }
                  ); 
                  window.location = "/utilisateurs"
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
            <h1 className='text-2xl text-blackColor font-bold'>{t('Nouveau utilisateur')}</h1>
            <p className='text-lg text-textGreyColor font-medium'>{t('Veuillez remplir les champs suivant pour créer un nouveau utilisateur')}</p>
            <form onSubmit={(e) => creer(e)} className='w-[400px] flex flex-col gap-4 '>
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
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Etablissement')}</p>
                    <EtablissementChoix etablissement={etablissement} setEtablissement={setEtablissement} etablissements={etablissements}/>
                </div>


                <input type="submit" onClick={creer} value={t("Créer l'utilisateur")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
