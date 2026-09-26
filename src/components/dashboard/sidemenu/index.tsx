import { useLogout } from "@/api/hooks/useAuth";
import avatar from "/image/Avatar.jpg";
import { LoadingPopUp } from "@/layout/loading";
import { useAuthStore } from "@/store/auth";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router";

// eslint-disable-next-line react-refresh/only-export-components
export const menuItems = [
  { name: "Personal Data", link: "/dashboard/personal-data", icon: "mynaui:user-circle" },
  {
    name: "Payment Account",
    link: "/dashboard/payment-methods",
    icon: "mynaui:credit-card",
  },
  {
    name: "Reservations",
    link: "/dashboard/reservations",
    icon: "fluent:luggage-20-regular",
  },
  { name: "Wish Lists", link: "/dashboard/lists", icon: "mingcute:heart-line" },
  { name: "Support", link: "/dashboard/support", icon: "streamline:customer-support-1" },
  { name: "Lost and Found", link: "/dashboard/lost-and-found", icon: "hugeicons:package-search" },
  { name: "Reviews", link: "/dashboard/reviews", icon: "hugeicons:message-01" },
];

const SideMenu = () => {
  const { auth } = useAuthStore();
  const { mutate, isPending } = useLogout();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {isPending && <LoadingPopUp />}
      <div className="hidden min-h-96 min-w-[25vw] flex-col rounded-2xl bg-light px-6 pt-6 shadow lg:flex">
        <div className="flex items-center justify-normal gap-3 pb-3">
          <img src={auth?.user?.avatar || avatar} className="size-16 rounded-full object-cover" />
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-bold">{auth?.user?.fullName}</h2>
            <span
              onClick={() => {
                if (auth?.user?.userId) {
                  navigator.clipboard.writeText(auth?.user.userId);
                  toast("Copied to clipboard", { icon: "✅" });
                }
              }}
              className="flex cursor-pointer items-center gap-1 font-medium leading-3 text-grey"
            >
              <small>
                <b>UID:</b> {auth?.user?.userId}
              </small>
              <Icon icon={"solar:copy-linear"} className="text-base" />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center pb-3">
          <hr className="h-[1px] w-[90%] bg-neutral-300" />
        </div>

        <div className="py-6">
          {menuItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className={`${pathname.startsWith(item.link) ? "bg-primary text-light" : "bg-transparent text-dark/60"} mb-2 flex items-center gap-4 rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-[#ffffff]`}
            >
              <Icon icon={item.icon} fontSize={24} />
              <p>{item.name}</p>
            </Link>
          ))}
          <div className="flex items-center justify-center">
            <hr className="h-[1px] w-[90%] bg-neutral-300" />
          </div>

          <Link
            to="/dashboard/settings"
            className={`${pathname.startsWith("/dashboard/settings") ? "bg-primary text-light" : "bg-transparent text-dark/60"} my-2 flex items-center gap-4 rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-[#ffffff]`}
          >
            <Icon icon={"fluent:settings-32-regular"} fontSize={24} />
            <p>Settings</p>
          </Link>
        </div>

        <button
          onClick={() => mutate()}
          className="mb-5 mt-auto flex items-center justify-normal gap-2 rounded-lg px-6 py-3 pb-12 font-semibold text-red-600 hover:bg-error/25 md:pb-3"
        >
          <Icon icon={"humbleicons:logout"} fontSize={24} />
          <p>Log out</p>
        </button>
      </div>
    </>
  );
};

export default SideMenu;
