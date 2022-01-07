const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

const port = 3000;
const dummyData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: dummyData.length,
    data: {
      tours: dummyData,
    },
  });
};

const getSingleTour = (req, res) => {
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
};

const createNewTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

//get all tour

app.get("/tours", getAllTours);

//get with id

app.get("/tours/:id", getSingleTour);

//post new tour

app.post("/tours", createNewTour);

// update tour

app.patch("/tours/:id", updateTour);

//delete tour

app.delete("/tours/:id", deleteTour);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
