import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  LayoutGrid,
  Plus,
  Search,
  ShoppingBasket,
  Soup,
  Star,
  Utensils,
  Wine,
} from "lucide-react";

import StoresEgusi from "../assets/StoresEgusi.png";
import StoresEdikaikong from "../assets/StoresEdikaikong.png";
import StoresOgbono from "../assets/StoresOgbono.png";
import StoresPepperSoup from "../assets/StoresPepperSoup.png";

import { AVATARS } from "../components/Profile";

import "../styles/stores.css";

const categories = [
  { id: "all", label: "All", Icon: LayoutGrid },
  { id: "section-soups", label: "Soups", Icon: Soup },
  { id: "section-rice", label: "Rice", Icon: Utensils },
  { id: "section-spaghetti", label: "Spaghetti", Icon: Utensils },
  { id: "section-beans", label: "Beans", Icon: Utensils },
  { id: "section-swallows", label: "Swallows", Icon: Utensils },
  { id: "section-proteins", label: "Proteins", Icon: Utensils },
  { id: "section-drinks", label: "Drinks", Icon: Wine },
];

const menuSections = [
  {
    id: "section-soups",
    title: "Popular Soups",
    items: [
      {
        name: "Egusi Soup",
        description:
          "Rich melon seed soup with assorted meat and spinach.",
        price: 3500,
        rating: "4.8",
        image: StoresEgusi,
      },
      {
        name: "Edikaikong",
        description: "Premium vegetable soup with assorted proteins.",
        price: 4200,
        rating: "4.9",
        image: StoresEdikaikong,
      },
      {
        name: "Ogbono Soup",
        description:
          "Hearty draw soup cooked with palm oil and meats.",
        price: 3000,
        rating: "4.6",
        image: StoresOgbono,
      },
      {
        name: "Pepper Soup",
        description:
          "Spicy goat meat broth perfect for cold evenings.",
        price: 4500,
        rating: "4.9",
        image: StoresPepperSoup,
      },
    ],
  },

  {
    id: "section-rice",
    title: "Rice",
    items: [
      {
        name: "Party Jollof Rice",
        description:
          "Classic Nigerian party jollof with smoky flavor.",
        price: 3800,
        rating: "4.9",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCSf1LQgx0jhfer3zSdcTf26wzQvH3YIjoLzUNwjwjd9EavWwGfaHVprhHL6DkbvPBkfHwoPQteGKqFxdLw-0CdSMG2gV2cOSrCtz4ltxB5UQ_J_fHFlUikMngDjjJmYwhTDIzPF8Baq4o1qoBtV_p2Q8txcyRpaMdMeNdltHQcKNdO6SsINZ-UWHpbswyjUkT9TIV_dfdW5rZ6IVaHPV7v56kpQ64gbZMrNAEUkMGFyOReI8t6ZAtrA",
      },
      {
        name: "Special Fried Rice",
        description:
          "Rich fried rice with vegetables and liver.",
        price: 4200,
        rating: "4.8",
        image:
          "https://lh3.googleusercontent.com/aida/AEtjO1VNdg-L13gHUUlIezUgtX-hVRS_eNtwSJxjYmGygICpTEaVJObCPVVBGupFkK-uX52qJj4iSqAdBCTBL7Im0tN8KEPD0dPaGY7vH_19X1YpBbb-Y6U9mcGpPPH9IaQJB8ssebry-c9n4rtdJK5_H7ju_ilnOTwIt4FUZ-FM5p0KaLSUUAoexzVxPuzqlLZYjZ5Rz1Mse8gg3Td4nBvoIDcgQdyfNDidRC6iwjmstd8q5KtG89Mvf-WTtzMI",
      },
    ],
  },

  {
    id: "section-spaghetti",
    title: "Spaghetti",
    items: [
      {
        name: "Stir-fry Spaghetti",
        description:
          "Spicy stir-fried pasta with veggies and sausage.",
        price: 3500,
        rating: "4.7",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCs2YtmhT-xMrJ_QHJRSXw7ION6tghUfa8Yca_M1bJ1940DnGRN98pKirj5PUKY8pFVOBEG6z-toy0ChbVCrTKV7GY--Fa9sIltnkL9vt_Knu9sIfU_5qWaqU8yOFIRHLrcjK0RQnLsb2-V2R0Zs3X7PP5GKCGIVauJAf5Ov66JNXAEGTQhtcxDuKfweg-Xx4Z-73-resUD7hIl8gmBK1_yKN884FhQhfuKDiFP_Wm97w1h4fr5G25fSA",
      },
    ],
  },

  {
    id: "section-beans",
    title: "Beans",
    items: [
      {
        name: "Ewa Agoyin",
        description:
          "Mashed beans with special spicy palm oil sauce.",
        price: 3000,
        rating: "4.9",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuApAO7rokJOnqcDr_gjKbfEi9pxRFj2rkjekAOtHVR5GT1EWUM5npg0dt22n_UqAhjjbm7p0MRMaBawr_Gfs-9aBdaSGYIZEooZBlO_gvYvY3ZSYcsmhDDgjrWJ6KtzW7-ZddHheZWSCFhXWhiJDI98qNOxCkbkrycqZCUEemUee_hiBNVqqzScqYGnst5ke5a9piPE7kv_XruGoHdtvguflb4-RXETjyXe9Qn7EtNyKg-zWt-v1svdig",
      },
    ],
  },

  {
    id: "section-swallows",
    title: "Swallows",
    items: [
      {
        name: "Pounded Yam & Egusi",
        description:
          "Smooth pounded yam served with rich egusi soup.",
        price: 5500,
        rating: "5.0",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAGSLpfW6wJb0lVlRWwW_8DUU6c9axRAO5Ee1OVsYUFhrnYlAQj-x-K_I6siFfHzrVdNkhPuX73gPq2frSkU78z3gVXKpJWTunVFb9dIot9ZK6lb0YUdaLXtomZtW92j_KEME85e09csTy-V_8GDEWGWGVUyeuJiWglIHZ2XCuDeXORlNzwZue007SEMqyJPAaIcRwm-HZLmeaNn-wC3A1TI6c0zxegR73m4pnIk5McuYQefEZLUoHADA",
      },
    ],
  },

  {
    id: "section-proteins",
    title: "Proteins",
    items: [
      {
        name: "Beef Suya",
        description:
          "Spicy grilled beef cuts with yaji spice.",
        price: 2500,
        rating: "4.8",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBiMS7_4am_ExyVD4tTGVihKI0feEAW7BNXIvpkS6OHxDk7MVKh5QcLLEJqHzoAj14tzu-EdC9HOHGVe2PIgRREEm6HiR3JEBxZaM7XddAVPoxXX5KlnNyXHBk2qZWgfN77LcejY5fH2QZzKtZaAZ0ctYeZWrwMZSbihX--KFmBo4ZjQY7miwVaN4FhFDyaajixbFLXmIi-IJntrL0-kWQVvAoFY1zbvhU5BDDCvbybXDBUx4oT8ICA",
      },
    ],
  },

  {
    id: "section-drinks",
    title: "Drinks",
    items: [
      {
        name: "Tropical Fruit Juice",
        description:
          "Refreshing blend of seasonal tropical fruits.",
        price: 1500,
        rating: "4.9",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD4zHzPgN7wumMkcA-aeR5P9HSz1_0DaGPnYMajLzyGdeihreuQ1xfTk1pVC9cOk6nn__cKN14yR8Qtw8uzrkPpvW-CDiLpO5N4ed012uYtewIO-H0KCaDYE_GD59GtPMHBVHhf6_ZLsSS3bqmk8JNTe_AkxywRXX0Rsquwkw0TL2PMCtsev9udIHEzfPImDD94_uBQnsOIlt7zisDPu_GBS8FZAr-fCnyuNsOrF2aM4xoXH3tp0454Qw",
      },
    ],
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

    const savedItems =
      window.localStorage.getItem(CART_STORAGE_KEY);

    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const getStoredAvatarId = () => {
  if (typeof window === "undefined") {
    return AVATARS[0].id;
  }

  try {
    return (
      window.localStorage.getItem(
        "chopnow_selected_avatar"
      ) || AVATARS[0].id
    );
  } catch {
    return AVATARS[0].id;
  }
};

const money = (value) =>
  `₦${value.toLocaleString("en-NG")}`;

function FoodCard({ item, onAdd }) {
  return (
    <article className="store-food-card">
      <div className="store-food-image-wrap">
        <img
          src={item.image}
          alt={item.name}
          className="store-food-image"
        />

        <div className="store-food-image-fade" />
      </div>

      <div className="store-food-content">
        <div className="store-food-title-row">
          <h4>{item.name}</h4>

          <div className="store-food-rating">
            <Star
              size={13}
              fill="currentColor"
              aria-hidden="true"
            />

            <span>{item.rating}</span>
          </div>
        </div>

        <p>{item.description}</p>

        <div className="store-food-bottom-row">
          <span>{money(item.price)}</span>

          <button
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name}`}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Stores() {
  const [activeCategory, setActiveCategory] =
    useState("section-soups");

  const [searchTerm, setSearchTerm] = useState("");

  const [cartItems, setCartItems] =
    useState(getStoredCartItems);

  // Selected profile avatar
  const [selectedAvatarId, setSelectedAvatarId] =
    useState(getStoredAvatarId);

  /*
   * Listen for avatar changes.
   *
   * The custom event handles changes while the app
   * is running in the same browser tab.
   *
   * The storage event handles changes coming from
   * another browser tab/window.
   */
  useEffect(() => {
    const handleAvatarChange = () => {
      setSelectedAvatarId(getStoredAvatarId());
    };

    window.addEventListener(
      "chopnow-avatar-changed",
      handleAvatarChange
    );

    window.addEventListener(
      "storage",
      handleAvatarChange
    );

    return () => {
      window.removeEventListener(
        "chopnow-avatar-changed",
        handleAvatarChange
      );

      window.removeEventListener(
        "storage",
        handleAvatarChange
      );
    };
  }, []);

  const currentAvatar =
    AVATARS.find(
      (avatar) => avatar.id === selectedAvatarId
    ) || AVATARS[0];

  const visibleSections = useMemo(() => {
    const sections =
      activeCategory === "all"
        ? menuSections
        : menuSections.filter(
            (section) =>
              section.id === activeCategory
          );

    if (!searchTerm.trim()) return sections;

    const query = searchTerm.toLowerCase();

    return sections
      .map((section) => ({
        ...section,

        items: section.items.filter((item) =>
          `${item.name} ${item.description}`
            .toLowerCase()
            .includes(query)
        ),
      }))
      .filter(
        (section) => section.items.length > 0
      );
  }, [activeCategory, searchTerm]);

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId);

    window.setTimeout(() => {
      const target =
        categoryId === "all"
          ? document.querySelector(
              ".stores-menu-section"
            )
          : document.getElementById(categoryId);

      if (target) {
        window.scrollTo({
          top:
            target.getBoundingClientRect().top +
            window.scrollY -
            150,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  const addItem = (item) => {
    const itemId = `store-${item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === itemId
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === itemId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentItems,
        {
          id: itemId,
          name: item.name,
          details: item.description,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ];
    });
  };

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

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="stores-page">
      <header className="stores-header">
        <div className="stores-header-inner">
          <div className="stores-header-row">
            <h1>Crave Corner</h1>

            <div className="stores-header-actions">
              <button
                type="button"
                aria-label="Notifications"
              >
                <Bell
                  size={20}
                  aria-hidden="true"
                />
              </button>

              {/* Selected Profile Avatar */}
              <div
                className="stores-profile-avatar"
                dangerouslySetInnerHTML={{
                  __html: currentAvatar.svg,
                }}
                aria-label={`Profile avatar: ${currentAvatar.name}`}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="stores-main">
        <div className="stores-intro">
          <h2>Explore Our Menu</h2>

          <label className="stores-search">
            <Search
              size={19}
              aria-hidden="true"
            />

            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search for food..."
              type="search"
            />
          </label>
        </div>

        <div
          className="stores-category-scroller"
          id="menu-categories-nav"
        >
          <div className="stores-category-list">
            {categories.map(
              ({ id, label, Icon }) => (
                <button
                  key={id}
                  className={
                    activeCategory === id
                      ? "stores-category active"
                      : "stores-category"
                  }
                  type="button"
                  onClick={() =>
                    selectCategory(id)
                  }
                >
                  <Icon
                    size={16}
                    aria-hidden="true"
                  />

                  {label}
                </button>
              )
            )}
          </div>
        </div>

        <div className="stores-sections">
          {visibleSections.map((section) => (
            <section
              className="stores-menu-section"
              id={section.id}
              key={section.id}
            >
              <h3>{section.title}</h3>

              <div className="stores-food-grid">
                {section.items.map((item) => (
                  <FoodCard
                    item={item}
                    onAdd={addItem}
                    key={item.name}
                  />
                ))}
              </div>
            </section>
          ))}

          {visibleSections.length === 0 && (
            <div className="stores-empty-search">
              No food found for “{searchTerm}”.
            </div>
          )}
        </div>
      </main>

      {/* Cart bar */}
      <div className="stores-cart-summary">
        <div className="stores-cart-summary-inner">
          <div className="stores-cart-info">
            <div className="stores-cart-icon">
              <ShoppingBasket
                size={29}
                aria-hidden="true"
              />

              <span>{cartCount}</span>
            </div>

            <div>
              <small>{cartCount} items</small>

              <strong>
                {money(cartTotal)}
              </strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.hash = "#cart";
            }}
          >
            View Cart

            <ArrowRight
              size={16}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}