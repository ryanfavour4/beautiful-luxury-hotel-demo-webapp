import avatar from "/image/Avatar.jpg";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router";
import { menuItems } from ".";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";
import { useLogout } from "@/api/hooks/useAuth";
import { LoadingPopUp } from "@/layout/loading";
type props = {
  closeMenu: () => void;
};

const MobileSideMenu = ({ closeMenu }: props) => {
  const { pathname } = useLocation();
  const { auth } = useAuthStore();
  const { mutate, isPending } = useLogout();

  return (
    <div className="flex min-h-screen flex-col rounded-none bg-white px-4 pt-6 shadow lg:hidden">
      {isPending && <LoadingPopUp />}
      {/* Profile Section */}
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
      <div className="flex items-center justify-center py-3">
        <hr className="h-[1px] w-[90%] bg-neutral-300" />
      </div>

      {/* Menu Items */}
      <div className="pb-6 pt-2">
        {menuItems.map((item) => {
          return (
            <Link
              to={item.link}
              key={item.name}
              onClick={closeMenu}
              className={`${pathname.startsWith(item.link) ? "bg-primary text-light" : "bg-transparent text-dark/60"} mb-2 flex items-center gap-4 rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-[#ffffff]`}
            >
              <Icon icon={item.icon} fontSize={20} />
              <p>{item.name}</p>
            </Link>
          );
        })}

        <div className="flex items-center justify-center py-3">
          <hr className="h-[1px] w-[90%] bg-neutral-300" />
        </div>
        {/* Settings */}
        <Link
          to="/dashboard/settings"
          onClick={closeMenu}
          className={`${pathname.startsWith("/dashboard/settings") ? "bg-primary text-light" : "bg-transparent text-dark/60"} mb-2 flex items-center gap-4 rounded-lg px-6 py-4 font-semibold hover:bg-primary hover:text-[#ffffff]`}
        >
          <Icon icon={"fluent:settings-32-regular"} fontSize={20} />
          <p>Settings</p>
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={() => mutate()}
        className="mt-auto flex items-center justify-normal gap-2 px-6 pb-12 font-semibold text-error"
      >
        <Icon icon={"humbleicons:logout"} fontSize={20} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default MobileSideMenu;
