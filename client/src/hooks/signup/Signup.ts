import type React from "react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormData } from "../../types/signup/FormData";
import type { passwordCheck } from "../../types/signup/PasswordCheck";

export default function useSignup() {
  const [formData, setFormData] = useState<FormData>({
    lastname: "",
    firstname: "",
    email: "",
  });
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [errors, setErrors] = useState<passwordCheck | undefined>(undefined);
  const navigate = useNavigate();
  const validatePassword = useCallback((password: string) => {
    const newErrors: passwordCheck = {};

    if (password.length < 12) {
      newErrors.length =
        "Votre mot de passe doit contenir au moins 12 caractères";
    }
    if (!/\d/.test(password)) {
      newErrors.number = "Votre mot de passe doit contenir au moins un chiffre";
    }
    if (password === password.toLowerCase()) {
      newErrors.maj = "Votre mot de passe doit contenir au moins une majuscule";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.specialChar =
        "Votre mot de passe doit contenir au moins un caractère spécial";
    }

    return newErrors;
  }, []);

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setErrors(validatePassword(newPassword));
  };

  const handleConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setConfirmedPassword(confirmPassword);
    setIsSamePassword(confirmPassword === password);
  };

  const handleSubmitUserData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      await response.json();
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
    navigate("/login");
  };

  return {
    handleSubmitUserData,
    handleChangeFormData,
    handleCheckPassword,
    handleConfirmedPassword,
    formData,
    errors,
    password,
    confirmedPassword,
    isSamePassword,
  };
}
