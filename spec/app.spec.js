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
    it('PATCH returns a status 200 and the updated article object', () => {
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
    it('PATCH with invalid article_if returns 404 and error message', () => {
      return request(app)
        .patch('/api/articles/999')
        .send({ inc_votes: 50 })
        .expect(404)
        .then(res => {
          expect(res.body).to.eql({ msg: 'Article not found' });
        });
    });
    describe.only('/comments', () => {
      xit('POST returns status 201 and the posted comment', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({
            username: 'snooty-snooterson',
            body: 'I find this article highly purile and derivative...'
          })
          .expect(201)
          .then(res => {
            expect(res.body).to.eql({
              article_id: 1,
              author: 'snooty-snooterson',
              body: 'I find this article highly purile and derivative...',
              comment_id: '',
              created_at: Date.now(),
              votes: 0
            });
          });
      });
      it('GET returns status 200 and an array of comments for the given article_id', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(13);
          });
      });
      it('GET returns comments with all expected properties', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(res => {
            expect(res.body[0]).to.eql({
              article_id: 1,
              comment_id: 2,
              votes: 14,
              created_at: '2016-11-22T12:36:03.389Z',
              author: 'butter_bridge',
              body:
                'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
            });
          });
      });
    });
  });
});
