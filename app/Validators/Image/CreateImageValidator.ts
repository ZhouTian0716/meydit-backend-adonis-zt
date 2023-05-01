import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    url: schema.string({ trim: true }),
    fileName: schema.string(),
    projectId: schema.number(),
  });

  public messages: CustomMessages = {};
}
