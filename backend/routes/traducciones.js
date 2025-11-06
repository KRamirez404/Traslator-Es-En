const express = require('express');
const router = express.Router();
const {
  getAllTraducciones,
  getTraduccionById,
  traducirPalabra,
  createTraduccion,
  updateTraduccion,
  deleteTraduccion
} = require('../controllers/traduccionesController');

// Rutas CRUD
router.get('/', getAllTraducciones);              // Obtener todas las traducciones
router.get('/:id', getTraduccionById);           // Obtener traducción por ID
router.get('/traducir/:palabra', traducirPalabra); // Traducir palabra
router.post('/', createTraduccion);              // Crear nueva traducción
router.put('/:id', updateTraduccion);           // Actualizar traducción
router.delete('/:id', deleteTraduccion);        // Eliminar traducción

module.exports = router;
