import { Moon, Sun } from "lucide-react"
import { useTheme } from "../stores/ThemeProvider";

const Container = () => {
      const { darkMode, toggleTheme} = useTheme();
  return (
    <div className="flex w-full justify-center">
      <div className="absolute top-1/5 z-50 flex w-10/12 flex-col gap-10 md:w-2/3 lg:w-1/2">
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
        <section>
          <label className="input md:input-xl w-full">
            <input
              type="radio"
              name="radio-4"
              className="radio radio-primary"
            />
            <input
              type="text"
              placeholder="create a new todo..."
              className="input input-primary md:input-lg"
            />
          </label>
        </section>
      </div>
    </div>
  );
}

export default Container