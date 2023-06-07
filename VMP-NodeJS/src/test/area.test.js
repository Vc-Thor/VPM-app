import db from '../config/config.db.js';
import { Area } from '../models/area.models.js';
import { getAllContentsFromArea, initialArea } from './helpers.js';

beforeEach(async () => {
  await Area.destroy({ where: {} });
  for (const area of initialArea) {
    const areaObject = Area.build(area);
    await areaObject.save();
  }
});
describe('GET all area', () => {
  test('areas are returned as json', async () => {
    await api
      .get('/api/area/areas')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('there are two areas', async () => {
    const { response } = await getAllContentsFromArea();
    expect(response.body.area).toHaveLength(initialArea.length);
  });
});
describe('POST all areas', () => {
  test('a valid area can be added', async () => {
    const newArea = { area: 'new_area' };
    await api
      .post('/api/area/newArea')
      .send(newArea)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const { contents, response } = await getAllContentsFromArea();

    expect(response.body.area).toHaveLength(initialArea.length + 1);
    expect(contents).toContain(newArea.area);
  });

  test('area without content is not added', async () => {
    const newArea = { area: '' };
    await api.post('/api/area/newArea').send(newArea).expect(400);

    const { response } = await getAllContentsFromArea();
    expect(response.body.area).toHaveLength(initialArea.length);
  });

  test('a repeated area', async () => {
    const repeatedArea = { area: 'mina1' };
    await api
      .post('/api/area/newArea')
      .send(repeatedArea)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('PUT all area', () => {
  test('area without content is not added', async () => {
    const { response } = await getAllContentsFromArea();
    const { area } = response.body;
    const areaUpdate = area[0];
    const newArea = { area: '' };
    await api.put(`/api/area/${areaUpdate.id}`).send(newArea).expect(400);
  });
  test('a valid area can be added', async () => {
    const { response: firstresponse } = await getAllContentsFromArea();
    const { area } = firstresponse.body;
    const areaUpdate = area[0];
    const newArea = { area: 'new_area' };
    await api.put(`/api/area/${areaUpdate.id}`).send(newArea).expect(200);
    const { response: secondresponse, contents } =
      await getAllContentsFromArea();
    expect(secondresponse.body.area).toHaveLength(initialArea.length);
    expect(contents).toContain(newArea.area);
  });
  test('a repeated area', async () => {
    const { response } = await getAllContentsFromArea();
    const { area } = response.body;
    const areaUpdate = area[0];
    const repeatedArea = { area: 'mina1' };
    await api
      .put(`/api/area/${areaUpdate.id}`)
      .send(repeatedArea)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});
describe('DELETE all area', () => {
  test('a area can be deleted', async () => {
    const { response: firstresponse } = await getAllContentsFromArea();
    const { area } = firstresponse.body;
    const areaToDelete = area[1];
    await api.delete(`/api/area/${areaToDelete.id}`).expect(200);
    const { contents, response: secondResponse } =
      await getAllContentsFromArea();
    expect(secondResponse.body.area).toHaveLength(initialArea.length - 1);
    expect(contents).not.toContain(areaToDelete.area);
  });
});
afterAll(async () => {
  await db.close();
});
