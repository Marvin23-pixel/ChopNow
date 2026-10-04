import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CircleHelp,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Store,
  Truck,
} from "lucide-react";
import "../styles/trackorder.css";

const mapImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCeb8yn80YbOD6V8G9vobTSQ4Z2SXSjucjm5MwHeUPBCZ53NYM_LPw15owaZBSoc-rDER5KPu2jv0WXXZXYnrYdg-wuQEIGwyBdRfM_UDOJNq9OOjluaDL8UseKsbhFgBI54TL3cmpXAHJQzFvbUYBhpJS13TF52xweH4LM4N6byUURhgA6K9AIAtVKdb2XQ285LE3TC2m8w1cAWJtAki2b0kHfRmhG2F9BmgaQILYMgBNSG9QQPnhu3g";
const riderImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4Mk9we_nUFANpvc8_ZPO0vdfXQrHzs3cPsmO2I-H6PD-s_9KfcVM2rYSA-zwIEObo7SdVKS4XHAM7U_bHMz9rR8VLTMZyWBJxQMUi9rZry195DiGwQLVdA3AiaLboEW5JNRRMFMIOEU372OEZLSMHuotfwgLudZCX2vzDvqfWYh_gWEtaETa1XyLYSCDmNUYP7NHTx3oQXdkXmDqWKbx2-eACKFniBRi9ETaUhE0Z73p5r4j-6YKbg";

const ORDER_STORAGE_KEY = "chopnow-last-order";

const getLastOrder = () => {
  if (typeof window === "undefined") return null;

  try {
    const savedOrder = window.localStorage.getItem(ORDER_STORAGE_KEY);
    return savedOrder ? JSON.parse(savedOrder) : null;
  } catch {
    return null;
  }
};

const formatCurrency = (value) => `₦${Number(value || 0).toLocaleString("en-NG")}`;

const progressSteps = [
  { title: "Order Confirmed", detail: "12:30 PM", status: "done" },
  { title: "Restaurant Preparing", detail: "12:35 PM", status: "done" },
  { title: "Picked Up", detail: "12:50 PM", status: "done" },
  { title: "On the Way", detail: "Rider is approaching", status: "current" },
  { title: "Delivered", detail: "", status: "pending" },
];

export default function TrackOrder() {
  const [lastOrder] = useState(getLastOrder);

  // Pull delivery details from the saved order, fallback to empty strings
  const deliveryName = lastOrder?.deliveryDetails?.name || "";
  const deliveryAddress = lastOrder?.deliveryDetails?.address || "";
  const deliveryPhone = lastOrder?.deliveryDetails?.phone || "";

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#order-placed";
  };

  const showHelp = () => window.alert("How can we help with your order?");
  const callRider = () => window.alert("Calling David...");
  const openChat = () => window.alert("Opening chat with David...");

  return (
    <div className="track-order-page">
      <header className="track-order-header">
        <button className="track-order-header-button" type="button" onClick={goBack} aria-label="Go back">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <h1>Track Order</h1>
        <button className="track-order-header-button" type="button" onClick={showHelp} aria-label="Get help">
          <CircleHelp size={21} aria-hidden="true" />
        </button>
      </header>

      <main className="track-order-main">
        <section className="delivery-map" aria-label="Live delivery map">
          <img src={mapImage} alt="Dark overhead city map showing the delivery route" />
          <div className="map-overlay">
            <div className="rider-away-badge"><span className="live-dot" />Rider is 8 minutes away</div>
            <div className="map-marker rider-marker"><Truck size={16} aria-hidden="true" /></div>
            <div className="map-marker restaurant-marker"><Store size={14} aria-hidden="true" /></div>
            <div className="map-marker destination-marker"><Home size={14} aria-hidden="true" /></div>
          </div>
          <div className="map-fade" />
        </section>

        <div className="track-order-content">
          <section className="track-card order-status-card">
            <h2>Your order is on the way!</h2>
            <p className="arrival-time">Estimated arrival: 15-25 min</p>
            <p className="order-number">Order #CN-20260827-0042</p>
          </section>

          {lastOrder?.items?.length > 0 && (
            <section className="track-card ordered-items-card" aria-labelledby="ordered-items-heading">
              <div className="ordered-items-heading-row">
                <h3 id="ordered-items-heading">Your Order</h3>
                <strong>{formatCurrency(lastOrder.total)}</strong>
              </div>
              <div className="ordered-items-list">
                {lastOrder.items.map((item) => (
                  <div className="ordered-item-row" key={item.id}>
                    <span className="ordered-item-quantity">{item.quantity}×</span>
                    <span className="ordered-item-name">{item.name}</span>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="track-card progress-card">
            <h3>Order Progress</h3>
            <div className="stepper">
              <div className="stepper-line"><div className="stepper-progress" /></div>
              <ol>
                {progressSteps.map((step) => (
                  <li className={`progress-step ${step.status}`} key={step.title}>
                    <div className="step-icon">
                      {step.status === "done" ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : step.status === "current" ? <span /> : null}
                    </div>
                    <div className="step-copy">
                      <p>{step.title}</p>
                      {step.detail && <span>{step.detail}</span>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="track-card rider-card">
            <div className="rider-profile-row">
              <div className="rider-profile">
                <img src={riderImage} alt="David, your delivery rider" />
                <div>
                  <p className="rider-name">David</p>
                  <div className="rider-rating"><Star size={14} fill="currentColor" aria-hidden="true" /><span>4.8 • Toyota Corolla</span></div>
                  <p className="rider-plate">ABC-123DE</p>
                </div>
              </div>
            </div>
            <div className="rider-actions">
              <button className="call-rider-button" type="button" onClick={callRider}><Phone size={18} aria-hidden="true" />Call Rider</button>
              <button className="chat-rider-button" type="button" onClick={openChat} aria-label="Chat with rider"><MessageCircle size={18} aria-hidden="true" /></button>
            </div>
          </section>

          <section className="track-card address-card">
            <MapPin size={21} aria-hidden="true" />
            <div>
              <p>
                {deliveryName ? `Delivering to ${deliveryName}` : "Delivering to you"}
              </p>
              <span>
                {deliveryAddress || "Address not provided"}
              </span>
              {deliveryPhone && (
                <small>Phone: {deliveryPhone}</small>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}