import { test } from '@japa/runner';

test.group('Projects index', () => {
  test('get collection of projects from the database', async ({ client }) => {
    const response = await client.get('/projects');
    response.assertStatus(200);
    // console.log(response.body());
    response.assertAgainstApiSpec()
  });
});
