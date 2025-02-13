import { useState } from "react";
import { StyledInput } from "../../../style/StyledInput";
import type { PasswordValidation } from "../../../types/signup/PasswordCheck";

export default function InputPassword({
  handleCheckPassword,
  handleConfirmedPassword,
  errors,
  password,
  confirmedPassword,
  isSamePassword,
}: PasswordValidation) {
  return (
    <fieldset>
      <label htmlFor="password">Votre mot de passe</label>
      <StyledInput
        name="password"
        id="password"
        value={password}
        onChange={handleCheckPassword}
        type="password"
        placeholder="Votre mot de passe"
      />
      {Object.keys(errors).length > 0 && (
        <ul className="errors">
          {errors.length && <li className="error">{errors.length}</li>}
          {errors.maj && <li className="error">{errors.maj}</li>}
          {errors.number && <li className="error">{errors.number}</li>}
          {errors.specialChar && (
            <li className="error">{errors.specialChar}</li>
          )}
        </ul>
      )}
      <label htmlFor="confirmed-password">Confirmez le mot de passe</label>
      <StyledInput
        name="confirmed-password"
        id="confirmed-password"
        value={confirmedPassword}
        onChange={handleConfirmedPassword}
        type="password"
        placeholder="Confirmez votre mot de passe"
      />
      {!isSamePassword ? <p>Mot de passe différent</p> : ""}
    </fieldset>
  );
}
