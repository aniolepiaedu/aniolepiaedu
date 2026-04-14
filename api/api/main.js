const express = require("express");
const router = express.Router();

const favorites = require("./favorites");
const history = require("./history");
const wishlist = require("./wishlist");

// =====================
// FAVORITES
// =====================
router.get("/favorites", (req, res) => {
    res.json(favorites.getAll());
});

router.post("/favorites", (req, res) => {
    const item = favorites.add(req.body);
    res.status(201).json(item);
});

router.delete("/favorites", (req, res) => {
    const result = favorites.remove(Number(req.query.id));
    res.json(result);
});

// =====================
// HISTORY
// =====================
router.get("/history", (req, res) => {
    res.json(history.getAll());
});

router.post("/history", (req, res) => {
    const item = history.add(req.body);
    res.status(201).json(item);
});

// =====================
// WISHLIST
// =====================
router.get("/wishlist", (req, res) => {
    res.json(wishlist.getAll());
});

router.post("/wishlist", (req, res) => {
    const item = wishlist.add(req.body);
    res.status(201).json(item);
});

router.delete("/wishlist", (req, res) => {
    const result = wishlist.remove(Number(req.query.id));
    res.json(result);
});

module.exports = router;