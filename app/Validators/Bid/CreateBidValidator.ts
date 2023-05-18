import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateBidValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    comment: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(200)]),
    price: schema.number(),
    projectId: schema.number(),
    makerId: schema.number(),
  });

  public messages: CustomMessages = {};
}
