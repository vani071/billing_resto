const Table = require("../models/table.model.js");

// Create and Save a new Table
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    if(!req.body.total_chairs)
    res.status(400).send({
     message: "please input total_chairs"
     });
  
    // Create a Table
    const table = new Table({
      total_chairs: req.body.total_chairs,
    });
  
    // Save Table in the database
    Table.create(table, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Table."
        });
      else res.send(data);
    });
  };
  

// Retrieve all Tables from the database.
exports.findAll = (req, res) => {
    Table.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tables."
        });
      else res.send(data);
    });
  };

// Find a single Table with a tableId
exports.findOne = (req, res) => {
    Table.findById(req.params.tableId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Table with id ${req.params.tableId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Table with id " + req.params.tableId
          });
        }
      } else res.send(data);
    });
  };

// Update a Table identified by the tableId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Table.updateById(
      req.params.tableId,
      new Table(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Table with id ${req.params.tableId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Table with id " + req.params.tableId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Table with the specified tableId in the request
exports.delete = (req, res) => {
    Table.remove(req.params.tableId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Table with id ${req.params.tableId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Table with id " + req.params.tableId
          });
        }
      } else res.send({ message: `Table was deleted successfully!` });
    });
  };

// Delete all Tables from the database.
exports.deleteAll = (req, res) => {
    Table.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tables."
        });
      else res.send({ message: `All Tables were deleted successfully!` });
    });
  };