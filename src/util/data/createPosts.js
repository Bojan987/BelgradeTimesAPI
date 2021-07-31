import faker from "faker";

const generateNumber = num => {
  return Math.floor(Math.random() * (num - 0) + 0);
};

const fakeTags = () => {
  const tags = [
    "hornika",
    "politika",
    "vožnja",
    "oružje",
    "deca",
    "škola",
    "more",
    "zimovanje",
    "automobili",
    "motori",
    "svet",
    "zdravlje"
  ];

  const randomTags = [];
  for (let i = 0; i < 4; i++) {
    const num = generateNumber(4);
    const tag = tags[num];

    randomTags.push(tag);
  }

  return randomTags;
};

const generatePosts = (categoriesIds, authorIds) => {
  const posts = [];
  for (let i = 1; i <= 200; i++) {
    const id = faker.random.uuid();
    const title = faker.lorem.paragraph();
    const image = faker.image.image();
    const category = "";
    const author = authorIds[generateNumber(10)];
    const content = faker.lorem.lines();
    const visits = faker.random.number();
    const tags = fakeTags();
    const main = faker.random.boolean();
    const primary = faker.random.boolean();
    const light = faker.random.boolean();
    const hasComments = faker.random.boolean();

    const post = {
      id,
      title,
      image,
      category,
      author,
      content,
      visits,
      tags,
      main,
      primary,
      light,
      hasComments
    };

    posts.push(post);
  }

  posts.forEach(post => {
    const newPost = post;
    newPost.category = categoriesIds[generateNumber(7)].id;

    return newPost;
  });

  return posts;
};

export { generatePosts };

// let dataObj = generateUsers();
// fs.writeFileSync("data.json", JSON.stringify(dataObj, null, "\t"));
