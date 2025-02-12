import ModalForm from "../modal/ModalForm";

export default function BeMember() {
  return (
    <article className="be-member">
      <section className="be-member-content">
        <h2>Gagnez du temps, achetez en toute simplicité !</h2>
        <p>
          Créez votre compte en quelques clics et profitez d’une expérience
          d’achat fluide :
        </p>
      </section>
      <ModalForm />
    </article>
  );
}
