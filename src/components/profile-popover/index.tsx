import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useLogout } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
import { Icon } from "@iconify/react";
import ProfilePictureRandom from "../ui/profile-picture-random";

export function ProfilePopover({
  userProfileDropOpen,
  setUserProfileDropOpen,
}: {
  userProfileDropOpen: boolean;
  setUserProfileDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { auth } = useAuthStore();
  const { mutate: mutateLogout, isPending } = useLogout();

  const popOverMenus = [
    {
      icon: <Icon icon={"solar:user-linear"} className="text-2xl" />,
      name: "Profile",
      link: "/dashboard/personal-data",
      function: () => null,
    },
    {
      icon: <Icon icon={"material-symbols-light:door-open-outline-rounded"} className="text-2xl" />,
      name: "Logout",
      className: "bg-error/25 text-error hover:bg-error/25",
      link: "#",
      function: mutateLogout,
    },
  ];

  return (
    <>
      {isPending && <LoadingPopUp />}

      <div
        className={`absolute right-1 top-12 z-10 block h-0 w-fit min-w-72 overflow-hidden rounded-xl bg-light px-1 transition duration-1000 md:top-[65px] ${userProfileDropOpen ? "h-fit py-1 shadow-md" : "h-0"}`}
      >
        <Link
          to={"/kyc"}
          className={`mb-1.5 hidden items-center gap-2 rounded-lg border-b px-1 py-1 ${!auth?.token && "!hidden"} ${auth?.user?.kycStatus === null ? "bg-error/25 text-error" : "bg-success/25 text-success"}`}
        >
          <Icon
            icon={"solar:verified-check-bold"}
            className={`text-xl ${auth?.user?.kycStatus === null ? "text-error" : "text-success"}`}
          />
          <p className="text-sm font-semibold leading-3">{auth?.user?.kycStatus.status}</p>
        </Link>

        <div className="flex items-center gap-2 rounded-full px-1 py-1 hover:bg-text/10">
          {auth?.user?.avatar ? (
            <img
              className="h-7 w-7 rounded-full bg-primary object-cover md:h-10 md:w-10"
              src={auth?.user?.avatar}
              alt=""
            />
          ) : (
            <ProfilePictureRandom className="h-7 w-7 rounded-full bg-primary md:h-10 md:w-10" />
          )}
          <div className="flex flex-col gap-1">
            <h5 className="text-sm font-semibold leading-4">{auth?.user?.fullName}</h5>
            <span
              onClick={() => {
                if (auth?.user?.userId) {
                  navigator.clipboard.writeText(auth?.user.userId);
                  toast("Copied to clipboard", { icon: "✅" });
                  setUserProfileDropOpen(false);
                }
              }}
              className="flex items-center gap-1 font-medium leading-3"
            >
              <small>
                <b>UID:</b> {auth?.user?.userId}
              </small>
              <Icon icon={"solar:copy-linear"} className="text-base" />
            </span>
          </div>
        </div>

        <hr className="my-1.5" />

        {popOverMenus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.link}
            onClick={() => {
              setUserProfileDropOpen(false);
              menu.function();
            }}
            className={`mt-1.5 flex items-center gap-2 rounded-xl px-1.5 py-1.5 text-sm font-medium hover:bg-text/10 ${menu.className}`}
          >
            <span className={`ml-1 rounded-full p-1`}>{menu.icon}</span>

            <p>{menu.name}</p>

            <Icon
              icon={"material-symbols-light:chevron-right-rounded"}
              className="ml-auto text-xl"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
