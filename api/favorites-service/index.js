let favorites = [];
let id = 1;

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.json(favorites);
    }

    if (req.method === "POST") {
        const item = { id: id++, ...req.body };
        favorites.push(item);
        return res.json(item);
    }

    if (req.method === "DELETE") {
        const favId = Number(req.query.id);
        favorites = favorites.filter(f => f.id !== favId);
        return res.json({ ok: true });
    }

    res.status(405).end();
}