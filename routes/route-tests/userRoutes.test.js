const request = require("supertest");
const server = require("../../api/server");
const db = require("../../database/dbConfig");
const restricted = require("../../middleware/tokenRestricted");
const userHelpers = require("../../database/dbHelpers/userHelpers");

describe("Endpoint: /api/users/register && login TESTS", () => {
  beforeAll(async () => {
    await db("users").truncate();
    await userHelpers.registerUser({
      name: "Babacu",
      password: 123,
      email: "babacu@yahoo.com",
      role: "manager"
    });

    await userHelpers.registerUser({
      name: "Tudor",
      password: 123,
      email: "tudor@yahoo.com",
      role: "manager"
    });
  });

  afterAll(async () => {
    await db("users").truncate();
  });

  it("should set testing enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  it("Request: GET /api/users/register", async () => {
    const user = {
      name: "Bean",
      password: "123",
      email: "bean@yahoo.com",
      role: "manager"
    };

    const res = await request(server)
      .post("/api/users/register")
      .send(user);
    expect(res.body).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email", "bean@yahoo.com");
    expect(res.body).toHaveProperty("message");
  });


});