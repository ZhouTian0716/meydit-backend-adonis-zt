import AppBaseModel from './AppBaseModel';
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Role extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => Account, { foreignKey: 'roleId' })
  public accounts: HasMany<typeof Account>;
}
