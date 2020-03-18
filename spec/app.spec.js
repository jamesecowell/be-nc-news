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
    it('GET with an invalid username parameter returns 404 and error message', () => {
      return request(app)
        .get('/api/users/notauser')
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: 'User not found' });
        });
    });
  });

  describe('/articles', () => {
    it('GET with an article_id paramter returns 200 and the requested article', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            author: 'butter_bridge',
            title: 'Living in the shadow of a great man',
            article_id: 1,
            body: 'I find this existence challenging',
            topic: 'mitch',
            created_at: '2018-11-15T12:21:54.171Z',
            votes: 100,
            comment_count: '13'
          });
        });
    });
    it('GET with an invalid article_id parameter returns 404 and error message', () => {
      return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: 'Article not found' });
        });
    });
    it('PATCH returns returns a status 200 and the updated article object', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 50 })
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({
            author: 'butter_bridge',
            title: 'Living in the shadow of a great man',
            article_id: 1,
            body: 'I find this existence challenging',
            topic: 'mitch',
            created_at: '2018-11-15T12:21:54.171Z',
            votes: 150,
            comment_count: '13'
          });
        });
    });
  });
});
