import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import { upload } from "../middleware/uploadImage";
import productsActions from "./modules/Products/productsActions";
import TopProductsActions from "./modules/TopProducts/TopProductsActions";
import userActions from "./modules/user/userActions";
// Define item-related routes
import { sendEmail } from "./services/emailSender";

router.post("/send-email", sendEmail);
router.get("/api/products", productsActions.browse);
router.get("/api/products/:id", productsActions.read);
router.post("/api/products", upload.single("image"), productsActions.add);
router.put("/api/products/:id", upload.single("image"), productsActions.edit);
router.get("/api/top-products", TopProductsActions.browse);
router.get("/api/top-products/:id", TopProductsActions.read);
router.post("/api/top-products", TopProductsActions.add);
router.put("/api/top-products/:id", TopProductsActions.edit);
router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.post("/api/user", userActions.add);
router.put("/api/user/:id", userActions.edit);

/* ************************************************************************* */

export default router;
