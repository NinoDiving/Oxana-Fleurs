import type { RequestHandler } from "express";
import purchaseRepository from "./purchaseRepository";

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
  const userId = req.body.user_id || req.user?.id || null;
  const isGuest = userId === null;
  try {
    const newPurchase = {
      customer_phone: req.body.customer_phone,
      customer_address: req.body.customer_address,
      customer_city: req.body.customer_city,
      customer_zip_code: req.body.customer_zip_code,
      delivery_date: req.body.delivery_date,
      total_price: req.body.total_price,
      user_id: userId,
      isGuest: isGuest,
      items: Array.isArray(req.body.items) ? req.body.items : [],
    };

    // Create the purchase
    const insertId = await purchaseRepository.create(
      newPurchase,
      req,
      res,
      next,
    );

    // Respond with HTTP 201 (Created) and the ID of the newly inserted purchase
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    if (!res.headersSent) {
      next(err);
    }
  }
};

export default { browse, read, add };
