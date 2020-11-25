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

  beforeEach(() => {
    jest.resetModules();
  });

  describe('/get', () => {
    test(`[GET] ${API_URL}get/:key fails if key does not exist`, (done) => {
      request(server)
      .get(`${API_URL}get/aaa`)
      .then(res => {
        expect(res.status).toBe(404);
        done();
      });
    });

    test(`[GET] ${API_URL}get/:key works properly if key exists`, (done) => {
      const key = 'aaa';
      const value = 'test';

      // set our key to value first
      request(server).post(`${API_URL}set`).send({ key, value })
      .then(res => {

        expect(res.status).toBe(200);

        request(server)
        .get(`${API_URL}get/${key}`)
        .then(subres => {
          expect(subres.status).toBe(200);
          expect(subres.body.result).toEqual(value);
          done();
        });

        done();
      });
    });
  });

  describe('/has', () => {
    test(`[GET] ${API_URL}has/:key always returns 200`, (done) => {
      request(server)
      .get(`${API_URL}has/bbb`)
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
    });

    test(`[GET] ${API_URL}has/:key return false if key does not exist`, (done) => {
      request(server)
      .get(`${API_URL}has/bbb`)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.result).toBe(false);
        done();
      });
    });

    test(`[GET] ${API_URL}has/:key return true if key exists`, (done) => {
      const key = 'bbb';
      const value = 'test';

      request(server).post(`${API_URL}set`).send({ key, value })
      .then(res => {

        expect(res.status).toBe(200);

        request(server)
        .get(`${API_URL}has/${key}`)
        .then(subres => {
          expect(subres.status).toBe(200);
          expect(subres.body.result).toEqual(true);
          done();
        });

        done();
      });
    });
  });

  describe('/set', () => {
    test(`[POST] ${API_URL}set override existing keys`, (done) => {
      const key = 'ccc';
      const value = 'test';
      const new_value = 'new_test';

      request(server).post(`${API_URL}set`).send({ key, value })
      .then(res => {
        expect(res.status).toBe(200);

        request(server)
        .get(`${API_URL}get/${key}`)
        .then(res1 => {
          expect(res1.status).toBe(200);
          expect(res1.body.result).toEqual(value);

          request(server).post(`${API_URL}set`).send({ key, value: new_value })
          .then(res2 => {

            expect(res2.status).toBe(200);

            request(server)
            .get(`${API_URL}get/${key}`)
            .then(res3 => {

              expect(res3.status).toBe(200);
              expect(res3.body.result).toEqual(new_value);

              done();
            });

            done();
          });

          done();
        });

        done();
      });
    });
  });

  describe('/remove', () => {
    test(`[POST] ${API_URL}remove/:key return {success: 'false'} if key does not exist`, (done) => {
      request(server)
      request(server).delete(`${API_URL}remove/ddd`)
      .then(res => {
        expect(res.status).toBe(404);
        expect(res.body.success).toEqual('false');
        done();
      });
    });

    test(`[POST] ${API_URL}remove/:key removes an existing value`, (done) => {
      const key = 'ddd';
      const value = 'test';

      request(server).post(`${API_URL}set`).send({ key, value })
      .then(res => {

        expect(res.status).toBe(200);

        request(server)
        .get(`${API_URL}get/${key}`)
        .then(res1 => {
          expect(res1.status).toBe(200);
          expect(res1.body.result).toEqual(value);

          request(server).delete(`${API_URL}remove/${key}`)
          .then(res2 => {

            expect(res2.status).toBe(200);
            expect(res2.body.success).toEqual('true');

            request(server)
            .get(`${API_URL}has/${key}`)
            .then(res3 => {
              expect(res3.body.result).toBe(false);

              done();
            });

            done();
          });

          done();
        });

        done();
      });
    });
  });
});