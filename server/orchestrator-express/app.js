if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;
const router = require("./routers/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => console.log(`Orchestrator is working at port ${port}`));
