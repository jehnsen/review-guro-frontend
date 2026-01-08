"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemePreference = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  toggleTheme: () => void;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
}

function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem("themePreference") as ThemePreference | null;
    const preference = savedPreference || "system";
    setThemePreference(preference);

    let initialTheme: Theme;
    if (preference === "system") {
      initialTheme = getSystemTheme();
    } else {
      initialTheme = preference;
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    // Listen for system theme changes when preference is "system"
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const currentPref = localStorage.getItem("themePreference") as ThemePreference | null;
      if (currentPref === "system" || !currentPref) {
        const newTheme = e.matches ? "dark" : "light";
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (newPreference: ThemePreference) => {
    setThemePreference(newPreference);
    localStorage.setItem("themePreference", newPreference);

    let actualTheme: Theme;
    if (newPreference === "system") {
      actualTheme = getSystemTheme();
    } else {
      actualTheme = newPreference;
    }

    setThemeState(actualTheme);
    applyTheme(actualTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, themePreference, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Return a default value during SSR/prerendering instead of throwing
  if (context === undefined) {
    return {
      theme: "light" as Theme,
      themePreference: "system" as ThemePreference,
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
}
