import { type JSX } from "react";
import { Icon } from "@iconify/react";

type props = {
  link?: string;
  title: string;
  description: string;
  buttonText?: string;
  button2Text?: string;
  icon?: JSX.Element;
  variant?: "default" | "success" | "error" | "warning" | "info";
  buttonFunction?: () => void;
  button2Function?: () => void;
  closeModal: () => void;
};

export default function AlertBanner({
  title,
  description,
  icon,
  buttonText,
  button2Text,
  closeModal,
  // variant,
  buttonFunction,
  button2Function,
}: props) {
  // const [variantLabelStyle, setVariantLabelStyle] = useState<string>("");
  // const [variantButtonStyle, setVariantButtonStyle] = useState<string>("");

  // useEffect(() => {
  //   switch (variant) {
  //     case "default":
  //       setVariantLabelStyle("bg-primary text-white border-accent");
  //       setVariantButtonStyle("bg-white text-black/75");
  //       break;
  //     case "success":
  //       setVariantLabelStyle("bg-green-100 text-green-600 border-green-300");
  //       setVariantButtonStyle("bg-green-600 text-white");
  //       break;
  //     case "error":
  //       setVariantLabelStyle("bg-[#FFD3E266] text-red-950 border-red-950");
  //       setVariantButtonStyle("bg-red-950 text-white");
  //       break;
  //     case "warning":
  //       setVariantLabelStyle("bg-yellow-100 text-yellow-600 border-yellow-300");
  //       setVariantButtonStyle("bg-yellow-600 text-white");
  //       break;
  //     case "info":
  //       setVariantLabelStyle("bg-blue-100 text-blue-600 border-blue-300");
  //       setVariantButtonStyle("bg-blue-600 text-white");
  //       break;
  //     default:
  //       setVariantLabelStyle("bg-primary text-white border-accent");
  //       setVariantButtonStyle("bg-white text-black/75");
  //   }
  // }, [variant]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative mx-4 flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-lg lg:mx-auto">
          <Icon
            icon={"ic:sharp-close"}
            fontSize={20}
            className="absolute right-5 cursor-pointer"
            onClick={closeModal}
          />
          <div className="flex items-center justify-center">{icon}</div>
          <h2 className="text-center text-xl font-bold">{title}</h2>
          <p className="text-center text-gray-600">{description}</p>

          <div className="flex w-full flex-col gap-1.5">
            <button className="btn btn-primary" onClick={buttonFunction}>
              {buttonText}
            </button>
            {button2Text && (
              <button className="btn btn-white" onClick={button2Function}>
                {button2Text}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
