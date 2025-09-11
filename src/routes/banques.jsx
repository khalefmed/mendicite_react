import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/common/header';
import { StatsCard } from '@/components/ui/shared/statsCard';
import Company from '../assets/icons/company.svg';
import Salaries from '../assets/icons/salaries.svg';
import Argent from '../assets/icons/money_card.svg';
import { api } from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Recherche } from '@/components/ui/shared/recherche';
import { ListeBanques } from '@/components/ui/listes/listeBanques';
import { BsBank2 } from 'react-icons/bs';
import { FaMoneyBillWave } from 'react-icons/fa';
import AddButton from '../assets/add_button.png';
import { useNavigate } from 'react-router-dom'; // Ajout pour la navigation

function Banques() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate(); // Hook pour la navigation

  const [originalliste, setOriginalListe] = useState([]);
  const [liste, setListe] = useState([]);
  const [recherchetelephone, setRechercheTelephone] = useState('');
  const [recherchenni, setRechercheNni] = useState('');
  const [recherchetype, setRechercheType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ prenom: '', nom: '', nni: '', telephone: '', wilaya: '', moughataa: '', type_mendicite: '', csvFile: null });
  const [isSingleAdd, setIsSingleAdd] = useState(true);

  // Liste des Wilayas et leurs Moughataas
  const wilayas = {
    'نواكشوط الغربي': ['تفرغ زينة', 'لكصر', 'السبخة'],
    'نواكشوط الجنوبية': ['عرفات', 'الميناء', 'الرياض'],
    'نواكشوط الشمالية': ['دار النعيم', 'تيارت', 'توجنين'],
  };

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      const response = await api.get('mendicites/');
      console.log(response.status);
      console.log(response.data);
      setListe(response.data);
      setOriginalListe(response.data);
    } catch (exception) {
      console.log(exception);
      toast.error(<p className="text-redColor">{t('حدث خطأ ما')}</p>);
    }
  };

  const recherchertelephone = async (e) => {
    e.preventDefault();
    setRechercheTelephone(e.target.value);
    if (e.target.value === '') {
      setListe(originalliste);
      return '';
    }
    try {
      var newlist = originalliste.filter((e) =>
        e.telephone && e.telephone.toLowerCase().includes(recherchetelephone.toLowerCase())
      );
      setListe(newlist);
    } catch (exception) {}
  };

  const recherchernni = async (e) => {
    e.preventDefault();
    setRechercheNni(e.target.value);
    if (e.target.value === '') {
      setListe(originalliste);
      return '';
    }
    try {
      var newlist = originalliste.filter((e) =>
        e.nni && e.nni.toLowerCase().includes(recherchenni.toLowerCase())
      );
      setListe(newlist);
    } catch (exception) {}
  };

  const recherchertype = async (e) => {
    e.preventDefault();
    setRechercheType(e.target.value);
    if (e.target.value === '') {
      setListe(originalliste);
      return '';
    }
    try {
      var newlist = originalliste.filter((e) =>
        e.type_mendicite && e.type_mendicite.toLowerCase().includes(recherchertype.toLowerCase())
      );
      setListe(newlist);
    } catch (exception) {}
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ prenom: '', nom: '', nni: '', telephone: '', wilaya: '', moughataa: '', type_mendicite: '', csvFile: null });
    setIsSingleAdd(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'wilaya') {
      setFormData((prev) => ({ ...prev, moughataa: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, csvFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSingleAdd) {
        const response = await api.post('mendicites/', formData);
        setListe([response.data, ...liste]);
        setOriginalListe([response.data, ...originalliste]);
        closeModal();
        toast.success(<p className="text-green-600">{t('تم الإضافة بنجاح')}</p>);
      } else {
        if (!formData.csvFile) {
          toast.error(<p className="text-redColor">{t('يرجى اختيار ملف CSV')}</p>);
          return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.csvFile);
        const response = await api.post('mendicites/upload-csv/', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        await get();
        closeModal();
        toast.success(<p className="text-green-600">{t('تم استيراد ملف CSV بنجاح')}</p>);
      }
    } catch (exception) {
      console.log(exception);
      toast.error(<p className="text-redColor">{t('حدث خطأ ما')}</p>);
    }
  };

  const handleLogout = () => {
    navigate('/deconnexion');
  };

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-10">
      {/* Header with Logout Button */}
     

      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
          >
            {t('تسجيل الخروج')}
          </button>
          <img src={AddButton} width={150} alt="" onClick={openModal} className="cursor-pointer" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h2 className="text-xl font-semibold">لائحة المتسولين</h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Recherche
              rechercher={recherchernni}
              recherche={recherchenni}
              setRecherche={setRechercheNni}
              placeholder={t('الرقم الوطني ...')}
            />
            <Recherche
              rechercher={recherchertelephone}
              recherche={recherchetelephone}
              setRecherche={setRechercheTelephone}
              placeholder={t('رقم الهاتف ...')}
            />
            <Recherche
              rechercher={recherchertype}
              recherche={recherchetype}
              setRecherche={setRechercheType}
              placeholder={t('نوع الاعاقة ...')}
            />
          </div>
        </div>
        {liste && <ListeBanques donnees={liste} setDonnees={setListe} />}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg z-50 max-w-xs sm:max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{t('إضافة')}</h2>
            <div className="mb-4 p-1 rounded-lg flex justify-between items-center bg-bgGreyColor">
              <button
                onClick={() => setIsSingleAdd(true)} 
                className={`text-center rounded-lg w-full h-fit py-2 ${!isSingleAdd ? 'bg-bgGreyColor' : 'bg-white'}`}>
                {t('إضافة واحد')}
              </button>
              <button 
                onClick={() => setIsSingleAdd(false)}
                className={`text-center rounded-lg w-full h-fit py-2 ${isSingleAdd ? 'bg-bgGreyColor' : 'bg-white'}`}>
                {t('إضافة بقائمة')}
              </button>
            </div>
            {isSingleAdd ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
                    {t('الاسم الكامل')}
                  </label> */}
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={t('الاسم ...')}
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                    {t('الاسم العائلي')}
                  </label> */}
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={t('الاسم العائلي ...')}
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nni">
                    {t('الرقم الوطني')}
                  </label> */}
                  <input
                    type="text"
                    name="nni"
                    value={formData.nni}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={t('الرقم الوطني ...')}
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                    {t('رقم الهاتف')}
                  </label> */}
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={t('رقم الهاتف ...')}
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_mendicite">
                    {t('نوع الاعاقة')}
                  </label> */}
                  <input
                    type="text"
                    name="type_mendicite"
                    value={formData.type_mendicite}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={t('نوع الاعاقة ...')}
                  />
                </div>
                <div className="mb-2 sm:mb-4">
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wilaya">
                    {t('الولاية')}
                  </label> */}
                  <select
                    name="wilaya"
                    value={formData.wilaya}
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
                  {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="moughataa">
                    {t('المقاطعة')}
                  </label> */}
                  <select
                    name="moughataa"
                    value={formData.moughataa}
                    onChange={handleChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={!formData.wilaya}
                  >
                    <option value="">{t('اختر المقاطعة')}</option>
                    {formData.wilaya && wilayas[formData.wilaya].map((moughataa) => (
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
                    {t('إضافة')}
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
            ) : (
              <div>
                <div className="mb-3 sm:mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="csvFile">
                    {t('رفع ملف CSV')}
                  </label>
                  <input
                    type="file"
                    name="csvFile"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="appearance-none bg-inputFieldColor rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full sm:w-auto"
                  >
                    {t('رفع وإضافة')}
                  </button>
                  <button
                    type="button"
                    className="mt-2 sm:mt-0 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 w-full sm:w-auto"
                    onClick={closeModal}
                  >
                    {t('إغلاق')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Banques;