const Tour = require("../models/tourModel");

class toursController {
  static getAllTours = async (req, res, next) => {
    try {
      //Build Query
      //1. Filtering
      const queryObj = { ...req.query };
      const excludeStr = ["page", "sort", "limit", "fields"];
      excludeStr.forEach((e) => delete queryObj[e]);

      //2. ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));

      let query = Tour.find(JSON.parse(queryStr));

      //3. Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      // 4. Field limiting
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      // 5. Pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 100;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const numTours = await Tour.countDocuments();
        if (skip >= numTours) throw new Error("This page does not exist");
      }

      //EXECUTE QUERY
      const tours = await query;

      //SENT STATUS
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
