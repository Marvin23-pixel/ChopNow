import { useRef, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";
import "..//styles/signup.css";

const BACKGROUND_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1WrKLC-1a50L_mg--8GISNOIoDl8_y7Cla7w9VqxMSyoa2x_qNO-_thdNp5qPZ3jDUIe8rwvVYx7A5ZtWIZ-Y2kpRDnC17GdXQQzWO_520SBpg3sKXXh2CFFu5j0LDCLiK5xTH3p_E06Vg4g6w3zPqpCi5q68_wHa4YfhVHvK-XI3udLjLzfVOnxz2RvUitkyFO_7UIuAr-TQqYKAhR8dVjIhlLs5qjrYVfMxqCuV4qb2tAuSRoc0CEKMw";

const LOGO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1VMPL7feUZ8GMPQriRn1q97XKbu5MNWuPp8uVgfEuCF8G8aYCIT_ww-faaAS-qjASX6vyQhxl2xmJ9HX6rYu0ZczGIdieZuXsYnBrrdjjzCPGk2Usl9PbmTmTGvPdkBbAmHIlcaYqSqIBT_pu1QRsC5SjF4pkUjcHWGhIMBHx05QExTlUkzxcfQUE-aSBgUsfN_WXw9Mcv3g8dDheA7kep82ibfbU_82QH2CypajT6iVuoAle-EbBkLDQg";

const GOOGLE_MARK = (
  <svg className="signup-social-mark" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const APPLE_MARK = (
  <svg className="signup-social-mark signup-apple-mark" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.822 3.067 1.558-.057 2.15-.99 4.026-.99 1.861 0 2.404.99 4.026.963 1.666-.029 2.686-1.503 3.684-2.96 1.158-1.685 1.636-3.323 1.657-3.411-.035-.015-3.196-1.22-3.218-4.852-.016-3.036 2.483-4.502 2.597-4.577-1.423-2.083-3.628-2.361-4.417-2.407-2.029-.168-4.041 1.103-4.775 1.103Zm-1.848-5.326c.866-1.048 2.053-1.649 3.149-1.57.143 1.196-.403 2.433-1.22 3.42-1.127 1.348-2.443 1.956-3.493 1.761-.182-1.144.536-2.434 1.564-3.61Z" />
  </svg>
);

function PasswordRequirement({ met, children }) {
  const Icon = met ? CheckCircle2 : Circle;
  return (
    <span className={met ? "signup-requirement met" : "signup-requirement"}>
      <Icon size={13} strokeWidth={2} aria-hidden="true" />
      {children}
    </span>
  );
}

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((current) => !current);
      requestAnimationFrame(() => passwordInputRef.current?.focus());
    } else {
      setShowConfirmPassword((current) => !current);
      requestAnimationFrame(() => confirmPasswordInputRef.current?.focus());
    }
  };

  const passwordRequirements = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
  };

  const passwordsMatch =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;
  const showPasswordMismatch =
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  const isFormValid =
    Object.values(form).every(Boolean) && termsAccepted && passwordsMatch;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#home";
    }, 700);
  };

  return (
    <div className="signup-page">
      <div className="signup-background" aria-hidden="true">
        <img src={BACKGROUND_IMAGE_URL} alt="" />
        <div className="signup-background-overlay" />
      </div>

      <main className="signup-main">
        <section className="signup-card" aria-labelledby="signup-title">
          <header className="signup-header">
            <img className="signup-logo" src={LOGO_IMAGE_URL} alt="ChopNow logo" />
            <h1 id="signup-title">Create your ChopNow account</h1>
            <p>Sign up to discover delicious meals and order your favorites with ease.</p>
          </header>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-field">
              <label htmlFor="fullName">Full Name</label>
              <div className="signup-input-wrap">
                <UserRound className="signup-input-icon" size={20} aria-hidden="true" />
                <input id="fullName" name="fullName" type="text" placeholder="Enter your full name" value={form.fullName} onChange={updateField} required />
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="email">Email Address</label>
              <div className="signup-input-wrap">
                <Mail className="signup-input-icon" size={20} aria-hidden="true" />
                <input id="email" name="email" type="email" placeholder="Enter your email address" value={form.email} onChange={updateField} required />
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="phone">Phone Number</label>
              <div className="signup-phone-wrap">
                <span className="signup-country-code">+234</span>
                <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" value={form.phone} onChange={updateField} required />
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="password">Password</label>
              <div className="signup-input-wrap">
                <Lock className="signup-input-icon" size={20} aria-hidden="true" />
                <input ref={passwordInputRef} id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={form.password} onChange={updateField} required />
                <button className="signup-visibility-button" type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => togglePasswordVisibility("password")} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
              <div className="signup-requirements">
                <PasswordRequirement met={passwordRequirements.length}>8+ chars</PasswordRequirement>
                <PasswordRequirement met={passwordRequirements.uppercase}>Uppercase</PasswordRequirement>
                <PasswordRequirement met={passwordRequirements.lowercase}>Lowercase</PasswordRequirement>
                <PasswordRequirement met={passwordRequirements.number}>Number</PasswordRequirement>
              </div>
            </div>

            <div className="signup-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="signup-input-wrap">
                <Lock className="signup-input-icon" size={20} aria-hidden="true" />
                <input
                  ref={confirmPasswordInputRef}
                  className={showPasswordMismatch ? "signup-input-error" : ""}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={updateField}
                  required
                  aria-invalid={showPasswordMismatch}
                  aria-describedby={showPasswordMismatch ? "password-mismatch-error" : undefined}
                />
                <button className="signup-visibility-button" type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => togglePasswordVisibility("confirmPassword")} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
                  {showConfirmPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
              {showPasswordMismatch && (
                <p className="signup-password-error" id="password-mismatch-error" role="alert">
                  Passwords do not match.
                </p>
              )}
            </div>

            <div className="signup-terms-row">
              <input id="terms" type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms &amp; Conditions</a> and <a href="#privacy">Privacy Policy</a>.
              </label>
            </div>

                <button className="signup-submit-button" type="submit" disabled={!isFormValid || isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-divider" aria-hidden="true"><span /><b>or</b><span /></div>

          <button className="signup-social-button" type="button">{GOOGLE_MARK}<span>Continue with Google</span></button>
          <button className="signup-social-button" type="button">{APPLE_MARK}<span>Continue with Apple</span></button>

          <p className="signup-login-footer">Already have an account? <a href="#login">Log In</a></p>
        </section>
      </main>

      {isLoading && (
        <div className="signup-loading-overlay" role="status" aria-live="polite" aria-label="Creating account">
          <div className="signup-loading-card">
            <LoaderCircle className="signup-loading-spinner" size={36} strokeWidth={2.2} aria-hidden="true" />
            <span>Creating account...</span>
          </div>
        </div>
      )}
    </div>
  );
}
