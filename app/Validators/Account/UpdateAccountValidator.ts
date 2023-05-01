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

  public messages: CustomMessages = {};
}

// ZT-NOTE: nullableAndOptional() is the suggested use case for patch request
