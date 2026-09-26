import FormStepper from "@/components/form-stepper";
import { useState } from "react";
import { useKycSubmit } from "@/api/hooks/useAuth";
import FirstStep from "./steps/first-step";
import SecondStep from "./steps/second-step";
import { useNavigate } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const docOptions = [
  { label: "International Passport", value: "passport" },
  { label: "Driver's License", value: "drivers-license" },
  { label: "National ID", value: "nationa-id" },
  { label: "Voter's Card", value: "voters-card" },
];
export interface StepProps {
  fullName?: { value: string };
  setFullName?: React.Dispatch<React.SetStateAction<{ value: string }>>;
  country?: { value: string };
  setCountry?: React.Dispatch<React.SetStateAction<{ value: string }>>;
  docNum?: { value: string };
  setDocNum?: React.Dispatch<React.SetStateAction<{ value: string }>>;
  docType?: { value: string };
  setDocType?: React.Dispatch<React.SetStateAction<{ value: string }>>;
  selfiePreview?: string | null;
  setSelfiePreview?: React.Dispatch<React.SetStateAction<string | null>>;
  docFrontPreview?: string | null;
  setDocFrontPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setSelfieId?: React.Dispatch<React.SetStateAction<string | null>>;
  setDocFrontId?: React.Dispatch<React.SetStateAction<string | null>>;
}

const KYC = () => {
  const navigate = useNavigate();
  const { mutate: submitKyc } = useKycSubmit();
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState({ value: "" });
  const [country, setCountry] = useState({ value: "" });
  const [docNum, setDocNum] = useState({ value: "" });
  const [docType, setDocType] = useState({ value: "" });

  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [docFrontPreview, setDocFrontPreview] = useState<string | null>(null);

  const [selfieId, setSelfieId] = useState<string | null>(null);
  const [docFrontId, setDocFrontId] = useState<string | null>(null);

  const isButtonDisabled = () => {
    if (currentStep === 1) {
      return !fullName.value || !country.value || !selfieId;
    }
    if (currentStep === 2) {
      return !docFrontId || !docNum.value || !docType.value;
    }
    return false;
  };

  const handleSubmit = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
      submitKyc({
        fullName: fullName.value,
        nationality: country.value,
        documentNumber: docNum.value,
        documentType: docType.value,
        documentPhoto: docFrontId,
        selfiePhoto: selfieId,
      });
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      navigate("/dashboard/settings");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col rounded-2xl bg-light px-2 py-6 pb-12 md:ml-4 md:px-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-600">Identity Verification</h1>
        <p className="text-grey">Complete your KYC verification to unlock all features</p>
      </div>
      <div className="px-0">
        <FormStepper currentStep={currentStep} />

        <div className="mt-6 rounded-2xl bg-[#f9f9f9] p-5 px-3 pb-8 md:px-6">
          {currentStep === 1 && (
            <FirstStep
              fullName={fullName}
              setFullName={setFullName}
              country={country}
              setCountry={setCountry}
              setSelfiePreview={setSelfiePreview}
              selfiePreview={selfiePreview}
              setSelfieId={setSelfieId}
            />
          )}
          {currentStep === 2 && (
            <SecondStep
              docNum={docNum}
              setDocNum={setDocNum}
              docType={docType}
              setDocType={setDocType}
              setDocFrontId={setDocFrontId}
              selfiePreview={selfiePreview}
              docFrontPreview={docFrontPreview}
              setDocFrontPreview={setDocFrontPreview}
            />
          )}
          {currentStep === 3 && (
            <div className="gap- flex flex-col items-center justify-center">
              <h6 className="font-semibold">Verifying...</h6>
              <p className="text-sm text-neutral-400">
                Let’s verify your Information, This would take a minute or two.
              </p>
            </div>
          )}
        </div>

        <button
          className="btn-primary mt-8 disabled:bg-primary/60"
          disabled={isButtonDisabled()}
          onClick={handleSubmit}
        >
          {currentStep === 1 ? "Continue" : currentStep === 2 ? "Submit for verification" : "Done"}
        </button>
        <p className="py-5 text-center text-sm text-neutral-400">
          Your data is encrypted and securely stored. We comply with all data protection
          regulations.
        </p>
      </div>
    </div>
  );
};

export default KYC;
