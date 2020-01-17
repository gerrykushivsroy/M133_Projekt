import express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import expressSession from "express-session";
import { Product } from "./views/assets/products/product";
import ProductsJson from "./views/assets/products/products.json";

const app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true // forces an uninitialized session to be stored
}));


/* frontend */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/pages/home.html"));
});
app.get("/detail/:id", (req, res) => {
    var id = req.params.id;

    if (!id) {
        res.end();
    }
    res.cookie("productId", id);

    res.sendFile(path.join(__dirname, "/views/pages/detail.html"));
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/pages/cart.html"));
});

app.get("/checkout", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/pages/checkout.html"));
});

/* api */
app.get("/api/products", (req, res) => {
    if(req.session.products == undefined) {
        req.session.products = ProductsJson;
    }

    res.json(ProductsJson);
});
app.get("/api/products/:id", (req, res) => {
    var id = req.params.id;

    let product = loadProduct(id);
    
    if(req.session.products == undefined) {
        req.session.product = product;
    }

    res.json(product);
});
app.post("/api/products", (req, res) => {
    req.session.products = <Product[]>[
        ...req.session.products,
        <Product>req.body
    ];

    res.sendStatus(200);
})

function loadProduct(id: string){
    return ProductsJson.find(p => p.id.toString() === id);
}

/* libs & assets */
app.use("/assets", express.static(path.join(__dirname, "/views/assets")));
app.use("/spectre", express.static(path.join(__dirname, "..", "/node_modules/spectre.css/dist")));

app.listen(8080, () => console.log("listening"));