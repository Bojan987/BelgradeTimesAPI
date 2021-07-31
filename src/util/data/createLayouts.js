import faker from "faker";

const generateNumber = num => {
  return Math.floor(Math.random() * (num - 0) + 0);
};

const fakeLayouts = [
  {
    name: "PrimaryBig",
    image: faker.random.image(),
    author: ""
  },
  {
    name: "Small&Scroll",
    image: faker.random.image(),
    author: ""
  },
  {
    name: "PrimarySmall",
    image: faker.random.image(),
    author: ""
  },
  {
    name: "SmallCards",
    image: faker.random.image(),
    author: ""
  },
  {
    name: "PrimaryList",
    image: faker.random.image(),
    author: ""
  },
  {
    name: "SmallLine",
    image: faker.random.image(),
    author: ""
  }
];

const generateLayouts = authorIds => {
  const data = fakeLayouts.map((layout, index) => {
    const newLayout = layout;
    newLayout.author = authorIds[generateNumber(10)].id;

    return { ...newLayout };
  });

  return data;
};

export { generateLayouts };
