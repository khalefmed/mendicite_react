import TelechargerCSV from '@/components/ui/common/telecharger_csv';
import { ListeEtats } from '@/components/ui/listes/listeEtats';
import { ListeEtatsSalaries } from '@/components/ui/listes/listeEtatSalries';
import { api } from '@/lib/api';
import {useState, useEffect} from 'react'
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';


export const EtatDetails = () => {
    const {id} = useParams()
    const {t} = useTranslation();


    const [donnees, setDonnees] = useState([]);

    
    useEffect(() => {
        get()
        
      }, [])
  
      const get = async ()  => {
        try {
          const response = await api.get(`etats_salaries/${id}`);
          setDonnees(response.data)
        }
        catch (exception){
          console.log(exception)
          toast.error(<p className="text-redColor">{t('Une erreur s\'est produite')}</p>);
        }
    }


    return (
        <div className='py-10 mx-10 max-lg:mx-4 flex flex-col gap-3 rounded-lg '>
            <div className='w-full flex justify-end max-sm:justify-center'>
              <TelechargerCSV donnees={donnees} />
            </div>
            <ListeEtatsSalaries donnees={donnees}/>
        </div>
    )
}
