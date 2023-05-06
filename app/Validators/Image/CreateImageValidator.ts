import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    url: schema.string({ trim: true },[
      rules.unique({ table: 'images', column: 'url', caseInsensitive: true }),
    ]),
    fileName: schema.string(),
    projectId: schema.number(),
  });

  public messages: CustomMessages = {};
}
