import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="theme-toggle-wrapper">
      <button 
        onClick={toggleTheme}
        className="theme-toggle-button"
        aria-label={theme === "1" ? "Switch to dark mode" : "Switch to light mode"}
      >
        <div className="checkbox-field-custom">
          <div className="checkbox-label">
            {theme === "1" ? "Light Mode" : "Dark Mode"}
          </div>
          <div className={`checkbox ${theme === "2" ? "checked" : ""}`}>
            <div className="checkbox-knob"></div>
          </div>
        </div>
      </button>
    </div>
  );
}