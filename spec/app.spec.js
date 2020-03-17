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
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body[0]).to.eql({
            slug: 'mitch',
            description: 'The man, the Mitch, the legend'
          });
        });
    });
  });
  describe('/users', () => {
    it('GET with a username parameter returns 200 and the requested user', () => {
      return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            username: 'butter_bridge',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            name: 'jonny'
          });
        });
    });
  });
});
