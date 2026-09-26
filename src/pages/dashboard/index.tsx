import NavBar from "@/components/dashboard/navbar";
import SideMenu from "@/components/dashboard/sidemenu";
import Footer from "@/layout/footer";
import { Outlet } from "react-router";

const Index = () => {
  return (
    <div>
      <NavBar />
      <div className="flex min-h-96 w-full items-stretch justify-start bg-neutral-100 p-4 px-2.5 md:p-6">
        <SideMenu />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
