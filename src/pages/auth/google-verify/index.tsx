import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { encryptData } from "@/utils/crypt";
import { useGetUser } from "@/api/hooks/useAuth";
import { CountingDots } from "@/components/ui/dot-loader";
import { Icon } from "@iconify/react";
import Logo from "@/components/logo";
import DashedLineAnimation from "@/components/ui/dashed-line-animation";
import cautionError from "/svg/fail-caution.svg";
import successCheck from "/svg/success-check.svg";
import { useAuthStore } from "@/store/auth";
import { getRedirectPath } from "@/utils/redirects";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { refetch, isError, isLoading, isSuccess } = useGetUser();
  const searchParams = new URLSearchParams(window.location.search);
  const status = searchParams.get("status");
  const token = searchParams.get("token");

  useLayoutEffect(() => {
    if (isSuccess) {
      toast.success("Signed in successfully!");
      const redirectTo = getRedirectPath();

      const timer = setTimeout(() => navigate(redirectTo, { replace: true }), 2000);
      return () => clearTimeout(timer);
    }

    if (status === "failed" || isError) {
      const errorMsg = "Google sign in failed. Please try again.";
      toast.error(errorMsg);
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }

    if (status === "success" || !isError) {
      const authData = { user: null, token };
      localStorage.setItem("auth", encryptData(authData));
      setAuth(authData);
      // wait 1 seconds and refetch
      const timer = setTimeout(() => refetch(), 1000);
      return () => clearTimeout(timer);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, token, isError, isSuccess]);

  return (
    <div className="mt-16 flex flex-col items-center px-4">
      <div className={`mb-10 flex gap-2 ${!isLoading && "items-center"}`}>
        <Icon icon="logos:google-icon" className="text-4xl" />
        <div className="w-48">
          {isLoading ? (
            <DashedLineAnimation />
          ) : (
            <div className="flex items-center">
              {!isError ? (
                <>
                  <div className="w-full rounded-full border-2 border-dashed border-success" />
                  <img
                    src={successCheck}
                    className="mx-auto w-10 animate-pulse [animation-duration:2.5s] [animation-iteration-count:infinite]"
                  />
                  <div className="w-full rounded-full border-2 border-dashed border-success" />
                </>
              ) : (
                <>
                  <div className="w-full rounded-full border-2 border-dashed border-error" />
                  <img
                    src={cautionError}
                    className="mx-auto w-10 animate-wiggle [animation-duration:0.3s] [animation-iteration-count:infinite]"
                  />
                  <div className="w-full rounded-full border-2 border-dashed border-error/25" />
                </>
              )}
            </div>
          )}
        </div>
        <Logo variant="icon" className="h-fit w-7" />
      </div>

      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-text">
          {isError ? "Unable to sign in redirecting" : "Processing Google Sign-In"}
        </h1>
        <CountingDots />
      </div>

      <p className="mt-3 text-sm text-grey">
        {isError ? "Oh Bummer!" : "Please Wait. Do not close this window."}
      </p>
    </div>
  );
};

export default GoogleAuth;
