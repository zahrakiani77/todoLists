import type React from "react"
import { useTheme } from "./stores/ThemeProvider";
import { useEffect, useState } from "react";

type layoutProp={
    children:React.ReactNode
}
const Layout = ({children}:layoutProp) => {
     const { darkMode } = useTheme();
       const [isMobile, setIsMobile] = useState(false);

       useEffect(() => {
         const mediaQuery = window.matchMedia("(max-width: 768px)");

         const handleChange = () => setIsMobile(mediaQuery.matches);
         handleChange(); 

         mediaQuery.addEventListener("change", handleChange);
         return () => mediaQuery.removeEventListener("change", handleChange);
       }, []);

       const bgImage = isMobile
         ? darkMode
           ? "/bg-mobile-dark.jpg"
           : "/bg-mobile-light.jpg"
         : darkMode
           ? "/bg-desktop-dark.jpg"
           : "/bg-desktop-light.jpg";

  return (
    <div className="bg-background w-screen ">
      <img
        src={`../public${bgImage}`}
        className="absolute top-0 w-full"
      ></img>
      <div className="">{children}</div>
    </div>
  );
}

export default Layout