import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    description: schema.string.nullableAndOptional({ trim: true }),
    statusId: schema.enum.nullableAndOptional([1, 2, 3] as const),
  });

  public messages: CustomMessages = {};
}
