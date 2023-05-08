import AppBaseModel from './AppBaseModel';
import { column } from '@ioc:Adonis/Lucid/Orm';

export default class ProjectTag extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public projectId: number;

  @column()
  public tagId: number;
}

