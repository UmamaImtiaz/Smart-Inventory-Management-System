import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🛒 Smart Inventory Management System
      </Link>

      <div className="navbar-links">
        <Link to="/add-payment" className="nav-link">
          Add Payment Method
        </Link>

        <Link to="/dashboard/orders" className="nav-cart">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
