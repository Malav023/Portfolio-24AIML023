export default function Footer({ email, year }) {
  return (
    <footer style={{ padding: '20px', background: '#282c34', color: 'white', textAlign: 'center', marginTop: 'auto' }}>
      <p>© {year} Student Portfolio. All rights reserved.</p>
    </footer>
  );
}