let wishlist = [];
let id = 1;

export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE");

    if (req.method === "GET") {
        return res.json(wishlist);
    }

    if (req.method === "POST") {
        const item = {
            id: id++,
            ...req.body
        };
        wishlist.push(item);
        return res.json(item);
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        wishlist = wishlist.filter(w => w.id !== parseInt(id));
        return res.json({ message: "Deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
}