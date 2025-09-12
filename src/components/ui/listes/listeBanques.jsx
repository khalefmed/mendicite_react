import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Logo from '../../../assets/eye.png';
import EditIcon from '../../../assets/edit.png';
import DeleteIcon from '../../../assets/delete.png';

export const ListeBanques = ({ donnees, setDonnees }) => {
  const { t } = useTranslation();
  const [liste, setListe] = useState(donnees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(false); // Nouvel état pour indiquer si c'est un mode modification
  const [editFormData, setEditFormData] = useState({
    nom: '',
    nni: '',
    telephone: '',
    type_mendicite: '',
    sexe: '',
    wilaya: '',
    moughataa: '',
  });

  // Liste des Wilayas et leurs Moughataas (à importer ou définir comme dans Banques)
  const wilayas = {
    'نواكشوط الغربي': ['تفرغ زينة', 'لكصر', 'السبخة'],
    'نواكشوط الجنوبية': ['عرفات', 'الميناء', 'الرياض'],
    'نواكشوط الشمالية': ['دار النعيم', 'تيارت', 'توجنين'],
  };

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

  const openModal = (item, isEdit = false) => {
    setSelectedItem(item);
    setEditMode(isEdit);
    if (isEdit) {
      setEditFormData({
        nom: item.nom || '',
        nni: item.nni || '',
        telephone: item.telephone || '',
        type_mendicite: item.type_mendicite || '',
        sexe: item.sexe || '',
        wilaya: item.wilaya || '',
        moughataa: item.moughataa || '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`mendicites/${selectedItem.id}/`, editFormData);
      setDonnees((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? response.data : item))
      );
      setListe((prev) =>
        prev.map((item) => (item.id === selectedItem.id ? response.data : item))
      );
      closeModal();
      toast.success(<p className="text-green-600">{t('تم التعديل بنجاح')}</p>);
    } catch (exception) {
      console.log(exception);
      if (exception.response && exception.response.status === 409) {
        toast.error(
          <p className="text-redColor">{t('الرقم الوطني موجود بالفعل، اختر رقمًا آخر')}</p>
        );
      } else {
        toast.error(<p className="text-redColor">{t('حدث خطأ أثناء التعديل')}</p>);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('هل أنت متأكد أنك تريد حذف هذا السجل؟'))) {
      try {
        await api.delete(`mendicites/${id}/`);
        setDonnees((prev) => prev.filter((item) => item.id !== id));
        setListe((prev) => prev.filter((item) => item.id !== id));
        toast.success(<p className="text-green-600">{t('تم الحذف بنجاح')}</p>);
      } catch (exception) {
        console.log(exception);
        toast.error(
          <p className="text-redColor">{t('حدث خطأ أثناء الحذف')}</p>
        );
      }
    }
  };

  const handlePrint = () => {
    const printContent = `
      <html>    
        <head><title>الطباعة</title></head>
        <body dir=rtl>
          <h2>${t('التفاصيل')}</h2>
          <p><strong>${t('الاسم الكامل')}:</strong> ${selectedItem?.nom}</p>
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
            <th className="py-4 text-center min-w-[300px] text-buttonColor font-semibold text-sm rounded-tl-lg">الاسم الكامل</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">رقم الهاتف</th>
            <th className="py-4 text-center min-w-[150px] text-buttonColor font-semibold text-sm">الرقم الوطني</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">الولاية</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">المقاطعة</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">نوع الاعاقة</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm">الجنس</th>
            <th className="py-4 text-center w-52 text-buttonColor font-semibold text-sm rounded-tr-lg">فعل</th>
          </tr>
        </thead>
        <tbody>
          {liste?.map((e) => (
            <tr key={e.id} className="bg-whiteColor">
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.nom}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.telephone == '' ? '----' : e.telephone}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.nni}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.wilaya == '' ? '----' : e.wilaya}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.moughataa == '' ? '----' : e.moughataa}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.type_mendicite == '' ? '----' : e.type_mendicite}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm">{e.sexe == '' ? '----' : e.sexe}</td>
              <td className="py-4 text-center text-blackColor font-medium text-sm flex justify-center gap-1">
                <img
                  src={Logo}
                  width={20}
                  alt="View"
                  className="cursor-pointer"
                  onClick={() => openModal(e, false)}
                />
                <img
                  src={EditIcon}
                  width={20}
                  alt="Edit"
                  className="cursor-pointer"
                  onClick={() => openModal(e, true)}
                />
                <img
                  src={DeleteIcon}
                  width={20}
                  alt="Delete"
                  className="cursor-pointer"
                  onClick={() => handleDelete(e.id)}
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {editMode ? t('تعديل المواطن') : t('معلومات المواطن')}
            </h2>
            {selectedItem && (
              <div>
                {!editMode ? (
                  <>
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
                  </>
                ) : (
                  <form onSubmit={handleEdit}>
                    <div className="mb-2 sm:mb-4">
                      <input
                        type="text"
                        name="nom"
                        value={editFormData.nom}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={t('الاسم العائلي ...')}
                      />
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <input
                        type="text"
                        name="nni"
                        value={editFormData.nni}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={t('الرقم الوطني ...')}
                      />
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <input
                        type="text"
                        name="telephone"
                        value={editFormData.telephone}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={t('رقم الهاتف ...')}
                      />
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <input
                        type="text"
                        name="type_mendicite"
                        value={editFormData.type_mendicite}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={t('نوع الاعاقة ...')}
                      />
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <select
                        name="sexe"
                        value={editFormData.sexe}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">{t('اختر الجنس')}</option>
                        {['ذكر', 'أنثى'].map((sexe) => (
                          <option key={sexe} value={sexe}>
                            {sexe}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <select
                        name="wilaya"
                        value={editFormData.wilaya}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">{t('اختر الولاية')}</option>
                        {Object.keys(wilayas).map((wilaya) => (
                          <option key={wilaya} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <select
                        name="moughataa"
                        value={editFormData.moughataa}
                        onChange={handleChange}
                        className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={!editFormData.wilaya}
                      >
                        <option value="">{t('اختر المقاطعة')}</option>
                        {editFormData.wilaya && wilayas[editFormData.wilaya].map((moughataa) => (
                          <option key={moughataa} value={moughataa}>
                            {moughataa}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full sm:w-auto"
                      >
                        {t('حفظ التعديل')}
                      </button>
                      <button
                        type="button"
                        className="mt-2 sm:mt-0 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 w-full sm:w-auto"
                        onClick={closeModal}
                      >
                        {t('إغلاق')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};