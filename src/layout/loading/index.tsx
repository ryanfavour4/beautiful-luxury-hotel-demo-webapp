import ReactDOM from "react-dom";
// import LoadingCircleSpinner from "@/components/ui/loading-circle-spinner";
import LoadingSvg from "@/../public/svg/loading.svg";

export const LoadingPopUp = () => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-light/50 backdrop-blur-sm">
      <div className="my-auto flex h-full max-h-96 w-full flex-col items-center justify-center gap-8 p-6">
        <img src={LoadingSvg} alt="loading svg" className="h-28 w-28" />
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement,
  );
};
