import { useMemo, useState } from "react";
import {
  Banknote,
  Landmark,
  LoaderCircle,
  LockKeyhole,
  MapPin,
  Tag,
  Truck,
  ArrowLeft,
} from "lucide-react";
import "../styles/checkout.css";

const CART_STORAGE_KEY = "chopnow-cart-items";
const ORDER_STORAGE_KEY = "chopnow-last-order";
const DELIVERY_FEE = 800;
const SERVICE_FEE = 200;

const getStoredCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch {
    return [];
  }
};

const formatCurrency = (value) => `₦${value.toLocaleString("en-NG")}`;

export default function Checkout() {
  const [deliveryDetails, setDeliveryDetails] = useState({ name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [cartItems] = useState(getStoredCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const serviceFee = subtotal > 0 ? SERVICE_FEE : 0;
  const total = subtotal + deliveryFee + serviceFee;

  const updateDeliveryDetail = (event) => {
    const { name, value } = event.target;
    setDeliveryDetails((current) => ({ ...current, [name]: value }));
  };

  const applyPromo = (event) => {
    event.preventDefault();
    setPromoApplied(Boolean(promoCode.trim()));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (isPlacingOrder) return;

    // Save the purchased items AND delivery details for the tracking screen
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({
      items: cartItems,
      subtotal,
      deliveryFee,
      serviceFee,
      total,
      placedAt: new Date().toISOString(),
      deliveryDetails, // <-- ADDED: saves name, phone, address
    }));

    // The order is being completed, so remove all purchased items from the shared cart.
    window.localStorage.removeItem(CART_STORAGE_KEY);
    setIsPlacingOrder(true);
    window.setTimeout(() => {
      window.location.hash = "#order-placed";
    }, 1500);
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#cart";
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <button className="checkout-back-button" type="button" onClick={goBack} aria-label="Go back">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <h1>Secure Checkout</h1>
        <LockKeyhole className="checkout-lock-icon" size={20} aria-hidden="true" />
      </header>

      <main className="checkout-main">
        <section className="checkout-section delivery-section">
          <h2>Delivery Details</h2>
          <form className="delivery-form" onSubmit={(event) => event.preventDefault()}>
            <div className="delivery-name-row">
              <label><span className="sr-only">Full Name</span><input name="name" value={deliveryDetails.name} onChange={updateDeliveryDetail} placeholder="Full Name" type="text" /></label>
              <label><span className="sr-only">Phone Number</span><input name="phone" value={deliveryDetails.phone} onChange={updateDeliveryDetail} placeholder="Phone Number" type="tel" /></label>
            </div>
            <label className="address-input-wrap">
              <span className="sr-only">Delivery Address</span>
              <MapPin size={18} aria-hidden="true" />
              <input name="address" value={deliveryDetails.address} onChange={updateDeliveryDetail} placeholder="Delivery Address" type="text" />
            </label>
          </form>
          <div className="delivery-option">
            <div className="delivery-option-copy"><Truck size={22} aria-hidden="true" /><div><p>Standard Delivery</p><span>25 - 40 mins</span></div></div>
            <strong>{formatCurrency(deliveryFee)}</strong>
          </div>
        </section>

        <section className="checkout-section payment-section">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className={`payment-option${paymentMethod === "bank-transfer" ? " selected" : ""}`}>
              <input type="radio" name="payment" value="bank-transfer" checked={paymentMethod === "bank-transfer"} onChange={(event) => setPaymentMethod(event.target.value)} />
              <Landmark size={28} aria-hidden="true" /><span>Bank Transfer</span><span className="payment-radio" aria-hidden="true" />
            </label>
            <label className={`payment-option${paymentMethod === "cash" ? " selected" : ""}`}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={(event) => setPaymentMethod(event.target.value)} />
              <Banknote size={28} aria-hidden="true" /><span>Cash on Delivery</span><span className="payment-radio" aria-hidden="true" />
            </label>
          </div>
        </section>

        <section className="checkout-section promo-checkout-section">
          <form className="checkout-promo-form" onSubmit={applyPromo}>
            <label className="promo-checkout-input"><Tag size={18} aria-hidden="true" /><input value={promoCode} onChange={(event) => setPromoCode(event.target.value.toUpperCase())} placeholder="Enter Promo Code" type="text" /></label>
            <button type="submit">{promoApplied ? "Applied" : "Apply"}</button>
          </form>
        </section>

        <section className="checkout-section total-section">
          <div className="checkout-total-row"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="checkout-total-row"><span>Delivery Fee</span><span>{formatCurrency(deliveryFee)}</span></div>
          <div className="checkout-total-row"><span>Service Fee</span><span>{formatCurrency(serviceFee)}</span></div>
          <div className="checkout-total-divider" />
          <div className="checkout-grand-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div>
        </section>

        <div className="place-order-wrap">
          <button className="place-order-button" type="button" onClick={placeOrder} disabled={isPlacingOrder}>
            {isPlacingOrder ? <><LoaderCircle className="checkout-button-spinner" size={20} aria-hidden="true" /><span>Placing Order...</span></> : <span>Place Order — {formatCurrency(total)}</span>}
          </button>
        </div>
      </main>
    </div>
  );
}