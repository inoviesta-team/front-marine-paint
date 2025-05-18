import MarineButton from "@components/ui/MarineButton";
import { BadgeInfo, CheckCircle, MessageCircleWarning } from "lucide-react";
import useModalStore from "../zustand/useModalStore";

export default function GlobalModal() {
  const { isShowModal, modalType, modalVariant, headMessage, message, customBtnMessage, showModal, hideModal, onConfirm } = useModalStore();

  const iconVariant = {
    DEFAULT: <BadgeInfo size={40} color="#155da2" />,
    SUCCESS: <CheckCircle size={40} color="#155da2" />,
    DANGER: <MessageCircleWarning size={40} color="#155da2" />,
  }

  const buttonType = {
    INFO: (
      <MarineButton className="w-full rounded-xl" onClick={onConfirm ?? hideModal} >{customBtnMessage ?? "Tutup"}</MarineButton>
    ),
    CONFIRM: (
      <div className="flex justify-between items-center gap-2.5 w-full">
        <MarineButton variant="tertiary" className="w-full rounded-xl" onClick={hideModal} >Batal</MarineButton>
        <MarineButton className="w-full rounded-xl" onClick={() => {
          onConfirm()
          hideModal()
        }} >Lanjutkan</MarineButton>
      </div>
    )
  }

  return (
    <>
      {isShowModal && (
        <div className="overflow-y-scroll xl:overflow-y-hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 md:py-8 px-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full h-auto sm:h-auto max-w-lg shadow-xl grid place-items-center">
              {iconVariant[modalVariant]}
              <div className="my-5 text-center">
                <h1 className={"capitalize text-2xl font-bold"}>{headMessage}</h1> 
                <p className="text-marine-accent font-medium text-base">{message}</p>
              </div>
              {buttonType[modalType]}
          </div>
        </div>
      )}
    </>
  );
}