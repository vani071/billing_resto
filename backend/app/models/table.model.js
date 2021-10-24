const sql = require("./db.js");

// constructor
const Table = function(table) {
    this.total_chairs = table.total_chairs;
};
  
Table.create = (newTable, result) => {
    sql.query("INSERT INTO tables SET ?", newTable, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        console.log("created customer: ", { id: res.insertId, ...newTable });
        result(null, { id: res.insertId, ...newTable });
    });
};

Table.findById = (tableId, result) => {
    sql.query(`SELECT * FROM tables WHERE id = ${tableId}`, (err, res) => {
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

        // not found Table with the id
        result({ kind: "not_found" }, null);
    });
};

Table.getAll = result => {
    sql.query("SELECT * FROM tables", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log("tables: ", res);
        result(null, res);
    });
};

Table.updateById = (id, table, result) => {
    sql.query(
        "UPDATE tables SET total_chairs = ? WHERE id = ?",
        [table.total_chairs, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Table with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated table: ", { id: id, ...table });
        result(null, { id: id, ...table });
        }
    );
};

Table.remove = (id, result) => {
    sql.query("DELETE FROM tables WHERE id = ?", id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        if (res.affectedRows == 0) {
        // not found Table with the id
        result({ kind: "not_found" }, null);
        return;
        }

        console.log("deleted table with id: ", id);
        result(null, res);
    });
};

Table.removeAll = result => {
    sql.query("DELETE FROM tables", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    });
  };
  
  module.exports = Table;