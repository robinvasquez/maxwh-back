const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
//const port = 3000;
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const productController = require('./controllers/productController');

app.use(express.json());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.get('/api/inicio', (req,res) => {
  res.send('¡Hola Desarrollador!')
})

const router = require('./routes/router.js');
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});


app.use('/', productController);
////

