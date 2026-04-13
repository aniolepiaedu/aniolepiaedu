const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let favorites = [];
let id = 1;

app.get("/favorites", (req, res) => {
    res.json(favorites);
});

app.post("/favorites", (req, res) => {
    const newFavorite = { id: id++, ...req.body };
    favorites.push(newFavorite);
    res.json(newFavorite);
});

app.delete("/favorites/:id", (req, res) => {
    const favId = parseInt(req.params.id);
    favorites = favorites.filter(f => f.id !== favId);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log("Favorites service running");
});