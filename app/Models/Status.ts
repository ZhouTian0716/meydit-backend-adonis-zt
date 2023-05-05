import AppBaseModel from './AppBaseModel';
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';

export default class Status extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => Project, { foreignKey: 'statusId' })
  public projects: HasMany<typeof Project>;
}
