import db from '../config/config.db.js';
import { SubArea } from '../models/subArea.models.js';
import { getAllContentsFromSubAreas, initialSubArea } from './helpers.js';

beforeEach(async () => {
  await SubArea.destroy({ where: {} });
  for (const subArea of initialSubArea) {
    const subAreaObject = SubArea.build(subArea);
    await subAreaObject.save();
  }
});
describe('GET all subArea', () => {
  test('subAreas are returned as json', async () => {
    await api
      .get('/api/subArea/subAreas')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there are two subAreas', async () => {
    const { response } = await getAllContentsFromSubAreas();
    expect(response.body.sub_area).toHaveLength(initialSubArea.length);
  });
});
describe('POST all subAreas', () => {
  test('a valid subArea can be added', async () => {
    const newSubArea = { sub_area: 'new_sub_area' };
    await api
      .post('/api/subArea/newSubArea')
      .send(newSubArea)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const { contents, response } = await getAllContentsFromSubAreas();

    expect(response.body.sub_area).toHaveLength(initialSubAreas.length + 1);
    expect(contents).toContain(newSubArea.sub_area);
  });

  test('area without content is not added', async () => {
    const newSubArea = { sub_area: '' };
    await api.post('/api/subArea/newSubArea').send(newSubArea).expect(400);

    const { response } = await getAllContentsFromSubAreas();
    expect(response.body.sub_area).toHaveLength(initialSubArea.length);
  });

  test('a repeated subArea', async () => {
    const repeatedSubArea = { sub_area: 'ducto1' };
    await api
      .post('/api/subArea/newSubArea')
      .send(repeatedSubArea)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('PUT all subArea', () => {
  test('subArea without content is not added', async () => {
    const { response } = await getAllContentsFromSubAreas();
    const { sub_area } = response.body;
    const subAreaUpdate = sub_area[0];
    const newSubArea = { sub_area: '' };
    await api
      .put(`/api/subArea/${subAreaUpdate.id}`)
      .send(newSubArea)
      .expect(400);
  });
  test('a valid subArea can be added', async () => {
    const { response: firstresponse } = await getAllContentsFromSubAreas();
    const { sub_area } = firstresponse.body;
    const subAreaUpdate = sub_area[0];
    const newSubArea = { sub_area: 'new_sub_area' };
    await api
      .put(`/api/subArea/${subAreaUpdate.id}`)
      .send(newSubArea)
      .expect(200);
    const { response: secondresponse, contents } =
      await getAllContentsFromSubAreas();
    expect(secondresponse.body.sub_area).toHaveLength(initialSubAreas.length);
    expect(contents).toContain(newSubArea.sub_area);
  });
  test('a repeated subArea', async () => {
    const { response } = await getAllContentsFromSubAreas();
    const { sub_area } = response.body;
    const SubAreaUpdate = sub_area[0];
    const repeatedSubArea = { sub_area: 'mina1' };
    await api
      .put(`/api/subArea/${SubAreaUpdate.id}`)
      .send(repeatedSubArea)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('DELETE all SubArea', () => {
  test('a subArea can be deleted', async () => {
    const { response: firstresponse } = await getAllContentsFromSubAreas();
    const { sub_area } = firstresponse.body;
    const SubAreaToDelete = sub_area[1];
    await api.delete(`/api/subAarea/${SubAreaToDelete.id}`).expect(200);
    const { contents, response: secondResponse } =
      await getAllContentsFromSubAreas();
    expect(secondResponse.body.sub_area).toHaveLength(
      initialSubAreas.length - 1,
    );
    expect(contents).not.toContain(SubAreaToDelete.sub_area);
  });
});
afterAll(async () => {
  await db.close();
});
