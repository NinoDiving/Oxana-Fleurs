import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth/Auth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAdmin, setIsAdmin] = useState<number | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (Number(user?.isAdmin) === 1) {
        setIsAdmin(1);
      } else {
        setIsAdmin(0);
      }
    }
  }, [user, loading]);

  if (loading || isAdmin === null) {
    return <div>Chargement...</div>;
  }

  return isAdmin === 1 ? children : <Navigate to="/login" />;
};
