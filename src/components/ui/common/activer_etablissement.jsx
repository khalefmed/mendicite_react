import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";

const ActiverEtablissement = ({ activer, id, statut }) => {
  const { i18n, t } = useTranslation();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className=" min-w-24 flex flex-row items-center justify-center align-center gap-1 rounded-md border border-1 border-blackColor text-blackColor hover:bg-blackColor hover:text-whiteColor duration-500 text-lg font-medium">
          {/* <MdDelete size={13}/> */}
          <span className="text-xs">
            {statut == "activer_etablissement" ? t("Activer") : t("Desactiver")}
          </span>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-blackColor m-0 text-[17px] font-semibold">
            {t("Etes vous vraiment sûr ?")}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            {t("Voulez vous vraiment chnager le statut de cet établissement")}
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="text-textGreyColor  hover:bg-bgGreyColor focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium ">
                {t("Annuler")}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={() => activer(id, statut)}>
              <button className="text-blackColor bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                {t("Oui, je suis sûr")}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ActiverEtablissement;
