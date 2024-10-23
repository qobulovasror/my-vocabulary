import { Router } from "express";

const router = Router();

//get home
router.get('/', async (req, res, next)=>{
    try {
        console.log("home", req.token);
        res.send("THIS IS HOME PAGE");
    } catch (error) {
        next(error)
    }
});


export default router;