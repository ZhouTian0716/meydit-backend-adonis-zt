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
    password: schema.string({ trim: true }, [rules.confirmed(), rules.minLength(4), rules.maxLength(50)]),
    role: schema.enum(['client', 'maker', 'admin'] as const),
    first_name: schema.string.optional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
    last_name: schema.string.optional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
  });

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/guides/validator/custom-messages
  public messages: CustomMessages = {};
}
