const fs = require("fs");
const dummyData = JSON.parse(
  fs.readFileSync(`./dev-data/data/tours-simple.json`)
);
class toursController {
  static getAllTours(req, res, next) {
    res.status(200).json({
      status: "success",
      results: dummyData.length,
      data: {
        tours: dummyData,
      },
    });
  }

  static createNewTour(req, res, next) {
    const newId = dummyData[dummyData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    dummyData.push(newTour);

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(dummyData),
      (err) => {
        res.status(201).json({
          status: "success",
          data: {
            tour: newTour,
          },
        });
      }
    );
  }

  static getSingleTour(req, res, next) {
    const id = +req.params.id;
    const tour = dummyData.find((e) => e.id === id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    res.status(200).json({
      status: "success",
      results: dummyData.length,
      data: {
        tour,
      },
    });
  }

  static updateTour(req, res, next) {
    const id = +req.params.id;
    if (id > dummyData.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: `<Updated Data Here>`,
    });
  }

  static deleteTour(req, res, next) {
    const id = +req.params.id;
    if (id > dummyData.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
}

module.exports = toursController;
