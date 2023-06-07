import supertest from 'supertest';
import { Server } from '../models/server.models.js';

export const api = supertest(new Server().app);
/**
 *  Role table function and mock
 */
export const initialRoles = [
  {
    id: 1,
    role: 'test_role',
  },
  {
    id: 2,
    role: 'user_role',
  },
];

export const getAllContentsFromRoles = async () => {
  const response = await api.get('/api/role/roles');
  return { contents: response.body.role.map((r) => r.role), response };
};
/**
 * User table function and mock
 */
export const initialUser = [
  {
    id: 1,
    role_id: 1,
    fname: 'testfname',
    lname: 'testlname',
    user_name: 'tester',
    email: 'test@test.com',
    pass: '123456',
    state: true,
  },
  {
    id: 2,
    role_id: 1,
    fname: 'testfnamer',
    lname: 'testlnamer',
    user_name: 'tester1',
    email: 'test1@test.com',
    pass: '123456',
    state: true,
  },
];
export const getAllContentsFromUser = async () => {
  const response = await api.get('/api/user/users');
  const responseAll = await api.get('/api/user/usersAll');
  return {
    contentsUser: response.body.user.map((u) => u.user_name),
    contentsEmail: response.body.user.map((u) => u.email),
    response,
    responseAll,
  };
};
/**
 * Area table function and mock
 */
export const initialArea = [
  {
    id: 1,
    area: 'mina1',
  },
  {
    id: 2,
    area: 'mina2',
  },
];
export const getAllContentsFromArea = async () => {
  const response = await api.get('/api/area/areas');
  return {
    contents: response.body.area.map((u) => u.area),
    response,
  };
};
/**
 * SubArea table function and mock
 */
export const initialSubArea = [
  {
    id: 1,
    sub_area: 'ducto1',
  },
  {
    id: 2,
    sub_area: 'ducto2',
  },
];
export const getAllContentsFromSubAreas = async () => {
  const response = await api.get('/api/subArea/subAreas');
  return {
    contents: response.body.sub_area.map((u) => u.sub_area),
    response,
  };
};
/**
 * Airways table function and mock
 */
export const initialAirways = [
  {
    id: 1,
    airways: 'fan1',
  },
  {
    id: 2,
    airways: 'fan2',
  },
];
export const getAllContentsFromAirways = async () => {
  const response = await api.get('/api/airways/airways');
  return {
    contents: response.body.airways.map((u) => u.airways),
    response,
  };
};
/**
 * Activity table function and mock
 */
export const initialActivity = [
  {
    id: 1,
    activity: 'extract1',
  },
  {
    id: 2,
    activity: 'extract2',
  },
];
export const getAllContentsFromActivity = async () => {
  const response = await api.get('/api/activity/activity');
  return {
    contents: response.body.activity.map((u) => u.activity),
    response,
  };
};
/**
 * Criteria table function and mock
 */
export const initialCriteria = [
  {
    id: 1,
    criteria: 'extract1',
  },
  {
    id: 2,
    criteria: 'extract2',
  },
];
export const getAllContentsFromCriteria = async () => {
  const response = await api.get('/api/criteria/criteria');
  return {
    contents: response.body.criteria.map((u) => u.criteria),
    response,
  };
};
/**
 * Project table function and mock
 */
export const initialProject = [
  {
    id: 1,
    area_id: 1,
    sub_area_id: 2,
    airways_id: 2,
    activity_id: 1,
    user_id: 1,
    project: 'project_test',
    position: 60,
  },
  {
    id: 2,
    area_id: 2,
    sub_area_id: 1,
    airways_id: 1,
    activity_id: 2,
    user_id: 2,
    project: 'project_test1',
    position: 60,
  },
];
export const getAllContentsFromProject = async () => {
  const response = await api.get('/api/project/project');
  return {
    contents: response.body.project.map((u) => u.project),
    response,
  };
};
/**
 * Vector table function and mock
 */
export const initialVector = [
  {
    id: 1,
    user_id: 1,
    vector: 'vector_test',
    position: 60,
    value: 12,
  },
  {
    id: 2,
    user_id: 2,
    vector: 'vector_test1',
    position: 60,
    value: 16,
  },
];
export const getAllContentsFromVector = async () => {
  const response = await api.get('/api/vector/vector');
  return {
    contents: response.body.vector.map((u) => u.vector),
    response,
  };
};
/**
 * Scenario table function and mock
 */
export const initialScenario = [
  {
    id: 1,
    user_id: 1,
    project_id: 1,
    vector_id: 2,
    scenario: 'scenario_test',
  },
  {
    id: 2,
    user_id: 2,
    project_id: 2,
    vector_id: 1,
    scenario: 'scenario_test1',
  },
];
export const getAllContentsFromScenario = async () => {
  const response = await api.get('/api/scenario/scenario');
  return {
    contents: response.body.scenario.map((u) => u.scenario),
    response,
  };
};
