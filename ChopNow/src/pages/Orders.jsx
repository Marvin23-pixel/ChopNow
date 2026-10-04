import { useState } from "react";
import {
  Truck,
  History,
  CheckCircle,
} from "lucide-react";
import "../styles/orders.css";

function Orders() {
  const [currentOrders, setCurrentOrders] = useState([
    {
      id: "#CN-20260829-0042",
      restaurant: "Mama's Kitchen",
      status: "On the way",
      eta: "ETA: 15–25 min",
      items: [
        "2x Jollof Rice & Grilled Chicken",
        "1x Fried Plantain",
      ],
      total: "₦11,500",
    },
  ]);

  const [pastOrders, setPastOrders] = useState([
    {
      id: "#CN-20260825-0194",
      restaurant: "Chicken Republic",
      date: "Delivered · Aug 25, 2026",
      items: [
        "1x Fried Rice & Chicken",
        "1x Soft Drink",
      ],
      total: "₦6,500",
    },
  ]);

  const handleTrackOrder = (orderId) => {
    window.location.hash = `#track-order?id=${orderId}`;
  };

  const handleViewDetails = (orderId) => {
    window.location.hash = `#order-details?id=${orderId}`;
  };

  const handleOrderAgain = (order) => {
    try {
      const stored =
        window.localStorage.getItem("chopnow-cart-items");

      const currentCart = stored
        ? JSON.parse(stored)
        : [];

      const newItemId = `dish-${order.restaurant
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`;

      const existing = currentCart.find(
        (item) => item.id === newItemId
      );

      let updatedCart;

      const priceNum =
        Number(
          order.total.replace(/[^0-9]/g, "")
        ) || 3500;

      if (existing) {
        updatedCart = currentCart.map((item) =>
          item.id === newItemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...currentCart,
          {
            id: newItemId,
            name: order.items[0],
            details: order.restaurant,
            price: priceNum,
            quantity: 1,
          },
        ];
      }

      window.localStorage.setItem(
        "chopnow-cart-items",
        JSON.stringify(updatedCart)
      );

      window.location.hash = "#cart";
    } catch {
      window.location.hash = "#cart";
    }
  };

  return (
    <div className="orders-page-root">
      {/* TopAppBar */}
      <header className="orders-top-app-bar">
        <div className="orders-brand-title">
          ChopNow
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="orders-main-canvas">
        <header className="orders-header-block">
          <h1 className="orders-page-title">
            My Orders
          </h1>

          <p className="orders-page-subtitle">
            Track your current orders and view your order
            history.
          </p>
        </header>

        {/* Current Orders Section */}
        <section className="orders-section">
          <h2 className="orders-section-heading">
            <Truck
              size={22}
              className="orders-section-icon orders-shipping-icon"
            />
            Current Orders
          </h2>

          {currentOrders.length === 0 ? (
            <p className="orders-empty-text">
              No active orders right now.
            </p>
          ) : (
            currentOrders.map((order) => (
              <article
                key={order.id}
                className="orders-card orders-glass-panel orders-card-hover"
              >
                <div className="orders-card-accent-blob"></div>

                <div className="orders-card-row">
                  <div>
                    <h3 className="orders-restaurant-name">
                      {order.restaurant}
                    </h3>

                    <p className="orders-order-id">
                      {order.id}
                    </p>
                  </div>

                  <div className="orders-status-pill">
                    <span className="orders-status-text">
                      {order.status}
                    </span>

                    <span className="orders-eta-text">
                      {order.eta}
                    </span>
                  </div>
                </div>

                <div className="orders-items-list-wrap">
                  <ul className="orders-items-ul">
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="orders-card-footer">
                  <span className="orders-total-text">
                    Total: {order.total}
                  </span>

                  <button
                    type="button"
                    className="orders-action-btn-primary"
                    onClick={() =>
                      handleTrackOrder(order.id)
                    }
                  >
                    Track Order
                  </button>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Past Orders Section */}
        <section className="orders-section">
          <h2 className="orders-section-heading">
            <History
              size={22}
              className="orders-section-icon orders-history-icon"
            />
            Past Orders
          </h2>

          {pastOrders.length === 0 ? (
            <p className="orders-empty-text">
              No past orders available.
            </p>
          ) : (
            pastOrders.map((order) => (
              <article
                key={order.id}
                className="orders-card orders-card-bordered orders-card-hover"
              >
                <div className="orders-card-row">
                  <div>
                    <h3 className="orders-restaurant-name">
                      {order.restaurant}
                    </h3>

                    <p className="orders-order-id">
                      {order.id}
                    </p>
                  </div>

                  <div className="orders-delivered-row">
                    <CheckCircle
                      size={16}
                      className="orders-check-icon"
                    />

                    <span className="orders-eta-text">
                      {order.date}
                    </span>
                  </div>
                </div>

                <div className="orders-items-list-wrap orders-text-soft">
                  <ul className="orders-items-ul">
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="orders-card-footer orders-footer-col-stack">
                  <span className="orders-total-text">
                    Total: {order.total}
                  </span>

                  <div className="orders-btn-group">
                    <button
                      type="button"
                      className="orders-action-btn-outline"
                      onClick={() =>
                        handleViewDetails(order.id)
                      }
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      className="orders-action-btn-secondary"
                      onClick={() =>
                        handleOrderAgain(order)
                      }
                    >
                      Order Again
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default Orders;
