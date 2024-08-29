// const express = require("express")
// const  cors = require("cors") ;
// const get = require("./controllers/get");
// const create = require("./controllers/create");
// const decrypt = require("./controllers/decrypt");
// const count_view = require("./controllers/count_view");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");

import express , {Response, Request} from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import get from "./controllers/get";
import create from "./controllers/create";
import decrypt from "./controllers/decrypt";
import dotenv from "dotenv";
import count_view from "./controllers/count_view";
import { format } from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/",(req, res) => {
  return res.send("Textura");
});

app.post("/create", create);
app.get("/decrypt", decrypt);
app.post("/count", count_view);
app.get("/:code", get);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`)
});
