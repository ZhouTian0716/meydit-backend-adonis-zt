import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import { BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Account from './Account';
import Image from './Image';

export default class Project extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title'],
    allowUpdates: false,
  })
  public slug: string;

  @column()
  public title: string;

  @column()
  public description: string | null;

  @column()
  public startPrice: number | null;

  @column()
  public status: string;

  @column({ serializeAs: null })
  public makerId: number;

  @column({ serializeAs: null })
  public clientId: number;

  // ZT-NOTE: format can be change
  // { autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd LLL yyyy'),}
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // ZT-NOTE: Relationships
  @belongsTo(() => Account,{ foreignKey: 'clientId' })
  public client: BelongsTo<typeof Account>;

  @belongsTo(() => Account, { foreignKey: 'makerId' })
  public maker: BelongsTo<typeof Account>;

  @hasMany(() => Image, { foreignKey: 'projectId' })
  public images: HasMany<typeof Image>;
}
