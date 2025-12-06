import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TopMenu from "@/layout/TopMenu";

const Layout = () => {
  const location = useLocation();
  return (
    <div className="p-0">
      <TopMenu />
      <div className="row g-0 container mx-auto">
        <aside className="col-2">
          <Navigation />
        </aside>
        <div className="col">
          <main className="p-4">
            <div
              key={location.pathname}
              className="animate__animated animate__fadeInRight"
            >
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
