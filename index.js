import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const vikingsJsonData = require("./public/json/vikings.json");

const app = express();
app.use(express.static("public"));

const PORT = "5000";

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome to Vikings api" });
});

app.get("/vikings", (req, res) => {
  res.json(vikingsJsonData.map((data) => data));
});

app.get("/vikings/:id", (req, res) => {
  const id = req.params.id;

  if (vikingsJsonData.find((data) => data.id == id)) {
    res.json(vikingsJsonData.filter((data) => data.id == id && data));
  } else {
    res.json({
      message: "id not found",
      type: "error",
      description: "search between the id {1 - 6}",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Node server started listening on port : ${PORT}`);
});
