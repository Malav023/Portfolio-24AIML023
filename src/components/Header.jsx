import { Link } from 'react-router-dom';

export default function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header style={{ padding: '20px', background: '#282c34', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>24AIML023 Portfolio</h1>
      <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        
        <button 
          onClick={onToggleTheme} 
          style={{ padding: '5px 10px', cursor: 'pointer', background: '#61dafb', border: 'none', borderRadius: '4px' }}
        >
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </nav>
    </header>
  );
}