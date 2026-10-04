import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  LoaderCircle,
  Minus,
  Plus,
  ReceiptText,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import "..//styles/cart.css";

const DELIVERY_FEE = 800;
const SERVICE_FEE = 200;
const CART_STORAGE_KEY = "chopnow-cart-items";
const CART_STORAGE_VERSION_KEY = "chopnow-cart-storage-version";
const CART_STORAGE_VERSION = "2";

const getStoredCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    if (window.localStorage.getItem(CART_STORAGE_VERSION_KEY) !== CART_STORAGE_VERSION) {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      window.localStorage.setItem(CART_STORAGE_VERSION_KEY, CART_STORAGE_VERSION);
      return [];
    }

    const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const formatCurrency = (value) => `₦${value.toLocaleString("en-NG")}`;

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item glass-panel">
      <div className="cart-item-image-wrap">
        <img src={item.image} alt={item.name} className="cart-item-image" />
        <div className="cart-item-image-overlay" aria-hidden="true" />
      </div>

      <div className="cart-item-details">
        <div>
          <h2>{item.name}</h2>
          <p>{item.details}</p>
        </div>
        <strong>{formatCurrency(item.price)}</strong>
      </div>

      <div className="cart-item-actions">
        <button
          className="cart-icon-button delete-button"
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={18} strokeWidth={1.9} aria-hidden="true" />
        </button>

        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
          <button type="button" onClick={() => onQuantityChange(item.id, -1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.name} quantity`}>
            <Minus size={15} strokeWidth={2} aria-hidden="true" />
          </button>
          <span>{item.quantity}</span>
          <button type="button" onClick={() => onQuantityChange(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>
            <Plus size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Cart() {
  const [items, setItems] = useState(getStoredCartItems);
  const [removingId, setRemovingId] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const total = subtotal > 0 ? subtotal + DELIVERY_FEE + SERVICE_FEE : 0;

  const updateQuantity = (id, change) => {
    setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item));
  };

  const removeItem = (id) => {
    setRemovingId(id);
    window.setTimeout(() => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const applyPromo = (event) => {
    event.preventDefault();
    setPromoApplied(Boolean(promoCode.trim()));
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#home";
  };

  const proceedToCheckout = () => {
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#checkout";
    }, 700);
  };

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.localStorage.setItem(CART_STORAGE_VERSION_KEY, CART_STORAGE_VERSION);
  }, [items]);

  const isEmpty = items.length === 0;

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button className="cart-back-button" type="button" onClick={goBack} aria-label="Go back">
          <ArrowLeft size={21} strokeWidth={2} aria-hidden="true" />
        </button>
        <h1>Your Cart</h1>
        <span className="cart-header-spacer" aria-hidden="true" />
      </header>

      <main className="cart-main" id="cart-container">
        {!isEmpty ? (
          <>
            <section className="cart-items" aria-label="Cart items">
              {items.map((item) => (
                <div className={removingId === item.id ? "cart-item-shell item-exit" : "cart-item-shell"} key={item.id}>
                  <CartItem item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
                </div>
              ))}
            </section>

            <form className="promo-section" onSubmit={applyPromo}>
              <div className="promo-input-wrap">
                <Tag size={19} aria-hidden="true" />
                <input value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Add Promo Code" aria-label="Promo code" />
                <button type="submit">{promoApplied ? "Applied" : "Apply"}</button>
              </div>
            </form>

            <section className="summary-section glass-panel" aria-labelledby="summary-heading">
              <h2 id="summary-heading">Order Summary</h2>
              <div className="summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
              <div className="summary-row"><span>Delivery Fee</span><strong>{formatCurrency(DELIVERY_FEE)}</strong></div>
              <div className="summary-row"><span>Service Fee</span><strong>{formatCurrency(SERVICE_FEE)}</strong></div>
              <div className="summary-divider" />
              <div className="summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
            </section>
          </>
        ) : (
          <section className="empty-state" aria-live="polite">
            <div className="empty-icon"><ShoppingBag size={58} strokeWidth={1.4} aria-hidden="true" /></div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven&apos;t added any delicious food to your cart yet.</p>
            <button type="button" onClick={() => { window.location.hash = "#home"; }}>Browse Food</button>
          </section>
        )}
      </main>

      {!isEmpty && (
        <div className="checkout-cta" id="checkout-cta">
          <div className="checkout-inner">
            <button className="checkout-button" type="button" onClick={proceedToCheckout} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? (
                <><LoaderCircle className="checkout-loading-icon" size={18} aria-hidden="true" /><span>Loading Checkout...</span></>
              ) : (
                <><span>Proceed to Checkout</span><strong>{formatCurrency(total)}</strong><ReceiptText size={18} aria-hidden="true" /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
