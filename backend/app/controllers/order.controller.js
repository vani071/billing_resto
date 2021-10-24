const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

  
    // Create a Order
    const table = new Order({
       customer_id : req.body.customer_id,
       table_id : req.body.table_id,
       grandtotal : req.body.grandtotal,
       status : req.body.status,
       user_id : req.body.user_id,
       booking_time : req.body.booking_time,
    });
  
    // Save Order in the database
    Order.create(table, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Order."
        });
      else res.send(data);
    });
  };
  

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tables."
        });
      else res.send(data);
    });
  };

// Find a single Order with a tableId
exports.findOne = (req, res) => {
    Order.findById(req.params.tableId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.tableId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Order with id " + req.params.tableId
          });
        }
      } else res.send(data);
    });
  };

// Update a Order identified by the tableId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Order.updateById(
      req.params.tableId,
      new Order(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Order with id ${req.params.tableId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Order with id " + req.params.tableId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Order with the specified tableId in the request
exports.delete = (req, res) => {
    Order.remove(req.params.tableId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.tableId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Order with id " + req.params.tableId
          });
        }
      } else res.send({ message: `Order was deleted successfully!` });
    });
  };

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
    Order.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tables."
        });
      else res.send({ message: `All Orders were deleted successfully!` });
    });
  };