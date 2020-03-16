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
    const list = [{ objA: 1 }, { objB: 2 }, { objC: 3 }];
    const test = formatDates(list);
    expect(test).to.be.an('array');
  });
  it('does not mutate the original array', () => {
    const list = [{ objA: 1 }, { objB: 2 }, { objC: 3 }];
    const control = [{ objA: 1 }, { objB: 2 }, { objC: 3 }];
    formatDates(list);
    expect(list).to.eql(control);
  });
  it('each item in array has a timestamp converted to JS date object', () => {
    const list = [{ objA: 1 }, { objB: 2 }, { objC: 3 }];
    const time = new Date();
    const test = formatDates(list);
    expect(test[0].created_at).to.eql(time);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
