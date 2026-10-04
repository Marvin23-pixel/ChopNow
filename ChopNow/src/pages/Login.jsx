import { useRef, useState } from "react";
import { Eye, EyeOff, Lock, LoaderCircle, Mail } from "lucide-react";
import "..//styles/login.css";

const GOOGLE_MARK = (
  <svg className="social-mark" fill="none" height="20" viewBox="0 0 24 24" width="20" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

function LoadingOverlay({ message }) {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="auth-loading-card">
        <LoaderCircle className="auth-loading-spinner" size={34} strokeWidth={2.25} aria-hidden="true" />
        <span>{message}</span>
      </div>
    </div>
  );
}

const APPLE_MARK = (
  <svg className="social-mark social-mark-apple" fill="currentColor" height="20" viewBox="0 0 24 24" width="20" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.822 3.067 1.558-.057 2.15-.99 4.026-.99 1.861 0 2.404.99 4.026.963 1.666-.029 2.686-1.503 3.684-2.96 1.158-1.685 1.636-3.323 1.657-3.411-.035-.015-3.196-1.22-3.218-4.852-.016-3.036 2.483-4.502 2.597-4.577-1.423-2.083-3.628-2.361-4.417-2.407-2.029-.168-4.041 1.103-4.775 1.103Zm-1.848-5.326c.866-1.048 2.053-1.649 3.149-1.57.143 1.196-.403 2.433-1.22 3.42-1.127 1.348-2.443 1.956-3.493 1.761-.182-1.144.536-2.434 1.564-3.61Z" />
  </svg>
);

export default function ChopNowLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Signing in...");
  const passwordInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;
    setLoadingMessage("Signing in...");
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#home";
    }, 700);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    if (isLoading) return;
    setLoadingMessage("Opening password recovery...");
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#forgot-password";
    }, 500);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    if (isLoading) return;
    setLoadingMessage("Opening sign up...");
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#sign-up";
    }, 500);
  };

  const handleTogglePassword = () => {
    setShowPassword((current) => !current);
    requestAnimationFrame(() => passwordInputRef.current?.focus());
  };

  return (
    <div className="chopnow-page">
      <main className="chopnow-main">
        <section className="hero-section" aria-label="Fresh food delivery">
          <div className="hero-image" role="img" aria-label="Freshly prepared food" />
          <div className="hero-gradient" />
        </section>

        <section className="auth-card" aria-labelledby="welcome-heading">
          <div className="auth-intro">
            <h1 id="welcome-heading">Welcome back</h1>
            <p>Sign in to continue ordering your favorites</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-shell">
                <Mail className="input-icon" size={22} strokeWidth={2} aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. name@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="input-shell">
                <Lock className="input-icon" size={22} strokeWidth={2} aria-hidden="true" />
                  <input
                    ref={passwordInputRef}
                    id="password"
                    name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
                <button
                  className="visibility-button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleTogglePassword}
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Eye size={20} strokeWidth={2} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </a>
            </div>

            <button className="primary-button" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Log In"}
            </button>

            <div className="divider" aria-hidden="true">
              <span />
              <strong>or</strong>
              <span />
            </div>

            <div className="social-buttons">
              <button className="social-button" type="button">
                {GOOGLE_MARK}
                <span>Continue with Google</span>
              </button>
              <button className="social-button" type="button">
                {APPLE_MARK}
                <span>Continue with Apple</span>
              </button>
            </div>
          </form>

          <footer className="signup-footer">
            <p>
              Don&apos;t have an account?
              <a href="#sign-up" onClick={handleSignUp}>Sign up</a>
            </p>
          </footer>
        </section>
      </main>
      {isLoading && <LoadingOverlay message={loadingMessage} />}
    </div>
  );
}

