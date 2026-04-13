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


app.listen(PORT, () => {
    console.log(`Frontend running on ${PORT}`);
});