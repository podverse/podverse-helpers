import Joi from 'joi';

export function validateEmail(email: string): boolean {
  const schema = Joi.string().email();
  const { error } = schema.validate(email);
  return error ? false : true;
}
