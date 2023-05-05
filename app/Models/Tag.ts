import AppBaseModel from './AppBaseModel';
import { column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
export default class Tag extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @manyToMany(() => Project, {
    localKey: 'id',
    pivotForeignKey: 'tagId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'projectId',
    pivotTable: 'project_tag_relations',
    pivotTimestamps: true
  })
  public projects: ManyToMany<typeof Project>
}
