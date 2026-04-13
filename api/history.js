let history = [];
let id = 1;

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(history);
    }

    if (req.method === "POST") {
        const item = {
            id: id++,
            country: req.body.country,
            date: new Date().toLocaleString()
        };

        history.push(item);
        return res.status(201).json(item);
    }

    return res.status(405).end();
}