import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/reference/validator/schema/string
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'categories', column: 'name', caseInsensitive: true }),
    ]),
  });

  // ZT-NOTE: REFER TO https://docs.adonisjs.com/guides/validator/custom-messages
  public messages: CustomMessages = {};
}
