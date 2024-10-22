"use client";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Button } from "./fields";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme} variant="secondary">
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
