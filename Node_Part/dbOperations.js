var config=require('./dbConfig');
const sql=require('msnodesqlv8');

 async function getEmployeeDetails() {
    try {
      const rows = await new Promise((resolve, reject) => {
        sql.query(config, "select * from tblEmployeeMaster ", (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);  
          }
        });
      });
      console.log(rows);
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {
    getEmployeeDetails: getEmployeeDetails,
  };
  