import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Logo from '../../../assets/eye.png';

export const ListeBanques = ({ donnees, setDonnees }) => {
  const { t } = useTranslation();
  const [liste, setListe] = useState(donnees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log('Here here');
    console.log(donnees);
    setListe(donnees);
  }, [donnees]);

  const activer_desactiver = async (id, status) => {
    try {
      await api.put(`${status}/${id}/`);
      window.location.reload();
    } catch (exception) {
      console.log(exception);
      toast.error(
        <p className="text-redColor">{t("Une erreur s'est produite")}</p>
      );
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Fonction pour imprimer le contenu du modal
  const handlePrint = () => {
    const printContent = `
      <html>    
        <head><title>الطباعة</title></head>
        <body dir=rtl>
          <h2>${t('التفاصيل')}</h2>
          <p><strong>${t('الاسم الكامل')}:</strong> ${selectedItem?.prenom} ${selectedItem?.nom}</p>
          <p><strong>${t('الرقم الوطني')}:</strong> ${selectedItem?.nni}</p>
          <p><strong>${t('رقم الهاتف')}:</strong> ${selectedItem?.telephone}</p>
          <p><strong>${t('نوع الاعاقة')}:</strong> ${selectedItem?.type_mendicite}</p>
          <p><strong>${t('الولاية')}:</strong> ${selectedItem?.wilaya}</p>
          <p><strong>${t('المقاطعة')}:</strong> ${selectedItem?.moughataa}</p>
        </body>
      </html>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full border-separate border-spacing-y-2">
        <thead className="bg-whiteColor">
          <tr>
            <th className="py-4 text-center min-w-[100px] text-buttonColor font-semibold text-sm rounded-tl-lg">الاسم الكامل</th>
            <th className="py-4 text-center min-w-[300px] text-buttonColor font-semibold text-sm">الرقم الوطني</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">رقم الهاتف</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">محل السكن</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">الولاية</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">المقاطعة</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm rounded-tr-lg">نوع الاعاقة</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm rounded-tr-lg">فعل</th>
          </tr>
        </thead>
        <tbody>
          {liste?.map((e) => (
            <tr key={e.id} className="bg-whiteColor">
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.prenom}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.nom}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.telephone}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.nni}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.type_mendicite}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.wilaya}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.moughataa}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm flex justify-center">
                <img
                  src={Logo}
                  width={20}
                  alt="View"
                  className="cursor-pointer"
                  onClick={() => openModal(e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{t('معلومات المواطن')}</h2>
            {selectedItem && (
              <div>
                <div className="text-gray-700 flex flex-row flex-wrap justify-between mb-6">
                    <div className='w-[150px]'>
                        <p><strong>{t('الاسم الكامل')}</strong> </p>
                        <p>{selectedItem.prenom} {selectedItem.nom}</p>
                    </div>
                    <div className='w-[150px]'>
                        <p><strong>{t('الرقم الوطني')}</strong> </p>
                        <p>{selectedItem.nni}</p>
                    </div>
                </div>
                <div className="text-gray-700 flex flex-row flex-wrap justify-between mb-6">
                    <div className='w-[150px]'>
                        <p><strong>{t('رقم الهاتف')}</strong> </p>
                        <p>{selectedItem.telephone}</p>
                    </div>
                    <div className='w-[150px]'>
                        <p><strong>{t('نوع الاعاقة')}</strong> </p>
                        <p>{selectedItem.type_mendicite}</p>
                    </div>
                </div>
                <div className="text-gray-700 flex flex-row flex-wrap justify-between mb-6">
                    <div className='w-[150px]'>
                        <p><strong>{t('الولاية')}</strong> </p>
                        <p>{selectedItem.wilaya}</p>
                    </div>
                    <div className='w-[150px]'>
                        <p><strong>{t('المقاطعة')}</strong> </p>
                        <p>{selectedItem.moughataa}</p>
                    </div>
                </div>
              </div>
            )}
            <div className="mt-4 flex justify-center gap-2">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                onClick={handlePrint}
              >
                {t('طباعة')}
              </button>
              <button
                className="ml-2 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                {t('إغلاق')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};