import { ListeEtats } from '@/components/ui/tables/listeEtats';
import { ListeEtatsSalaries } from '@/components/ui/tables/listeEtatSalries';
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
        <div className='p-10 mx-10 flex flex-col gap-3 rounded-lg '>
            <ListeEtatsSalaries donnees={donnees}/>
        </div>
    )
}
