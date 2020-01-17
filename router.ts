import * as express from 'express';
import * as products from './assets/products.json';
import * as cookieParser from 'cookie-parser';

var router = express.Router();

router.use(cookieParser());

router.get('/checkout', (req, res) => {
    res.render('/checkout');
});
router.get('/cart', (req, res) => {
    res.render('/cart');
});
router.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs', { products: products, total: req.session.cookie.cart.getTotal()});
});
router.get('/index', (req, res) => {
    res.render(__dirname + '/index.ejs', { products: products,  total: req.session.cookie.cart.getTotal()});
});
router.get('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    res.render(__dirname + '/item.ejs', {product: product, total: req.session.cookie.cart.getTotal()});
});

router.post('/product/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.cookie.cart.addToCart(product);
    res.redirect('/product/'+product.id);
});

router.get('/products/getProduct/:id', (req, res) => {
    const product = loadProduct(req.params.id);

    req.session.product = product;

    res.json(req.session.product);
});

router.get('/products/getJson', (req, res) => {
    res.json(products);
});

router.get('/cart', (req, res) =>{
    res.render(__dirname + '/cart.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

router.get('/checkout', (req, res) =>{
    res.render(__dirname + '/checkout.ejs', {products: req.session.cookie.cart.getCart().products,  total: req.session.cookie.cart.getTotal()});
});

router.post('/checkout', (req, res) =>{
    console.log("Vielen Dank für Ihren Einkauf! Ihr Einkauf betrug:" + req.session.cookie.cart.getTotal());
    req.session.cookie.cart.clearProducts();
    res.redirect("/");
});

function loadProduct(id: string){
    return products.find(p => p.id.toString() === id);
}

module.exports = router;