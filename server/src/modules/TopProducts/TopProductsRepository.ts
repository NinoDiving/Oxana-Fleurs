import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type TopProducts = {
  product_id: number;
};

class topProductsRepository {
  // The C of CRUD - Create operation
  async create(product_id: number) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      // Vérifier que le produit existe
      const [product] = await connection.query<Rows>(
        `SELECT 
        product.name, 
        product.description, 
        product.price, 
        product.img_path,
        type.type
        FROM product 
        INNER JOIN type
        ON type.id = product.type_id
        WHERE product.id = ?`,
        [product_id],
      );
      if (product.length === 0) {
        throw new Error("Produit non trouvé");
      }

      // Ajouter le produit à la table top_products
      const [result] = await connection.query<Result>(
        "INSERT INTO top_product (product_id) VALUES (?)",
        [product_id],
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

  // The Rs of CRUD - Read operations
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
       top_product.product_id,
       product.name, 
       product.description, 
       product.price, 
       product.img_path,
       type.type
       FROM top_product
       INNER JOIN product ON product.id = top_product.product_id
       WHERE top_product.id = ?;
    `,
      [id],
    );

    // Retourner le premier élément qui représente le topProducts
    return rows[0] as TopProducts;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT product_id, product.name, product.description, product.price, product.img_path, type.type
       FROM top_product
       INNER JOIN product
       ON product.id = top_product.product_id
       INNER JOIN type
       ON type.id = product.type_id`,
    );

    return rows as TopProducts[];
  }

  // The U of CRUD - Update operation
  async update(topProducts: Partial<TopProducts>) {
    try {
      const entries = Object.entries(topProducts).filter(
        ([key, value]) => value !== undefined,
      );

      if (entries.length === 0) {
        throw new Error("Aucun champ à mettre à jour");
      }

      const updates = entries.map(([key]) => `${key} = ?`).join(", ");
      const values = entries.map(([, value]) => value);

      const query = `UPDATE top_product SET ${updates} WHERE product_id = ?`;

      const [topProductsResult] = await databaseClient.query<Result>(
        query,
        values,
      );
      return topProductsResult.affectedRows;
    } catch (error) {
      throw new Error(`Échec de la mise à jour : ${error}`);
    }
  }
}

export default new topProductsRepository();
