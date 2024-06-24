import { api } from '@/lib/api';
import {useState} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'


export const CreerCheque = () => {
    const {t} = useTranslation();

    const [numero, setNumero] = useState("");
    const [nom, setNom] = useState("");

    const creer = async (e)  => {
        e.preventDefault();
        if (valider()) {
            try {
                const response = await api.post(
                  "cheques/",
                  {
                      "numero_cheque" : numero,
                      "nom_cheque" : nom,
                  }
                  ); 
                  window.location = "/cheques"
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
        if (numero == "" || nom == ""){
            return false;
        }
        return true;
    }
    
    return (
        <div className='p-10 mx-10 flex flex-col gap-3 bg-whiteColor rounded-lg shadow-xl shadow-shadowColor'>
            <h1 className='text-2xl text-blackColor font-bold'>{t('Nouveau chèque')}</h1>
            <p className='text-lg text-textGreyColor font-medium'>{t('Creer page cheque')}</p>
            <form onSubmit={(e) => creer(e)} className='w-[400px] flex flex-col gap-4 '>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Numero')}</p>
                    <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder={t("Entrez le numero du cheque")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>
                <div>
                    <p  className='text-lg  text-blackColor font-semibold'>{t('Nom')}</p>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t("Entrez le nom du chèque")} className="px-4 py-2 w-full bg-inputFieldColor rounded-lg outline-none placeholder-inputTextColor font-medium" />
                </div>

                <input type="submit" onClick={creer} value={t("Créer le chèque")}  className="w-full rounded text-center py-2 mt-2 bg-gradient-to-b from-buttonGradientSecondary to-buttonGradientPrimary text-whiteColor font-medium cursor-pointer " />
            </form>

        </div>
    )
}
