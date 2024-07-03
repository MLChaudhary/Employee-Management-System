const { reset } = require('nodemon');
const dboperations = require('./dbOperations');
 
dboperations.getEmployeeDetails().then(result => {
    console.log(result);
}).catch(error => {
    console.error(error);
});


// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const dboperations = require('./dbOperations');

// app.use(bodyParser.json());


// // Retrieve all login details
// app.get('/list', async (req, res) => {
//     try {
//         const result = await dboperations.getEmployeeDetails();
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// app.listen(4000);



