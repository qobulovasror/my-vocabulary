import { Router } from "express";
import User from "../../model/User.js";

const router = Router();

//get home
router.get('/', async (req, res, next)=>{
    try {
        // const user = await User.findOne({where: {id: id}})
        // res.render('index', {full_name, phone_number, });
        res.render('index', {full_name: "Qobulov Asror", phone_number: "+998933582827"});
    } catch (error) {
        next(error)
    }
});


export default router;