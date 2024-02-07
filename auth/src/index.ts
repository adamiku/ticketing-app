import { json } from "body-parser";
import express from "express";

const app = express();
app.use(json());

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
