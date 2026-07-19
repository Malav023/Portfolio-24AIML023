export default function Header() {
  return (
    <header style={{ padding: '20px', background: '#282c34', color: 'white', textAlign: 'center' }}>
      <h1>Student Portfolio</h1>
      <nav>
        <a href="#about" style={{ color: 'white', margin: '0 10px' }}>About</a> | 
        <a href="#skills" style={{ color: 'white', margin: '0 10px' }}>Skills</a>
      </nav>
    </header>
  );
}