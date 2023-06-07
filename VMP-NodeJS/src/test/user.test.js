import db from '../config/config.db.js';
import { User } from '../models/user.models.js';
import { api, getAllContentsFromUser, initialUser } from './helpers';

beforeEach(async () => {
  await User.destroy({ where: {} });
  for (const user of initialUser) {
    const userObject = User.build(user);
    await userObject.save();
  }
});

describe('GET all users', () => {
  test('user are returned as json', async () => {
    await api
      .get('/api/user/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there are two users', async () => {
    const { response } = await getAllContentsFromUser();
    expect(response.body.user).toHaveLength(initialUser.length);
  });
});
describe('POST all users', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      id: 2,
      role_id: 1,
      fname: 'testfnamer',
      lname: 'testlnamer',
      user_name: 'tester12',
      email: 'test1@test.com',
      pass: '123456',
    };
    await api
      .post('/api/user/newUser')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const { response, contentsUser } = await getAllContentsFromUser();
    expect(response.body.user).toHaveLength(initialUser.length + 1);
    expect(contentsUser).toContain(newUser.user_name);
  });
  test('user without content is not added', async () => {
    const newUser = {
      role_id: 1,
      fname: '',
      lname: '',
      user_name: '',
      email: '',
      pass: '',
    };
    await api.post('/api/user/newUser').send(newUser).expect(400);
    const { response } = getAllContentsFromUser();
    expect(response.body.user).toHaveLength(initialUser.length);
  });
  test('a repeated user_name', async () => {
    const repeatedUser = {
      id: 2,
      role_id: 1,
      fname: 'testfnamer',
      lname: 'testlnamer',
      user_name: 'tester1',
      email: 'test1@test.com',
      pass: '123456',
    };
    await api
      .post('/api/user/newUser')
      .send(repeatedUser)
      .expect(409)
      .expect('Content-Type', /application\/json/);
  });
  test('a repeated email', async () => {
    const repeatedUser = {
      id: 2,
      role_id: 1,
      fname: 'testfnamer',
      lname: 'testlnamer',
      user_name: 'tester16',
      email: 'test1@test.com',
      pass: '123456',
    };
    await api
      .post('/api/user/newUser')
      .send(repeatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('no role id', async () => {
    const repeatedUser = {
      id: 2,
      role_id: '',
      fname: 'testfnamer',
      lname: 'testlnamer',
      user_name: 'tester14',
      email: 'test1@test.com',
      pass: '123456',
    };
    await api
      .post('/api/user/newUser')
      .send(repeatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('PUT all user', () => {
  test('user without content is not added', async () => {
    const { response } = await getAllContentsFromUser();
    const { user } = response.body;
    const userUpdate = user[0];
    const newUser = {
      fname: '',
      lname: '',
      user_name: '',
      email: '',
    };
    await api
      .put(`/api/user/${userUpdate.id}`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('a repeated user_name', async () => {
    const { response } = await getAllContentsFromUser();
    const { user } = response.body;
    const userUpdate = user[0];
    const repeatedUser = {
      fname: 'testfname',
      lname: 'testlname',
      user_name: 'tester',
      email: 'test1212@test.com',
    };
    await api
      .put(`/api/user/${userUpdate.id}`)
      .send(repeatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('a repeated email', async () => {
    const { response } = await getAllContentsFromUser();
    const { user } = response.body;
    const userUpdate = user[0];
    const repeatedUser = {
      fname: 'testfname',
      lname: 'testlname',
      user_name: 'tester1212',
      email: 'test@test.com',
    };
    await api
      .put(`/api/user/${userUpdate.id}`)
      .send(repeatedUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  test('a valid user can be added', async () => {
    const { response: firstresponse } = await getAllContentsFromUser();
    const { user } = firstresponse.body;
    const userUpdate = user[0];
    const newuser = {
      role_id: 1,
      fname: 'testfname',
      lname: 'testlname',
      user_name: 'tester15',
      email: 'test15@test.com',
      pass: '123456',
    };
    await api.put(`/api/user/${userUpdate.id}`).send(newuser).expect(200);
    const {
      response: secondresponse,
      contentsEmail,
      contentsUser,
    } = await getAllContentsFromUser();
    expect(secondresponse.body.user).toHaveLength(initialUser.length);
    expect(contentsUser).toContain(newuser.user_name);
    expect(contentsEmail).toContain(newuser.email);
  });
});
describe('DELETE all user', () => {
  test('a user can be deleted', async () => {
    const { response: firstresponse } = await getAllContentsFromUser();
    const { user } = firstresponse.body;
    const userDelete = user[1];
    await api.delete(`/api/user/${userDelete.id}`).expect(200);
    const { responseAll } = await getAllContentsFromUser();
    const { user: userDel } = responseAll.body;
    const userUp = userDel[1];
    expect(userUp.state).toBeFalsy();
  });
});
describe('LOGIN user', () => {
  test('login succeeds with valid credentials', async () => {
    const loginUser = {
      email: 'test@test.com',
      pass: '123456',
    };
    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.token).toBeDefined();
    expect(response.status).toBe(200);
  });
  test('login succeeds without valid credentials', async () => {
    const loginUser = {
      email: 'test13@test.com',
      pass: '12345613',
    };
    await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});
afterAll(async () => {
  await db.close();
});
