import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import roleValidator from "../validators/roleValidator.js";
import Role from "../model/Role.js";

const router = Router();
//get all roles
router.get("/", [auth, role], async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    next(error);
  }
});

// get a role bu id
router.get("/:id", [auth, role], async (req, res, next) => {
  try {
    const roleId = req.params.id;
    if (!roleId) throw new res.error(403, "id is missed");
    const role = await Role.findOne({ where: { id: roleId } });
    if(!role) throw new res.error(404, "role not found");
    res.json(role);
  } catch (error) {
    next(error);
  }
});

//add role
router.post("/", [auth, role], async (req, res, next) => {
  try {
    const { error } = roleValidator(req.body);
    if (error) throw new res.error(403, error.details[0].message);
    const role = await Role.create({
      name: req.body.name,
      description: (req.body.description)? req.body.description: "",
    });
    res.json(role).status(201);
  } catch (error) {
    next(error);
  }
});

//update role
router.put("/:id", [auth, role], async (req, res, next) => {
  try {
    if(!req.params.id) throw new res.error(403, "role id is missed");
    let role = await Role.findOne({where: {id: req.params.id}});
    if(!role) throw new res.error(404, "role not found");
    const { error } = roleValidator(req.body);
    if (error) throw new res.error(403, error.details[0].message);
    role = await Role.update(
      {
        name: req.body.name,
        description: (req.body.description)? req.body.description: "",
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json({ok: true, message: "role successful updated"}).status(200);
  } catch (error) {
    next(error);
  }
});

//delete role by id
router.delete("/:id", [auth, role], async(req, res, next) => {
    try {
        if(!req.params.id) throw new error(403, "id is missed");
        let role = await Role.findOne({where: {id: req.params.id}});
        if(!role) throw new res.error(404, "role not found");
        role = await Role.destroy({where: {id: req.params.id}});
        res.json(role);
    } catch (error) {
        next(error);
    }
});
export default router;
