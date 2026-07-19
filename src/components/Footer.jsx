export default function Footer({ email, year }) {
  return (
    <footer style={{ padding: '20px', background: '#282c34', color: 'white', textAlign: 'center', marginTop: '40px' }}>
      <p>© {year} Student Portfolio. All rights reserved.</p>
      </footer>
  );
}