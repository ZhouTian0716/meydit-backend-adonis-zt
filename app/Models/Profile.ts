import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Profile extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public avatar: string | null ;

  @column()
  public bio: string | null ;

  @column({ serializeAs: null })
  public accountId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Account, { foreignKey: 'accountId' })
  public account: BelongsTo<typeof Account>;
}
