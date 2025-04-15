import type { RequestHandler } from "express";
import productsRepository from "./productsRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const products = await productsRepository.readAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const productsId = Number(req.params.id);
    const products = await productsRepository.read(productsId);

    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "L'image est obligatoire" });
    }

    const newproducts = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      img_path: req.file ? `assets/images/${req.file.filename}` : "",
    };

    const insertId = await productsRepository.create(newproducts);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    const productUpdates = { ...req.body };
    for (const [key, value] of Object.keys(productUpdates)) {
      if (value === undefined) {
        delete productUpdates[key];
      }
    }
    if (req.file) {
      productUpdates.img_path = `assets/images/${req.file.filename}`;
    }

    const updateProduct = await productsRepository.update({
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const wasDeleted = await productsRepository.delete(productId);

    if (!wasDeleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const addToTopProduct: RequestHandler = async (req, res) => {
  const { productId } = req.body;

  try {
    const result = await productsRepository.addToTopProduct(productId);
    res
      .status(200)
      .json({ message: "Produit ajouté aux produits phares", id: result });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du produit",
      error: (error as Error).message,
    });
  }
};

export default { browse, read, add, edit, destroy, addToTopProduct };
