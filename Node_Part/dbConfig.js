const connectionString="server=DESKTOP-O9QUEN2;Database=Work;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
module.exports=connectionString;
















    



// // For USER Registration
// app.post('/register', (req, res) => {
//     const data = req.body;

//     // if (data.password !== data.retypePassword) {
//     //     return res.status(400).json({ error: 'Password and Retype Password do not match' });
//     // }
//     delete data.retypePassword;

//     const columns = Object.keys(data).join(', ');
//     const values = Object.values(data);
    
//     const query = `INSERT INTO tblEmployeeMaster (${columns}) VALUES (${values.map(() => '?').join(', ')})`;

//     sql.query(config, query, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }   
//         return res.status(201).json(result);
//     });
// });

















// // For Employee Search
// app.get('/searchEmployees', (req, res) => {
//     const { FirstName, Department } = req.query;
  
//     const query = 
//     `Select FirstName,MiddleName, LastName, Department, DateOfJoin 
//     From tblNewEmployeeMaster 
//     WHERE (? IS NULL OR FirstName LIKE ?)
//     AND (? IS NULL OR Department = ?)`;
//     sql.query(config, query, [FirstName, `%${FirstName}%`, Department, Department], (err, result) => {
//         if (err) {
//           console.error('Error executing query:', err);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           res.json(result);
//         }
//       });
//   });












// app.post('/api/login', async (req, res) => {
//     try {
//         const { user, password } = req.body;

//         const query = `
//             SELECT EmployeeId, UserName, Password
//             FROM tblEmployeeMaster
//             WHERE UserName = ? AND Password = ?
//         `;

//         sql.query(config, query, [user, password], (err, results) => {
//             if (err) {
//                 console.error('SQL Query Error:', err);
//                 res.status(500).json({ error: err.message });
//             } else {
//                 if (results.length > 0) {
//                     res.json({ success: true, message: 'Login successful' });
//                 } else {
//                     res.status(401).json({ success: false, message: 'Invalid credentials' });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error('Login Route Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });