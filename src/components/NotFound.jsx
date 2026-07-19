import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>Looks like you've wandered off the grid!</p>
      <Link to="/" style={{ color: '#61dafb', textDecoration: 'underline' }}>Return to Safety (Home)</Link>
    </div>
  );
}