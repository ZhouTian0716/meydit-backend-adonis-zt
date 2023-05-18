import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  // ZT-NOTE: 测试过，如果insomnia传了email（多余的field），这里也能过，但是数据库不会更新email（多余的field）
  public schema = schema.create({
    password: schema.string.nullableAndOptional({ trim: true }, [
      rules.confirmed(),
      rules.minLength(8),
      rules.maxLength(20),
      rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/),
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

  public messages: CustomMessages = {
    'required': '{{ field }} is required',
    'alpha': '{{ field }} must contain only letters (a-zA-Z)',
    'password.confirmed': 'Password confirmation does not match',
    'password.minLength': 'Password must be at least {{ options.minLength }} characters',
    'password.maxLength': 'Password not more than {{ options.maxLength }} characters',
    'password.regex':
      'The password must contain at least one uppercase letter, one number, one special character (except spaces).',
  };
}

// ZT-NOTE: nullableAndOptional() is the suggested use case for patch request
