import "./cgv.css"; // Optionnel : à créer pour styliser si besoin

export default function CGVPage() {
  return (
    <main className="cgv-container">
      <h1 className="cgv-title">Conditions Générales de Vente</h1>

      <section className="cgv-section">
        <h2>1. Objet</h2>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les ventes
          effectuées sur le site <strong>oxanafleurs.fr</strong>, appartenant à
          Oxana Fleurs, entreprise individuelle immatriculée au RCS de Bordeaux
          sous le numéro 145236584234, dont le siège est situé au 16 rue Frantz
          listz 33000 Bordeaux.
        </p>
      </section>

      <section className="cgv-section">
        <h2>2. Produits</h2>
        <p>
          Les produits vendus sont des compositions florales, plantes et
          accessoires liés à l’univers floral. Les photographies sont non
          contractuelles. En cas d’indisponibilité, une composition équivalente
          sera proposée.
        </p>
      </section>

      <section className="cgv-section">
        <h2>3. Prix</h2>
        <p>
          Les prix sont indiqués en euros TTC, hors frais de livraison. Le prix
          applicable est celui en vigueur au moment de la commande.
        </p>
      </section>

      <section className="cgv-section">
        <h2>4. Commande</h2>
        <p>
          La commande se fait via le Site. Le Client doit sélectionner les
          produits, fournir les informations de livraison, accepter les CGV,
          puis procéder au paiement.
        </p>
      </section>

      <section className="cgv-section">
        <h2>5. Paiement</h2>
        <p>
          Le paiement est sécurisé via les moyens proposés sur le Site. Les
          données bancaires ne sont jamais conservées par Oxana Fleurs.
        </p>
      </section>

      <section className="cgv-section">
        <h2>6. Livraison</h2>
        <p>
          Livraison possible sur Bordeaux. Le Client doit être présent à la date
          et à l’heure choisies. En cas d’absence, une seconde livraison pourra
          être facturée.
        </p>
      </section>

      <section className="cgv-section">
        <h2>7. Droit de rétractation</h2>
        <p>
          Conformément à l’article L221-28 du Code de la consommation, le droit
          de rétractation ne s’applique pas aux produits périssables comme les
          fleurs.
        </p>
      </section>

      <section className="cgv-section">
        <h2>8. Réclamations et retours</h2>
        <p>
          Toute réclamation doit être adressée dans un délai de 24h après
          réception avec une photo justificative à l’adresse suivante : [adresse
          e-mail].
        </p>
      </section>

      <section className="cgv-section">
        <h2>9. Données personnelles</h2>
        <p>
          Oxana Fleurs s’engage à protéger les données personnelles du Client.
          Conformément au RGPD, le Client peut exercer ses droits à l’adresse :
          oxanafleurs@gmail.com.
        </p>
      </section>

      <section className="cgv-section">
        <h2>10. Responsabilité</h2>
        <p>
          Oxana Fleurs ne saurait être tenue responsable :
          <ul>
            <li>des retards imputables au transporteur,</li>
            <li>de l'impossibilité de livrer due au Client,</li>
            <li>d’une mauvaise conservation des fleurs après livraison.</li>
          </ul>
        </p>
      </section>

      <section className="cgv-section">
        <h2>11. Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige,
          une solution amiable sera recherchée. À défaut, les tribunaux
          compétents seront ceux du siège d’Oxana Fleurs.
        </p>
      </section>

      <section className="cgv-section">
        <h2>12. Contact</h2>
        <p>
          Pour toute question ou réclamation, le Client peut contacter Oxana
          Fleurs :
          <br />- Par téléphone : 06 66 66 66 66 <br />- Par e-mail :
          oxanafleurs@gmail.com <br />- Par courrier : 16 rue Frantz listz 33000
          Bordeaux
        </p>
      </section>
    </main>
  );
}
