import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TopMenu from "@/layout/TopMenu";

const Layout = () => {
  return (
    <div>
      <TopMenu />
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
