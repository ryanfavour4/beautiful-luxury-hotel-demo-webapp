// src/pages/auth/auth-handler.tsx

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { LoadingPopUp } from "@/layout/loading";
import { useAuthStore } from "@/store/auth";
import { useGetUser } from "@/api/hooks/useAuth";

const AuthHandler = () => {
  const navigate = useNavigate();
  const { isLoading, isFetched, isError } = useGetUser();
  const { auth } = useAuthStore();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (hasNavigated.current) return;
    if (isLoading) return;
    if (isError || !auth) {
      hasNavigated.current = true;
      navigate("/login", { replace: true });
      return;
    }

    if (auth) {
      hasNavigated.current = true;

      if (!auth?.user?.emailVerified) {
        navigate(`/send-verification-code?email=${auth?.user?.email}`, {
          replace: true,
        });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isLoading, isFetched, isError, auth, navigate]);

  return <LoadingPopUp />;
};

export default AuthHandler;
