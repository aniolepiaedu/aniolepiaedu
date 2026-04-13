let wishlist = [];
let id = 1;

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(wishlist);
    }

    if (req.method === "POST") {
        const item = { id: id++, ...req.body };
        wishlist.push(item);
        return res.status(201).json(item);
    }

    if (req.method === "DELETE") {
        const wishId = Number(req.query.id);
        wishlist = wishlist.filter(w => w.id !== wishId);
        return res.status(200).json({ ok: true });
    }

    res.status(405).end();
}