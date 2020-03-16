exports.formatDates = list => {
  if (list.length > 0) {
    let created_at = new Date();
    return list.map(item => {
      return { ...item, created_at };
    });
  } else return [];
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
