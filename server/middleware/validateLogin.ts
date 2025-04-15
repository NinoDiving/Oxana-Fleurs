import type { RequestHandler } from "express";
import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
});

export const validateLogin: RequestHandler = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      status: "error",
      message: "Échec de la validation du login",
      details: error.details.map((d) => d.message),
    });
    return;
  }

  next();
};
