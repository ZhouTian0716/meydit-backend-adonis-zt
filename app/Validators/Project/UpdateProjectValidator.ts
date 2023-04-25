import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    image: schema.string.nullableAndOptional({ trim: true }),
    description: schema.string.nullableAndOptional({ trim: true }),
    status: schema.enum.nullableAndOptional(['Released', 'In Progress', 'Completed'] as const),
  });

  public messages: CustomMessages = {};
}
