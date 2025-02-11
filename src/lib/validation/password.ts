import { DATABASE_CONSTANTS } from "./databaseConstants";

const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .max(DATABASE_CONSTANTS.varchar_password)
  .pattern(new RegExp('(?=.*[a-z])')) // at least one lowercase letter
  .pattern(new RegExp('(?=.*[A-Z])')) // at least one uppercase letter
  .pattern(new RegExp('(?=.*[0-9])')) // at least one number
  .required();

export const validatePassword = (password: string) => {
  const { error } = passwordSchema.validate(password);
  if (error) {
    return error.details[0].message;
  }
  return 'Password is valid';
};
