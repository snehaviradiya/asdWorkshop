const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const PORT = 3000;

function getProducts() {
    const data = fs.readFileSync("db.json", "utf-8");
    return JSON.parse(data);
}

// GET all products
app.get("/products", (req, res) => {
    const products = getProducts();
    res.json(products);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
    const products = getProducts();

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// POST a new product
app.post("/products", (req, res) => {
    const products = getProducts();

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    fs.writeFileSync(
        "db.json",
        JSON.stringify(products, null, 2)
    );

    res.status(201).json(newProduct);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});