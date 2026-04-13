const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

let wishlist = [];
let id = 1;

// GET
app.get("/wishlist", (req, res) => {
    res.json(wishlist);
});

// POST
app.post("/wishlist", (req, res) => {
    const item = {
        id: id++,
        ...req.body
    };

    wishlist.push(item);
    res.json(item);
});

// DELETE
app.delete("/wishlist/:id", (req, res) => {
    const wishId = parseInt(req.params.id);
    wishlist = wishlist.filter(w => w.id !== wishId);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log("Wishlist service on " + PORT);
});