import db from '../config/config.db.js';
import { Role } from '../models/roles.models.js';
import { User } from '../models/user.models.js';
import { initialRoles, api, getAllContentsFromRoles } from './helpers.js';

beforeEach(async () => {
  await User.destroy({ where: {} });
  await Role.destroy({ where: {} });
  for (const role of initialRoles) {
    const roleObject = Role.build(role);
    await roleObject.save();
  }
});

describe('GET all roles', () => {
  test('roles are returned as json', async () => {
    await api
      .get('/api/role/roles')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there are two roles', async () => {
    const { response } = await getAllContentsFromRoles();
    expect(response.body.role).toHaveLength(initialRoles.length);
  });
});

describe('POST all roles', () => {
  test('a valid role can be added', async () => {
    const newRole = { role: 'new_role' };
    await api
      .post('/api/role/newRole')
      .send(newRole)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const { contents, response } = await getAllContentsFromRoles();

    expect(response.body.role).toHaveLength(initialRoles.length + 1);
    expect(contents).toContain(newRole.role);
  });

  test('role without content is not added', async () => {
    const newRole = { role: '' };
    await api.post('/api/role/newRole').send(newRole).expect(400);

    const { response } = await getAllContentsFromRoles();
    expect(response.body.role).toHaveLength(initialRoles.length);
  });

  test('a repeated role', async () => {
    const repeatedRole = { role: 'test_role' };
    await api
      .post('/api/role/newRole')
      .send(repeatedRole)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('PUT all role', () => {
  test('role without content is not added', async () => {
    const { response } = await getAllContentsFromRoles();
    const { role } = response.body;
    const roleUpdate = role[0];
    const newRole = { role: '' };
    await api.put(`/api/role/${roleUpdate.id}`).send(newRole).expect(400);
  });
  test('a valid role can be added', async () => {
    const { response: firstresponse } = await getAllContentsFromRoles();
    const { role } = firstresponse.body;
    const roleUpdate = role[0];
    const newRole = { role: 'new_role' };
    await api.put(`/api/role/${roleUpdate.id}`).send(newRole).expect(200);
    const { response: secondresponse, contents } =
      await getAllContentsFromRoles();
    expect(secondresponse.body.role).toHaveLength(initialRoles.length);
    expect(contents).toContain(newRole.role);
  });
  test('a repeated role', async () => {
    const { response } = await getAllContentsFromRoles();
    const { role } = response.body;
    const roleUpdate = role[0];
    const repeatedRole = { role: 'test_role' };
    await api
      .put(`/api/role/${roleUpdate.id}`)
      .send(repeatedRole)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('DELETE all role', () => {
  test('a role can be deleted', async () => {
    const { response: firstresponse } = await getAllContentsFromRoles();
    const { role } = firstresponse.body;
    const roleToDelete = role[1];
    await api.delete(`/api/role/${roleToDelete.id}`).expect(200);
    const { contents, response: secondResponse } =
      await getAllContentsFromRoles();
    expect(secondResponse.body.role).toHaveLength(initialRoles.length - 1);
    expect(contents).not.toContain(roleToDelete.role);
  });
});
afterAll(async () => {
  await db.close();
});
