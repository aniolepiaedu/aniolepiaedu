const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ARRAY PER GUARDAR FAVORITS
let favorites = [];
let id = 1;

// GET favorites
app.get("/favorites", (req, res) => {
    res.json(favorites);
});

// POST favorite
app.post("/favorites", (req, res) => {
    const newFavorite = {
        id: id++,
        name: req.body.name,
        capital: req.body.capital,
        region: req.body.region,
        population: req.body.population,
        flag: req.body.flag
    };
    favorites.push(newFavorite);
    res.json(newFavorite);
});

// DELETE favorite
app.delete("/favorites/:id", (req, res) => {

    const favId = parseInt(req.params.id);

    favorites = favorites.filter(f => f.id !== favId);

    res.json({ message: "Eliminat" });
});

app.listen(PORT, () => {
    console.log(`Servidor executant-se a http://localhost:${PORT}`);
});