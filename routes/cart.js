import express from "express";
import jsonFunc from "../services/file.service.js";

const PATH = process.env.DATA_BASE;
const STARTING_BALANCE = process.env.STARTING_BALANCE
const router = express.Router()

router.get("/", async (req, res) => {
    const { customerId } = req.query;

    if (!customerId) {
        return res.status(400).json({
            success: false,
            message: "Missing customerId query parameter"
        });
    }

    try {

        const customers = await jsonFunc.readFromJson(`${PATH}customers.json`);
        const products = await jsonFunc.readFromJson(`${PATH}products.json`);

        let customer = customers.find(c => c.customerId === customerId);
        if (!customer) {
            customer = {
                customerId: customerId,
                balance: +STARTING_BALANCE,
                cart: [],
                createdAt: new Date().toISOString()
            };
            
            customers.push(customer);
            await jsonFunc.writeToJson(`${PATH}customers.json`, customers);
        }

        return res.status(200).json({
            success: true,
            data: customer.cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});



export default router;