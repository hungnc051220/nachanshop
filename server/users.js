const users = [];

const addUser = ({ id, name }) => {
  name = name.trim().toLowerCase();

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return { error: "Tài khoản đã có trong danh sách" };
  }

  const user = { id, name };
  users.push(user);

  console.log(users);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = {
  addUser,
  removeUser,
  getUser,
};
