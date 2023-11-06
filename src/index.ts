import express from "express";
import { knex } from "knex";
import Routes from "./routes/index";

import "dotenv/config";

const app = express();
app.use(express.json());

const DB = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

const PORT = process.env.PORT || 4000;

app.use("/", Routes.usersRoute);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
