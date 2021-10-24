const Menu = require("../models/menu.model.js");

// Create and Save a new Menu
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    //if(!req.body.phone)
    //res.status(400).send({
     //message: "ga da phone nya bro"
     //});
  
    // Create a Menu
    const menu = new Menu({
      description: req.body.description,
      name: req.body.name,
      price: req.body.price
    });
  
    // Save Menu in the database
    Menu.create(menu, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Menu."
        });
      else res.send(data);
    });
  };
  

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
    Menu.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Menus."
        });
      else res.send(data);
    });
  };

// Find a single Menu with a menuId
exports.findOne = (req, res) => {
    Menu.findById(req.params.menuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with id ${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Menu with id " + req.params.menuId
          });
        }
      } else res.send(data);
    });
  };

// Update a Menu identified by the menuId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Menu.updateById(
      req.params.menuId,
      new Menu(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Menu with id ${req.params.menuId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Menu with id " + req.params.menuId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Menu with the specified menuId in the request
exports.delete = (req, res) => {
    Menu.remove(req.params.menuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Menu with id ${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Menu with id " + req.params.menuId
          });
        }
      } else res.send({ message: `Menu was deleted successfully!` });
    });
  };

// Delete all Menus from the database.
exports.deleteAll = (req, res) => {
    Menu.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Menus."
        });
      else res.send({ message: `All Menus were deleted successfully!` });
    });
  };