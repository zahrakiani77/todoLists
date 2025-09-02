import { Moon, Sun } from "lucide-react"
import { useTheme } from "../stores/ThemeProvider";

const Container = () => {
      const { darkMode, toggleTheme} = useTheme();
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="absolute top-1/5 z-50 flex w-10/12 border md:w-1/2">
        <header className="flex w-full flex-row content-between justify-between">
          <h1 className="text-white text-shadow-lg/30">To Do</h1>
          <div className="m-2" onClick={toggleTheme}>
            {darkMode ? (
            <Sun className="text-white" size={32} />
            ) : (
              <Moon className="text-white" size={32} />

            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default Container