const express = require('express');
const router = express.Router();
const db = require('../lib/db.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const userMiddleware = require('../middleware/users.js');


// Ruta para obtener todos los productos
router.get('/api/products', userMiddleware.isLoggedIn, (req, res, next) => {
  db.query('SELECT * FROM producto', (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).send('Error al obtener los productos');
    } else {
      res.send(results);
    }
  });

});


// Ruta para obtener un producto por su ID
router.get('/products/:id',  userMiddleware.isLoggedIn, (req, res, next) => {
  // Lógica para obtener un producto por su ID desde la base de datos MySQL
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).send('Error al obtener el producto');
    } else if (results.length === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.send(results[0]);
    }
  });
});

// Ruta para crear un nuevo producto
router.post('/products', userMiddleware.isLoggedIn, (req, res, next) => {
  // Lógica para crear un nuevo producto en la base de datos MySQL
  const productData = req.body;
  db.query('INSERT INTO products SET ?', [productData], (error, results) => {
    if (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).send('Error al crear el producto');
    } else {
      res.send('Producto creado exitosamente');
    }
  });
});

// Ruta para actualizar un producto existente
router.put('/products/:id',  userMiddleware.isLoggedIn, (req, res, next) => {
  // Lógica para actualizar un producto existente en la base de datos MySQL
  const productId = req.params.id;
  const productData = req.body;
  db.query('UPDATE products SET ? WHERE id = ?', [productData, productId], (error, results) => {
    if (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).send('Error al actualizar el producto');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.send('Producto actualizado exitosamente');
    }
  });
});

// Ruta para eliminar un producto existente
router.delete('/products/:id',  userMiddleware.isLoggedIn, (req, res, next) => {
  // Lógica para eliminar un producto existente de la base de datos MySQL
  const productId = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).send('Error al eliminar el producto');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.send('Producto eliminado exitosamente');
    }
  });
});

module.exports = router;
