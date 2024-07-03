const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql=require('msnodesqlv8');
const config=require('./dbConfig');
const nodemailer = require('nodemailer');

const multer = require('multer');
const path = require('path');
const exceljs = require('exceljs');


const app = express();

app.use(bodyParser.json());
app.use(cors());

// For Login
app.post('/login', (req, res) => {
    const { EmailId, Password } = req.body;
    console.log('Received credentials:', EmailId, Password);

    const query = `SELECT EmailId, Password FROM tblEmployeeMaster WHERE EmailId COLLATE SQL_Latin1_General_CP1_CS_AS = ? AND Password COLLATE SQL_Latin1_General_CP1_CS_AS = ?`;

    sql.query(config, query , [EmailId, Password], (err, result) => {
        if (err) {
            console.error('Error executing Sql query:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message  });
        }

        console.log('Sql query result:', result);

        if (result.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials'});
        } 
    });
});

// Password comparison API
app.post('/compare-password', (req, res) => {
    const { EmailId, Password } = req.body;

    const query = ` SELECT Password FROM tblEmployeeMaster WHERE EmailId COLLATE SQL_Latin1_General_CP1_CS_AS = ? `;

    sql.query(config, query, [EmailId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }

        if (result.length > 0) {
            const storedPassword = result[0].Password;

            if (Password === storedPassword) {
                res.json({ match: true });
            } else {
                res.json({ match: false });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
});

// Email ID Exist or not 
app.get('/checkEmailExists', (req, res) => {
    const EmailId = req.query.email;
  
    if (!EmailId) {
      return res.status(400).json({ error: 'Email parameter is missing in the request.' });
    }
  
    const query = 'SELECT COUNT(*) AS count FROM tblEmployeeMaster WHERE EmailId = ?';
  
    sql.query(config, query, [EmailId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      const emailExists = result[0].count > 0;
      res.json({ emailExists });
    });
  });

//   Sending Password to user Through Email
app.post('/sendPasswordByEmail', (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mihirjua123@gmail.com', 
      pass: 'zmsf jjee eini kclq'         
    }
  });

  const mailOptions = {
    from: 'mihirjua123@gmail.com',   
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
}); 

// Password Reset
app.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;

  const query = `UPDATE tblEmployeeMaster SET Password = ? WHERE EmailId = ?;`;

  console.log('Email:', email);
console.log('New Password:', newPassword);

  sql.query(config, query, [newPassword, email], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      console.log('SQL Query Result:', result);
      if (result.length > 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'Password reset successfully!' });
    }
  });
});


// API to get FirstName based on email
app.get('/getUserInfo', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Email parameter is missing in the request.' });
    }

    const query = ` SELECT FirstName FROM tblEmployeeMaster WHERE EmailId = ? `;
  
    sql.query(config, query, [email], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        if (result.length > 0) {
          res.json({ FirstName: result[0].FirstName });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });
  });

  // API to get user info based on email
  app.get('/getUserDataByEmail', (req, res) => {
    const email = req.query.email;
  
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is missing in the request.' });
    }
  
    const query = 'SELECT * FROM tblEmployeeMaster WHERE EmailId = ?';
  
    sql.query(config, query, [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (result.length > 0) {
        res.json({ userData: result[0] });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  });

  // Update password API
  app.put('/update-password', (req, res) => {
    const employeeId = req.body.employeeId;
    const newPassword = req.body.newPassword;
    console.log('Received PUT request to update password:', req.body);
    console.log('employeeId:', employeeId);
    console.log('newPassword:', newPassword);
  
    const query = 'UPDATE tblEmployeeMaster SET Password = ? WHERE EmployeeId = ?';
    console.log('Final Query:', query);
    console.log('Parameters:', [newPassword, employeeId]);
  
    sql.query(config, query, [newPassword, employeeId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });

  // Current Password Comparison
app.post('/compare-current-password', (req, res) => {
  const { employeeId, currentPassword } = req.body;

  const query = `SELECT Password FROM tblEmployeeMaster WHERE EmployeeId = ?`;

  sql.query(config, query, [employeeId], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    if (result.length > 0) {
      const storedPassword = result[0].Password;

      if (currentPassword === storedPassword) {
        res.json({ match: true });
      } else {
        res.json({ match: false });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

    
  
  

// For USER Registration
app.post('/register', (req, res) => {
    const data = req.body;

    // if (data.password !== data.retypePassword) {
    //     return res.status(400).json({ error: 'Password and Retype Password do not match' });
    // }
    delete data.retypePassword;

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    
    const query = `INSERT INTO tblEmployeeMaster (${columns}) VALUES (${values.map(() => '?').join(', ')})`;

    sql.query(config, query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }   
        return res.status(201).json(result);
    });
});


// // For Employee Table
app.get('/employees', async (req,res) => {
    const query = "Select FirstName,MiddleName, LastName, Department, DateOfJoin From tblNewEmployeeMaster"
    sql.query(config,query, (err,result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error'  });
        } else {
            res.send(result);  
        }
    });
});

app.get('/employeesByID', async (req,res) => {
    const query = "Select * From tblNewEmployeeMaster"
    sql.query(config,query, (err,result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error'  });
        } else {
            res.send(result);  
        }
    });
});
  
// when user click on update employee data pop up in console
app.get('/employee-detail', async (req,res) => {
  const { FirstName, MiddleName, LastName, Department } = req.query;

  const query = `
      SELECT *
      FROM tblNewEmployeeMaster
      WHERE FirstName = ?
        AND MiddleName = ?
        AND LastName = ?
        AND Department = ?
    `;
  sql.query(config,query, [FirstName, MiddleName, LastName, Department],(err,result) => {
      if (err) {
          console.log(err)
          res.status(500).json({ error: 'Internal Server Error'  });
      } else {
          res.send(result);  
      }
  }); 
});

// For update Employee
app.put('/update-employee/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const { firstName, middleName, lastName, department, dateOfJoin, dateOfBirth, Salary, address } = req.body;

  const query = `
    UPDATE tblNewEmployeeMaster
    SET FirstName = ?,
        MiddleName = ?,
        LastName = ?,
        Department = ?,
        DateOfJoin = ?,
        DateOfBirth = ?,
        Salary = ?,
        Address = ?
    WHERE EmployeeID = ?
  `;

  sql.query(config, query, [firstName, middleName, lastName, department, dateOfJoin, dateOfBirth, Salary, address, employeeId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Employee updated successfully' });
    }
  });
});

// Delete Employee
app.delete('/delete/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;

    const query = "DELETE FROM tblNewEmployeeMaster WHERE EmployeeID = ?";
    const params = [employeeId];

    sql.query(config, query, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (result && result.length === 0) {
                res.json({ message: 'Delete successful' });
            } else {
                res.json({ message: 'No rows deleted' });
            }
        }
    });
});

