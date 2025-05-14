export default function ThemeToggle({ darkMode, setDarkMode }) {
    return (
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Claro' : '🌙 Escuro'}
      </button>
    );
  }
  