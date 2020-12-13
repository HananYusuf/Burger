var connection = require("../config/connection.js");

    function printQuestionMarks(num) {
        var arr = [];
    
        for (var i = 0; i < num; i++) {
        arr.push("?");
        }
    
        return arr.toString();
    }
    

        function objToSql(ob) {
            var arr = [];
        
            // loop through the keys and push the key/value as a string int arr
            for (var key in ob) { //loos through obj field names  {name: "rex", age:27}
            
            var value = ob[key]; // value = rex
            // check to skip hidden properties
            if (Object.hasOwnProperty.call(ob, key)) {
                // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
                if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
                }
                // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
                // e.g. {sleepy: true} => ["sleepy=true"]
                arr.push(key + "=" + value);
            }
            }
        
            // translate array of strings to a single comma-separated string
            return arr.toString();
        }
        

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },



    insertOne: function (table, cols, vals, cb) {
        // let sql = "insert into burgers (burger_name) values ('chese burger');"
        //burger.insertOne("burger_name", 'chese burger', (res) => {})

        // orm.insertOne("burgers",["burger_name", "devoured"], ['chese burger', false], (result) => {})
        // INSERT INTO  burgers (burger_name, devoured) VALUES ("cheese burger", false) 
//users input will be constructed into an insert into sql command
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },


    //UPDATE burgers SET devoured = true WHERE id = 2;
    //UPDATE "burgers" SET {devoured: true} WHERE "id = 2"
    updateOne: function (table, objColVal, id, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objColVal;
        queryString += " = true"
        queryString += " WHERE id =";
        queryString += id;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}



    module.exports = orm;