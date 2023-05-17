import AppBaseModel from './AppBaseModel';
import { column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Address extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public number: string | null;

  @column()
  public route: string | null;

  @column()
  public city: string | null;

  @column()
  public state: string | null;

  @column()
  public zip: string | null;

  @column()
  public country: string | null;

  @column()
  public isPrimary: boolean;

  @column({ serializeAs: null })
  public accountId: number;

  @belongsTo(() => Account, { foreignKey: 'accountId' })
  public account: BelongsTo<typeof Account>;
}
