const Pirate = require("../models/pirate.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = (req, res) => {
  console.log("tesssttttt");
  console.log(process.env.FIRST_SECRET_KEY);
  Pirate.create(req.body)
    .then((pirate) => {
      const pirateToken = jwt.sign(
        {
          id: pirate._id,
        },
        process.env.FIRST_SECRET_KEY
      );

      res
        .cookie("piratetoken", pirateToken, {
          httpOnly: true,
        })
        .json({ msg: "success!", pirate: pirate });
    })
    .catch((err) => res.status(300).json(err));
};
module.exports.login = async (req, res) => {
  const pirate = await Pirate.findOne({ email: req.body.email });

  if (pirate === null) {
    // email not found in users collection
    return res
      .status(300)
      .json({ errors: { email: { message: "pirate does not exist" } } });
  }

  // if we made it this far, we found a user with this email address
  // let's compare the supplied password to the hashed password in the database
  const correctPassword = await bcrypt.compare(
    req.body.password,
    pirate.password
  );

  if (!correctPassword) {
    // password wasn't a match!
    return res
      .status(300)
      .json({ errors: { password: { message: "passwordi sbo" } } });
  }

  // if we made it this far, the password was correct

  // pirateToken : asjdoijuqpw8oru01    epuw9da0wadaksjdoaisndhasio
  // pirate._id :    flogert1234567
  // FIRST_SECRET_KEY:     " first key value2"
  const pirateToken = jwt.sign(
    {
      id: pirate._id,
    },
    process.env.FIRST_SECRET_KEY
  );

  // note that the response object allows chained calls to cookie and json
  res
    .cookie("piratetoken", pirateToken, {
      httpOnly: true,
    })
    .json({ msg: "success!" });
};

module.exports.createPirate = (req, res) => {
  console.log(req.body.position);
  Pirate.exists({ position: "captain" })
    .then((pirateExists) => {
      if (pirateExists && req.body.position == "captain") {
        return Promise.reject({
          errors: { position: { message: "Captain exist" } },
        });
      }
      return Pirate.create(req.body);
    })
    .then((saveResult) => res.json(saveResult))
    .catch((err) => res.status(300).json(err));
};

module.exports.getAllPirates = (request, response) => {
  Pirate.find({})
    .sort({ name: "asc" })
    .then((pirate) => {
      console.log(pirate);
      response.json(pirate);
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
};

module.exports.getPirate = (request, response) => {
  Pirate.findOne({ _id: request.params.id })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};
module.exports.updatePirate = (request, response) => {
  console.log(request.body);
  console.log(request.body);
  Pirate.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedPirate) => response.json(updatedPirate))
    .catch((err) => response.json(err));
};

module.exports.deletePirate = (request, response) => {
  Pirate.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
