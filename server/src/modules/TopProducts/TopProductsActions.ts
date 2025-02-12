import type { RequestHandler } from "express";
import topProductsRepository from "./TopProductsRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const topProducts = await topProductsRepository.readAll();
    res.json(topProducts);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const topProductsId = Number(req.params.id);
    const topProducts = await topProductsRepository.read(topProductsId);

    if (topProducts == null) {
      res.sendStatus(404);
    } else {
      res.json(topProducts);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const product_id = req.body.product_id;
    const insertId = await topProductsRepository.create(product_id);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { product_id } = req.body;

    if (product_id) {
      const updateResult = await topProductsRepository.update({
        product_id: Number(req.params.id),
        ...req.body,
      });

      if (updateResult === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    } else {
      res.status(400).json({ message: "product_id est requis pour l'édition" });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit };
