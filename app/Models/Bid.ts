import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import Account from './Account';
import Project from './Project';

export default class Bid extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public comment: string;

  @column()
  public price: number;

  @column({ serializeAs: null })
  public projectId: number;

  @column({ serializeAs: null })
  public makerId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // ZT-NOTE: Relationships
  @belongsTo(() => Project, { foreignKey: 'projectId' })
  public project: BelongsTo<typeof Project>;

  @belongsTo(() => Account, { foreignKey: 'makerId' })
  public maker: BelongsTo<typeof Account>;
}
