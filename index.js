import express from "express";
import accountRouter from "./routes/account.js"
import cartRouter from "./routes/cart.js"
import ordersRouter from "./routes/orders.js"
import productsRouter from "./routes/products.js"
import healthRouter from "./routes/health.js"

const PORT = process.env.PORT
const app = express();

app.use(express.json())
app.use("/account", accountRouter)
app.use("/cart", cartRouter)
app.use("/orders", ordersRouter)
app.use("/products", productsRouter)
app.use("/health", healthRouter)

app.get("/", (req, res)=>{
    res.end("Hello")
})

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})