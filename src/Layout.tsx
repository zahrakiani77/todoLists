import type React from "react"
import { useTheme } from "./stores/ThemeProvider";

type layoutProp={
    children:React.ReactNode
}
const Layout = ({children}:layoutProp) => {
     const { darkMode } = useTheme();
     console.log(darkMode)
  return (
    <div className="bg-background w-screen">
      <img
        src={`../public/${darkMode ? `bg-desktop-dark.jpg` : `bg-desktop-light.jpg`}`}
        className="absolute top-0 w-full"
      ></img>
      <div className="">{children}</div>
    </div>
  );
}

export default Layout