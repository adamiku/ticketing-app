import request from "supertest";
import { app } from "../../app";

it("returns a 201 on succesful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test1@gmail.com",
      password: "1234",
    })
    .expect(201);
});

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "asdf",
      password: "1234",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "asdf",
      password: "1",
    })
    .expect(400);
});

it("return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({ password: "1234" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234",
    })
    .expect(201);
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234",
    })
    .expect(400);
});

it("sets a cookie after succesful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1234",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
