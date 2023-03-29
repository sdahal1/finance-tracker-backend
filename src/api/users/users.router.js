const router = require("express").Router({ mergeParams: true });
const controller = require("./users.controller");


// const theatersRouter = require("../theaters/theaters.router");
// const reviewsRouter = require("../reviews/reviews.router");

// router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
// router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);


router
  .route("/")
  .get(controller.list)
  // .all(methodNotAllowed);
// router
//   .route("/:movieId")
//   .get(controller.read);


module.exports = router;