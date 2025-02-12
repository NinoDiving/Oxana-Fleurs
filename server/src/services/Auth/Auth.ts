import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Erreur lors du hachage du mot de passe.");
  }
};

const matchPassword = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    throw new Error("Erreur lors de la comparaison des mots de passe.");
  }
};
export default { hashPassword, matchPassword };
