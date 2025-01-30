import express from "express";
const app = express();
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes/bookRoute.js";
app.use(cors());
app.use(express.json());

app.use("/books", router);

//cors - custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
console.log(process.env.ATLAS_URL);
//mongoose conection
mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => {
    console.log("App connected to mongoose");
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
