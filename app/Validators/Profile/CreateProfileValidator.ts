import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.string({ trim: true }),
    bio: schema.string.nullableAndOptional({ trim: true }),
    accountId: schema.number(),
  });

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/guides/validator/custom-messages
  public messages: CustomMessages = {};
}
