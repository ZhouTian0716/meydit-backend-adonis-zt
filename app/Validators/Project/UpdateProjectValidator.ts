import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// ZT-NOTE: payload中，这里没有罗列的field都会被过滤掉，不会被更新
export default class UpdateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.nullableAndOptional({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),
    description: schema.string.nullableAndOptional({ trim: true }),
    statusId: schema.enum.nullableAndOptional([1, 2, 3] as const),
    startPrice: schema.number(),
  });

  public messages: CustomMessages = {};
}
