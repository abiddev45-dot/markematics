"use client"
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext({ isLoading: true, finish: () => {} });

export const useLoading = () => useContext(Ctx);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show the loader on first load / hard refresh.
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("mkm-loaded") === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  const finish = () => {
    if (typeof window !== "undefined")
      window.sessionStorage.setItem("mkm-loaded", "1");
    setIsLoading(false);
  };

  return <Ctx.Provider value={{ isLoading, finish }}>{children}</Ctx.Provider>;
}
