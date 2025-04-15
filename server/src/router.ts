import express, { type RequestHandler } from "express";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import adminAuthorization from "../middleware/adminAuthorization";
import paymentActions from "../middleware/stripesPayment";
import { upload } from "../middleware/uploadImage";

import {
  productSchema,
  productSchemaUpdate,
  validateData,
} from "../middleware/validateData";
import { validateLogin } from "../middleware/validateLogin";
import { verifyToken } from "../middleware/verifyToken";
import productsActions from "./modules/Products/productsActions";
import TopProductsActions from "./modules/TopProducts/TopProductsActions";
import purchaseAction from "./modules/purchase/purchaseAction";
import userActions from "./modules/user/userActions";
// Define item-related routes
import { sendEmail } from "./services/emailSender";
router.post(
  "/login",
  validateLogin as RequestHandler,
  userActions.authenticateUser,
);

router.post("/logout", validateLogin, userActions.logout);
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
router.post(
  "/api/products",
  verifyToken,
  adminAuthorization,
  upload.single("image"),
  validateData(productSchema) as RequestHandler,
  productsActions.add,
);
router.put(
  "/api/products/:id",
  verifyToken,
  adminAuthorization,
  upload.single("image"),
  validateData(productSchemaUpdate) as RequestHandler,
  productsActions.edit,
);
router.delete(
  "/api/products/:id",
  verifyToken,
  adminAuthorization,
  productsActions.destroy,
);
router.get("/api/top-products", TopProductsActions.browse);
router.get("/api/top-products/:id", TopProductsActions.read);
router.post(
  "/api/top-products",
  verifyToken,
  adminAuthorization,
  TopProductsActions.add,
);
router.put(
  "/api/top-products/:id",
  verifyToken,
  adminAuthorization,
  TopProductsActions.edit,
);
router.get("/api/user", verifyToken, adminAuthorization, userActions.browse);
router.get("/user", verifyToken, (req, res) => {
  const { firstname, lastname, email, isAdmin } = req.user;

  res.status(200).json({
    user: {
      id: req.user.id,
      firstname,
      lastname,
      email,
      isAdmin,
    },
  });
});
router.post("/api/user", userActions.add);
router.put("/api/user/:id", verifyToken, userActions.edit);
router.get("/api/cart", verifyToken, adminAuthorization, purchaseAction.browse);
router.post("/api/cart", verifyToken, purchaseAction.add);
router.get("/api/cart/:id", verifyToken, purchaseAction.read);
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
