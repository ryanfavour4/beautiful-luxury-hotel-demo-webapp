import { useChangePassword } from "@/api/hooks/useAuth";
import Input from "@/components/input";
import { LoadingPopUp } from "@/layout/loading";
import { rulesList } from "@/pages/auth/reset-password";
import { PasswordValidationRules, validatePassword } from "@/utils/validate-password";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
type props = {
  closeModal: () => void;
};
const ChangePassword = ({ closeModal }: props) => {
  const [oldPassword, setOldPassword] = useState({ value: "" });
  const [newPassword, setNewPassword] = useState({ value: "" });

  const [validationStatus, setValidationStatus] = useState<PasswordValidationRules>(
    validatePassword(""),
  );

  const { mutate, isPending } = useChangePassword();

  useEffect(() => {
    setValidationStatus(validatePassword(newPassword.value));
  }, [newPassword.value]);
  const isOverallValid = Object.values(validationStatus).every((status) => status === true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOverallValid) {
      return;
    }
    mutate(
      {
        currentPassword: oldPassword.value,
        newPassword: newPassword.value,
      },
      {
        onSuccess: () => {
          setOldPassword({ value: "" });
          setNewPassword({ value: "" });
          closeModal();
        },
      },
    );
  };
  return (
    <>
      {isPending && <LoadingPopUp />}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 py-8 backdrop-blur-sm transition-all">
        {/* Modal Content */}
        <div className="max-h-[90vh] w-[90%] max-w-lg overflow-y-auto rounded-md bg-white px-6 py-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <h2 className="flex items-center justify-center pb-4 text-lg font-bold">
                Set up new password
              </h2>
              <Icon
                className="absolute -top-3 right-0 size-5 cursor-pointer"
                icon={"famicons:close"}
                onClick={closeModal}
              />
            </div>

            <div className="flex flex-col justify-normal gap-2">
              <label htmlFor="old-password" className="text-sm font-medium">
                Current Password{" "}
              </label>
              <Input
                placeholder="Enter Current Password"
                state={oldPassword}
                setState={setOldPassword}
                type="password"
                name="oldPassword"
              />
            </div>
            <div className="flex flex-col justify-normal gap-2">
              <label htmlFor="new-password" className="text-sm font-medium">
                New Password{" "}
              </label>
              <Input
                placeholder="Enter New Password"
                state={newPassword}
                setState={setNewPassword}
                type="password"
                name="newPassword"
              />
            </div>
            {newPassword.value.length > 0 && (
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
            )}
            <div className="flex w-auto items-end justify-end pt-12">
              <button className="btn-primary w-auto p-2 px-4" type="submit">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
