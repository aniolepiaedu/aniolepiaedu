const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// importar rutas
const favoritesRoutes = require("./api/favorites");
const historyRoutes = require("./api/history");
const wishlistRoutes = require("./api/wishlist");

// usar rutas
app.use("/api/favorites", favoritesRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ruta base
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});