import StepOne from "@/sections/application-steps/step-one";
import StepTwo from "@/sections/application-steps/step-two";

import { useState, useMemo } from "react";
import ProfileNavBar from "@/components/dashboard/navbar/index";
import FormStepper from "../../components/form-stepper";

export default function PaymentAndBooking() {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (stepValue: number) => {
    if (stepValue <= steps.length || stepValue > 1) {
      setActiveStep(stepValue);
    }
  };

  const steps = useMemo(() => {
    return [
      {
        label: "Your Selection",
        component: <StepOne changeActiveStep={changeActiveStep} />,
        id: 1,
      },
      {
        label: "Your Details",
        component: <StepTwo />,
        id: 2,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeComponent = useMemo(() => {
    return steps.find((step) => step.id === activeStep)?.component || null;
  }, [activeStep, steps]);

  return (
    <div className="">
      <>
        <ProfileNavBar />
      </>
      <div className="items-center">
        <div className="container px-2 pt-8">
          <FormStepper stepsTrack={steps} currentStep={activeStep} />
        </div>
        {activeComponent}
      </div>
    </div>
  );
}
