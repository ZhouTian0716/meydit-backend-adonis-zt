import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/reference/validator/schema/string
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'accounts', column: 'email', caseInsensitive: true }),
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed(),
      rules.minLength(8),
      rules.maxLength(20),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/),
    ]),
    roleId: schema.number([
      rules.unsigned(),
    ]),
    firstName: schema.string.nullableAndOptional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
    lastName: schema.string.nullableAndOptional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
  });

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/guides/validator/custom-messages
  public messages: CustomMessages = {
    'required': '{{ field }} is required',
    // unique:'The {{ field }} has been used'
    'email.unique': 'Provided email has been used',
    'email.email': 'Please provide a valid email address',
    'password.confirmed': 'Password confirmation does not match',
    'password.minLength': 'Password must be at least {{ options.minLength }} characters',
    'password.maxLength': 'Password not more than {{ options.maxLength }} characters',
    'password.regex': 'The password must contain at least one uppercase letter, one number, one special character (except spaces).',
  };
}

// Guide for defining custom messages
// public messages: CustomMessages = {
//   '<schema-field>.<rule>': 'custom message here (what your frontend want to get, response.messages.errors.password)',
// };

// frontend useage
// const messages = response.messages.errors.map((error) => error.message)
