import { useRef, useState } from "react";
import { ArrowLeft, CheckCircle, Circle, Eye, EyeOff, LoaderCircle } from "lucide-react";
import "..//styles/createnewpassword.css";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1UcDscLCFxVkBgZx1H0OwBVajI8JGaGjgEYw7B6sqipg3Bt1TOEzsxzWxVNb5CEpipDT8jUThiitlbUAqEhBKt762XsH3pVv9ZsdHs_oOVosfkf9FGvC84-x9wzmJuyu83F8WqsMTt3rcFz4GHFviYTU6jw2GJJXSGtdgGh5UVzSIq2iUhaSk0sNEaNkiwmTRXnNa7T42tyLEJ-FHIV5i8BxCo07k8QX9ySPe_-dyAvEFoHy6I18RJauIVV";

function PasswordField({ id, label, placeholder, visible, onToggle }) {
  const inputRef = useRef(null);

  const handleToggle = () => {
    const input = inputRef.current;
    const shouldRestoreFocus = document.activeElement === input;

    onToggle();

    if (shouldRestoreFocus) {
      requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
      });
    }
  };

  const preventFocusLoss = (event) => {
    event.preventDefault();
  };

  return (
    <div className="create-password-field">
      <label htmlFor={id}>{label}</label>
      <div className="create-password-input-wrap">
        <input
          ref={inputRef}
          id={id}
          name={id}
          placeholder={placeholder}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
        />
        <button
          className="create-password-visibility-button"
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
          onPointerDown={preventFocusLoss}
          onMouseDown={preventFocusLoss}
          onTouchStart={preventFocusLoss}
          onClick={handleToggle}
        >
          {visible ? (
            <EyeOff size={20} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={20} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="auth-loading-card">
        <LoaderCircle className="auth-loading-spinner" size={34} strokeWidth={2.25} aria-hidden="true" />
        <span>Resetting password...</span>
      </div>
    </div>
  );
}

export default function CreateNewPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="create-password-page">
      <main className="create-password-main">
        <section className="create-password-hero" aria-label="ChopNow food preview">
          <img
            className="create-password-hero-image"
            src={HERO_IMAGE_URL}
            alt="A high-end close-up of Nigerian food with grilled chicken and plantains."
          />
          <div className="create-password-hero-overlay" />
          <button
            className="create-password-back-button"
            type="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="create-password-card" aria-labelledby="create-password-heading">
          <div className="create-password-heading-block">
            <h1 id="create-password-heading">Create a new password</h1>
            <p>
              Your identity has been verified. Create a new password to secure your ChopNow account.
            </p>
          </div>

          <form
            className="create-password-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (isLoading) return;
              setIsLoading(true);
              window.setTimeout(() => {
                window.location.hash = "#password-reset-successful";
              }, 500);
            }}
          >
            <div className="create-password-group">
              <PasswordField
                id="new_password"
                label="New Password"
                placeholder="Enter your new password"
                visible={showNewPassword}
                onToggle={() => setShowNewPassword((current) => !current)}
              />

              <div className="password-requirements-card">
                <div className="password-strength-block">
                  <div className="password-strength-header">
                    <span>Password Strength</span>
                    <span className="password-strength-value">Medium</span>
                  </div>
                  <div className="password-strength-bars" aria-label="Password strength: medium">
                    <span className="strength-bar strength-bar-filled" />
                    <span className="strength-bar strength-bar-filled" />
                    <span className="strength-bar" />
                    <span className="strength-bar" />
                  </div>
                </div>

                <ul className="password-requirements-list">
                  <li className="requirement requirement-met">
                    <CheckCircle size={16} strokeWidth={2} aria-hidden="true" />
                    <span>At least 8 characters</span>
                  </li>
                  <li className="requirement requirement-met">
                    <CheckCircle size={16} strokeWidth={2} aria-hidden="true" />
                    <span>At least one uppercase letter</span>
                  </li>
                  <li className="requirement">
                    <Circle size={16} strokeWidth={2} aria-hidden="true" />
                    <span>At least one lowercase letter</span>
                  </li>
                  <li className="requirement">
                    <Circle size={16} strokeWidth={2} aria-hidden="true" />
                    <span>At least one number</span>
                  </li>
                  <li className="requirement requirement-met">
                    <CheckCircle size={16} strokeWidth={2} aria-hidden="true" />
                    <span>At least one special character</span>
                  </li>
                </ul>
              </div>

              <PasswordField
                id="confirm_password"
                label="Confirm New Password"
                placeholder="Re-enter your new password"
                visible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((current) => !current)}
              />
            </div>

            <div className="create-password-spacer" />

            <button className="reset-password-button" type="submit" disabled={isLoading}>
              Reset Password
            </button>
          </form>
        </section>
      </main>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
