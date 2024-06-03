import app from "../app.ts";
import request from "supertest";

describe("authenticate", () => {
    it("should return an error if username is not provided", async () => {
        const response = await request(app).post("/api/authenticate").send({
            password: "password",
        });
        expect(response.status).toBe(400);
    })

    it("should return an error if password is not provided", async () => {
        const response = await request(app).post("/api/authenticate").send({
            username: "username",
        });
        expect(response.status).toBe(400);
    })

    it("should return an error if username and password are not provided", async () => {
        const response = await request(app).post("/api/authenticate").send({});
        expect(response.status).toBe(400);
    })

    it("should return a status 200 if username and password are provided correctly", async () => {
        const response = await request(app).post("/api/authenticate").send({
            username: "username",
            password: "1337",
        });
        expect(response.status).toBe(200);
    })

    it("should return a status 401 if username and password are not provided correctly", async () => {
        const response = await request(app).post("/api/authenticate").send({
            username: "username",
            password: "17",
        });
        expect(response.status).toBe(401);
    })
})

