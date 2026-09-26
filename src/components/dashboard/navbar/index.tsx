import Logo from "@/components/logo";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router";
import MobileSideMenu from "../sidemenu/mobile";
import avatar from "/image/Avatar.jpg";
import { useAuthStore } from "@/store/auth";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const user = useAuthStore().auth?.user;

  return (
    <>
      <nav className="sticky top-0 z-10 bg-light px-2 py-4 shadow lg:mx-auto lg:items-center">
        <div className="wrapper flex max-w-full flex-1 items-start justify-between">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <button className="btn flex w-fit items-center gap-2 rounded-lg px-2 py-2 text-primary ring-1 lg:hidden">
              <Icon
                icon="iconamoon:menu-burger-horizontal-bold"
                onClick={() => setOpenNav(!openNav)}
                className="size-7"
                fontSize={25}
              />
            </button>
            <Link to="/" className="px-4">
              <Logo variant="default" className="w-7 lg:w-10" />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-6">
            <div className="hidden items-center justify-normal gap-2 md:flex">
              <Icon icon={"circle-flags:ng"} fontSize={25} />
              <p className="font-semibold text-primary">NGN</p>
            </div>
            <Link className="text-primary" to={"support"}>
              <Icon icon={"streamline:customer-support-1-solid"} fontSize={25} />
            </Link>
            <Link to={"/dashboard/personal-data"}>
              <img src={user?.avatar || avatar} className="size-12 rounded-full object-cover" />
            </Link>
          </div>
        </div>
      </nav>
      {/* MOBILE SIDE MENU  */}
      {openNav && (
        <div
          className={`fixed left-0 top-0 z-20 h-screen w-[80%] bg-white shadow transition-transform duration-300 lg:hidden ${openNav ? "translate-x-0" : "-translate-x-full"}`}
        >
          <MobileSideMenu closeMenu={() => setOpenNav(false)} />
        </div>
      )}
      {/* DESKTOP MENU  */}
      {openNav && (
        <div
          className="fixed inset-0 z-10 bg-black/30 lg:hidden"
          onClick={() => setOpenNav(false)}
        ></div>
      )}
    </>
  );
};

export default NavBar;
