import { Moon, Sun } from "lucide-react";
import { useTheme } from "../stores/ThemeProvider";

const Header = () => {
    const { darkMode, toggleTheme } = useTheme();
    return (
      <header className="flex w-full flex-row content-between justify-between">
        <h1 className="text-3xl text-white text-shadow-lg/30 md:text-3xl lg:text-5xl">
          ToDo
        </h1>
        
        <div className="my-2 cursor-pointer" onClick={toggleTheme}>
          {darkMode ? (
            <Sun className="text-white md:size-8" />
          ) : (
            <Moon className="text-white md:size-8" />
          )}
        </div>
      </header>
    );
}

export default Header