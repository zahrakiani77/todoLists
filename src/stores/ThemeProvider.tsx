import React, { createContext, useContext, useEffect, useMemo, useState} from "react"

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void; 
}

const themeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleTheme: () => {},
});

type themeProp = {
  children: React.ReactNode;
};
export const ThemeProvider = ({ children }: themeProp) => {
  const [darkMode, setDarkMose] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMose(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMose((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode]);
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};

export const useTheme=()=> useContext(themeContext)