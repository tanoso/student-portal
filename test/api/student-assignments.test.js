import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/student-assignments/[studentId]';
import studentAssigmentsSvc from '../../pages/services/student-assignments-svc';

describe('/api/student-assignments/[studentId]', () => {
  it('returns all the assignmets associated to the student', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        studentId: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      await studentAssigmentsSvc.findAll()
    );
  });

  it('returns 404 for any other verb', async () => {
    const { req: reqPost, res: resPost } = createMocks({ method: 'POST' });
    const { req: reqPut, res: resPut } = createMocks({ method: 'PUT' });
    const { req: reqPatch, res: resPatch } = createMocks({ method: 'PATCH' });
    const { req: reqDel, res: resDel } = createMocks({ method: 'DELETE' });
    
    await handler(reqPost, resPost);
    await handler(reqPut, resPut);
    await handler(reqPatch, resPatch);
    await handler(reqDel, resDel);

    expect(resPost._getStatusCode()).toBe(404);
    expect(resPut._getStatusCode()).toBe(404);
    expect(resPatch._getStatusCode()).toBe(404);
    expect(resDel._getStatusCode()).toBe(404);
  });
});