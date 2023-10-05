const PirateController = require("../controllers/pirate.controller");
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
  app.post("/api/register", PirateController.register);
  app.post("/api/login", PirateController.login);
  app.post("/api/pirate", authenticate,PirateController.createPirate);
  app.get("/api/pirate", authenticate,PirateController.getAllPirates);
  app.get("/api/pirate/:id", PirateController.getPirate);
  app.patch("/api/pirate/:id", PirateController.updatePirate);
  app.delete("/api/pirate/:id", authenticate,PirateController.deletePirate);


};