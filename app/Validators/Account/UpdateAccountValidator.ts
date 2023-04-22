import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string.nullableAndOptional({ trim: true }, [
      rules.confirmed(),
      rules.minLength(4),
      rules.maxLength(50),
    ]),
    role: schema.enum.nullableAndOptional(['client', 'maker', 'admin'] as const),
    first_name: schema.string.nullableAndOptional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
    last_name: schema.string.nullableAndOptional({ trim: true }, [
      rules.alpha({
        allow: ['space', 'underscore', 'dash'],
      }),
      rules.minLength(2),
    ]),
  });

  public messages: CustomMessages = {};
}