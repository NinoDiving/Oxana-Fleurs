import "dotenv/config";

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      checkout: {
        sessions: {
          create: jest.fn().mockResolvedValue({
            id: "test_session_id",
            url: "https://test.com",
          }),
        },
      },
    };
  });
});

process.env.JWT_SECRET = "test_jwt_secret_for_tests";

import supertest from "supertest";
import databaseClient from "../../database/client";
const app = require("../../src/app").default;

describe("Test de connexion à l'API", () => {
  it("devrait répondre avec un statut 200 sur /api/products", async () => {
    const response = await supertest(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

const uniqueEmail = `test.user.${Date.now()}@example.com`;

describe("Test user registration", () => {
  it("Should register a new user successfully", async () => {
    const newUser = {
      lastname: "Test",
      firstname: "User",
      email: uniqueEmail,
      password: "Test123@password",
    };

    const response = await supertest(app).post("/api/user").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("insertId");
  });

  it("Should reject registration with duplicate email", async () => {
    const duplicateUser = {
      lastname: "Another",
      firstname: "User",
      email: "jauteenino@gmail.com",
      password: "Another123@password",
    };

    const response = await supertest(app).post("/api/user").send(duplicateUser);
    expect(response.status).toBe(500);
  });
});

afterAll(async () => {
  await databaseClient.end();
});

const user = {
  email: "jean@jean.fr",
  password: "azertyuiop@N1",
};

describe("Test user login", () => {
  it("Should log the user", async () => {
    const response = await supertest(app).post("/login").send(user);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("lastname");
    expect(response.body).toHaveProperty("firstname");
    expect(response.body).toHaveProperty("isAdmin");
    expect(response.status).toBe(200);
  });

  it("Should return 401 with invalid credentials", async () => {
    const invalidUser = {
      email: "jean@jean.fr",
      password: "wrongpassword",
    };

    const response = await supertest(app).post("/login").send(invalidUser);
    expect(response.status).toBe(401);
  });
});
