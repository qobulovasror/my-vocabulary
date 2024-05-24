import Joi from "joi";

const trackValidator = (data) => {
  const schema = Joi.object({
    status: Joi.number().required().min(1).max(10),
    dictionary_id: Joi.number().required(),
    // user_id
  });
  return schema.validate(data);
};

export default trackValidator;
