import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { ProjectFactory } from 'Database/factories'


test.group('Projects show', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('return 404 when project does not exists', async ({ client, route }) => {
    const response = await client.get(route('ProjectsController.show', { id: 1 }))

    response.assertStatus(404)
    response.assertAgainstApiSpec()
  })

  test('get project by id', async ({ client, route }) => {
    const project = await ProjectFactory.query().with('account').create()
    const response = await client.get(route('ProjectsController.show', { id: project.id }))

    response.assertStatus(200)
    response.assertAgainstApiSpec()
    response.assertBodyContains({ data: project.toJSON() })
  })
})
