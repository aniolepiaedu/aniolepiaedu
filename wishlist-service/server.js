const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let wishlist = [];

app.get("/wishlist", (req, res) => {
    res.json(wishlist);
});

app.post("/wishlist", (req, res) => {
    wishlist.push(req.body);
    res.json({ message: "Added" });
});

app.listen(PORT, () => {
    console.log("Wishlist service running");
});