const Tour = require("../models/tourModel");

class toursController {
  static getAllTours = async (req, res, next) => {
    try {
      const tours = await Tour.find();
      res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: err,
      });
    }
  };

  static createNewTour = async (req, res, next) => {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: "Invalid Data Sent!",
      });
    }
  };

  static getSingleTour = async (req, res, next) => {
    try {
      const tour = await Tour.findById(req.params.id);
      res.status(200).json({
        status: "success",
        results: tour.length,
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: "Data Not Found",
      });
    }
  };

  static updateTour = async (req, res, next) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: { tour },
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: err,
      });
    }
  };

  static deleteTour = async (req, res, next) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(404).json({
        status: "Failed",
        message: err,
      });
    }
  };
}

module.exports = toursController;
