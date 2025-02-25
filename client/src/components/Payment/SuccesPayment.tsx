import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SuccesPaymentPage.css";

const PaymentSuccessPage = () => {
  const [_status, setStatus] = useState<string>("loading");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetch(`${import.meta.env.VITE_URL}stripe/checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch(() => {
          setStatus("error");
        });
    }
  }, [sessionId]);

  return (
    <main className="success_payment">
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1>Commande validée</h1>
        <p>Nous avons bien reçu votre commande</p>
        <p>Nous revenons vers vous quand la commande sera prête !</p>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;
