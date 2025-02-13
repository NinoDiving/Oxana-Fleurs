import type { NextFunction, Request, Response } from "express";
import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";
import verifyToken from "../../../middleware/verifyToken";

type PurchaseItem = {
  quantity: number;
  price: number;
  productId: number;
};

type Purchase = {
  id: number;
  name: string;
  type_id: number;
  description: string;
  price: number;
  img_path: string;
  purchase: PurchaseItem[];
};

class purchaseRepository {
  async create(
    purchase: { purchase: PurchaseItem[] },
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    verifyToken(req as Request, res as Response, next);
    const userId = req.user?.id || null;
    const connection = await databaseClient.getConnection();

    if (!userId) {
      throw new Error("User ID not found");
    }

    try {
      await connection.beginTransaction();

      const [purchaseResult] = await connection.query<Result>(
        "INSERT INTO purchase (customer_phone, customer_address, customer_city, customer_zip_code, delivery_date, total_price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          req.body.customer_phone,
          req.body.customer_address,
          req.body.customer_city,
          req.body.customer_zip_code,
          req.body.delivery_date,
          req.body.total_price,
          userId,
        ],
      );

      const purchaseId = purchaseResult.insertId;

      for (const item of purchase.purchase) {
        await connection.query<Result>(
          `INSERT INTO purchase_item 
          (quantity, price, product_id, purchase_id) 
          VALUES (?, ?, ?, ?)`,
          [item.quantity, item.price, item.productId, purchaseId],
        );
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw new Error(`Erreur lors de la création de produit: ${error}`);
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific purchase by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT product.id, name, description, price, img_path, type.type 
      FROM product
      INNER JOIN type
      ON type.id = product.type_id
			WHERE product.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the purchase
    return rows[0] as Purchase;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all purchases from the "purchase" table
    const [rows] = await databaseClient.query<Rows>(`
			SELECT 
			product.id, name,description,price,img_path , type.type
			FROM product
      INNER JOIN type
      ON type.id = product.type_id`);

    // Return the array of purchases
    return rows as Purchase[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing purchase
  async update(purchase: Partial<Purchase>) {
    try {
      const entries = Object.entries(purchase).filter(
        ([key, value]) => key !== "id" && value !== undefined,
      );

      if (entries.length === 0) {
        throw new Error("Aucun champ à mettre à jour");
      }

      const updates = entries.map(([key]) => `${key} = ?`).join(", ");
      const values = entries.map(([, value]) => value);

      if (purchase.id !== undefined) {
        values.push(purchase.id);
      } else {
        throw new Error("L'ID du produit est manquant");
      }

      const query = `UPDATE product SET ${updates} WHERE id = ?`;

      const [purchaseResult] = await databaseClient.query<Result>(
        query,
        values,
      );
      return purchaseResult.affectedRows;
    } catch (error) {
      throw new Error(`Échec de la mise à jour : ${error}`);
    }
  }
}
// async update(purchase: purchase) {
//   ...
// }

// The D of CRUD - Delete operation
// TODO: Implement the delete operation to remove an purchase by its ID

// async delete(id: number) {
//   ...
// }

export default new purchaseRepository();
