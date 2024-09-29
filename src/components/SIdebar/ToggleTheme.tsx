"use client";
import { useEffect, useState } from "react";
import { IoMdSunny, IoIosMoon } from "react-icons/io";

const themes = {
  light: "light",
  dim: "dim",
};

const ToggleTheme = () => {
  const [theme, setTheme] = useState(themes.dim);

  const handleToggle = () => {
    const newTheme = theme === themes.light ? themes.dim : themes.light;

    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    handleToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={handleToggle} className="btn btn-outline btn-sm">
      {theme === themes.light ? (
        <IoIosMoon className="w-4 h-4" />
      ) : (
        <IoMdSunny className="w-4 h-4" />
      )}
    </button>
  );
};

export default ToggleTheme;