// For New Employee Registration
app.post('/newRegister', (req, res) => {
    const data = req.body;

    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    
    const query = `INSERT INTO tblNewEmployeeMaster (${columns}) VALUES (${values.map(() => '?').join(', ')})`;

    sql.query(config, query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }   
        return res.status(201).json(result);
    });
});


// Save recevied files into uploads folder
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + ext);
    }
  });      

  const upload = multer({ storage: storage });

  app.post('/uploadAndRegister', upload.single('file'), async (req, res) => {
    try {
      console.log('File upload request received:', req.file);
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file received' });
      }
  
      const workbook = new exceljs.Workbook();
      await workbook.xlsx.readFile(req.file.path);
  
      const worksheet = workbook.getWorksheet(1); 
  
      for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const data = {  
          firstName: worksheet.getCell(rowNumber, 1).value,
          presentDays: worksheet.getCell(rowNumber, 2).value,
          absentDays: worksheet.getCell(rowNumber, 3).value,
          month: worksheet.getCell(rowNumber, 4).value,
          year: worksheet.getCell(rowNumber, 5).value
        };

        const insertQuery = `
          INSERT INTO tblAttendance (firstName, presentDays, absentDays, month, year)
          VALUES (?, ?, ?, ?, ?);`;
  
        const values = [
          data.firstName,
          data.presentDays,
          data.absentDays,
          mapMonthToNumber(data.month),
          data.year
        ];
  
        console.log('Insert Query:', insertQuery);
        console.log('Values:', values);
  
        sql.query(config, insertQuery, values);
        console.log(`Row ${rowNumber - 1}: Data inserted successfully - FirstName: ${data.firstName}, PresentDays: ${data.presentDays}, AbsentDays: ${data.absentDays}, Month: ${data.month}, Year: ${data.year}`);
      }
  
      res.status(200).json({ message: `File data inserted successfully` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  function mapMonthToNumber(monthName) {
    const monthMap = {
      'January': 1,
      'February': 2,
      'March': 3,
      'April': 4,
      'May': 5,
      'June': 6,
      'July': 7,
      'August': 8,
      'September': 9,
      'October': 10,
      'November': 11,
      'December': 12
    };
    return monthMap[monthName] || 0; 
  }
  


  app.get('/attendance', async (req,res) => {
    const { firstName, month, year } = req.query;

    if (!firstName || !month || !year) {
      res.status(400).json({ error: 'User, month, and year are required parameters.' });
      return;
    }

    const query = 'SELECT * FROM tblAttendance WHERE firstName = ? AND month = ? AND year = ?';

    sql.query(config,query, [firstName, month, year],(err,result) => {
        if (err) {
            console.log('Error fetching attendance data:', err)
            res.status(500).json({ error: 'Internal Server Error'  });
        } else {
            res.send(result);  
        }
    });   
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


























// app.get('/employee', async (req,res) => {
//     const query = "Select * From tblEmployeeMaster"
//     sql.query(config,query, (err,result) => {
//         if (err) {
//             console.log(err)
//             res.status(500).json({ error: 'Internal Server Error'  });
//         } else {
//             res.send(result);  
//         }
//     });
// });





// app.put('/update/:employeeId', async (req, res) => {
//     const employeeId = req.params.employeeId;
//     const newData = req.body;

//     const updateColumns = Object.keys(newData).map(column => `${column} = ?`).join(', ');

//     const query = `UPDATE tblEmployeeMaster SET ${updateColumns} WHERE EmployeeId = ?`;
//     const params = [...Object.values(newData), employeeId];

//     sql.query(config, query, params, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             // res.json(result);
//             if (result && result.rowsAffected > 0) {
//                 res.json({ message: 'Update successful' });
//             } else {
//                 res.json({ message: 'No rows updated' });
//             }
//         }
//     });
// });

// app.delete('/delete/:employeeId', async (req, res) => {
//     const employeeId = req.params.employeeId;

//     const query = "DELETE FROM tblEmployeeMaster WHERE EmployeeId = ?";
//     const params = [employeeId];

//     sql.query(config, query, params, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             // Check if at least one row was affected by the delete
//             if (result && result.rowsAffected > 0) {
//                 res.json({ message: 'Delete successful' });
//             } else {
//                 res.json({ message: 'No rows deleted' });
//             }
//         }
//     });
// });


// app.get('/employees', async (req,res) => {
    //     try{
    //         const employees = await new Promise((resolve,reject) => {
    //             sql.query(config,"Select * From tblEmployeeMaster ", (err,result) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(result);  
    //                 }
    //             });
    //         });
    //         // console.log(employees);
    //         res.json(employees);   
    //     }catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // });








