const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = require("./api/main");

// 👇 todas las rutas pasan por aquí
app.use("/api", apiRoutes);

// root
app.get("/", (req, res) => {
    res.send("Main API Gateway running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});