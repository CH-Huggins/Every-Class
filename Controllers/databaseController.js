var mysql = require('mysql');

config = {
   host: 'localhost',
   user: 'root',            // USER
   password: 'password',    // PASSWORD
   database: 'javaproject'  // DATABASE NAME
}

var connection = mysql.createConnection(config); //Connect

connection.connect(function(err){
  if (err){
    console.log('Error:' + err.stack);
  }
  console.log('Connected to javaproject database!!.');
});

module.exports ={
     connection : mysql.createConnection(config) 
} 