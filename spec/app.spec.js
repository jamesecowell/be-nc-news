process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const knex = require('../db/connection');

describe('/api', () => {
  beforeEach(() => knex.seed.run());
  after(() => knex.destroy());
  describe('/topics', () => {
    it('GET returns status 200 and topics', () => {
      return request(app)
        .get('/api/topcs')
        .expect(200)
        .then(res => {});
    });
  });
});
