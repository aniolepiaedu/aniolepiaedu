let history = [];
let id = 1;

export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        return res.json(history);
    }

    if (req.method === "POST") {
        const item = {
            id: id++,
            country: req.body.country,
            date: new Date()
        };
        history.push(item);
        return res.json(item);
    }

    res.status(405).json({ message: "Method not allowed" });
}