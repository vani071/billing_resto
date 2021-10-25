const sql = require("./db.js");

// constructor
const order = function(order) {
    this.customer_id = order.customer_id;
    this.booking_time = order.booking_time;
    this.table_id = order.table_id,
    this.grandtotal = order.grandtotal;
    this.status = order.status;
    this.user_id = order.user_id;

};
  
order.create = (neworder, result) => {
    sql.query("INSERT INTO orders SET ?", neworder, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        console.log("created customer: ", { id: res.insertId, ...neworder });
        result(null, { id: res.insertId, ...neworder });
    });
};

order.findById = (orderId, result) => {
    sql.query(`SELECT * FROM orders WHERE id = ${orderId}`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        if (res.length) {
        console.log("found order: ", res[0]);
        result(null, res[0]);
        return;
        }

        // not found order with the id
        result({ kind: "not_found" }, null);
    });
};

order.getAll = result => {
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

order.updateById = (id, order, result) => {
    sql.query(
        "UPDATE orders SET total_chairs = ? WHERE id = ?",
        [order.total_chairs, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found order with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated order: ", { id: id, ...order });
        result(null, { id: id, ...order });
        }
    );
};

order.remove = (id, result) => {
    sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("deleted order with id: ", id);
        result(null, res);
    });
};

order.removeAll = result => {
    sql.query("DELETE FROM orders", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
  module.exports = order;