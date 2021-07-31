import faker from "faker";
import bcrypt from "bcryptjs";

const fakeRole = () => {
  const roles = ["admin", "manager", "journalist", "visitor"];
  const num = Math.floor(Math.random() * (4 - 0) + 0);

  const role = roles[num];
  return role;
};

const fakeStatus = () => {
  const statuses = ["active", "deleted", "disabled", "blocked"];
  const num = Math.floor(Math.random() * (4 - 0) + 0);
  const status = statuses[num];
  return status;
};

const fakePassword = () => {
  const newPassword = bcrypt.hashSync("1234567", 12);
  return newPassword;
};

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 200; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const position = faker.name.jobTitle();
    const email = faker.internet.email();
    const password = fakePassword();
    const avatar = faker.internet.avatar();
    const description = faker.lorem.paragraph();
    const country = faker.address.country();
    const city = faker.address.city();
    const address = faker.address.streetAddress();
    const role = fakeRole();
    const lastLogin = faker.date.recent();
    const lastIpAddress = faker.internet.ip();
    const emailConfirmed = faker.random.boolean();
    const accountStatus = fakeStatus();
    const resetCode = faker.random.number(6);
    const socialAccounts = [
      {
        name: "facebook",
        link: "https://facebook.com"
      },
      {
        name: "instagram",
        link: "https://instagram.com"
      },
      {
        name: "twitter",
        link: "https://twitter.com"
      },
      {
        name: "linkedin",
        link: "https://linkedin.com"
      }
    ];

    users.push({
      firstName,
      lastName,
      position,
      email,
      password,
      avatar,
      description,
      country,
      city,
      address,
      role,
      lastLogin,
      lastIpAddress,
      emailConfirmed,
      accountStatus,
      resetCode,
      socialAccounts
    });
  }

  const adminUsers = [
    {
      firstName: "Admin",
      email: "admin@gmail.com",
      password: fakePassword(),
      role: "admin",
      emailConfirmed: true
    },
    {
      firstName: "Admin",
      email: "admin2@gmail.com",
      password: fakePassword(),
      role: "admin",
      emailConfirmed: true
    },
    {
      firstName: "Admin",
      email: "admin3@gmail.com",
      password: fakePassword(),
      role: "admin",
      emailConfirmed: true
    },
    {
      firstName: "Manager",
      email: "manager@gmail.com",
      password: fakePassword(),
      role: "manager",
      emailConfirmed: true
    },
    {
      firstName: "Manager",
      email: "manager2@gmail.com",
      password: fakePassword(),
      role: "manager",
      emailConfirmed: true
    },
    {
      firstName: "Manager",
      email: "manager3@gmail.com",
      password: fakePassword(),
      role: "manager",
      emailConfirmed: true
    },
    {
      firstName: "Journal",
      email: "journalist@gmail.com",
      password: fakePassword(),
      role: "journalist",
      emailConfirmed: true
    },
    {
      firstName: "Journal",
      email: "journalist2@gmail.com",
      password: fakePassword(),
      role: "journalist",
      emailConfirmed: true
    },
    {
      firstName: "Journal",
      email: "journalist3@gmail.com",
      password: fakePassword(),
      role: "journalist",
      emailConfirmed: true
    }
  ];

  adminUsers.forEach(user => {
    users.push(user);
  });

  return users;
};

export { generateUsers };

// let dataObj = generateUsers();
// fs.writeFileSync("data.json", JSON.stringify(dataObj, null, "\t"));
