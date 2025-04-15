import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";
import Joi from "joi";

export function validateData(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Les données envoyées sont invalides",
        details: error.details.map((d) => d.message),
      });
    }

    req.body = schema.validate(req.body).value;
    next();
  };
}

export const productSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  img_path: Joi.string().optional(),
});

export const productSchemaUpdate = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  img_path: Joi.string().optional(),
});
