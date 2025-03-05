const express = require(&#39;express&#39;);
const mongoose = require(&#39;mongoose&#39;);
const cors = require(&#39;cors&#39;);
const Product = require(&#39;./models/Product&#39;);
const app = express();
// Configuración de middleware
app.use(express.json()); // Para manejar solicitudes JSON
app.use(cors()); // Para permitir solicitudes CORS desde otros dominios

// Conexión a la base de datos de MongoDB
mongoose.connect(&#39;mongodb://localhost:27017/productdb&#39;, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() =&gt; console.log(&#39;Conectado a MongoDB&#39;))
.catch((err) =&gt; console.log(&#39;Error al conectar con MongoDB:&#39;, err));
// Ruta para obtener todos los productos
app.get(&#39;/api/products&#39;, async (req, res) =&gt; {
try {
const products = await Product.find();
res.json(products);
} catch (error) {
res.status(500).json({ message: &#39;Error al obtener los productos&#39; });
}
});
// Ruta para agregar un producto (opcional)
app.post(&#39;/api/products&#39;, async (req, res) =&gt; {
const { name, price } = req.body;
const newProduct = new Product({ name, price });
try {
const savedProduct = await newProduct.save();
res.status(201).json(savedProduct);
} catch (error) {
res.status(500).json({ message: &#39;Error al guardar el producto&#39; });
}
});
// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () =&gt; {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});
