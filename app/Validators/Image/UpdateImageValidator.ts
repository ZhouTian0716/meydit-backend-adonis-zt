import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isProjectCover: schema.boolean(),
  });

  public messages: CustomMessages = {};
}
