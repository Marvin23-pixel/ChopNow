import React, { useState } from "react";
import {
  ArrowLeft,
  Lock,
  Shield,
  Bell,
  Megaphone,
  Truck,
  Languages,
  Moon,
  FileText,
  Info,
  ChevronRight,
  ExternalLink,
  Trash2,
} from "lucide-react";
import "../styles/settings.css";

const Settings = () => {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [deliveryAlerts, setDeliveryAlerts] = useState(true);

  return (
    <div className="settings-page">
      {/* Top Navigation */}
      <header className="settings-header">
        <button
          className="back-button"
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="settings-title">Settings</h1>
        <div className="header-spacer" />
      </header>

      {/* Main Content */}
      <main className="settings-main">
        {/* Account & Security Section */}
        <section className="settings-section">
          <h2 className="section-label">Account & Security</h2>
          <div className="settings-card">
            <a className="settings-row" href="#">
              <div className="row-left">
                <div className="icon-circle">
                  <Lock size={22} />
                </div>
                <span className="row-label">Change Password</span>
              </div>
              <ChevronRight size={22} className="chevron" />
            </a>
            <a className="settings-row" href="#">
              <div className="row-left">
                <div className="icon-circle">
                  <Shield size={22} />
                </div>
                <span className="row-label">Two-Factor Authentication</span>
              </div>
              <ChevronRight size={22} className="chevron" />
            </a>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="settings-section">
          <h2 className="section-label">Notifications</h2>
          <div className="settings-card">
            <div className="settings-row settings-row-toggle">
              <div className="row-left">
                <div className="icon-circle">
                  <Bell size={22} />
                </div>
                <div className="toggle-text">
                  <span className="row-label">Order Updates</span>
                  <span className="row-sublabel">
                    Push notifications for order status
                  </span>
                </div>
              </div>
              <div className="toggle-wrapper">
                <input
                  type="checkbox"
                  id="toggle-order"
                  className="toggle-checkbox"
                  checked={orderUpdates}
                  onChange={() => setOrderUpdates(!orderUpdates)}
                />
                <label
                  className={`toggle-label ${orderUpdates ? "toggle-checked" : ""}`}
                  htmlFor="toggle-order"
                />
              </div>
            </div>

            <div className="settings-row settings-row-toggle">
              <div className="row-left">
                <div className="icon-circle">
                  <Megaphone size={22} />
                </div>
                <div className="toggle-text">
                  <span className="row-label">Promotions & Offers</span>
                  <span className="row-sublabel">
                    Exclusive deals and discounts
                  </span>
                </div>
              </div>
              <div className="toggle-wrapper">
                <input
                  type="checkbox"
                  id="toggle-promo"
                  className="toggle-checkbox"
                  checked={promotions}
                  onChange={() => setPromotions(!promotions)}
                />
                <label
                  className={`toggle-label ${promotions ? "toggle-checked" : ""}`}
                  htmlFor="toggle-promo"
                />
              </div>
            </div>

            <div className="settings-row settings-row-toggle">
              <div className="row-left">
                <div className="icon-circle">
                  <Truck size={22} />
                </div>
                <div className="toggle-text">
                  <span className="row-label">Delivery Alerts</span>
                  <span className="row-sublabel">
                    Real-time driver tracking updates
                  </span>
                </div>
              </div>
              <div className="toggle-wrapper">
                <input
                  type="checkbox"
                  id="toggle-delivery"
                  className="toggle-checkbox"
                  checked={deliveryAlerts}
                  onChange={() => setDeliveryAlerts(!deliveryAlerts)}
                />
                <label
                  className={`toggle-label ${deliveryAlerts ? "toggle-checked" : ""}`}
                  htmlFor="toggle-delivery"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="settings-section">
          <h2 className="section-label">Preferences</h2>
          <div className="settings-card">
            <button className="settings-row settings-button" type="button">
              <div className="row-left">
                <div className="icon-circle">
                  <Languages size={22} />
                </div>
                <span className="row-label">Language</span>
              </div>
              <div className="row-right">
                <span className="value-text">English</span>
                <ChevronRight size={22} className="chevron" />
              </div>
            </button>

            <button className="settings-row settings-button" type="button">
              <div className="row-left">
                <div className="icon-circle">
                  <Moon size={22} />
                </div>
                <span className="row-label">Theme</span>
              </div>
              <div className="row-right">
                <span className="value-text">Dark</span>
                <ChevronRight size={22} className="chevron" />
              </div>
            </button>
          </div>
        </section>

        {/* Legal & About Section */}
        <section className="settings-section settings-section-last">
          <h2 className="section-label">Legal & About</h2>
          <div className="settings-card">
            <a className="settings-row" href="#">
              <div className="row-left">
                <div className="icon-circle">
                  <FileText size={22} />
                </div>
                <span className="row-label">Privacy Policy</span>
              </div>
              <ExternalLink size={20} className="chevron" />
            </a>
            <a className="settings-row" href="#">
              <div className="row-left">
                <div className="icon-circle">
                  <FileText size={22} />
                </div>
                <span className="row-label">Terms of Service</span>
              </div>
              <ExternalLink size={20} className="chevron" />
            </a>
            <div className="settings-row settings-row-static">
              <div className="row-left">
                <div className="icon-circle icon-circle-muted">
                  <Info size={22} />
                </div>
                <span className="row-label">App Version</span>
              </div>
              <span className="version-text">v2.4.1</span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="danger-zone">
          <button className="delete-account-button" type="button">
            <Trash2 size={20} />
            Delete Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default Settings;