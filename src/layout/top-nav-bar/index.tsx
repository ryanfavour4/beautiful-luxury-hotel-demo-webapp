import { T_menu } from "./nav-item";
import NavItem from "./nav-item";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import Logo from "@/components/logo";
import { useAuthStore } from "@/store/auth";
import { useRef, useState } from "react";
import { ProfilePopover } from "@/components/profile-popover";
import ProfilePictureRandom from "@/components/ui/profile-picture-random";
import { useGetAllRoomsTypes } from "@/api/hooks/useRoomTypes";
import { LoadingPopUp } from "../loading";
import { useLogout } from "@/api/hooks/useAuth";

export default function Navbar() {
  const { data } = useGetAllRoomsTypes();
  const { mutate, isPending } = useLogout();
  const menuData: T_menu[] = [
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Rooms",
      subPath: "rooms",
      subMenu: [
        { name: "All Rooms", path: "/all-rooms" },
        ...(data?.data?.map((room) => {
          return {
            name: room.name,
            path: `/all-rooms/${room._id}?slug=${room.slug}`, // or `/rooms/${room.id}`
          };
        }) ?? []),
      ],
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Events",
      path: "/events",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const { auth } = useAuthStore();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const [subMenuClicked, setSubMenuClicked] = useState<string>("");
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="container mx-auto flex w-full max-w-[95%] flex-1 items-center justify-between rounded-full bg-light px-2.5 py-3">
      {isPending && <LoadingPopUp />}
      {/* Logo */}
      <Link to="/" className="px-4">
        <Logo variant="default" className="w-7 md:w-10" />
      </Link>

      {/* Nav Links */}
      <div className="hidden items-center gap-8 md:flex">
        {menuData.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </div>

      {!auth?.token && (
        <Link to="/sign-up" className="hidden md:block">
          <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-white transition hover:bg-primary/90">
            <Icon icon="fluent:person-32-regular" width="20" height="20" />
            <span className="text-base">Sign Up</span>
          </button>
        </Link>
      )}

      {auth?.token && (
        <div className="relative hidden w-fit cursor-pointer items-center justify-end gap-2 p-0 md:flex">
          {/* Profile icon */}
          <div
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="btn flex w-fit items-center gap-2 rounded-full p-1 px-2 ring-1"
          >
            {/* KYC verification will come later for now we will just keep it hidden on all state */}
            <Icon
              icon="solar:verified-check-bold"
              className={`absolute top-0 text-base md:text-xl ${auth?.user?.kycStatus.status === "empty" ? "hidden" : "hidden"}`}
            />
            <Icon icon="cuida:menu-outline" className={`text-2xl text-primary`} />
            <span className="">
              {auth?.user?.avatar ? (
                <img
                  className="h-9 w-9 rounded-full object-cover"
                  src={auth?.user?.avatar}
                  alt=""
                />
              ) : (
                <ProfilePictureRandom className="!w-9" />
              )}
            </span>
          </div>

          {/* USER PROFILE MINI POPUP */}
          <ProfilePopover
            setUserProfileDropOpen={() => setPopoverOpen(!popoverOpen)}
            userProfileDropOpen={popoverOpen}
          />
        </div>
      )}

      {/* Mobile Menu Icon */}
      <button
        onClick={() => setNavOpen((p) => !p)}
        className="btn mr-px w-fit rounded-full p-1 text-primary md:hidden"
      >
        <Icon icon="cuida:menu-outline" width="28" height="28" />
      </button>

      {/* _____________ Slide navbar for mobile _____________ */}
      <div
        className={`fixed inset-0 z-20 bg-text/75 text-text backdrop-blur-sm transition-all duration-500 ease-in-out md:hidden ${navOpen ? "visible clip-path-slide-top-down" : "invisible delay-200 clip-path-close"}`}
      >
        <div
          className={`${navOpen ? "delay-200 clip-path-slide-top-down" : "clip-path-close"} h-full w-full bg-light px-2 py-3 duration-500`}
        >
          <div className="flex items-center justify-between px-2">
            <Link className="rounded-full border border-primary" to={"/dashboard/personal-data"}>
              <span className="">
                {auth?.user?.avatar ? (
                  <img
                    className="aspect-square w-11 rounded-full object-cover ring-2 ring-primary"
                    src={auth?.user?.avatar}
                    alt=""
                  />
                ) : (
                  <ProfilePictureRandom />
                )}
              </span>
            </Link>

            <button
              onClick={() => setNavOpen((p) => !p)}
              className="btn ml-auto block w-fit rounded-full p-0.5 text-primary"
            >
              <Icon icon={"iconamoon:close-light"} className="text-4xl" />
            </button>
          </div>

          <div className="mt-10 h-[calc(100vh-100px)] overflow-scroll py-6 pb-20">
            <ul ref={navListRef} className="h-fit space-y-3">
              {menuData.map((menu, index) => (
                <li key={index} className={`overflow-hidden border-b`}>
                  <Link
                    onClick={() =>
                      setSubMenuClicked((prev) => (prev === menu.subPath ? "" : menu.subPath || ""))
                    }
                    className="flex w-full items-center justify-between px-3 py-2 font-semibold"
                    to={menu.path || ""}
                  >
                    <p className="hover:text-primary">{menu.name}</p>
                    {menu.subMenu && <Icon icon={"mdi-light:chevron-down"} className="text-xl" />}
                  </Link>

                  {menu.subMenu && (
                    <ul
                      className={`mb-0 h-0 w-full overflow-hidden bg-white px-3 transition-all ${subMenuClicked == menu.subPath && "mb-2 h-auto"}`}
                    >
                      {menu.subMenu.map((subMenu, index) => (
                        <li key={index}>
                          <Link
                            className={`hover:bg-secondary/50 flex w-full items-center justify-between border-2 border-transparent px-3 py-2 hover:border-l-primary hover:font-semibold`}
                            to={subMenu.path ? subMenu.path : menu.subPath + subMenu.path}
                          >
                            <p>{subMenu.name}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-auto flex items-end justify-end font-bold text-error">
                <a
                  className={`hover:bg-secondary/50 flex w-full items-center justify-between border-2 border-transparent px-3 py-2 hover:border-l-primary hover:font-semibold`}
                  onClick={() => mutate()}
                >
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
