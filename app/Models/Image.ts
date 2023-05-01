import { DateTime } from 'luxon'
import {  BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'
import AppBaseModel from './AppBaseModel';

export default class Image extends AppBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string;

  @column()
  public fileName: string;

  @column({ serializeAs: null })
  public projectId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // ZT-NOTE: Relationships
  @belongsTo(() => Project, { foreignKey: 'projectId' })
  public project: BelongsTo<typeof Project>;
}
