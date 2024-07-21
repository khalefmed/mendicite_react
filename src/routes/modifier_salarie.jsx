import BanquesChoix from '@/components/ui/common/BanquesChoix';
import EtablissementChoix from '@/components/ui/common/EtablissementChoix';
import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';


export const ModifierSalarie = () => {
    const {id} = useParams();
    const {t} = useTranslation();

    const [nom, setNom] = useState("");
    const [nni, setNNI] = useState("");
    const [salaire, setSalaire] = useState("");
    const [numero_compte, setNumeroCompte] = useState("");
    const [banque, setBanque] = useState({'id' : null, 'nom_banque' : "Choisissez la banque"});
    const [banques, setBanques] = useState([]);

    useEffect(() => {
        get();
        get_();
    }, [])
  
      const get = async ()  => {
        try {
          const response = await api.get(`salaries/${id}/`); 
          setNom(response.data.nom_salarie);
          setNNI(response.data.nni);
          setSalaire(response.data.salaire);
          setNumeroCompte(response.data.numero_compte);
          setBanque(response.data.banque)
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
                const response = await api.post(
                    `salaries/${id}/`,
                  {
                    'nom_salarie' : nom,
                    'nni' : nni,
                    'salaire' : salaire,
                    'numero_compte' : numero_compte,
                    'banque' : banque.id
                  }
                  ); 
                  window.location = "/salaries"
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

    const get_ = async ()  => {
        try {
          const response = await api.get("banque_active/"); 
          setBanques(response.data)
        }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }




    const valider = () => {
        if (nom == "" || nni == "" || salaire == "" || numero_compte == "" || banque.id == 0){
            return false;
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Modifier l\'etat')}</h1>
            <p className='text-lg max-sm:text-sm text-textGreyColor font-medium '>{t('Veuillez remplir les champs suivant pour modifier le salarié')}</p>
            <form onSubmit={(e) => modifier(e)} className='w-[400px] max-sm:w-full flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nom')}</p>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t("Entrez le nom ")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('NNI')}</p>
                    <input type="text" value={nni} onChange={(e) => setNNI(e.target.value)} placeholder={t("Entrez le numero national ")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Etablissement')}</p>
                    <BanquesChoix banque={banque} setBanque={setBanque} banques={banques}/>
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t("Numero de compte")}</p>
                    <input type="text" value={numero_compte} onChange={(e) => setNumeroCompte(e.target.value)} placeholder={t("Entrez le numero de compte")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Salaire')}</p>
                    <input type="text" value={salaire} onChange={(e) => setSalaire(e.target.value)} placeholder={t("Entrez le salaire")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>


                <input type="submit" onClick={modifier} value={t("Modifier le salarie")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
