const express = require("express");
const cors = require("cors");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 FRONTEND
app.use(express.static("public"));


function run(file) {
    const p = spawn("node", [file], { stdio: "inherit" });
    return p;
}
run("api/favorites-service/index.js");
run("api/history-service/index.js");
run("api/wishlist-service/index.js");
run("server.js"); // frontend

app.listen(PORT, () => {
    console.log(`Frontend running on ${PORT}`);
});