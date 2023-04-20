import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import Project from 'App/Models/Project';
import { AccountFactory } from 'Database/factories';

test.group('Projects index', (group) => {
  group.each.setup(async () => {
    // Begin a new transaction for each test
    // End of test will rollback the transaction
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });
  test('return empty list when there are on projects', async ({ client }) => {
    const response = await client.get('/projects');
    // This assertAgainstApiSpec() checks the shape of response
    response.assertAgainstApiSpec();
    response.assertBodyContains({ meta: { total: 0 }, data: [] });
  });

  test('get a paginated list of existing projects', async ({ client, assert }) => {
    // This is like seeding the database
    await AccountFactory.query().with('projects', 40).create();
    const response = await client.get('/projects');
    // response.assertBodyContains({message:'hello world'})
    response.assertAgainstApiSpec();
    response.assertBodyContains({ meta: { total: 40, per_page: 20, current_page: 1 } });

    const projects = await Project.query().limit(20).preload('account').orderBy('id', 'desc');
    assert.containsSubset(
      response.body().data,
      projects.map((row) => row.toJSON())
    );
  });
});
