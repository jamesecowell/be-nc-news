exports.formatDates = list => {
  return list.map(item => {
    const timeStamp = new Date(item.created_at);
    return { ...item, created_at: timeStamp };
  });
};

exports.makeRefObj = list => {
  let refObj = {};
  list.forEach(item => {
    refObj[item.title] = item.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (comments.length) {
    return comments.map(comment => {
      let formComm = {};
      formComm.body = comment.body;
      formComm.article_id = articleRef[comment.belongs_to];
      formComm.author = comment.created_by;
      formComm.votes = comment.votes;
      formComm.created_at = new Date(comment.created_at);
      return formComm;
    });
  } else return [];
};
