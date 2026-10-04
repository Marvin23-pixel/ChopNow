import { useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import "..//styles/verify.css";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1X0EE_MtSWz-s5gPDANZgqiEw9OSRUFLP76nE4uM9yZHSJouIwokL4mrXYsi8J1pjfYGYTSciflxWcTb7ObVZZKuD-_h3cipMNrQza7J-1-jJ6YLI50tCheUAdnv1jM3HFhMY8iHV5SR7lcSt1iQKYSohSOQMeEhtaUuaKk4ChKrb31T7TVAcdmE-MIU67ovRdSL9hH7VirjkHiCGjBHdXPytrZVYQDpyh258883zTX2DVKK6YewSpD07nH";

const INITIAL_CODE = ["", "", "", ""];

function LoadingOverlay() {
  return (
    <div className="auth-loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="auth-loading-card">
        <LoaderCircle className="auth-loading-spinner" size={34} strokeWidth={2.25} aria-hidden="true" />
        <span>Verifying code...</span>
      </div>
    </div>
  );
}

export default function Verify() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;

    const countdown = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [secondsLeft]);

  const focusInput = (index) => {
    inputRefs.current[index]?.focus();
  };

  const handleCodeChange = (index, value) => {
    const digits = value.replace(/\D/g, "").slice(-1);
    const nextCode = [...code];
    nextCode[index] = digits;
    setCode(nextCode);

    if (digits && index < nextCode.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      const nextCode = [...code];
      nextCode[index - 1] = "";
      setCode(nextCode);
      focusInput(index - 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4)
      .split("");

    if (!pastedCode.length) return;

    const nextCode = INITIAL_CODE.map((_, index) => pastedCode[index] || "");
    setCode(nextCode);
    focusInput(Math.min(pastedCode.length, nextCode.length - 1));
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(45);
    setCode(INITIAL_CODE);
    focusInput(0);
  };

  const handleVerify = (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    window.setTimeout(() => {
      window.location.hash = "#create-password";
    }, 500);
  };

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    <div className="verify-page">
      <main className="verify-main">
        <section className="verify-desktop-hero" aria-label="ChopNow food preview">
          <img
            alt="Nigerian Jollof rice dish"
            className="verify-hero-image"
            src={HERO_IMAGE_URL}
          />
          <div className="verify-desktop-hero-gradient" />
          <button className="verify-back-button" type="button" onClick={() => window.history.back()} aria-label="Go back">
            <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="verify-mobile-hero" aria-label="ChopNow food preview">
          <img
            alt="Nigerian Jollof rice dish"
            className="verify-hero-image"
            src={HERO_IMAGE_URL}
          />
          <div className="verify-mobile-hero-gradient" />
          <button className="verify-back-button" type="button" onClick={() => window.history.back()} aria-label="Go back">
            <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        </section>

        <section className="verify-content" aria-labelledby="verify-heading">
          <div className="verify-heading-block">
            <h1 id="verify-heading">Verify your account</h1>
            <p>
              We&apos;ve sent a 4-digit verification code to your email or phone number.
              <br className="verify-desktop-break" /> Code sent to <strong>m••••••@gmail.com</strong>
            </p>
          </div>

          <form className="verify-form" onSubmit={handleVerify}>
            <div className="otp-grid" id="otp-container">
              {code.map((digit, index) => (
                <input
                  key={`otp-${index}`}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  aria-label={`Digit ${index + 1}`}
                  autoFocus={index === 0}
                  className="otp-input"
                  inputMode="numeric"
                  maxLength={1}
                  pattern="[0-9]*"
                  type="text"
                  value={digit}
                  onChange={(event) => handleCodeChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <div className="verify-actions">
              <button className="verify-code-button" type="submit" disabled={isLoading}>
                Verify Code
              </button>
              <div className="resend-area">
                <p>
                  Didn&apos;t receive the code?{" "}
                  <button
                    className={`resend-button${secondsLeft > 0 ? " resend-button-disabled" : ""}`}
                    id="resend-btn"
                    type="button"
                    disabled={secondsLeft > 0}
                    onClick={handleResend}
                  >
                    {secondsLeft > 0 ? `Resend code (${formattedTime})` : "Resend code"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </section>
      </main>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
