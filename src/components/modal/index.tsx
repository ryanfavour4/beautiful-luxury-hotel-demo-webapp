import ReactDOM from "react-dom";

type props = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  isModalClosed: boolean;
  closeModal: () => void;
  className?: string;
  parentClassName?: string;
};

const Modal = ({ children, isModalClosed, closeModal, className, parentClassName }: props) => {
  return ReactDOM.createPortal(
    <>
      <div
        onClick={closeModal}
        className={` ${parentClassName} fixed top-0 z-50 h-screen w-full overflow-y-scroll bg-dark/50 backdrop-blur-sm transition-all delay-75 ${
          isModalClosed && "invisible opacity-0"
        }`}
      >
        <div onClick={(e) => e.stopPropagation()} className={`mx-auto ${className}`}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement,
  );
};

export default Modal;
