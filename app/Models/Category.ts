import AppBaseModel from './AppBaseModel';
import { column, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
export default class Category extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @computed()
  public get categoryName() {
    return this.name
  }

  @hasMany(() => Project, { foreignKey: 'categoryId' })
  public projects: HasMany<typeof Project>;
}
