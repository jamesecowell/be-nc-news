exports.formatDates = list => {
  return list.map(item => {
    const timeStamp = new Date(item.created_at);
    return { ...item, created_at: timeStamp };
  });
};

exports.makeRefObj = (list, firstColumn, secondColumn) => {
  let refObj = {};
  list.forEach(item => {
    refObj[item[firstColumn]] = item[secondColumn];
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
