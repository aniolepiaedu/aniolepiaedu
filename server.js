const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// rutas API
const favoritesRoutes = require("./api/favorites");
const historyRoutes = require("./api/history");
const wishlistRoutes = require("./api/wishlist");

app.use("/api/favorites", favoritesRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ruta base → index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});