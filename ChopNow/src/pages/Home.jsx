import { useEffect, useState } from "react";
import {
  ArrowRight,
  Store,
  Bike,
  CakeSlice,
  ChevronRight,
  CircleUserRound,
  Coffee,
  Globe,
  LoaderCircle,
  Home as HomeIcon,
  Image as ImageIcon,
  Menu,
  Pizza,
  ReceiptText,
  Search,
  Share2,
  ShoppingBasket,
  ShoppingCart,
  Star,
  User,
  Utensils,
  X,
} from "lucide-react";
import Homeimg from "../assets/Homeimg.png";
import HomeimgSpicyJollof from "../assets/HomeimgSpicyJollof.png";
import SuyaSpicedWings from "../assets/SuyaSpicedWings.png";
import HomePoundedYam from "../assets/HomePoundedYam.png";
import BonobosKitchen from "../assets/BonobosKitchen.png";
import ProvaResturant from "../assets/ProvaResturant.png";
import "../styles/home.css";

const HERO_IMAGE_URL = Homeimg;

const FOOD_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1VnSe9vZonVtwHR6z1-b39ghBvYRSB_SFrCs1GFqLmnIStz6CIEeUsxYtiUfCocgKQeziGFWP_JPm3eaW8IPoZqy_fCSXAeZZUpCMtfRBzeGY_yjE9dqSZJYBFp4bnbr4Ln75J0GOOYYZAaRa_MFCYN-A6Sbpaqi0Ta1orE1rtTUyDwHTMP2iN_f1NFoeTC5uLanQQRtb2kfgILo4xSY_LFnSg7FKGpgzPSq6EEsko-42MiNhXvJ4kH05dN";

const categories = [
  { label: "Pizza", icon: Pizza },
  { label: "Drinks", icon: Coffee },
  { label: "Burgers", icon: Utensils },
  { label: "Bakery", icon: Store },
  { label: "Dessert", icon: CakeSlice },
];

const dishes = [
  {
    title: "Spicy Jollof Fiesta",
    description:
      "Authentic smoky jollof rice served with grilled chicken and fried plantains.",
    oldPrice: "₦4,500",
    price: "₦3,800",
    image: HomeimgSpicyJollof,
    rating: "4.8",
  },
  {
    title: "Suya Spiced Wings",
    description:
      "Crispy wings tossed in our signature spicy peanut suya rub.",
    image: SuyaSpicedWings,
    price: "₦2,500",
  },
  {
    title: "Classic Pounded Yam",
    description:
      "Smooth pounded yam with rich afang soup and assorted meat.",
    image: HomePoundedYam,
    price: "₦5,200",
  },
];

const CART_STORAGE_KEY = "chopnow-cart-items";
const CART_STORAGE_VERSION_KEY = "chopnow-cart-storage-version";
const CART_STORAGE_VERSION = "2";

const getStoredCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    if (
      window.localStorage.getItem(CART_STORAGE_VERSION_KEY) !==
      CART_STORAGE_VERSION
    ) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      window.localStorage.setItem(
        CART_STORAGE_VERSION_KEY,
        CART_STORAGE_VERSION
      );
      return [];
    }

    const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const restaurants = [
  {
    name: "The Bonobos Kitchen",
    rating: "4.9",
    category: "Nigerian, Local",
    time: "25-35 min",
    delivery: "₦800",
    image: BonobosKitchen,
  },
  {
    name: "Prova Restaurant",
    rating: "4.5",
    category: "Chinese  soup, Swallow",
    time: "40-55 min",
    delivery: "Free",
    image: ProvaResturant,
  },
];

function Rating({ value }) {
  return (
    <span className="rating">
      <Star
        size={14}
        fill="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      />
      {value}
    </span>
  );
}

