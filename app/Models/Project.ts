import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import {
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import Account from './Account';
import Category from './Category';
import Status from './Status';
import Image from './Image';
import Tag from './Tag';

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

  @column({ serializeAs: null })
  public statusId: number;

  @column({ serializeAs: null })
  public makerId: number | null;

  @column({ serializeAs: null })
  public clientId: number;

  @column({ serializeAs: null })
  public categoryId: number;

  // ZT-NOTE: format can be change
  // { autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd LLL yyyy'),}
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // ZT-NOTE: Relationships
  @belongsTo(() => Category, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof Category>;

  @belongsTo(() => Status, { foreignKey: 'statusId' })
  public status: BelongsTo<typeof Status>;

  @belongsTo(() => Account, { foreignKey: 'clientId' })
  public client: BelongsTo<typeof Account>;

  @belongsTo(() => Account, { foreignKey: 'makerId' })
  public maker: BelongsTo<typeof Account>;

  @hasMany(() => Image, { foreignKey: 'projectId' })
  public images: HasMany<typeof Image>;

  @manyToMany(() => Tag, {
    pivotTable: 'project_tag',
  })
  public tags: ManyToMany<typeof Tag>;
}
  
// @manyToMany(() => Tag, {
//   localKey: 'id',
//   pivotForeignKey: 'projectId',
//   relatedKey: 'id',
//   pivotRelatedForeignKey: 'tagId',
//   pivotTable: 'project_tag',
//   pivotTimestamps: true,
// })
// public tags: ManyToMany<typeof Tag>;
