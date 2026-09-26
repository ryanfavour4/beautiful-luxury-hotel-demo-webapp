import Input from "@/components/input";
import { IInputState } from "@/components/input/useInput";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import bgImage from "../../../../public/image/charleson-hotel-exterior.webp";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
import CountrySelect from "@/components/country-select";
import { PasswordValidationRules, validatePassword } from "@/utils/validate-password";
import { signInWithGoogleService } from "@/api/services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending, isSuccess } = useRegister();
  const [fullName, setFullName] = useState<IInputState>({ value: "" });
  const [email, setEmail] = useState<IInputState>({ value: "" });
  const [country, setCountry] = useState({ value: "" });
  const [password, setPassword] = useState<IInputState>({ value: "" });
  const [referredBy, setReferredBy] = useState<IInputState>({ value: "" });
  const [validationStatus, setValidationStatus] = useState<PasswordValidationRules>(
    validatePassword(""),
  );

  const isAllValid = Object.values(validationStatus).every((status) => status === true);

  const rulesList = [
    { label: "At least 8 characters long", key: "length" },
    { label: "A lowercase letter", key: "lowercase" },
    { label: "An uppercase letter", key: "uppercase" },
    { label: "A number (0-9)", key: "number" },
    { label: "A special character (!@#$%^&*)", key: "special" },
  ];

  const firstPasswordError = (() => {
    if (password.value.length === 0 || isAllValid) {
      return "";
    }

    for (const rule of rulesList) {
      if (!validationStatus[rule.key as keyof PasswordValidationRules]) {
        return rule.label;
      }
    }
    return "";
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAllValid) {
      return toast.error("Please ensure your password meets all requirements.");
    }

    registerUser({
      fullName: fullName.value,
      email: email.value,
      country: country.value,
      password: password.value,
      referredBy: referredBy.value,
    });
  };

  useEffect(() => {
    setValidationStatus(validatePassword(password.value));
  }, [password.value]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`/send-verification-code?email=${email.value}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const referralId = new URLSearchParams(window.location.search).get("referralId");

    if (referralId) {
      setReferredBy({ value: referralId });
    }
  }, []);

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

        <div className="col-span-5 pb-10 md:overflow-y-scroll">
          <form className="mx-auto flex max-w-sm flex-col gap-4 px-3 pt-8" onSubmit={handleSubmit}>
            <h2 className="py-9 text-center text-2xl font-bold">Create Account</h2>

            <div className="flex w-full flex-col items-start justify-normal gap-1">
              <label className="font-semibold" htmlFor="fullName">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                state={fullName}
                setState={setFullName}
                placeholder="e.g John Doe"
                className="w-full border-neutral-100 bg-neutral-200 text-black outline-0 placeholder:text-neutral-500"
                required
              />
            </div>

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
                required
              />
            </div>

            <div className="flex w-full flex-col items-start justify-normal gap-1">
              <label className="font-semibold" htmlFor="country">
                Select Country
              </label>
              <div className="input-field flex items-center !border-[1.45px] border-text/25 bg-transparent px-0 py-0 pr-2.5 ring-offset-2 hover:!border-primary hover:ring-2">
                <CountrySelect
                  value={country.value}
                  name={"country"}
                  placeHolder={"Choose Country"}
                  onChange={(e) => setCountry({ value: e.target.name })}
                  className="!h-10 !w-full !border-none !bg-transparent !text-xs"
                />
              </div>
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
                required
              />
              <div className="mt-1 text-sm">
                {firstPasswordError && (
                  <div className="text-red-600">
                    <p>Password must contain: {firstPasswordError.toLowerCase()}</p>
                  </div>
                )}
                {!firstPasswordError && password.value.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Icon icon="material-symbols:check-circle-rounded" fontSize={16} />
                    <p>Password is strong!</p>
                  </div>
                )}
                {!firstPasswordError && password.value.length === 0 && (
                  <p className="text-gray-500">
                    Must contain at least 8 characters, numbers, and special characters.
                  </p>
                )}
              </div>
            </div>

            {/* <div className="flex w-full flex-col items-start justify-normal gap-2">
            <label className="font-semibold" htmlFor="referredBy">
              Referral Code (Optional)
            </label>
            <Input
              type="text"
              name="referredBy"
              state={referredBy}
              setState={setReferredBy}
              required={false}
              className="w-full border-neutral-100 bg-neutral-200 text-black outline-0 placeholder:text-neutral-500"
            />
          </div> */}

            <button
              className="btn-primary mt-6 flex w-full items-center gap-2 rounded-md"
              disabled={isPending || !email.value || !password.value}
            >
              <p>{isPending ? "Creating Account..." : "Create an account"}</p>
              {isPending && <Icon icon={"line-md:loading-loop"} className="animate-spin" />}
            </button>

            <div className="flex items-center gap-4 text-nowrap">
              <hr className="w-full" />
              <p className="w-full text-nowrap"> Or Sign In With</p>
              <hr className="w-full" />
            </div>

            <button
              type="button"
              onClick={() => signInWithGoogleService({ referredBy: referredBy.value })}
              className="btn flex items-center justify-center gap-3 border border-primary"
            >
              <Icon icon="logos:google-icon" className="text-lg" />
              <span>Continue with Google</span>
            </button>

            <p className="pt-3 text-center text-sm md:text-left">
              By signing up you agree to our{" "}
              <Link to={"/term-of-use"} className="text-primary">
                Terms and Conditions of Use
              </Link>
            </p>
            <p className="">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
