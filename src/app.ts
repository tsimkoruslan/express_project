import express from "express";
import * as mangoose from "mongoose";

import { configs } from "./configs/configs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(configs.PORT, async () => {
  await mangoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
