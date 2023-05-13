import AppBaseModel from './AppBaseModel';
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
export default class Category extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public url: string;

  @hasMany(() => Project, { foreignKey: 'categoryId' })
  public projects: HasMany<typeof Project>;
}
