import express from "express";
import jsonFunc from "../services/file.service.js";

const PATH = process.env.DATA_BASE;
const router = express.Router();

router.get("/", async (req, res) => {

    const { inStock } = req.query;
    const { maxPrice } = req.query;
    const { search } = req.query;
    try {
        let filterProducts = await jsonFunc.readFromJson(`${PATH}products.json`);

        if (inStock === "true") {
            filterProducts = filterProducts.filter((product) =>
                product.stock > 0
            );
        }
        if (maxPrice && !isNaN(maxPrice)) {
            console.log(maxPrice);
            filterProducts = filterProducts.filter((product) =>
                product.price <= +maxPrice
            );
        }
        if (search) {
            filterProducts = filterProducts.filter((product) =>
                product.name.toLowerCase().includes(search.trim().toLowerCase())
            );
        }
        res.status(200).json({
            success: true,
            data: filterProducts
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default router;