import ToggleSwitch from "@/components/toggle-switch";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Currencies, Languages } from "@/pages/dashboard/settings/data/index";
import { Link, Outlet } from "react-router";
import ChangePassword from "./change-password";
import { useAuthStore } from "@/store/auth";

const SettingsPage = () => {
  const { auth } = useAuthStore();
  const [openCurrencies, setOpenCurrencies] = useState(false);
  const [currency, setCurrency] = useState(Currencies[0]);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [language, setLanguage] = useState(Languages[0]);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col rounded-2xl bg-light px-6 py-4 pb-12 md:ml-4">
      <Outlet />

      {passwordOpen && <ChangePassword closeModal={() => setPasswordOpen(false)} />}

      <div className="pb-12">
        <h1 className="border-b-2 border-b-neutral-300 py-4 text-2xl font-bold text-black/80">
          Customization Preferences
        </h1>

        {/* Currency */}
        <div className="flex w-full flex-col items-start justify-between gap-y-4 py-4 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-lg font-semibold">Currency</h4>
            <p className="text-sm text-neutral-400">
              Select your desired currency for transactions and price display, simplifying
              international use.
            </p>
          </div>

          <div
            className="relative rounded-xl border-[1px] border-neutral-300"
            onClick={() => setOpenCurrencies(!openCurrencies)}
          >
            <div
              className={`flex cursor-pointer items-center justify-end gap-1 p-2 text-sm font-semibold hover:text-primary ${
                openCurrencies ? "text-primary" : "text-neutral-400"
              }`}
            >
              <p>{currency.symbol}</p>
              <p>{currency.name}</p>
              {openCurrencies ? (
                <Icon icon={"lucide:chevron-up"} />
              ) : (
                <Icon icon={"lucide:chevron-down"} />
              )}
            </div>

            {openCurrencies && (
              <div className="absolute left-0 top-10 z-10 h-64 w-52 overflow-y-auto rounded-xl bg-white p-2 shadow-md md:right-0">
                {Currencies.map((curr) => (
                  <p
                    key={curr.code}
                    className="cursor-pointer p-3 hover:rounded-lg hover:bg-gray-100"
                    onClick={() => {
                      setCurrency(curr);
                      setOpenCurrencies(false);
                    }}
                  >
                    {curr.symbol} {curr.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Language */}
        <div className="flex w-full flex-col items-start justify-between gap-y-4 py-4 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-lg font-semibold">Language</h4>
            <p className="text-sm text-neutral-400">
              Choose your preferred language for app display, enhancing your user experience.
            </p>
          </div>

          <div
            className="relative flex cursor-pointer items-center justify-end gap-1 rounded-xl border-[1px] border-neutral-300 p-2 text-sm font-semibold text-neutral-400"
            onClick={() => setOpenLanguages(!openLanguages)}
          >
            <Icon icon={language.flag} />
            <p>{language.name}</p>
            {openLanguages ? (
              <Icon icon={"lucide:chevron-up"} />
            ) : (
              <Icon icon={"lucide:chevron-down"} />
            )}

            {openLanguages && (
              <div className="absolute left-0 top-10 z-10 w-52 rounded-xl bg-white p-2 shadow-md md:right-0">
                {Languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex cursor-pointer items-center gap-2 p-3 hover:rounded-lg hover:bg-gray-100 hover:text-primary"
                    onClick={() => {
                      setLanguage(lang);
                      setOpenLanguages(false);
                    }}
                  >
                    <Icon icon={lang.flag} />
                    <p>{lang.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="flex w-full flex-col justify-between gap-y-4 py-4 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-lg font-semibold">Personalized recommendations</h4>
            <p className="text-sm text-neutral-400">
              We personalize recommendations based on your activity. You can opt out anytime.
            </p>
          </div>
          <ToggleSwitch rounded />
        </div>
      </div>

      {/* Security */}
      <div>
        <h1 className="border-b-2 border-b-neutral-300 py-4 text-2xl font-bold text-black/80">
          Security
        </h1>

        <div className="flex flex-col items-start justify-normal gap-2 py-3">
          <h4 className="text-lg font-semibold">Password</h4>
          <p className="text-sm text-neutral-400">
            Easily update your password in settings to maintain account security and ensure privacy.
          </p>

          <button
            className="btn w-auto rounded-xl border-[1px] border-black/50 p-2 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300"
            onClick={() => setPasswordOpen(true)}
            disabled={auth?.user?.googleId !== null}
          >
            Set Password
          </button>
          {auth?.user?.googleId && (
            <p className="text-sm text-yellow-500">
              Your account is linked to a third-party authenticator!
            </p>
          )}
        </div>
        <div className="flex flex-col items-start justify-normal gap-2 py-3">
          <h4 className="text-lg font-semibold">KYC Verification</h4>
          <p className="text-sm text-neutral-400">
            Complete your KYC verification to unlock all features
          </p>
          <Link to={"kyc"} className="btn w-auto rounded-xl border-[1px] border-black/50 p-2">
            Setup KYC
          </Link>
        </div>

        <div className="flex flex-col items-start justify-normal gap-2 py-3">
          <h4 className="text-lg font-semibold">Remove account</h4>
          <p className="text-sm text-neutral-400">
            Delete your account through settings for complete removal of your data from the system.
          </p>
          <button className="btn w-auto rounded-xl border-[1px] border-error p-2 text-error">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
