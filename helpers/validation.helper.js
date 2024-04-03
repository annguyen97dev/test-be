import Joi from "joi";

const validator = (schema) => (payload) => schema.validateAsync(payload);

const userSchema = {
  login: validator(
    Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
    })
  ),
  sendActivateCode: validator(
    Joi.object({
      email: Joi.string().email().lowercase().required(),
    })
  ),
  activate: validator(
    Joi.object({
      email: Joi.string().email().lowercase().required(),
      code: Joi.string().required(),
    })
  ),
  register: validator(
    Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      weight: Joi.number().required(),
      height: Joi.number().required(),
      gender: Joi.string().required(),
    })
  ),
  updateNewPassword: validator(
    Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    })
  ),
  updateAdmin: validator(
    Joi.object({
      _id: Joi.required(),
      userName: Joi.string().required(),
      role: Joi.number().required(),
      telegramId: Joi.string().required(),
      password: Joi.string().required(),
    })
  ),
};

export { userSchema };
