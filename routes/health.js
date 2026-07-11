import express from "express";

const router = express.Router()

router.get("/", (req, res)=>{
    res.end("All is good")
})

export default router;