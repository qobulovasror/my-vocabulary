import { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../model/User.js";
import { authUserValidator } from "../validators/userValidator.js";
import generateToken from '../helper/token.js';
const router = Router()

router.post('/', async (req, res, next)=>{
    try {
        const {error} = authUserValidator(req.body);
        if(error) throw new res.error(400, error.details[0].message);
        let user = await User.findOne({ where: { email: req.body.email }});
        if(user===null) throw new res.error(403, "Email or password incorrect !");
        const isValidator = await bcrypt.compare(req.body.password, user.password);
        if(!isValidator)
            throw new res.error(403, "Email or password incorrect !");
        const token = generateToken({email: user.email, id: user.id, role: user.role_id});
        res.header("x-auth-token", token).json({ok: true, message: "successful"}).status(200);
    } catch (error) {
        next(error)
    }
});

export default router;