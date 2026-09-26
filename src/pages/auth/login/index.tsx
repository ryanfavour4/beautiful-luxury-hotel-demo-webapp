import Input from "@/components/input";
import { IInputState } from "@/components/input/useInput";
import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";
import bgImage from "@/../public/image/charleson-hotel-exterior.webp";
import { Link, useNavigate } from "react-router";
import { useLogin } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
import { useAuthStore } from "@/store/auth";
import { signInWithGoogleService } from "@/api/services/auth.service";
import { getRedirectPath } from "@/utils/redirects";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<IInputState>({ value: "" });
  const [password, setPassword] = useState<IInputState>({ value: "" });
  const { mutate: loginUser, isPending } = useLogin();
  const { auth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.value) return toast.error("Email is required");
    if (!password.value) return toast.error("Password is required");

    loginUser(
      {
        email: email.value,
        password: password.value,
      },
      {
        onSuccess: () => {
          const redirectTo = getRedirectPath();
          navigate(redirectTo, { replace: true });
        },
        onError: () => {
          if (auth?.user?.emailVerified) {
            navigate(`/send-verification-code?email=${email.value}`, { replace: true });
          }
        },
      },
    );
  };

  return (
    <>
      {isPending && <LoadingPopUp />}

      <div className="flex h-screen grid-cols-12 flex-col md:grid">
        <div
          className="col-span-7 hidden !bg-cover !bg-center md:block"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)),url(${bgImage})`,
          }}
        />

        <div className="col-span-5">
          <form className="mx-auto flex max-w-sm flex-col gap-4 px-3 pt-8" onSubmit={handleSubmit}>
            <h2 className="py-9 text-center text-2xl font-bold text-text">Sign in</h2>

            <div className="flex w-full flex-col items-start justify-normal gap-1">
              <label className="font-semibold" htmlFor="email">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                state={email}
                setState={setEmail}
                placeholder="e.g johndoe@email.com"
                className="w-full border-neutral-100 bg-neutral-200 text-black outline-0 placeholder:text-neutral-500"
                required={true}
              />
            </div>

            <div className="flex w-full flex-col items-start justify-normal gap-1">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                state={password}
                setState={setPassword}
                className="w-full border-neutral-100 bg-neutral-200 text-black outline-0 placeholder:text-neutral-500"
                required={true}
              />
              <Link to="/forgot-password" className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <button
              className="btn-primary mt-6 flex w-full items-center gap-2 rounded-md"
              disabled={isPending || !email.value || !password.value}
            >
              <p>{isPending ? "Signing in..." : "Login"}</p>
              {isPending && <Icon icon={"line-md:loading-loop"} className="animate-spin" />}
            </button>

            <div className="flex items-center gap-4 text-nowrap">
              <hr className="w-full" />
              <p className="w-full text-nowrap"> Or Sign In With</p>
              <hr className="w-full" />
            </div>

            <button
              type="button"
              onClick={() => signInWithGoogleService({})}
              className="btn flex items-center justify-center gap-3 border border-primary"
            >
              <Icon icon="logos:google-icon" className="text-lg" />
              <span>Continue with Google</span>
            </button>

            <p className="mt-5">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-primary">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
