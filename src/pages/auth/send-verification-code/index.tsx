import { useResendVerification } from "@/api/hooks/useAuth";
import Logo from "@/components/logo";
import { LoadingPopUp } from "@/layout/loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SendCode = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(120);
  const { mutate: resendVerification, isPending: isPendingResend } = useResendVerification();
  const email = new URLSearchParams(window.location.search).get("email");

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      toast.error("No email provided");
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  const handleResend = () => {
    if (!email) toast.error("Email address is missing");
    resendVerification({ email }, { onSuccess: () => setTimer(120) });
  };

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isPendingResend && <LoadingPopUp />}

      {/* Backdrop */}

      <div className="flex min-h-screen flex-col items-center justify-center bg-light p-4">
        <div className="w-full max-w-lg rounded-lg p-8 text-center shadow transition-transform duration-300 ease-in-out md:p-6">
          <Logo className="mx-auto w-32" variant="alt" />

          <h1 className="mb-4 mt-4 text-2xl font-semibold tracking-wide text-dark md:text-3xl">
            Almost there!
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-text">
            We've sent a <strong>verification link</strong> to your inbox at{" "}
            <span className="rounded-md font-bold text-primary">{email}</span>. Please click the
            link in the email to activate your account and unlock full access.
          </p>

          <div className="mt-8 border-t border-grey/25 pt-4 text-sm">
            <p className="mb-3 text-sm text-grey">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            {timer > 0 && (
              <p className="text-dark-300 px-3 py-3">{"Resend Code in " + timer + "s"}</p>
            )}

            <button
              onClick={handleResend}
              disabled={isPendingResend || timer > 0}
              className={`btn-primary transition-all duration-300 ease-in-out ${
                isPendingResend ? "cursor-not-allowed bg-grey" : ""
              }`}
            >
              {isPendingResend ? "Sending..." : "Resend Verification Email"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendCode;
