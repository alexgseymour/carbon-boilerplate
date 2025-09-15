"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GlobalTheme } from "@carbon/react";

export type CarbonTheme = "white" | "g10" | "g90" | "g100";

interface ThemeContextValue {
  theme: CarbonTheme;
  setTheme: (theme: CarbonTheme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "carbon-theme-preference";

// Theme metadata
const themeConfig = {
  white: { isDark: false, label: "White", next: "g10" },
  g10: { isDark: false, label: "Gray 10", next: "g90" },
  g90: { isDark: true, label: "Gray 90", next: "g100" },
  g100: { isDark: true, label: "Gray 100", next: "white" },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default to system preference
  const [theme, setThemeState] = useState<CarbonTheme>(() => {
    if (typeof window === "undefined") return "white";

    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && stored in themeConfig) {
      return stored as CarbonTheme;
    }

    // Check system preference
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "g90";
    }

    return "white";
  });

  const isDark = themeConfig[theme].isDark;

  const setTheme = (newTheme: CarbonTheme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = themeConfig[theme].next as CarbonTheme;
    setTheme(nextTheme);
  };

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.dataset.carbonTheme = theme;

    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const colors = {
        white: "#ffffff",
        g10: "#f4f4f4",
        g90: "#262626",
        g100: "#161616",
      };
      metaThemeColor.setAttribute("content", colors[theme]);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setThemeState(e.matches ? "g90" : "white");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleTheme }}>
      <GlobalTheme theme={theme}>{children}</GlobalTheme>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
