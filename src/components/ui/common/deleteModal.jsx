/* eslint-disable react/prop-types */
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import deleteIcon from "../../../../assets/icons/delete.svg";
import { useTranslation } from "react-i18next";



function DeleteModal(props) {



  const {t, i18n} = useTranslation();

  const style = {
      borderRadius : "0.5rem",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      pt: 3,
      pb: 2,
      px:2,
    };

    if (i18n.language == "ar"){
      style['fontFamily'] = "Tajawal"
      style['direction'] = "rtl"
    }
    else {
      style['fontFamily'] = "Tajawal"
      style['direction'] = "ltr"
    }


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(row.colis_source.length);
  return (
    <div>
      <Button onClick={handleOpen} style={{margin:0, padding:0, minWidth: 30}}>
        <img height={30} width={30} src={deleteIcon} alt="" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex flex-col align-center justify-center items-center gap-6">
            {/* <span onClick={handleClose} className="absolute top-2 right-4 cursor-pointer font-bold">✕</span> */}
            <h1 className="font-semibold text-md">{t('alerte')}</h1>

            <p>{props.label}</p>

            <div className="flex flex-row items-start w-full justify-end">
                <button onClick={handleClose} className=" px-3 py-2  text-blackColor rounded-lg text-sm">
                   {t('annuler')}
                </button>
                <button onClick={props.deleteItem} className=" px-3 py-2 bg-redColor hover:bg-red-800 text-whiteColor rounded-lg text-sm">
                    {t('deleteConfirm')}
                </button>

            </div>

            
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteModal;
