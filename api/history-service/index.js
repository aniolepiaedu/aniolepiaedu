const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

let history = [];
let id = 1;

// GET
app.get("/history", (req, res) => {
    res.json(history);
});

// POST
app.post("/history", (req, res) => {
    const item = {
        id: id++,
        country: req.body.country,
        date: new Date().toLocaleString()
    };

    history.push(item);
    res.json(item);
});

app.listen(PORT, () => {
    console.log("History service on " + PORT);
});