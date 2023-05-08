import AppBaseModel from './AppBaseModel';
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Account from './Account';

export default class Role extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  // ZT-NOTE: { foreignKey: 'roleId' } optional here, 因为在Account里面也是用了roleId，除非需要改名
  @hasMany(() => Account, { foreignKey: 'roleId' })
  public accounts: HasMany<typeof Account>;
}
