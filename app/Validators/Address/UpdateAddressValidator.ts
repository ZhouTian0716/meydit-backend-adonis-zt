import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    number: schema.string.nullableAndOptional({ trim: true }),
    route: schema.string.nullableAndOptional({ trim: true }),
    city: schema.string.nullableAndOptional({ trim: true }),
    state: schema.string.nullableAndOptional({ trim: true }),
    zip: schema.string.nullableAndOptional({ trim: true }),
    country: schema.string.nullableAndOptional({ trim: true }),
    isPrimary: schema.boolean.optional(),
    // accountId: schema.number(),
  });

  public messages: CustomMessages = {};
}
