let favorites = [];
let id = 1;

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.json(favorites);
    }

    if (req.method === "POST") {
        const newFav = { id: id++, ...req.body };
        favorites.push(newFav);
        return res.json(newFav);
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        favorites = favorites.filter(f => f.id !== parseInt(id));
        return res.json({ message: "Deleted" });
    }

    res.status(405).end();
}