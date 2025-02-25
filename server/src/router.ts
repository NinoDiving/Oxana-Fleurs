import express from "express";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import adminAuthorization from "../middleware/adminAuthorization";
import paymentActions from "../middleware/stripesPayment";
import { upload } from "../middleware/uploadImage";
import verifyToken from "../middleware/verifyToken";
import productsActions from "./modules/Products/productsActions";
import TopProductsActions from "./modules/TopProducts/TopProductsActions";
import purchaseAction from "./modules/purchase/purchaseAction";
import userActions from "./modules/user/userActions";
// Define item-related routes
import { sendEmail } from "./services/emailSender";
router.post("/login", userActions.authenticateUser);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "Déconnexion réussie" });
});
router.get("/api/checkToken", verifyToken, (req, res) => {
  if (!req.user) {
    res.status(401).send("Accès interdit : utilisateur non trouvé");
    return;
  }
  res.status(200).json({ isAdmin: req.user.isAdmin });
});

router.post("/send-email", sendEmail);
router.get("/api/products", productsActions.browse);
router.get("/api/products/:id", productsActions.read);
router.post("/api/products", upload.single("image"), productsActions.add);
router.put("/api/products/:id", upload.single("image"), productsActions.edit);
router.get("/api/top-products", TopProductsActions.browse);
router.get("/api/top-products/:id", TopProductsActions.read);
router.post("/api/top-products", TopProductsActions.add);
router.put("/api/top-products/:id", TopProductsActions.edit);
router.get("/api/user", adminAuthorization, userActions.browse);
router.get("/api/user/:id", userActions.read);
router.post("/api/user", userActions.add);
router.put("/api/user/:id", userActions.edit);
router.post("/cart", purchaseAction.add);
router.get("/cart", purchaseAction.browse);
router.get("/cart/:id", purchaseAction.read);
router.post(
  "/api/payment/create-checkout-session",
  paymentActions.createCheckoutSession,
);
router.post("/stripe/checkout-session", paymentActions.verifyPayment);
router.get(
  "/api/payment/verify-payment/:sessionId",
  paymentActions.verifyPayment,
);
/* ************************************************************************* */

export default router;
