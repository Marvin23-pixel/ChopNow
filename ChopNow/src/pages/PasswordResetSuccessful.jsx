import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, LoaderCircle } from "lucide-react";
import "..//styles/passwordresetsuccessful.css";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1UcDscLCFxVkBgZx1H0OwBVajI8JGaGjgEYw7B6sqipg3Bt1TOEzsxzWxVNb5CEpipDT8jUThiitlbUAqEhBKt762XsH3pVv9ZsdHs_oOVosfkf9FGvC84-x9wzmJuyu83F8WqsMTt3rcFz4GHFviYTU6jw2GJJXSGtdgGh5UVzSIq2iUhaSk0sNEaNkiwmTRXnNa7T42tyLEJ-FHIV5i8BxCo07k8QX9ySPe_-dyAvEFoHy6I18RJauIVV";

function LoadingOverlay() {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="auth-loading-card">
        <LoaderCircle className="auth-loading-spinner" size={34} strokeWidth={2.25} aria-hidden="true" />
        <span>Returning to login...</span>
      </div>
    </div>
  );
}

export default function PasswordResetSuccessful() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#login";
    }, 500);
  };

  return (
    <div className="password-reset-success-page">
      <section className="password-reset-success-hero" aria-label="ChopNow food preview">
        <button
          className="password-reset-success-back-button"
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
        </button>

        <img
          className="password-reset-success-hero-image"
          src={HERO_IMAGE_URL}
          alt="A high-end close-up of Nigerian food with grilled chicken and plantains."
        />
        <div className="password-reset-success-hero-overlay" />
      </section>

      <main className="password-reset-success-content">
        <section className="password-reset-success-card" aria-labelledby="password-reset-success-heading">
          <div className="password-reset-success-icon" aria-hidden="true">
            <CheckCircle size={40} strokeWidth={2} />
          </div>

          <h1 id="password-reset-success-heading">Password reset successfully!</h1>

          <p>
            Your ChopNow password has been updated. You can now log in with your new password.
          </p>

          <button
            className="password-reset-success-login-button"
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            <span>Log In</span>
            <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>
      </main>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}

