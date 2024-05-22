import Joi from "joi";

const addUserValidator = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(20),
    rol_id: Joi.number().min(1),
  });

  return userSchema.validate(data);
};

const authUserValidator = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(20)
  });

  return userSchema.validate(data);
};

const updateUserValidator = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required()
  });
  return userSchema.validate(data);
}

export { addUserValidator, authUserValidator, updateUserValidator };
