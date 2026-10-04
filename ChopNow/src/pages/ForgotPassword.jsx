import { useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import "..//styles/ForgotPassword.css";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1X0EE_MtSWz-s5gPDANZgqiEw9OSRUFLP76nE4uM9yZHSJouIwokL4mrXYsi8J1pjfYGYTSciflxWcTb7ObVZZKuD-_h3cipMNrQza7J-1-jJ6YLI50tCheUAdnv1jM3HFhMY8iHV5SR7lcSt1iQKYSohSOQMeEhtaUuaKk4ChKrb31T7TVAcdmE-MIU67ovRdSL9hH7VirjkHiCGjBHdXPytrZVYQDpyh258883zTX2DVKK6YewSpD07nH";

const LOGO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1V2selK7z0ZqNo3B8b7_cA8j9AqnaH-JfjXKYNiGfnGBRk5s36g-Xt3IpmN0tspsE26HsAUqRxIqLiSkFF6C7QkRlnb4Ict2yO-M9SwuNt36CAtVXCEx4LZb5YO1lqFy0LZmBDJEbELEZw8ycblbOsgzI0W1oQ7zVqEgRxicZAZagK6SxNfuPLZfb5vfCdR2-866sh5r2Q0GOGbo-Y8Um7NJuJwwMh07vAOkjqZQJSShHXI-kM_7myeNNI";

function LoadingOverlay() {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="auth-loading-card">
        <LoaderCircle className="auth-loading-spinner" size={34} strokeWidth={2.25} aria-hidden="true" />
        <span>Sending code...</span>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (isLoading) return;
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#verify";
    }, 500);
  };

  return (
    <div className="forgot-password-page">
      <main className="forgot-password-main">
        <section className="forgot-password-hero" aria-label="ChopNow food preview">
          <img
            className="forgot-password-hero-image"
            src={HERO_IMAGE_URL}
            alt="A premium overhead shot of Nigerian Jollof rice with grilled chicken, fried plantains, and fresh herbs."
          />
          <div className="forgot-password-hero-overlay" />
          <button
            className="forgot-password-back-button"
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="forgot-password-form-section" aria-labelledby="forgot-password-heading">
          <div className="forgot-password-content">
            <div className="forgot-password-desktop-logo">
              <img
                src={LOGO_IMAGE_URL}
                alt="ChopNow"
              />
            </div>

            <h1 id="forgot-password-heading">Forgot your password?</h1>
            <p className="forgot-password-description">
              Enter the email address or phone number linked to your account to receive a confirmation code
            </p>

            <form className="forgot-password-form" onSubmit={(event) => event.preventDefault()}>
              <div className="forgot-password-field-group">
                <label htmlFor="contact">Email or Phone Number</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="Enter your email or phone number"
                  autoComplete="email"
                />
              </div>

              <button
                className="forgot-password-send-button"
                type="button"
                onClick={handleSendCode}
                disabled={isLoading}
              >
                Send Code
              </button>
            </form>

            <div className="forgot-password-login-link">
              Remember your password? <a href="#login">Log in</a>
            </div>
          </div>
        </section>
      </main>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
