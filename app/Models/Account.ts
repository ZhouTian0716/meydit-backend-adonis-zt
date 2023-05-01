import AppBaseModel from './AppBaseModel';
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
export default class Account extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  // ZT-NOTE: { serializeAs: 'firstName' } serializeAs here is almost like a field alias return for frontend
  @column()
  public firstName: string | null | undefined;

  @column()
  public lastName: string | null | undefined;

  @column()
  public email: string;

  // ZT-NOTE: { serializeAs: null } helps not returning sensitive data
  @column({ serializeAs: null })
  public password: string;

  @column()
  public role: string;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(account: Account) {
    if (account.$dirty.password) {
      account.password = await Hash.make(account.password);
    }
  }

  // ZT-NOTE: 这里的clientId是为了修改因为这个关系输出的改名
  // 否则默认是accountId
  @hasMany(() => Project, { foreignKey: 'clientId' })
  public projects: HasMany<typeof Project>;
}
