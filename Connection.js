const mySql = require("mysql2")
const connection = mySql.createPool({
    host: "localhost",
    user: "root",
    password: "Kamal@7989",
    database: "GMT"
})
module.exports=connection