const usersService = require("./users.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");
const hasProperties = require("../../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "email", "password");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "email",
  "password"
];

function hasOnlyValidProperties(req,res,next){
  //destructure data from req.body
  const {data={}} = req.body;
  console.log(req.body)
  const invalidFields = Object.keys(data).filter(property=> !VALID_PROPERTIES.includes(property))
  if(invalidFields.length > 0){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`
    })
  }
  next();
}


async function userExists(req, res, next) {
  const { userId } = req.params;

  const user = await usersService.read(userId);

  if (user) {
    res.locals.user = user;
    return next();
  }
  next({ status: 404, message: `User cannot be found.` });
}


function list(req, res, next) {
  usersService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}


async function create(req, res, next) {
  // Your solution here
  const {data={}} = req.body;
  console.log(data)
  usersService
    .create(data)
    .then(newlyCreatedUser=>res.status(201).json({data:newlyCreatedUser}))
}

async function update(req, res, next) {
  const updatedUser = {
    ...res.locals.user,
    ...req.body.data,
    user_id: res.locals.user.user_id,
  };

  const data = await restaurantsService.update(updatedUser);

  res.json({ data });
}

async function destroy(req, res, next) {
  // your solution here
  const {user_id} = res.locals.user;
  usersService
    .delete(user_id)
    .then(()=>res.sendStatus(204))
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  update: [asyncErrorBoundary(userExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(userExists), asyncErrorBoundary(destroy)],
};