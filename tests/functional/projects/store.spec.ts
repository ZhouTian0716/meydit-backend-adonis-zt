import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';
import { AccountFactory } from 'Database/factories';

test.group('Projects store', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('user must be logged in before creating the project', async ({ client, route }) => {
    const response = await client.post(route('ProjectsController.store')).form({
      title: 'Hello world',
      description: 'Hello, everyone. This is testing 101',
    });

    response.assertStatus(401);
    response.assertAgainstApiSpec();
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
    });
  });

  test('return 422, to warn invalid request payload', async ({ client, route }) => {
    const user = await AccountFactory.query().create();
    const response = await client.post(route('ProjectsController.store')).loginAs(user);
    // response.dumpBody();
    response.assertStatus(422);
    response.assertAgainstApiSpec();
    response.assertBodyContains({
      errors: [{ message: 'required validation failed', field: 'title' }],
    });
  });

  test('create a project with valid payload', async ({ client, route }) => {
    const user = await AccountFactory.query().create();
    const response = await client.post(route('ProjectsController.store')).loginAs(user).form({
      title: 'Hello world',
      description: 'Hello, everyone. This is testing 101',
      image: 'https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/nature/1.jpg',
    });
    response.assertStatus(201);
    response.assertAgainstApiSpec();
    response.assertBodyContains({
      data: {
        title: 'Hello world',
        description: 'Hello, everyone. This is testing 101',
        image: 'https://zt-image-storage.s3.ap-southeast-2.amazonaws.com/nature/1.jpg',
        // ZT-NOTE: pay attention to the { id: user.id } obj structure here
        account: { id: user.id },
      },
    });
  });
});
