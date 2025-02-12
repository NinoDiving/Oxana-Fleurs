import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
};

class userRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (lastname,firstname,email,password,) 
			VALUES (?, ?, ? ,? )`,
      [user.lastname, user.firstname, user.email, user.password],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT lastname, firstname, email, password FROM user 
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
			lastname, firstname, email, password
			FROM user`);

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user
  async update(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      `UPDATE user
       SET lastname = ?,firstname = ?,email = ?,password = ?
       WHERE id = ?) 
			`,
      [user.lastname, user.firstname, user.email, user.password],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
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
