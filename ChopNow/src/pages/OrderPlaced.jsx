import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, LoaderCircle } from "lucide-react";
import "..//styles/orderplaced.css";

export default function OrderPlaced() {
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.hash = "#home";
  };

  const goHome = () => {
    window.location.hash = "#home";
  };

  const trackOrder = () => {
    if (isTrackingLoading) return;
    setIsTrackingLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#track-order";
    }, 700);
  };

  return (
    <div className="order-placed-page">
      <header className="order-placed-header">
        <button className="order-placed-back-button" type="button" onClick={goBack} aria-label="Go back">
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <h1>Order Confirmation</h1>
        <span className="order-placed-header-spacer" aria-hidden="true" />
      </header>

      <main className="order-placed-main">
        <section className="order-placed-card" aria-labelledby="order-placed-title">
          <div className="order-placed-icon">
            <CheckCircle2 size={40} aria-hidden="true" />
          </div>
          <h2 id="order-placed-title">Order Placed!</h2>
          <p>Your order <strong>#CN-8821</strong> has been successfully placed.</p>

          <div className="order-placed-delivery">
            <Clock3 size={32} aria-hidden="true" />
            <div>
              <span>Estimated Delivery</span>
              <strong>35 mins</strong>
            </div>
          </div>

          <button className="order-placed-track-button" type="button" onClick={trackOrder} disabled={isTrackingLoading}>
            {isTrackingLoading ? (
              <><LoaderCircle className="order-placed-loading-icon" size={18} aria-hidden="true" /> Loading Track Order...</>
            ) : (
              "Track Order"
            )}
          </button>
          <button className="order-placed-home-button" type="button" onClick={goHome}>
            Back to Home
          </button>
        </section>
      </main>
    </div>
  );
}
