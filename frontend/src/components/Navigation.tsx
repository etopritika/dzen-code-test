import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav
      className="d-flex flex-column p-3 border-end"
      style={{ minHeight: "100vh" }}
    >
      <NavLink to="/orders" className="nav-link">
        {t("orders.title")}
      </NavLink>
      <NavLink to="/products" className="nav-link">
        {t("products.title")}
      </NavLink>
    </nav>
  );
};

export default Navigation;
