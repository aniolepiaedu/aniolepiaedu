let favorites = [];
let id = 1;

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(favorites);
    }

    if (req.method === "POST") {
        const item = { id: id++, ...req.body };
        favorites.push(item);
        return res.status(201).json(item);
    }

    if (req.method === "DELETE") {
        const favId = Number(req.query.id);
        favorites = favorites.filter(f => f.id !== favId);
        return res.status(200).json({ ok: true });
    }

    res.status(405).end();
}