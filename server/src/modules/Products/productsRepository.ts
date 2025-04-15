import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Products = {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  img_path: string;
};

class productsRepository {
  async create(products: Omit<Products, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();
      const [existingType] = await databaseClient.execute<Rows>(
        `SELECT id 
        FROM type 
        WHERE type = ?`,
        [products.type],
      );

      let type_id: number;

      if (existingType.length > 0) {
        type_id = existingType[0].id;
      } else {
        const [type_result] = await databaseClient.execute<Result>(
          `INSERT INTO type 
          (type) 
          VALUES (?)`,
          [products.type],
        );

        if (!type_result.insertId) {
          await connection.rollback();
          throw new Error("Insertion du type échouée");
        }

        type_id = type_result.insertId;
      }

      const [result] = await databaseClient.execute<Result>(
        `INSERT INTO product (name, description, price, img_path, type_id) 
        VALUES (?, ?, ?, ?, ?)`,
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

  async read(id: number) {
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT product.id, name, description, price, img_path, type.type 
      FROM product
      INNER JOIN type
      ON type.id = product.type_id
			WHERE product.id = ?`,
      [id],
    );

    return rows[0] as Products;
  }

  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(`
			SELECT 
			product.id, name,description,price,img_path , type.type
			FROM product
      INNER JOIN type
      ON type.id = product.type_id`);

    return rows as Products[];
  }

  async update(products: Products) {
    try {
      const entries = Object.entries(products).filter(
        ([key, value]) => key !== "id" && value !== undefined,
      );

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

  async delete(id: number) {
    try {
      const [productResult] = await databaseClient.execute<Result>(
        `DELETE FROM product 
         WHERE id = ?`,
        [id],
      );

      if (productResult.affectedRows === 0) {
        throw new Error("Produit non trouvé");
      }

      return productResult.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la suppression");
    }
  }

  async addToTopProduct(productId: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [products] = await connection.execute<Rows>(
        `SELECT name, type, description, price, img_path FROM product 
			   WHERE id = ?`,
        [productId],
      );
      if (products.length === 0) {
        throw new Error("Produit non trouvé");
      }

      const [result] = await connection.execute<Result>(
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

export default new productsRepository();
