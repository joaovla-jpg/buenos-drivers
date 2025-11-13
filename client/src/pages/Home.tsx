import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Home page - redirects to dashboard
 */
export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
}
