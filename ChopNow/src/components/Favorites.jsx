import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Trash2,
  Utensils,
  Star,
  ShoppingBag,
  Home,
  ShoppingBasket,
  ReceiptText,
  User,
} from "lucide-react";
import "../styles/home.css";

const FOOD_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1VnSe9vZonVtwHR6z1-b39ghBvYRSB_SFrCs1GFqLmnIStz6CIEeUsxYtiUfCocgKQeziGFWP_JPm3eaW8IPoZqy_fCSXAeZZUpCMtfRBzeGY_yjE9dqSZJYBFp4bnbr4Ln75J0GOOYYZAaRa_MFCYN-A6Sbpaqi0Ta1orE1rtTUyDwHTMP2iN_f1NFoeTC5uLanQQRtb2kfgILo4xSY_LFnSg7FKGpgzPSq6EEsko-42MiNhXvJ4kH05dN";

const INITIAL_FAVORITES = [
  {
    id: "fav-1",
    title: "Spicy Jollof Fiesta",
    description: "Authentic smoky jollof rice served with grilled chicken and fried plantains.",
    price: "₦3,800",
    oldPrice: "₦4,500",
    rating: "4.8",
    image: FOOD_IMAGE_URL,
    category: "Nigerian, Local",
  },
  {
    id: "fav-2",
    title: "Suya Spiced Wings",
    description: "Crispy wings tossed in our signature spicy peanut suya rub.",
    price: "₦2,500",
    rating: "4.7",
    image: FOOD_IMAGE_URL,
    category: "Appetizers",
  },
  {
    id: "fav-3",
    title: "Classic Pounded Yam",
    description: "Smooth pounded yam with rich egusi soup and assorted meat.",
    price: "₦5,200",
    rating: "4.9",
    image: FOOD_IMAGE_URL,
    category: "Traditional",
  },
];

const CART_STORAGE_KEY = "chopnow-cart-items";

function Rating({ value }) {
  return (
    <span className="rating">
      <Star size={14} fill="currentColor" strokeWidth={1.8} aria-hidden="true" />
      {value}
    </span>
  );
}

function Favorites() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [notification, setNotification] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = () => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      const currentCart = stored ? JSON.parse(stored) : [];
      return currentCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    setCartCount(getCartCount());

    const handleStorage = () => setCartCount(getCartCount());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleBack = () => {
    window.location.hash = "#home";
  };

  const removeFavorite = (id, title) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    setNotification(`Removed "${title}" from favorites`);
    setTimeout(() => setNotification(""), 3000);
  };

  const addToCartFromFavorites = (dish) => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      const currentCart = stored ? JSON.parse(stored) : [];
      const itemId = `dish-${dish.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

      let updatedCart;
      if (currentCart.find((item) => item.id === itemId)) {
        updatedCart = currentCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            id: itemId,
            name: dish.title,
            details: dish.description,
            price: Number(String(dish.price).replace(/[^0-9]/g, "")),
            quantity: 1,
            image: dish.image,
          },
        ];
      }

      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      setCartCount(getCartCount());
      setNotification(`Added "${dish.title}" to cart!`);
      setTimeout(() => setNotification(""), 3000);
    } catch {
      setNotification("Could not add item to cart.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="home-page" style={{ paddingBottom: "80px" }}>
      {/* Top Header */}
      <header className="home-header">
        <div className="home-header-left">
          <button
            className="mobile-icon-button menu-button"
            type="button"
            onClick={handleBack}
            aria-label="Back to home"
          >
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <a className="home-logo" href="#home" aria-label="SavorExpress home">
            <span className="home-logo-mark"><Utensils size={18} aria-hidden="true" /></span>
            <span>SavorExpress</span>
          </a>
        </div>

        <div className="home-header-actions">
          <button
            className="cart-button"
            type="button"
            onClick={() => {
              window.location.hash = "#cart";
            }}
            aria-label="Go to cart"
            style={{ position: "relative" }}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#e65100",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: "700",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #131313",
                }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="home-main"
        style={{ padding: "24px 16px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Heart
              size={26}
              color="#e11d48"
              fill="#e11d48"
              aria-hidden="true"
            />
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
              }}
            >
              My Favourites
            </h1>
          </div>
          <span
            style={{
              fontSize: "0.95rem",
              color: "#6b7280",
              fontWeight: "500",
            }}
          >
            {favorites.length} {favorites.length === 1 ? "item" : "items"}
          </span>
        </div>

        {notification && (
          <div
            style={{
              background: "#ecfdf5",
              border: "1px solid #10b981",
              color: "#065f46",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{notification}</span>
          </div>
        )}

        {favorites.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#f9fafb",
              borderRadius: "12px",
              border: "1px dashed #d1d5db",
            }}
          >
            <Heart
              size={48}
              color="#9ca3af"
              style={{ marginBottom: "16px" }}
              aria-hidden="true"
            />
            <h3 style={{ fontSize: "1.25rem", color: "#374151", marginBottom: "8px" }}>
              No favourites yet
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "20px" }}>
              Save dishes you love to find them quickly here.
            </p>
            <a
              href="#home"
              style={{
                display: "inline-block",
                background: "#f97316",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Explore Dishes
            </a>
          </div>
        ) : (
          <div className="dish-grid">
            {favorites.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <div className="dish-image-wrap">
                  {dish.image ? <img src={dish.image} alt={dish.title} /> : null}
                  {dish.rating && (
                    <span className="dish-rating">
                      <Rating value={dish.rating} />
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFavorite(dish.id, dish.title)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    aria-label={`Remove ${dish.title} from favorites`}
                  >
                    <Trash2 size={18} color="#ef4444" aria-hidden="true" />
                  </button>
                </div>
                <div className="dish-card-body">
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#f97316",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {dish.category}
                  </span>
                  <h3 style={{ margin: "4px 0 8px 0" }}>{dish.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "16px" }}>
                    {dish.description}
                  </p>
                  <div className="dish-card-footer">
                    <div className="dish-price">
                      {dish.oldPrice && <span className="old-price">{dish.oldPrice}</span>}
                      <strong>{dish.price}</strong>
                    </div>
                    <button
                      className="add-button"
                      type="button"
                      onClick={() => addToCartFromFavorites(dish)}
                      aria-label={`Add ${dish.title} to cart`}
                      title="Add to cart"
                    >
                      <ShoppingBag size={18} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <a href="#home">
          <Home size={21} aria-hidden="true" />
          <span>Home</span>
        </a>
        <a href="#stores">
          <ShoppingBasket size={21} aria-hidden="true" />
          <span>Stores</span>
        </a>
        <a href="#orders">
          <ReceiptText size={21} aria-hidden="true" />
          <span>Orders</span>
        </a>
        <a href="#profile">
          <User size={21} aria-hidden="true" />
          <span>Profile</span>
        </a>
      </nav>
    </div>
  );
}

export default Favorites;