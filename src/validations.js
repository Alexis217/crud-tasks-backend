import { body } from "express-validator";

export const validacionDetask = [
    body("title")
    .isString().withMessage("El título debe ser un string")
    .notEmpty().withMessage("El título no puede estar vacío"),
    body("description")
    .isString().withMessage("La descripción debe ser un string")
    .notEmpty().withMessage("La descripción no puede estar vacía"),
    body("isComplete")
    .isBoolean().withMessage("El estado debe ser un booleano")
    .notEmpty().withMessage("El estado no puede estar vacío"),
]

export const validacionDeupdate = [
    body("title")
    .optional()
    .isString().withMessage("El título debe ser un string"),
    body("description")
    .isString().withMessage("La descripción debe ser un string"),
    body("isComplete")
    .isBoolean().withMessage("El estado debe ser un booleano")
]