function PlaceholderImage({ className = "" }) {
  return (
    <div
      className={`image-placeholder ${className}`}
      aria-label="Image unavailable"
    >
      <ImageIcon size={40} strokeWidth={1.6} aria-hidden="true" />
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getStoredCartItems);
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickySearch(window.scrollY > 200);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );

    window.localStorage.setItem(
      CART_STORAGE_VERSION_KEY,
      CART_STORAGE_VERSION
    );
  }, [cartItems]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (dish) => {
    const itemId = `dish-${dish.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    const itemToAdd = {
      id: itemId,
      name: dish.title,
      details: dish.description,
      price: Number(String(dish.price).replace(/[^0-9]/g, "")),
      quantity: 1,
      image: dish.image || FOOD_IMAGE_URL,
    };

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === itemId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, itemToAdd];
    });
  };

  const openCart = () => {
    if (isCartLoading) return;

    setIsCartLoading(true);

    window.setTimeout(() => {
      window.location.hash = "#cart";
    }, 500);
  };

  const openOrders = (event) => {
    event.preventDefault();
    window.location.hash = "#orders";
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.location.hash = "#login";
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-left">
          <button
            className="mobile-icon-button menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>

          <a className="home-logo" href="#home" aria-label="Crave Corner home">
            <span className="home-logo-mark">
              <Utensils size={18} aria-hidden="true" />
            </span>
            <span>Crave Corner</span>
          </a>
        </div>

        <nav
          className={`desktop-nav${menuOpen ? " mobile-nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <a className="active" href="#favorites">
            Favourites
          </a>
          <a href="#offers">Explore</a>

          <a href="#orders" onClick={openOrders}>
            Help
          </a>

          <a href="#login" onClick={handleLogout}>
            Logout
          </a>
        </nav>

        <div className="home-header-actions">
          <button
            className="mobile-icon-button mobile-search-button"
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search size={21} aria-hidden="true" />
          </button>

          <label
            className="desktop-search"
            htmlFor="desktop-search-input"
          >
            <Search size={17} aria-hidden="true" />
            <input
              id="desktop-search-input"
              type="search"
              placeholder="Search dishes, restaurants..."
            />
          </label>

          <button
            className="cart-button"
            type="button"
            onClick={openCart}
            disabled={isCartLoading}
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart size={20} aria-hidden="true" />
            <span>Cart</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>

          <button
            className="profile-button"
            type="button"
            aria-label="Profile"
          >
            <CircleUserRound size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-panel">
          <a
            href="#favorites"
            onClick={() => setMenuOpen(false)}
          >
            Favourites
          </a>

          <a
            href="#offers"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </a>

          <a
            href="#orders"
            onClick={(event) => {
              setMenuOpen(false);
              openOrders(event);
            }}
          >
            Help
          </a>

          <a
            href="#login"
            onClick={(event) => {
              setMenuOpen(false);
              handleLogout(event);
            }}
          >
            Logout
          </a>
        </div>
      )}

      {searchOpen && (
        <div className="mobile-search-panel">
          <Search size={18} aria-hidden="true" />

          <input
            autoFocus
            type="search"
            placeholder="Search dishes, restaurants..."
            aria-label="Search dishes and restaurants"
          />
        </div>
      )}

      <main className="home-main" id="home">
        <section
          className="home-hero"
          aria-labelledby="craving-heading"
        >
          <div
            className="home-hero-image"
            style={{
              backgroundImage: `url("${HERO_IMAGE_URL}")`,
            }}
          />

          <div className="home-hero-wash" />

          <div className="home-hero-copy">
            <h1 id="craving-heading">
              What are you craving?
            </h1>

            <p className="OrderMeals">
              Order delicious meals from your favorite restaurants!
            </p>
          </div>
        </section>

        <div
          className={`sticky-search${
            showStickySearch ? " visible" : ""
          }`}
        >
          <Search size={18} aria-hidden="true" />

          <input
            type="search"
            placeholder="Search dishes, restaurants..."
            aria-label="Sticky dish search"
          />
        </div>

        <section
          className="categories-section"
          aria-labelledby="categories-heading"
        >
          <h2 id="categories-heading">Categories</h2>

          <div className="category-scroller">
            {categories.map(({ label, icon: Icon }) => (
              <button
                className="category-item"
                type="button"
                key={label}
              >
                <span className="category-icon">
                  <Icon
                    size={28}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </span>

                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="popular-section"
          aria-labelledby="popular-heading"
        >
          <h2 id="popular-heading">Popular right now</h2>

          <div className="dish-grid">
            {dishes.map((dish, index) => (
              <article
                className={`dish-card${
                  index === 2 ? " third-dish" : ""
                }`}
                key={dish.title}
              >
                <div className="dish-image-wrap">
                  {dish.image ? (
                    <img src={dish.image} alt={dish.title} />
                  ) : (
                    <PlaceholderImage />
                  )}

                  {dish.rating && (
                    <span className="dish-rating">
                      <Rating value={dish.rating} />
                    </span>
                  )}
                </div>

                <div className="dish-card-body">
                  <h3>{dish.title}</h3>

                  <p>{dish.description}</p>

                  <div className="dish-card-footer">
                    <div className="dish-price">
                      {dish.oldPrice && (
                        <span className="old-price">
                          {dish.oldPrice}
                        </span>
                      )}

                      <strong>{dish.price}</strong>
                    </div>

                    <button
                      className="add-button"
                      type="button"
                      onClick={() => addToCart(dish)}
                      aria-label={`Add ${dish.title} to cart`}
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="promo-section"
          id="offers"
          aria-label="Weekend special"
        >
          <div className="promo-banner">
            <div className="promo-gradient" />

            <div className="promo-copy">
              <span>Weekend Special</span>
              <h2>20% Off All Family Combos</h2>
              <p>
                Gather the family and enjoy a feast for less. Use code
                FAMILY20.
              </p>
            </div>

            <div className="promo-decoration" />
          </div>
        </section>

        <section
          className="restaurants-section"
          id="orders"
          aria-labelledby="restaurants-heading"
        >
          <div className="section-heading-row">
            <h2 id="restaurants-heading">Popular near you</h2>

            <a href="#all-restaurants">
              See all
              <ChevronRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="restaurant-list">
            {restaurants.map((restaurant) => (
              <article
                className="restaurant-card"
                key={restaurant.name}
              >
                {restaurant.image ? (
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                  />
                ) : (
                  <PlaceholderImage className="restaurant-placeholder" />
                )}

                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>

                  <div className="restaurant-meta">
                    <Rating value={restaurant.rating} />
                    <i>•</i>
                    <span>{restaurant.category}</span>
                  </div>

                  <div className="restaurant-delivery">
                    <span>
                      <ReceiptText
                        size={14}
                        aria-hidden="true"
                      />
                      {restaurant.time}
                    </span>

                    <span>
                      <Bike size={14} aria-hidden="true" />
                      {restaurant.delivery}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav
        className="mobile-bottom-nav"
        aria-label="Mobile navigation"
      >
        <a
          className="selected"
          href="#home"
        >
          <HomeIcon
            size={21}
            fill="currentColor"
            aria-hidden="true"
          />
          <span>Home</span>
        </a>

        <a href="#stores">
          <ShoppingBasket
            size={21}
            aria-hidden="true"
          />
          <span>Stores</span>
        </a>

        <a
          href="#orders"
          onClick={openOrders}
        >
          <ReceiptText
            size={21}
            aria-hidden="true"
          />
          <span>Orders</span>
        </a>

        <a href="#profile">
          <User
            size={21}
            aria-hidden="true"
          />
          <span>Profile</span>
        </a>
      </nav>

      <footer className="home-footer" id="help">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="footer-logo" href="#home">
              SavorExpress
            </a>

            <p>
              Premium Dining, delivered with warmth and precision.
            </p>

            <div className="footer-socials">
              <a href="#language" aria-label="Language">
                <Globe size={19} aria-hidden="true" />
              </a>

              <a href="#share" aria-label="Share">
                <Share2 size={19} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3>Company</h3>
            <a href="#about">About Us</a>
            <a href="#partner">Partner with Us</a>
            <a href="#careers">Careers</a>
          </div>

          <div>
            <h3>Legal</h3>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#refund">Refund Policy</a>
          </div>

          <div>
            <h3>Support</h3>
            <a href="#contact">Contact Support</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2024 SavorExpress Technologies. All culinary rights
          reserved.
        </div>
      </footer>

      {isCartLoading && (
        <div
          className="home-loading-overlay"
          role="status"
          aria-live="polite"
          aria-label="Opening cart"
        >
          <div className="home-loading-card">
            <LoaderCircle
              className="home-loading-spinner"
              size={36}
              strokeWidth={2.2}
              aria-hidden="true"
            />

            <span>Opening cart...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;