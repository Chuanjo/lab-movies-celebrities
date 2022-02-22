const celebrities = [
  {
    name: "Juancho",
    occupation: "Web Dev",
    catchPhrase: "Mejor copiar que escribir",
  },
  {
    name: "Carlos",
    occupation: "developer",
    catchPhrase: "you can do it",
  },
  {
    name: "Andi",
    occupation: "Drummer",
    catchPhrase: "A todo volumen",
  },
];

const Celebrity = require("../models/Celebrity.model");

const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost/lab-movies-celebrities")
  .then((response) => {
    console.log("conectados a la BD");
    return Celebrity.insertMany(celebrities);
  })
  .then((response) => {
    console.log("Celebrities agregados correctamente");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });