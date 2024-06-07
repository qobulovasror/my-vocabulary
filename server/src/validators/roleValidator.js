import Joi from "joi";

const roleValidator = (data) => {
    const roleSchema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        description: Joi.string().max(350)
    });
    return roleSchema.validate(data);
}

export default roleValidator;