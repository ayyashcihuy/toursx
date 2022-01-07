const toursController = require("../controllers/toursController");

const toursRouter = require("express").Router();

toursRouter
  .route("/")
  .get(toursController.getAllTours)
  .post(toursController.createNewTour);
toursRouter
  .route("/:id")
  .get(toursController.getSingleTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = toursRouter;
