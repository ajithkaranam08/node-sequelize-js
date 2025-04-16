import { Router } from "express";

const router = Router()

router.use("/users",()=> console.log("user router"))
router.use("/products",()=> console.log("product router"))


export default router