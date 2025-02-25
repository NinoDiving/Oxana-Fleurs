import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  isAdmin: boolean;
  lastname: string;
  firstname: string;
  email: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);

        setUser({
          id: decodedToken.id,
          isAdmin: decodedToken.isAdmin,
          lastname: decodedToken.lastname || "",
          firstname: decodedToken.firstname || "",
          email: decodedToken.email || "",
        });
      } catch (error) {
        console.error("Erreur de décodage du token :", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  return { user, loading };
};
