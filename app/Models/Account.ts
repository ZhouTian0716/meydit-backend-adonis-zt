import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, hasMany, HasMany, belongsTo, BelongsTo, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
import Bid from './Bid';
import Role from './Role';
import Profile from './Profile';
import Address from './Address';

export default class Account extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  // ZT-NOTE: { serializeAs: 'firstName' } serializeAs here is almost like a field alias return for frontend
  @column()
  public firstName: string | null ;

  @column()
  public lastName: string | null ;

  @column()
  public email: string;

  // ZT-NOTE: { serializeAs: null } helps not returning sensitive data
  @column({ serializeAs: null })
  public password: string;

  @column({ serializeAs: null })
  public roleId: number;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(account: Account) {
    // $dirty here means password has been changed
    if (account.$dirty.password) {
      account.password = await Hash.make(account.password);
    }
  }

  // ZT-NOTE: 这里的clientId是为了修改因为这个关系输出的改名
  // 否则默认是accountId
  @hasOne(() => Profile, { foreignKey: 'accountId' })
  public profile: HasOne<typeof Profile>;

  @hasMany(() => Address, { foreignKey: 'accountId' })
  public addresses: HasMany<typeof Address>;

  @hasMany(() => Project, { foreignKey: 'clientId' })
  public projects: HasMany<typeof Project>;

  @hasMany(() => Bid, { foreignKey: 'makerId' })
  public bids: HasMany<typeof Bid>;

  @belongsTo(() => Role, { foreignKey: 'roleId' })
  public role: BelongsTo<typeof Role>;
}
