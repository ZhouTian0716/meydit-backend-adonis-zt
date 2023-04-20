import { test } from '@japa/runner';
import { AccountFactory } from 'Database/factories';

test.group('Projects index', () => {
  test('return empty list when there are on projects', async ({ client }) => {
    const response = await client.get('/projects');
    // This assertAgainstApiSpec() checks the shape of response
    response.assertAgainstApiSpec();
    response.assertBodyContains({ meta: { total: 0 }, data: [] });
  });

  test('get a paginated list of existing projects', async ({ client }) => {
    await AccountFactory.query().with('projects', 40).create();
    const response = await client.get('/projects');
    // response.assertStatus(200);
    // console.log(response.body());
    // response.assertBodyContains({message:'hello world'})
    response.assertAgainstApiSpec();
    response.assertBodyContains({ meta: { total: 40, per_page: 20, current_page: 1 } });
  });
});
