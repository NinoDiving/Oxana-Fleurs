import { Link } from "react-router-dom";

export default function BackOfficeNav() {
  return (
    <nav className="admin-nav">
      <h1>Dashboard Oxana Fleurs</h1>
      <ul>
        <li>
          <Link to="/admin">Accueil</Link>
        </li>
        <li>
          <Link to="/admin-fleurs">Fleurs</Link>
        </li>
        <li>
          <Link to="/admin-plantes">Plantes</Link>
        </li>
        <li>
          <Link to="/admin-top-produits">Top-produits</Link>
        </li>
      </ul>
    </nav>
  );
}
