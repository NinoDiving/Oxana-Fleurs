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
    fetch(`${import.meta.env.VITE_URL}user`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
};
