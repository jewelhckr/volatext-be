import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import get from "./controllers/get";
import create from "./controllers/create";
import decrypt from "./controllers/decrypt";
import dotenv from "dotenv";
import count_view from "./controllers/count_view";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/", async (req: Request, res: Response) => {
  return res.send("Volatext");
});

app.post("/create", create);
app.get("/decrypt", decrypt);
app.post("/count", count_view);
app.get("/:code", get);

app.listen(process.env.PORT, () => console.log("Server is live"));
