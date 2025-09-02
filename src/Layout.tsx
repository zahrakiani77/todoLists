import type React from "react"

type layoutProp={
    children:React.ReactNode
}
const Layout = ({children}:layoutProp) => {
  return (
    <div className="bg-background w-screen">
      <img
        src="../public/bg-desktop-light.jpg"
        className="absolute top-0 w-full"
      ></img>
        <div className="">{children}</div>
    </div>
  );
}

export default Layout