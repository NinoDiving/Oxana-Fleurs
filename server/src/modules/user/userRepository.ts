import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import Auth from "../../services/Auth/Auth";

type User = {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
};

class userRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    const hashedPassword = await Auth.hashPassword(user.password);
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (lastname,firstname,email,password) 
			VALUES (?, ?, ? ,? )`,
      [user.lastname, user.firstname, user.email, hashedPassword],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT lastname, firstname, email FROM user 
			 WHERE id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>(`
			SELECT 
			lastname, firstname, email
			FROM user`);

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user
  async update(user: User & { id: number }) {
    const existingUser = await this.read(user.id);

    let hashedPassword = user.password;
    if (user.password !== existingUser.password) {
      hashedPassword = await Auth.hashPassword(user.password);
    }

    const [result] = await databaseClient.query<Result>(
      `UPDATE user
       SET lastname = ?, firstname = ?, email = ?, password = ?
       WHERE id = ?`,
      [user.lastname, user.firstname, user.email, hashedPassword, user.id],
    );

    return result.affectedRows;
  }

  async getUserEmailWithIsAdmin(user: { email: string }) {
    const [result] = await databaseClient.query<Rows>(
      `SELECT email, password, isAdmin FROM user
      WHERE email = ?
      `,
      [user.email],
    );
    console.log("Email envoyé à la requête SQL :", user.email);
    console.log(result);

    if (!result[0]) {
      console.log("Erreur pas de résultat");
    }
    return result[0];
  }
}

// async update(user: user) {
//   ...
// }

// The D of CRUD - Delete operation
// TODO: Implement the delete operation to remove an user by its ID

// async delete(id: number) {
//   ...
// }

export default new userRepository();
