import type { RequestHandler } from "express";
import purchaseRepository from "./purchaseRepository";

// Import access to data

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all purchases
    const purchase = await purchaseRepository.readAll();

    // Respond with the purchases in JSON format
    res.json(purchase);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific purchase based on the provided ID
    const purchaseId = Number(req.params.id);
    const purchase = await purchaseRepository.read(purchaseId);

    // If the purchase is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the purchase in JSON format
    if (purchase == null) {
      res.sendStatus(404);
    } else {
      res.json(purchase);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newPurchase = {
      customer_phone: req.body.customer_phone,
      customer_address: req.body.customer_address,
      customer_city: req.body.customer_city,
      customer_zip_code: req.body.customer_zip_code,
      delivery_date: req.body.delivery_date,
      total_price: req.body.total_price,
      user_id: req.body.user_id,
      purchase: req.body.purchase,
    };

    // Create the purchase
    const insertId = await purchaseRepository.create(
      { purchase: newPurchase.purchase },
      req,
      res,
      next,
    );

    // Respond with HTTP 201 (Created) and the ID of the newly inserted purchase
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const productUpdates = Object.fromEntries(
      Object.entries(req.body).filter(([, value]) => value !== undefined),
    );

    if (req.file) {
      productUpdates.img_path = `assets/images/${req.file.filename}`;
    }

    if (Object.keys(productUpdates).length === 0) {
      res.status(400).json({ message: "Aucun champ à mettre à jour" });
      return;
    }

    const updateProduct = await purchaseRepository.update({
      id: Number(req.params.id),
      ...productUpdates,
    });

    if (!updateProduct) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit };
