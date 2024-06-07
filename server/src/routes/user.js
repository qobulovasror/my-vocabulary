import { Router } from "express";
import bcrypt from 'bcrypt';
import generateToken from '../helper/token.js';
import {addUserValidator, updateUserValidator} from '../validators/userValidator.js';
import User from '../model/User.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

const router = Router();

//add user (regis)
router.post('/', async (req, res, next)=>{
    try {
        const {error} = addUserValidator(req.body);
        if(error) throw new res.error(400, error.details[0].message);
        let user = await User.findOne({ where: { email: req.body.email }});
        if(user!==null) throw new res.error(403, "This email already exist !");
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            idRole: (req.body.idRole)? req.body.idRole: 2,
        });
        const token = generateToken({email: user.email, id: user.id, role: user.idRole});
        res.header("x-auth-token", token).json({ok: true, message: "user successful creared"}).status(201);
    } catch (error) {
        next(error)
    }
});

//get all user
router.get('/', [auth, role], async (req, res, next)=>{
    try {
        const users = await User.findAll({attributes: ['id', 'name', 'email', 'role_id', 'createAt']});
        return res.json({user: users});
    } catch (error) {
        next(error)
    }
})

//get a user by id
router.get('/:id', auth, async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id) throw new res.error(402, "id not fount!");
        const user = await User.findOne({where: {id: id}});
        if(!user) throw new res.error(404, "user not fount !");
        return res.json({user: user});
    } catch (error) {
        next(error)
    }
})

//update user by role
router.put('/:id', auth, async (req, res, next)=>{
    try {
        const id = req.params.id;
        if(!id) throw new res.error(403, "id not fount!");
        let user = await User.findOne({where: {id: id}});
        if(!user) throw new res.error(404, "user not fount !");
        const {error} = updateUserValidator(req.body);
        if(error) throw new res.error(403, error.details[0].message);
        user = await User.update({
            name: req.body.name,
            email: req.body.email
        }, {
            where: {id: id}
        })
        return res.json({user: user});
    } catch (error) {
        next(error)
    }
})

export default router;