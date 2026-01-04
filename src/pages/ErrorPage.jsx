// components/ErrorPage.jsx
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import errorAnimation from "../lotties/404 Animation.json";

const ErrorPage = () => {

  // Dark/Light theme from localStorage
const [theme, setTheme] = useState(
  document.documentElement.getAttribute("data-theme") || "light"
);
useEffect(() => {
  const observer = new MutationObserver(() => {
    setTheme(document.documentElement.getAttribute("data-theme"));
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-base-100 text-base-content">
      <title>Void Horizon | 404 Access Denied</title>
      {/* Lottie Animation */}
      <div className="w-96 h-96 relative">
        <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full"></div>
        <Lottie animationData={errorAnimation} loop={true} className="relative z-10" />
      </div>

      {/* <h1 className="text-6xl font-bold mb-4">404</h1> */}
      <p className="text-xl text-secondary mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>

      <Link to="/" className="btn btn-primary btn-lg mb-4">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
