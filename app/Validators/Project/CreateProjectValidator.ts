import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  // ZT-NOTE: 创建project时，打算以后再修改的field，宜用nullable，
  // 沟通前端，让创建的时候，默认给这些field一个默认值，比如description: null
  // 比如这里的description，如果用optional, 那么在进入project修改页面时，description这个field就会被忽略，不会显示在页面上
  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(50)]),
    description: schema.string.optional({ trim: true }, [rules.minLength(2), rules.maxLength(500)]),
    startPrice: schema.number(),
    categoryId: schema.number.optional(),
    // ZT-NOTE: 这里的tagIds是一个array，所以用members
    // 修改的不是project本身，这些个field拿去赋给project以外的model
    tagIds: schema.array
      .optional()
      .members(schema.number([rules.exists({ table: 'tags', column: 'id' })])),
  });

  public messages: CustomMessages = {};
}
