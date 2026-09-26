import React from "react";

type Step = {
  id: number;
  label: string;
};

const defaultSteps: Step[] = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Document Upload" },
  { id: 3, label: "Verification" },
];

type Props = {
  currentStep: number;
  stepsTrack?: Step[];
};

const FormStepper = ({ currentStep, stepsTrack = defaultSteps }: Props) => {
  return (
    <div className="w-full py-6">
      <div className="flex w-full items-center justify-between">
        {stepsTrack.map((step, index) => {
          const isActive = currentStep >= step.id;
          const isCompleted = currentStep > step.id;
          const isLastStep = index === stepsTrack.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Label Container */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    isActive ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? <span className="text-lg">✓</span> : step.id}
                </div>

                {/* Label: Now part of the flow, no absolute positioning */}
                <div className="mt-2">
                  <p
                    className={`whitespace-nowrap text-xs font-semibold ${
                      isActive ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              {!isLastStep && (
                <div className="mx-0 mb-6 h-[2px] min-w-[20px] flex-1 bg-gray-200 transition-all duration-300">
                  <div
                    className={`h-full bg-primary transition-all duration-500 ${
                      isCompleted ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FormStepper;
