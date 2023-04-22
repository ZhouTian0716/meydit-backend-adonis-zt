import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true },[rules.minLength(2), rules.maxLength(50)]),
    image: schema.string.nullableAndOptional(),
    description: schema.string.nullableAndOptional({ trim: true }),
  });

  public messages: CustomMessages = {};
}
