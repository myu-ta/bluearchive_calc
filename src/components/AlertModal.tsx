type AlertModalProps = {
  message: string;
  handleOk: () => void;
  handleCancel?: () => void;
  modalRef: React.RefObject<HTMLDialogElement>;
};

const AlertModal: React.FC<AlertModalProps> = (props) => {
  const { message, handleOk, handleCancel, modalRef } = props;

  return (
    <dialog id="my_modal_1" className="modal" ref={modalRef}>
      <div className="modal-box">
        <p className="py-4 text-center text-xl">{message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex justify-around w-full ">
            {/* モーダルの中にボタンがあったら、それはcloseボタンになる https://daisyui.com/components/modal/ */}
            <button className="custom-button bg-sky-100 text-black" onClick={handleCancel}>
              閉じる
            </button>
            <button className="custom-button bg-sky-400" onClick={handleOk}>
              適用
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AlertModal;
