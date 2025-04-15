import "./cgu.css"; // Crée ce fichier pour la mise en page si besoin

export default function CGUPage() {
  return (
    <main className="cgu-container">
      <h1 className="cgu-title">Conditions Générales d’Utilisation</h1>

      <section className="cgu-section">
        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet
          de définir les modalités d’accès et d’utilisation du site{" "}
          <strong>oxanafleurs.fr</strong>. Tout utilisateur reconnaît en avoir
          pris connaissance et les accepter sans réserve.
        </p>
      </section>

      <section className="cgu-section">
        <h2>2. Accès au site</h2>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d’un
          accès à Internet. Tous les frais liés à l’accès au service (matériel,
          logiciels, connexion internet, etc.) sont à la charge de
          l’utilisateur.
        </p>
      </section>

      <section className="cgu-section">
        <h2>3. Propriété intellectuelle</h2>
        <p>
          Tous les éléments du site (textes, images, logos, marque, structure,
          code, etc.) sont la propriété exclusive d’Oxana Fleurs. Toute
          reproduction ou diffusion sans autorisation écrite est strictement
          interdite.
        </p>
      </section>

      <section className="cgu-section">
        <h2>4. Données personnelles</h2>
        <p>
          En utilisant le site, l’utilisateur accepte que des données
          personnelles puissent être collectées pour le bon fonctionnement des
          services. Oxana Fleurs s’engage à respecter la réglementation en
          vigueur (RGPD) et à ne jamais céder les données à des tiers sans
          consentement.
        </p>
      </section>

      <section className="cgu-section">
        <h2>5. Cookies</h2>
        <p>
          Le site peut utiliser des cookies pour améliorer l’expérience
          utilisateur. L’utilisateur peut à tout moment configurer son
          navigateur pour refuser les cookies.
        </p>
      </section>

      <section className="cgu-section">
        <h2>6. Responsabilités</h2>
        <p>
          Oxana Fleurs ne saurait être tenue responsable en cas de :
          <ul>
            <li>problème technique empêchant l’accès au site,</li>
            <li>présence de virus sur le site,</li>
            <li>erreur ou omission dans les contenus diffusés,</li>
            <li>utilisation frauduleuse du site par un tiers.</li>
          </ul>
        </p>
      </section>

      <section className="cgu-section">
        <h2>7. Liens externes</h2>
        <p>
          Le site peut contenir des liens vers d’autres sites. Oxana Fleurs
          n’exerce aucun contrôle sur ces sites et décline toute responsabilité
          quant à leur contenu ou fonctionnement.
        </p>
      </section>

      <section className="cgu-section">
        <h2>8. Modification des CGU</h2>
        <p>
          Oxana Fleurs se réserve le droit de modifier les présentes CGU à tout
          moment. L’utilisateur est invité à les consulter régulièrement.
        </p>
      </section>

      <section className="cgu-section">
        <h2>9. Droit applicable</h2>
        <p>
          Les présentes CGU sont régies par le droit français. En cas de litige,
          les tribunaux compétents seront ceux du ressort du siège d’Oxana
          Fleurs.
        </p>
      </section>

      <section className="cgu-section">
        <h2>10. Contact</h2>
        <p>
          Pour toute question relative à l’utilisation du site, vous pouvez nous
          contacter à l’adresse :
          <br />
          <strong>[adresse e-mail]</strong>
        </p>
      </section>
    </main>
  );
}
