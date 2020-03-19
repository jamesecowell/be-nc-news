process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiSorted = require('chai-sorted');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const knex = require('../db/connection');

chai.use(chaiSorted);

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
    it('GET responds status 200 and an array of articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
        });
    });
    it('Array of articles include a comment count', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body[0]).to.haveOwnProperty('comment_count');
        });
    });
    it('GET with sort_by query sorts the articles by column', () => {
      return request(app)
        .get('/api/articles?sort_by=article_id')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.sortedBy('article_id', { descending: true });
        });
    });
    it('sort_by query defaults to date', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.sortedBy('created_at', { descending: true });
        });
    });
    it('GET with order query changes order of columns', () => {
      return request(app)
        .get('/api/articles?order=asc')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.sortedBy('created_at');
        });
    });
    it('GET with author query sorts articles by author', () => {
      return request(app)
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.equal(3);
        });
    });
    it('GET with topic query sorts articles by topic', () => {
      return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(res => {
          expect(res.body.length).to.equal(11);
        });
    });
    describe('/:article_id', () => {
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
      it('GET with a non-existant article_id parameter returns 404 and error message', () => {
        return request(app)
          .get('/api/articles/999')
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ msg: 'Article not found' });
          });
      });
      it('GET with an invalid article_id parameter returns 400 and an error message', () => {
        return request(app)
          .get('/api/articles/not_an_article')
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: 'Bad request' });
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
      it('PATCH with non-existant article_id returns 404 and error message', () => {
        return request(app)
          .patch('/api/articles/999')
          .send({ inc_votes: 50 })
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({ msg: 'Article not found' });
          });
      });
      it('PATCH with invalid article_id returns 400 and error message', () => {
        return request(app)
          .patch('/api/articles/not_an_article')
          .send({ inc_votes: 50 })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: 'Bad request' });
          });
      });
      describe('/comments', () => {
        it('POST returns status 201 and the posted comment', () => {
          return request(app)
            .post('/api/articles/1/comments')
            .send({
              username: 'butter_bridge',
              body: 'I find this article highly purile and derivative...'
            })
            .expect(201)
            .then(res => {
              expect(res.body).to.eql({
                article_id: 1,
                author: 'butter_bridge',
                body: 'I find this article highly purile and derivative...',
                comment_id: 19,
                created_at: res.body.created_at,
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
        it('GET with non-existant article_id returns status 404 and error message', () => {
          return request(app)
            .get('/api/articles/999/comments')
            .expect(404)
            .then(res => {
              expect(res.body).to.eql({ msg: 'Article not found' });
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
        it('GET sort order defaults to created_at', () => {
          return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.sortedBy('created_at', {
                descending: true
              });
            });
        });
        it('GET with sort_by query sorts comments by passed in column', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=author')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.sortedBy('author', { descending: true });
            });
        });
        it('GET with order query returns comments in that order', () => {
          return request(app)
            .get('/api/articles/1/comments?order=asc')
            .expect(200)
            .then(res => {
              expect(res.body).to.be.sortedBy('created_at');
            });
        });
        describe('/:comment_id', () => {
          it('PATCH returns status 200 and the updated comment object', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: 4 })
              .expect(201)
              .then(res => {
                expect(res.body).to.eql({
                  comment_id: 1,
                  author: 'butter_bridge',
                  article_id: 9,
                  votes: 20,
                  created_at: '2017-11-22T12:36:03.389Z',
                  body: `Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!`
                });
              });
          });
          it('PATCH with a non-existant comment_id returns 404 and an error message', () => {
            return request(app)
              .patch('/api/comments/999')
              .send({ inc_votes: 4 })
              .expect(404)
              .then(res => {
                expect(res.body).to.eql({
                  msg: 'Comment not found'
                });
              });
          });
          it('PATCH with an invalid comment_id returns 400 and an error message', () => {
            return request(app)
              .patch('/api/comments/not_a_comment')
              .send({ inc_votes: 4 })
              .expect(400)
              .then(res => {
                expect(res.body).to.eql({ msg: 'Bad request' });
              });
          });
          it('DELETE returns status 204', () => {
            return request(app)
              .delete('/api/comments/1')
              .expect(204);
          });
        });
      });
    });
  });
});
