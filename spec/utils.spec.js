const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('takes an array of objects and returns an array', () => {
    const list = [
      {
        otherKey: 'hello',
        created_at: 1542284514171
      }
    ];
    const test = formatDates(list);
    expect(test).to.be.an('array');
  });
  it('does not mutate the original array', () => {
    const list = [
      {
        otherKey: 'hello',
        created_at: 1542284514171
      },
      {
        otherKey: 'hello again',
        created_at: 1416140514171
      }
    ];
    const control = [
      {
        otherKey: 'hello',
        created_at: 1542284514171
      },
      {
        otherKey: 'hello again',
        created_at: 1416140514171
      }
    ];
    formatDates(list);
    expect(list).to.eql(control);
  });
  it('adds a timestamp converted to JS date object', () => {
    const list = [
      {
        otherKey: 'hello',
        created_at: 1542284514171
      }
    ];
    const actual = formatDates(list);
    const expected = [
      {
        otherKey: 'hello',
        created_at: new Date(1542284514171)
      }
    ];
    expect(actual).to.eql(expected);
  });
  it('each item in array has a timestamp converted to JS date object', () => {
    const input = [
      {
        otherKey: 'hello',
        created_at: 1542284514171
      },
      {
        otherKey: 'hello again',
        created_at: 1416140514171
      }
    ];
    const actual = formatDates(input);
    const expected = [
      {
        otherKey: 'hello',
        created_at: new Date(1542284514171)
      },
      {
        otherKey: 'hello again',
        created_at: new Date(1416140514171)
      }
    ];
    expect(actual).to.eql(expected);
  });
});

describe('makeRefObj', () => {
  it('returns an object', () => {
    const list = [{ article_id: 1, title: 'A' }];
    const test = makeRefObj(list);
    expect(test).to.be.an('object');
  });
  it('does not mutate the original array ', () => {
    const list = [{ article_id: 1, title: 'A' }];
    const control = [{ article_id: 1, title: 'A' }];
    makeRefObj(list);
    expect(list).to.eql(control);
  });
  it('returns a reference object for an array containing a single object', () => {
    const list = [{ article_id: 1, title: 'A' }];
    const test = makeRefObj(list, 'title', 'article_id');
    expect(test).to.eql({ A: 1 });
  });
  it('returns a reference object for an array containing many objects', () => {
    const list = [
      { article_id: 1, title: 'A' },
      { article_id: 2, title: 'B' },
      { article_id: 3, title: 'C' }
    ];
    const test = makeRefObj(list);
    const expected = { A: 1, B: 2, C: 3 };
    expect(test).to.eql(expected);
  });
});

describe('formatComments', () => {
  it('returns an empty array when passed', () => {
    expect(formatComments([])).to.eql([]);
  });
  it('takes an array of objects and returns an array', () => {
    const articleRef = { A: 9 };
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const test = formatComments(comments, articleRef);
    expect(test).to.be.an('array');
  });
  it('does not mutate the original array', () => {
    const articleRef = { A: 9 };
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const control = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    formatComments(comments, articleRef);
    expect(comments).to.eql(control);
  });
  it('returns a single formatted comment with referenced keys', () => {
    const comments = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: 'A',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articleRef = { A: 9 };
    const test = formatComments(comments, articleRef);
    expect(test).to.eql([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 9,
        author: 'butter_bridge',
        votes: 16,
        created_at: new Date(1511354163389)
      }
    ]);
  });
});
