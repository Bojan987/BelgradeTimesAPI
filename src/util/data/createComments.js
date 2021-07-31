import faker from "faker";

const generateNumber = num => {
  return Math.floor(Math.random() * (num - 0) + 0);
};

const generateReplies = authorIds => {
  const replies = [];
  for (let i = 1; i <= 5; i++) {
    const author = authorIds[generateNumber(10)];
    const content = faker.lorem.lines();

    const reply = {
      author,
      content
    };

    replies.push(reply);
  }

  return replies;
};

const generateComments = (postsIds, authorIds) => {
  const comments = [];
  for (let i = 1; i <= 200; i++) {
    const author = authorIds[generateNumber(10)];
    const content = faker.lorem.lines();
    const likes = faker.random.number();
    const dislikes = faker.random.number();
    const replies = generateReplies(authorIds);
    const notifyAuthor = faker.random.boolean();
    const postRelated = postsIds[generateNumber(100)].id;

    const comment = {
      author,
      content,
      likes,
      dislikes,
      replies,
      notifyAuthor,
      postRelated
    };

    comments.push(comment);
  }

  return comments;
};

export { generateComments };
