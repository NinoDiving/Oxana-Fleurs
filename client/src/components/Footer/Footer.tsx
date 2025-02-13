import { FacebookIcon } from "../../assets/iconeSVG/FacebookIcon";
import { InstaIcon } from "../../assets/iconeSVG/InstaIcone";

import "./Footer.css";
export default function Footer() {
  return (
    <footer className="main-footer">
      <h3>Retrouvez nous sur nos réseaux</h3>
      <article className="social-link">
        <a href="https://www.facebook.com/profile.php?id=61571870310692">
          <FacebookIcon />
        </a>
        <a href="https://www.instagram.com/oxanafleurs/">
          <InstaIcon />
        </a>
      </article>
      <a href="#top">Retour en haut de page</a>
    </footer>
  );
}
