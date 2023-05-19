import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// ZT-NOTE: payload中，这里没有罗列的field都会被过滤掉，不会被更新
export default class UpdateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),
    description: schema.string.optional({ trim: true }),
    statusId: schema.enum.optional([1, 2, 3] as const),
    makerId: schema.number.optional(),
    categoryId: schema.number.optional(),
    startPrice: schema.number.optional(),
  });

  public messages: CustomMessages = {
    'title.minLength': 'Title must be at least {{ options.minLength }} characters',
    'title.maxLength': 'Title no more than {{ options.maxLength }} characters',
  };
}
