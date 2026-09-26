import { useResendVerification, useResetPassword, useVerifyResetCode } from "@/api/hooks/useAuth";
import Input from "@/components/input";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { IInputState } from "@/components/input/useInput";
import { LoadingPopUp } from "@/layout/loading";
import { PasswordValidationRules, validatePassword } from "@/utils/validate-password";

export const rulesList = [
  { label: "At least 8 characters long", key: "length" },
  { label: "A lowercase letter", key: "lowercase" },
  { label: "An uppercase letter", key: "uppercase" },
  { label: "A number (0-9)", key: "number" },
  { label: "A special character (!@#$%^&*)", key: "special" },
];
const ResetPassword = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const [password, setPassword] = useState<IInputState>({ value: "" });
  const [activeStep, setActiveStep] = useState<number>(1);
  const [code, setCode] = useState<string>("");
  const [LoadingResend, setLoadingResend] = useState(false);
  const [validationStatus, setValidationStatus] = useState<PasswordValidationRules>(
    validatePassword(""),
  );

  const { mutate: verifyCode, isPending: pendVerify } = useVerifyResetCode();
  const {
    mutate: resetPassword,
    isPending: pendReset,
    isSuccess: isSucessReset,
  } = useResetPassword();
  const { mutate: resendPassword } = useResendVerification();

  useEffect(() => {
    setValidationStatus(validatePassword(password.value));
  }, [password.value]);

  const isOverallValid = Object.values(validationStatus).every((status) => status === true);

  const handleChange = (code: string) => setCode(code);

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text").trim().slice(0, 6);
    setCode(data);
  };

  const handleSubmitVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    if (!email) {
      toast.error("User email is missing. Please restart the forgot password process.");
      return;
    }
    verifyCode(
      { email, code },
      {
        onSuccess: () => {
          setActiveStep(2);
        },
      },
    );
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOverallValid) {
      toast.error("Please meet all password requirements.");
      return;
    }
    resetPassword({ email, code, password: password.value });
  };

  useEffect(() => {
    if (isSucessReset) {
      navigate("/login");
    }
  }, [isSucessReset, navigate]);

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("User email is missing.");
      return;
    }
    if (LoadingResend) return;
    setLoadingResend(true);
    resendPassword(
      { email },
      {
        onSuccess: () => {
          toast.success("New code sent!");
          setLoadingResend(false);
        },
        onError: () => {
          setLoadingResend(false);
        },
      },
    );
  };

  return (
    <div className="m-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6">
      {(LoadingResend || pendVerify || pendReset) && <LoadingPopUp />} {/* Consolidated loading */}
      {/* <------------------------ STEP 1: VERIFY CODE --------------------------> */}
      {activeStep === 1 && (
        <div className="w-full">
          {/* <Logo className="m-auto w-20" /> */}
          <form className="flex flex-col gap-4 pt-6 lg:pt-0" onSubmit={handleSubmitVerify}>
            <h2 className="pb-4 pt-6 text-center text-2xl font-bold text-black">Verify Code</h2>
            <p className="text-center">
              Enter the 6-digit code sent to (**{email || "your email"}**).
            </p>

            <div className="flex w-full items-center justify-center py-4">
              <OtpInput
                value={code}
                onChange={handleChange}
                numInputs={6}
                onPaste={handlePaste}
                renderSeparator={<span style={{ width: "16px" }}></span>}
                renderInput={(props) => <input {...props} className="otp-input" />}
                shouldAutoFocus={true}
                containerStyle={{ justifyContent: "center" }}
                inputStyle={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "45px",
                  height: "50px",
                  fontSize: "18px",
                  color: "#000",
                  fontWeight: "500",
                  caretColor: "blue",
                  margin: "0 4px",
                }}
              />
            </div>

            <div className="mt-6 flex w-full items-center justify-center">
              <button
                type="submit"
                className="btn-primary w-full max-w-sm"
                disabled={pendVerify || code.length < 6}
              >
                {pendVerify ? "Verifying..." : "Verify Code"}
              </button>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              {/* Resend handler changed to a button for better accessibility and correct type */}
              <button
                type="button"
                onClick={handleResend}
                className="cursor-pointer text-primary hover:underline disabled:text-gray-400"
                disabled={LoadingResend}
              >
                Didn't receive the code? **{LoadingResend ? "Sending..." : "Resend"}**
              </button>
            </div>
          </form>
        </div>
      )}
      {/* <---------------------------STEP 2: SET NEW PASSWORD ------------------------> */}
      {activeStep === 2 && (
        <div className="w-full">
          <form
            className="flex flex-col items-start justify-center gap-4 pt-6 lg:pt-0"
            onSubmit={handleSubmitPassword}
          >
            {/* <Logo className="m-auto w-20" /> */}

            <div className="w-full text-center">
              <h2 className="pb-4 pt-6 text-2xl font-bold text-black">Set New Password</h2>
              <p className="text-sm text-gray-600">Enter a strong password</p>
            </div>

            <div className="flex w-full flex-col items-center justify-center pt-4">
              <Input
                type="password"
                name="password"
                placeholder="Enter new password"
                setState={setPassword}
                state={password}
                className="w-full"
              />
            </div>

            <div className="mt-2 flex w-full flex-col gap-x-4 gap-y-2 text-sm">
              {rulesList.map((rule) => (
                <div key={rule.key} className="flex items-center gap-2">
                  {validationStatus[rule.key as keyof PasswordValidationRules] ? (
                    <Icon
                      icon="material-symbols:check-circle-rounded"
                      color="#1fce27"
                      fontSize={18}
                    />
                  ) : (
                    <Icon icon="material-symbols:cancel" color="#ce1f1f" fontSize={18} />
                  )}
                  <p
                    className={
                      validationStatus[rule.key as keyof PasswordValidationRules]
                        ? "font-medium text-gray-700"
                        : "text-gray-500"
                    }
                  >
                    {rule.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex w-full items-center justify-center">
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={pendReset || !isOverallValid}
              >
                {pendReset ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
