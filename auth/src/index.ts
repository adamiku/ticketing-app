import { json } from "body-parser";
import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(json());

app.get("/api/users", (req, res) => {
  console.log("yolo");
  res.send("yolo");
});

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000!!!!");
});
