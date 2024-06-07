import Joi from "joi";

const addDictionaryValidator = (data) => {
  const dictionarySchema = Joi.object({
    name: Joi.string().required().max(100),
    translation: Joi.string().required().max(150),
    // user_id: Joi.number().required(),
    transcription: Joi.string().max(80),
    description: Joi.string(),
    synonimId: Joi.number(),
    example: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
    vocabulary_groub_id: Joi.number(),
  });

  return dictionarySchema.validate(data);
};


const updateDictionaryValidator = (data) => {
  const dictionarySchema = Joi.object({
    name: Joi.string().required().max(100),
    translation: Joi.string().required().max(150),
    transcription: Joi.string().max(80),
    description: Joi.string(),
    synonimId: Joi.number(),
    example: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
    vocabulary_groub_id: Joi.number(),
  });
  return dictionarySchema.validate(data);
}

export { addDictionaryValidator, updateDictionaryValidator };
