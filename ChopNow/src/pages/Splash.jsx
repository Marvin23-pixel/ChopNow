import { useEffect } from "react";
import "../styles/splash.css";
import logo from "../assets/Logo.png";

function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3700);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <main
      className="splash-screen"
      aria-label="ChopNow loading screen"
    >
      <div className="splash-content">
        <img
          className="splash-logo"
          src={logo}
          alt="ChopNow logo"
        />

        <p className="splash-tagline">
          Good food, made easy.
        </p>

        <div
          className="splash-loader"
          aria-label="Loading"
          role="status"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </main>
  );
}

export default Splash;