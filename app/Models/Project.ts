import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Account from './Account';

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
    allowUpdates: false,
  })
  public slug: string;

  @column()
  public description: string | null;

  @column()
  public image: string | null;

  @column()
  public status: string;

  @column({ serializeAs: null })
  public makerId: number;

  @column({ serializeAs: null })
  public accountId: number;

  // ZT-NOTE: format can be change
  // { autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd LLL yyyy'),}
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>;

  // ZT-NOTE: computed feature
  // Adding a computed property to the return object for this model
}
