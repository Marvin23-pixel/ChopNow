import { Home, ShoppingBasket, Receipt, User } from "lucide-react";
import "../styles/bottomNav.css"; // Optional: or keep styles unified

export default function BottomNav({ activePage }) {
  return (
    <nav className="shared-bottom-nav">
      <button
        type="button"
        className={`shared-nav-item ${activePage === "home" ? "shared-nav-active" : ""}`}
        onClick={() => {
          window.location.hash = "#home";
        }}
      >
        <Home size={22} />
        <span className="shared-nav-label">Home</span>
      </button>

      <button
        type="button"
        className={`shared-nav-item ${activePage === "stores" ? "shared-nav-active" : ""}`}
        onClick={() => {
          window.location.hash = "#stores";
        }}
      >
        <ShoppingBasket size={22} />
        <span className="shared-nav-label">Stores</span>
      </button>

      <button
        type="button"
        className={`shared-nav-item ${activePage === "orders" ? "shared-nav-active" : ""}`}
        onClick={() => {
          window.location.hash = "#orders";
        }}
      >
        <Receipt size={22} />
        <span className="shared-nav-label">Orders</span>
      </button>

      <button
        type="button"
        className={`shared-nav-item ${activePage === "profile" ? "shared-nav-active" : ""}`}
        onClick={() => {
          window.location.hash = "#profile";
        }}
      >
        <User size={22} />
        <span className="shared-nav-label">Profile</span>
      </button>
    </nav>
  );
}