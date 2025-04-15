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
          <Link to="/admin-flowers">Fleurs</Link>
        </li>
        <li>
          <Link to="/admin-plants">Plantes</Link>
        </li>
        <li>
          <Link to="/admin-top-products">Top-produits</Link>
        </li>
        <li>
          <Link to="/admin-orders">Commandes</Link>
        </li>
      </ul>
    </nav>
  );
}
