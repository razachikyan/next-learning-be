import express from "express";
import Routes from "./routes/index";

import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/", Routes.usersRoute);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
