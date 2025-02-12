import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Products = {
  id: number;
  name: string;
  type_id: number;
  description: string;
  price: number;
  img_path: string;
};

class productsRepository {
  // The C of CRUD - Create operation

  async create(products: Omit<Products, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [existingType] = await databaseClient.query<Rows>(
        `SELECT id FROM type 
         WHERE type = ?`,
        [products.type_id],
      );

      let type_id: number;

      if (existingType.length > 0) {
        type_id = existingType[0].id;
      } else {
        const [type_result] = await databaseClient.query<Result>(
          `INSERT INTO type 
          (type) VALUES (?)`,
          [products.type_id],
        );

        if (!type_result.insertId) {
          await connection.rollback();
          throw new Error("Insertion du type échouée");
        }

        type_id = type_result.insertId;
      }

      const [result] = await databaseClient.query<Result>(
        `INSERT INTO product 
        (name, description, price, img_path, type_id) 
         VALUES (?, ?, ?, ?, ? )`,
        [
          products.name,
          products.description,
          products.price,
          products.img_path,
          type_id,
        ],
      );

      if (!result.insertId) {
        await connection.rollback();
        throw new Error("Insertion du produit échouée");
      }

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw new Error(`Erreur lors de la création de produit: ${error}`);
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific products by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT product.id, name, description, price, img_path, type.type 
      FROM product
      INNER JOIN type
      ON type.id = product.type_id
			WHERE product.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the products
    return rows[0] as Products;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all productss from the "products" table
    const [rows] = await databaseClient.query<Rows>(`
			SELECT 
			product.id, name,description,price,img_path , type.type
			FROM product
      INNER JOIN type
      ON type.id = product.type_id`);

    // Return the array of productss
    return rows as Products[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing products
  async update(products: Partial<Products>) {
    try {
      const entries = Object.entries(products).filter(
        ([key, value]) => key !== "id" && value !== undefined,
      );

      if (entries.length === 0) {
        throw new Error("Aucun champ à mettre à jour");
      }

      const updates = entries.map(([key]) => `${key} = ?`).join(", ");
      const values = entries.map(([, value]) => value);

      if (products.id !== undefined) {
        values.push(products.id);
      } else {
        throw new Error("L'ID du produit est manquant");
      }

      const query = `UPDATE product SET ${updates} WHERE id = ?`;

      const [productsResult] = await databaseClient.query<Result>(
        query,
        values,
      );
      return productsResult.affectedRows;
    } catch (error) {
      throw new Error(`Échec de la mise à jour : ${error}`);
    }
  }

  async addToTopProduct(productId: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [products] = await connection.query<Rows>(
        `SELECT name, type, description, price, img_path FROM product 
			   WHERE id = ?`,
        [productId],
      );
      if (products.length === 0) {
        throw new Error("Produit non trouvé");
      }

      // Ajouter le produit à la table top_products
      const [result] = await connection.query<Result>(
        `INSERT INTO top_product 
         (product_id) 
         VALUES (?)`,
        [productId],
      );

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
// async update(products: products) {
//   ...
// }

// The D of CRUD - Delete operation
// TODO: Implement the delete operation to remove an products by its ID

// async delete(id: number) {
//   ...
// }

export default new productsRepository();
