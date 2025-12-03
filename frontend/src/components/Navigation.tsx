import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      className="d-flex flex-column p-3 border-end"
      style={{ minHeight: "100vh" }}
    >
      <NavLink to="/orders" className="nav-link">
        Orders
      </NavLink>
      <NavLink to="/products" className="nav-link">
        Products
      </NavLink>
    </nav>
  );
};

export default Navigation;
