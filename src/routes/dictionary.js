import { Router } from "express";
import Dictionary from "../model/Dictionary.js";
import {
  addDictionaryValidator,
  updateDictionaryValidator,
} from "../validators/dictionaryValidator.js";
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";

const router = Router();

//get own dictionary
router.get("/", auth, async (req, res, next) => {
  try {
    const userID = req.user.id;
    if (!userID) throw new res.error("403", "user id not fount");
    const dictionaries = await Dictionary.findAll({
      where: { user_id: userID },
    });
    res.json({ dictionaries: dictionaries });
  } catch (error) {
    next(error);
  }
});

//get all dictionaries for Admin
router.get("/all", [auth, role], async (req, res) => {
  try {
    const dictionaries = await Dictionary.findAll();
    res.json({ dictionaries: dictionaries });
  } catch (error) {
    next(error);
  }
});

//get a dictionary by id for everyone
router.get("/:id", auth, async (req, res) => {
  try {
    const dicId = req.params.id;
    if (!dicId) throw new res.error(403, "dictionary's id missed in params");
    const dictionary = await Dictionary.findAll({ where: { id: dicId } });
    if(!dictionary) throw new res.error(404, "dictionary not found");
    res.json({ dictionary: dictionary });
  } catch (error) {
    next(error);
  }
});

//add dicrionary
router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = addDictionaryValidator(req.body);
    if (error) throw new res.error(400, error.details[0].message);
    let newDictionary = await Dictionary.findOne({
      where: { name: req.body.name },
    });
    if (newDictionary)
      throw new res.error(403, "a dictionary with this name already exists");
    const user_id = req.user.id;
    newDictionary = await Dictionary.create({
      name: req.body.name,
      translation: req.body.translation,
      user_id: user_id,
      vocabulary_groub_id: req.body.vocabulary_groub_id,
      transcription: req.body.transcription,
      description: req.body.description,
      synonimId: req.body.synonimId,
      example: req.body.example,
      status: req.body.status,
      type: req.body.type,
    });
    res.json({ dictionary: newDictionary }).status(201);
  } catch (error) {
    next(error);
  }
});

// update dictionary
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { error } = updateDictionaryValidator(req.body);
    if (error) throw new res.error(400, error.details[0].message);
    if (!req.params.id) throw new res.error(403, "id missed in params");
    let dictionary = await Dictionary.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!dictionary)
      throw new res.error(404, "a dictionary with this name doesn't exists");
    dictionary = await Dictionary.update(
      {
        name: req.body.name,
        translation: req.body.translation,
        vocabulary_groub_id: req.body.vocabulary_groub_id,
        transcription: req.body.transcription,
        description: req.body.description,
        synonimId: req.body.synonimId,
        example: req.body.example,
        status: req.body.status,
        type: req.body.type,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.json({ ok: true, message: "Successful updated" }).status(200);
  } catch (error) {
    next(error);
  }
});

// delete dictionary
router.delete("/:id", auth, async (req, res, next) => {
  try {
    if (!req.params.id) throw new res.error(403, "id missed in params");
    let dictionary = await Dictionary.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    if (!dictionary)
      throw new res.error(404, "a dictionary with this name doesn't exists");
    dictionary = await Dictionary.destroy({ where: { id: req.params.id }, });
    res.json({ dictionary: dictionary }).status(200);
  } catch (error) {
    next(error);
  }
});

export default router;
