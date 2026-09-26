import { useVerifyEmail } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Verification = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { refetch } = useVerifyEmail({ token: token || "" });

  useEffect(() => {
    if (token) {
      refetch();
    } else {
      toast.error("Invalid verification link");
      navigate("/login", { replace: true });
    }
  }, [token, refetch, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingPopUp />
    </div>
  );
};

export default Verification;
