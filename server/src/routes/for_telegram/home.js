import { Router } from "express";
import User from "../../model/User.js";
import auth from "../../middleware/authMiddleware.js";
import { parseJwt } from "../../helper/token.js";

const router = Router();

//get home
router.get('/', auth, async (req, res, next)=>{
    try {
        const token = parseJwt(req.session.token);
        const user = await User.findOne({ where: { id: token?.id } });
        res.render('index', {full_name: user.dataValues.full_name, phone_number: user.dataValues.phone_number, profile_img: user.dataValues.profile_img});
    } catch (error) {
        next(error)
    }
});


export default router;