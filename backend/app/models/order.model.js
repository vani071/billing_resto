const sql = require("./db.js");

// constructor
const Order = function(order) {
    this.customer_id = order.customer_id;
    this.table_id = order.table_id;
    this.grandtotal = order.grandtotal;
    this.status = order.status;
    this.user_id = order.user_id;
    this.booking_time = order.booking_time;
};
  
Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        console.log("created orders: ", { id: res.insertId, ...newOrder });
        result(null, { id: res.insertId, ...newOrder });
    });
};

Order.findById = (tableId, result) => {
    sql.query(`SELECT * FROM orders WHERE id = ${tableId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found table: ", res[0]);
        result(null, res[0]);
        return;
        }

        // not found Order with the id
        result({ kind: "not_found" }, null);
    });
};

Order.getAll = result => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log("orders: ", res);
        result(null, res);
    });
};

Order.updateById = (id, table, result) => {
    sql.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [table.status, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Order with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated table: ", { id: id, ...table });
        result(null, { id: id, ...table });
        }
    );
};

Order.remove = (id, result) => {
    sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("deleted table with id: ", id);
        result(null, res);
    });
};

Order.removeAll = result => {
    sql.query("DELETE FROM orders", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} orders`);
      result(null, res);
    });
  };
  
  module.exports = Order;