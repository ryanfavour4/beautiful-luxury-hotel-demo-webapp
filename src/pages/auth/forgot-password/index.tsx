import { useForgotPassword } from "@/api/hooks/useAuth";
import Input from "@/components/input";
import { IInputState } from "@/components/input/useInput";
import { LoadingPopUp } from "@/layout/loading";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<IInputState>({ value: "" });
  const { mutate: sendCode, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendCode(
      { email: email.value },
      {
        onSuccess: () => {
          navigate(`/reset-password?email=${email}`);
        },
      },
    );
  };

  return (
    <div className="m-auto flex max-w-lg flex-col items-center justify-center px-6 pt-12">
      {isPending && <LoadingPopUp />}
      <div className="w-full">
        <form className="flex flex-col gap-4 pt-6 lg:pt-0" onSubmit={handleSubmit}>
          <Link to="/login" className="flex items-center justify-normal hover:text-primary">
            <Icon icon="material-symbols:arrow-left" fontSize={24} />
            <p>Go back</p>
          </Link>
          <h2 className="pb-4 pt-6 text-center text-2xl font-bold text-black">Forgot Password</h2>
          <p className="">A code will be sent to your email to reset your password.</p>
          <div className="flex w-full flex-col items-start justify-normal gap-2">
            <label className="font-semibold text-black" htmlFor="email">
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

          <div className="mt-6">
            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? "Sending..." : "Send Code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
