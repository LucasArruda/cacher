import request from "supertest";

const API_URL = '/api/v1/';

describe('server', () => {
  let server : any;
  beforeAll(async () => {
    const mod = await import('./index');
    server = (mod as any).default;
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    }
  });

  describe('/get', () => {
    test(`[GET] ${API_URL}get/:key`, (done) => {
      request(server)
      .get(`${API_URL}get/aaa`)
      .then(res => {
        expect(res.status).toBe(404);
        done();
      });
    });
  });
});