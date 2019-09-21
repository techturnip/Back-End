const request = require("supertest");
const server = require('../api/server.js')
const Users = require("../users/user-model.js");

describe("auth", () => {
  describe("post to register & login", async () => {
    it("should post to /login", () => {
        const res = await request(server).post('/login')
        expect(res.status).toBe(200)
    });
  });
})