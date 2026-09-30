const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();

let pathToFile = path.join(__dirname, "db.json");

async function readMyFile() {
    try {
        let data = await fs.readFile(pathToFile, "utf-8");
        const items = JSON.parse(data);
        return items;
    } catch (err) {
        console.log(err);
    }
}

async function readFileWithDelay() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });

    let products = await readMyFile();

    return products;
}

// GET all products
app.get("/products", async (req, res) => {
    try {
        let products = await readFileWithDelay();

        res.json(products);
    } catch (err) {
        console.log(err);
    }
});

// GET product by ID
app.get("/products/:id", async (req, res) => {
    try {
        let products = await readFileWithDelay();

        let { id } = req.params;

        id = Number(id);

        products = products.find((item) => {
            return item.id === id;
        });

        res.json(products);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});