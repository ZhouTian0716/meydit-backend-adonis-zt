import Factory from '@ioc:Adonis/Lucid/Factory';
import Project from 'App/Models/Project';
import Account from 'App/Models/Account';

export const ProjectFactory = Factory.define(Project, ({ faker }) => {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.paragraph(3),
    status: 'released',
    // slug:faker.lorem.words(3)
  };
})
  .relation('client', () => AccountFactory)
  .build();

export const AccountFactory = Factory.define(Account, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    role: 'client',
  };
})
  .relation('projects', () => ProjectFactory)
  .build();
