import type { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

type CartItem = {
  id: number;
  name: string;
  img_path: string;
  price: number;
  quantity: number;
};

const paymentActions = {
  createCheckoutSession: async (req: Request, res: Response) => {
    try {
      const { cart, email } = req.body;

      if (!cart || cart.length === 0) {
        res.status(400).json({ error: "Le panier est vide" });
        return;
      }

      for (const item of cart) {
        if (!item.price || !item.quantity || item.quantity <= 0) {
          res.status(400).json({ error: `Invalid item in cart: ${item.name}` });
          return;
        }
      }
      const clientUrl = process.env.CLIENT_URL;
      if (!clientUrl) {
        res.status(500).json({ error: "CLIENT_URL is not defined in .env" });
        return;
      }

      const baseUrl = clientUrl.endsWith("/") ? clientUrl : `${clientUrl}/`;

      const lineItems = cart.map((item: CartItem) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [`${baseUrl}${item.img_path}`],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items: lineItems,
        mode: "payment",
        success_url: `${clientUrl}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${clientUrl}/cancelPayment`,
      });

      res.json({ id: session.id, paymentUrl: session.url });
    } catch (error) {
      console.error("Erreur Stripe :", error);
      res.status(500).json({
        error: "Error while creating the payment session",
      });
    }
  },

  verifyPayment: async (req: Request, res: Response) => {
    try {
      const { session_id } = req.body;

      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (!session) {
        res.status(404).json({ error: "Session non trouvée" });
        return;
      }

      if (session.payment_status === "paid") {
        res.status(200).json({ status: "success", message: "Paiement réussi" });
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Le paiement a échoué" });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la session Stripe" });
    }
  },
};

export default paymentActions;
