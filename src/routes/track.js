import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import trackValidator from "../validators/trackValidator.js";
import MemoryTrack from "../model/MemoryTrack.js";

const router = Router();
//get all tracks
router.get("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tracks = await MemoryTrack.findAll({where: {user_id: userId}});
    res.json(tracks);
  } catch (error) {
    next(error);
  }
});

// get a track by id
router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    if (!id) throw new res.error(403, "id is missed");
    const track = await MemoryTrack.findOne({ where: { id: id, user_id: userId } });
    if(!track) throw new res.error(404, "data not found");
    res.json(track);
  } catch (error) {
    next(error);
  }
});

//add track
router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = trackValidator(req.body);
    if (error) throw new res.error(403, error.details[0].message);
    const track = await MemoryTrack.create({
      status: req.body.status,
      dictionary_id: req.body.dictionary_id,
      user_id: req.user.id,
    });
    res.json(track).status(201);
  } catch (error) {
    next(error);
  }
});

//update role
router.put("/:id", auth, async (req, res, next) => {
  try {
    if(!req.params.id) throw new res.error(403, "id is missed");
    let track = await MemoryTrack.findOne({where: {id: req.params.id, user_id: req.user.id}});
    if(!track) throw new res.error(404, "data not found");
    const { error } = trackValidator(req.body);
    if (error) throw new res.error(403, error.details[0].message);
    track = await MemoryTrack.update(
      {
        status: req.body.status,
        dictionary_id: req.body.dictionary_id
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json({ok: true, message: "track successful updated"}).status(200);
  } catch (error) {
    next(error);
  }
});


//delete track by id
router.delete("/:id", auth, async(req, res, next) => {
    try {
        if(!req.params.id) throw new error(403, "id is missed");
        let track = await MemoryTrack.findOne({where: {id: req.params.id, user_id: req.user.id}});
        if(!track) throw new res.error(404, "data not found");
        track = await MemoryTrack.destroy({where: {id: req.params.id}});
        res.json(track);
    } catch (error) {
        next(error);
    }
});
export default router;
