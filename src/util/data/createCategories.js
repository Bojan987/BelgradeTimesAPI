import faker from "faker";

const generateNumber = num => {
  return Math.floor(Math.random() * (num - 0) + 0);
};

const fakeCategories = [
  {
    name: "Svet",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: false,
    sidebar: false,
    primaryPosts: 3
  },
  {
    name: "Politika",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 1,
    sidebar: false,
    primaryPosts: 2
  },
  {
    name: "Hronika",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 2,
    sidebar: true,
    sidebarType: "mostRecent",
    primaryPosts: 2
  },
  {
    name: "Sport",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 3,
    sidebar: false,
    primaryPosts: 2
  },
  {
    name: "Biznis",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 4,
    sidebar: true,
    sidebarType: "currencyTable",
    primaryPosts: 3
  },
  {
    name: "Zdravlje",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 5,
    sidebar: false,
    primaryPosts: 3
  },
  {
    name: "Tehnologija",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 6,
    sidebar: false,
    primaryPosts: 1
  },
  {
    name: "Srbija",
    description: faker.lorem.paragraph(),
    author: "",
    layout: "",
    home: true,
    homeOrder: 7,
    sidebar: false,
    primaryPosts: 2
  }
];

const generateCategories = (authorIds, layouts) => {
  const data = fakeCategories.map((category, index) => {
    const newCategory = category;
    if (!category.home) {
      delete category.layout;
    }

    newCategory.author = authorIds[generateNumber(10)].id;
    switch (category.name) {
      case "Politika":
        newCategory.layout = layouts[0].id;
        break;
      case "Hronika":
        newCategory.layout = layouts[1].id;
        break;
      case "Sport":
        newCategory.layout = layouts[2].id;
        break;
      case "Biznis":
        newCategory.layout = layouts[3].id;
        break;
      case "Zdravlje":
        newCategory.layout = layouts[4].id;
        break;
      case "Tehnologija":
        newCategory.layout = layouts[4].id;
        break;
      case "Srbija":
        newCategory.layout = layouts[5].id;
        break;
      default:
        break;
    }

    return { ...newCategory };
  });

  return data;
};

export { generateCategories };
