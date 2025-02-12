import useContact from "../../hooks/Form/UseContact";
import { StyledButton } from "../../style/StyledButton";
import { StyledInput } from "../../style/StyledInput";

export default function FormContact() {
  const { handleChange, handleSubmit, status, formData } = useContact();
  return (
    <article className="contact">
      <h1>Une commande particulière ?</h1>
      <h2>Contactez-nous !</h2>
      <form onSubmit={handleSubmit} className="form-contact">
        <label htmlFor="name">Votre nom</label>
        <StyledInput
          type="text"
          name="name"
          id="name"
          placeholder="Entrez votre nom"
          onChange={handleChange}
          value={formData.name}
        />
        <label htmlFor="email-contact">Votre adresse-email</label>
        <StyledInput
          type="email"
          name="email-contact"
          id="email-contact"
          value={formData.email}
          placeholder="Entrez votre adresse-email"
          onChange={handleChange}
        />
        <label htmlFor="message">Votre message</label>
        <StyledInput
          type="text"
          name="message"
          id="message"
          value={formData.message}
          placeholder="Entrez votre message"
          onChange={handleChange}
        />
        {status && <p>Merci pour votre message à très vite !</p>}
        <StyledButton type="submit">Envoyer</StyledButton>
      </form>
    </article>
  );
}
