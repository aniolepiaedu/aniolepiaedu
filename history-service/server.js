const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let history = [];

app.get("/history", (req, res) => {
    res.json(history);
});

app.post("/history", (req, res) => {
    history.push(req.body);
    res.json({ message: "Saved" });
});

app.listen(PORT, () => {
    console.log("History service running");
});