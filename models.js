const mongoose = require(&#39;mongoose&#39;);
// Esquema para los productos
const productSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
price: {
type: Number,
required: true
}
});
// Modelo de producto
const Product = mongoose.model(&#39;Product&#39;, productSchema);
module.exports = Product;

