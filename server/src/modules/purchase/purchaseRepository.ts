import { format } from "date-fns/format";
import type { NextFunction, Request, Response } from "express";
import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

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
    purchase: {
      customer_phone: string;
      customer_address: string;
      customer_city: string;
      customer_zip_code: string;
      delivery_date: string;
      total_price: number;
      items: { product_id: number; quantity: number; price: number }[];
      user_id: number;
      isClickandCollect: boolean;
    },
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userId = purchase.user_id;
    const isClickandCollect = purchase.isClickandCollect;
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();
      const formattedDeliveryDate = format(
        new Date(purchase.delivery_date),
        "yyyy-MM-dd",
      );
      const [purchaseResult] = await connection.execute<Result>(
        `INSERT INTO purchase 
        (customer_phone, customer_address, customer_city, customer_zip_code, delivery_date, total_price, user_id, isClickandCollect) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          purchase.customer_phone,
          purchase.customer_address,
          purchase.customer_city,
          purchase.customer_zip_code,
          formattedDeliveryDate,
          purchase.total_price,
          userId,
          isClickandCollect,
        ],
      );
      const purchase_id = purchaseResult.insertId;

      for (const item of purchase.items) {
        await connection.execute<Result>(
          `INSERT INTO purchase_item
          (quantity, price, product_id, purchase_id)
          VALUES (?,?,?,?)`,
          [item.quantity, item.price, item.product_id, purchase_id],
        );
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw new Error(`Erreur lors de la création de la commande: ${error}`);
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific purchase by its ID
    const [rows] = await databaseClient.execute<Rows>(
      `SELECT 
       p.id AS purchase_id,
       p.customer_phone,
       p.customer_address,
       p.customer_city,
       p.customer_zip_code,
       p.delivery_date,
       p.total_price,
       p.status,
       p.isGuest,
       p.user_id,
       pi.id AS purchase_item_id,
       pi.quantity,
       pi.price,
       pi.product_id,
       pr.name AS product_name,
       pr.description AS product_description,
       pr.price AS product_price,
       pr.img_path AS product_image
       FROM purchase p
       JOIN purchase_item pi ON p.id = pi.purchase_id
       JOIN product pr ON pi.product_id = pr.id
       WHERE p.user_id = ? OR (p.isGuest = TRUE AND p.id = ?);`,
      [id, id],
    );

    const formattedRows = rows.map((row) => {
      return {
        id: row.purchase_id,
        name: row.product_name,
        type_id: row.product_id,
        description: row.product_description,
        price: row.product_price,
        img_path: row.product_image,
        purchase: [
          {
            quantity: row.quantity,
            price: row.price,
            productId: row.product_id,
          },
        ],
        delivery_date: format(new Date(row.delivery_date), "dd/MM/yyyy"),
        customer_phone: row.customer_phone,
        customer_address: row.customer_address,
        customer_city: row.customer_city,
        customer_zip_code: row.customer_zip_code,
        total_price: row.total_price,
        status: row.status,
        isGuest: row.isGuest,
        user_id: row.user_id,
      };
    });

    return formattedRows;
  }

  async readAll() {
    const [rows] = await databaseClient.execute<Rows>(`
      SELECT 
        p.id AS purchase_id,
        u.firstname,
        u.lastname,
        p.customer_phone,
        p.customer_address,
        p.customer_city,
        p.customer_zip_code,
        p.delivery_date,
        p.total_price,
        p.status,
        p.user_id,
        p.isClickandCollect,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', pr.name,
            'price', pr.price,
            'img_path', pr.img_path,
            'description', pr.description,
            'type_id', pr.type_id,
            'quantity', pi.quantity
          )
        ) as products
      FROM purchase p
      JOIN purchase_item pi ON p.id = pi.purchase_id
      JOIN product pr ON pi.product_id = pr.id
      LEFT JOIN user u ON p.user_id = u.id
      GROUP BY p.id
      ORDER BY p.delivery_date ASC;
    `);

    const formattedRows = rows.map((row) => ({
      id: row.purchase_id,
      delivery_date: format(new Date(row.delivery_date), "dd/MM/yyyy"),
      customer_name: `${row.firstname} ${row.lastname}`,
      customer_phone: row.customer_phone,
      customer_address: row.customer_address,
      customer_city: row.customer_city,
      customer_zip_code: row.customer_zip_code,
      total_price: row.total_price,
      status: row.status,
      isClickandCollect: row.isClickandCollect,
      user_id: row.user_id,
      products: row.products,
    }));

    return formattedRows;
  }

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

      const [purchaseResult] = await databaseClient.execute<Result>(
        query,
        values,
      );
      return purchaseResult.affectedRows;
    } catch (error) {
      throw new Error(`Échec de la mise à jour : ${error}`);
    }
  }
}

export default new purchaseRepository();
