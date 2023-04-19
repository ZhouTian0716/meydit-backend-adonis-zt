import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public slug: string;

  @column()
  public description: string;

  @column()
  public image: string | null | undefined;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createSlug(project: Project) {
    // project.slug = project.$dirty.title
    project.slug = Date.now().toString();
  }
}
