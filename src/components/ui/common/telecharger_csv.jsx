import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDownload } from 'react-icons/fa6';

const TelechargerCSV = ({donnees}) => {
    const {t} = useTranslation();

  const genererCSV = () => {
    const titres = ['nni', 'nom', 'montant_net', 'banque', 'numero_compte'];

    let contenu = 'data:text/csv;charset=utf-8,';
    contenu += titres.join(',') + '\n';

    donnees.forEach(e => {
        var ligne = [];
        ligne.push(e.salarie.nni)
        ligne.push(e.salarie.nom_salarie)
        ligne.push(e.montant_net)
        ligne.push(e.salarie.banque.code_banque)
        ligne.push(e.salarie.numero_compte)

      contenu += ligne.join(',') + '\n';
    });

    return encodeURI(contenu);
  };

  const Telecharger = () => {
    const csv = genererCSV();
    const lien = document.createElement('a');
    lien.setAttribute('href', csv);
    lien.setAttribute('download', 'etat.csv');
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
  };

  return (
    <div onClick={Telecharger} className='px-3 py-2  flex flex-row items-center justify-center align-center gap-1 rounded-md border border-1 border-blackColor text-blackColor hover:bg-blackColor hover:text-whiteColor duration-500 text-lg font-medium'>
        <FaDownload size={13}/>
        <span className='text-xs text-center'>{t("Telecharger CSV")}</span>
    </div>
    
  );
};

export default TelechargerCSV;
