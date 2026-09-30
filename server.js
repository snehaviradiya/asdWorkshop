const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const PORT = 3000;

// Read products from db.json
function getProducts() {
    const data = fs.readFileSync("db.json", "utf-8");
    return JSON.parse(data);
}

// GET all products
// http://localhost:3000/products
app.get("/products", (req, res) => {
    const products = getProducts();

    res.json(products);
});

// GET product by ID
// http://localhost:3000/products/1
// http://localhost:3000/products/2
// http://localhost:3000/products/3
app.get("/products/:id", (req, res) => {
    const products = getProducts();

    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});