import { useEffect, useState } from "react";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verify from "./pages/Verify";
import CreateNewPassword from "./pages/CreateNewPassword";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import TrackOrder from "./pages/TrackOrder";
import Stores from "./pages/Stores";
import Favorites from "./components/Favorites";
import Orders from "./pages/Orders";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";   // ← added
import BottomNav from "./components/BottomNav";

function getInitialPage() {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;

    if (hash === "#forgot-password") return "forgot-password";
    if (hash === "#verify") return "verify";
    if (hash === "#create-password") return "create-password";
    if (hash === "#password-reset-successful") {
      return "password-reset-successful";
    }
    if (hash === "#home" || hash === "") return "home";
    if (hash === "#sign-up") return "sign-up";
    if (hash === "#cart") return "cart";
    if (hash === "#checkout") return "checkout";
    if (hash === "#order-placed") return "order-placed";
    if (hash.startsWith("#track-order")) return "track-order";
    if (hash === "#stores") return "stores";
    if (hash === "#favorites") return "favorites";
    if (hash === "#orders") return "orders";
    if (hash === "#profile") return "profile";
    if (hash === "#settings") return "settings";
    if (hash === "#edit-profile") return "edit-profile";   // ← added
  }

  return "login";
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === "#forgot-password") {
        setCurrentPage("forgot-password");
      } else if (hash === "#verify") {
        setCurrentPage("verify");
      } else if (hash === "#create-password") {
        setCurrentPage("create-password");
      } else if (hash === "#password-reset-successful") {
        setCurrentPage("password-reset-successful");
      } else if (hash === "#home" || hash === "") {
        setCurrentPage("home");
      } else if (hash === "#sign-up") {
        setCurrentPage("sign-up");
      } else if (hash === "#cart") {
        setCurrentPage("cart");
      } else if (hash === "#checkout") {
        setCurrentPage("checkout");
      } else if (hash === "#order-placed") {
        setCurrentPage("order-placed");
      } else if (hash.startsWith("#track-order")) {
        setCurrentPage("track-order");
      } else if (hash === "#stores") {
        setCurrentPage("stores");
      } else if (hash === "#favorites") {
        setCurrentPage("favorites");
      } else if (hash === "#orders") {
        setCurrentPage("orders");
      } else if (hash === "#profile") {
        setCurrentPage("profile");
      } else if (hash === "#settings") {
        setCurrentPage("settings");
      } else if (hash === "#edit-profile") {          // ← added
        setCurrentPage("edit-profile");
      } else {
        setCurrentPage("login");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  if (currentPage === "forgot-password") {
    return <ForgotPassword />;
  }

  if (currentPage === "verify") {
    return <Verify />;
  }

  if (currentPage === "create-password") {
    return <CreateNewPassword />;
  }

  if (currentPage === "password-reset-successful") {
    return <PasswordResetSuccessful />;
  }

  if (currentPage === "sign-up") {
    return <SignUp />;
  }

  if (currentPage === "cart") {
    return <Cart />;
  }

  if (currentPage === "checkout") {
    return <Checkout />;
  }

  if (currentPage === "order-placed") {
    return <OrderPlaced />;
  }

  if (currentPage === "track-order") {
    return <TrackOrder />;
  }

  if (currentPage === "favorites") {
    return <Favorites />;
  }

  if (currentPage === "settings") {
    return <Settings />;
  }

  if (currentPage === "edit-profile") {               // ← added
    return <EditProfile />;
  }

  // Main Shared Layout
  // These pages all use the same BottomNav component.
  if (["home", "stores", "orders", "profile"].includes(currentPage)) {
    return (
      <div className="app-main-layout">
        {currentPage === "home" && <Home />}
        {currentPage === "stores" && <Stores />}
        {currentPage === "orders" && <Orders />}
        {currentPage === "profile" && <Profile />}

        <BottomNav activePage={currentPage} />
      </div>
    );
  }

  return <Login />;
}

export default App;