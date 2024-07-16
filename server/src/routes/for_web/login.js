import { Router } from "express";

const router = Router();

//get home
router.get('/', async (req, res, next)=>{
    try {
        res.render('login');
    } catch (error) {
        next(error)
    }
});


export default router;