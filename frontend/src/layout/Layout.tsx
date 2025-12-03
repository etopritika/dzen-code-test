import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TopMenu from "@/layout/TopMenu";

const Layout = () => {
  return (
    <div className="container-fluid p-0">
      <TopMenu />
      <div className="row g-0">
        <aside className="col-2">
          <Navigation />
        </aside>
        <div className="col">
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
