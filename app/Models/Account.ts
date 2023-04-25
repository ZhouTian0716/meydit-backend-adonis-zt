import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string | null | undefined

  @column()
  public last_name: string | null | undefined

  @column()
  public email: string

  // ZT-NOTE: { serializeAs: null } helps not returning sensitive data
  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (account: Account) {
    if (account.$dirty.password) {
      account.password = await Hash.make(account.password)
    }
  }

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>
}
