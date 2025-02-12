import type { RequestHandler } from "express";
import productsRepository from "./productsRepository";

// Import access to data

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all productss
    const products = await productsRepository.readAll();

    // Respond with the productss in JSON format
    res.json(products);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific products based on the provided ID
    const productsId = Number(req.params.id);
    const products = await productsRepository.read(productsId);

    // If the products is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the products in JSON format
    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "L'image est obligatoire" });
    }

    const newproducts = {
      name: req.body.name,
      type_id: req.body.type_id,
      description: req.body.description,
      price: req.body.price,
      img_path: req.file ? `assets/images/${req.file.filename}` : "",
    };

    // Create the products
    const insertId = await productsRepository.create(newproducts);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted products
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

export default { browse, read, add, edit, addToTopProduct };
