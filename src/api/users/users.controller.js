const usersService = require("./users.service");

function list(req, res, next) {
  usersService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};