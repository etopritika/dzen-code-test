import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/orders">Orders</Link>
      <Link to="/products">Products</Link>
    </nav>
  );
};

export default Navigation;
