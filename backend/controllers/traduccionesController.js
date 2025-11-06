const db = require('../config/database');

// Obtener todas las traducciones
const getAllTraducciones = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM traducciones ORDER BY palabra_espanol ASC');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las traducciones',
      error: error.message
    });
  }
};

// Obtener una traducción por ID
const getTraduccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM traducciones WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Traducción no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la traducción',
      error: error.message
    });
  }
};

// Buscar traducción (español a inglés o inglés a español)
const traducirPalabra = async (req, res) => {
  try {
    const { palabra } = req.params;
    const palabraLower = palabra.toLowerCase().trim();
    
    const [rows] = await db.query(
      'SELECT * FROM traducciones WHERE LOWER(palabra_espanol) = ? OR LOWER(palabra_ingles) = ?',
      [palabraLower, palabraLower]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Traducción no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar la traducción',
      error: error.message
    });
  }
};

// Crear nueva traducción
const createTraduccion = async (req, res) => {
  try {
    const { palabra_espanol, palabra_ingles, categoria } = req.body;
    
    if (!palabra_espanol || !palabra_ingles) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren ambas palabras (español e inglés)'
      });
    }
    
    const [result] = await db.query(
      'INSERT INTO traducciones (palabra_espanol, palabra_ingles, categoria) VALUES (?, ?, ?)',
      [palabra_espanol.toLowerCase(), palabra_ingles.toLowerCase(), categoria || 'general']
    );
    
    res.status(201).json({
      success: true,
      message: 'Traducción creada exitosamente',
      data: {
        id: result.insertId,
        palabra_espanol,
        palabra_ingles,
        categoria
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'La palabra en español ya existe en el diccionario'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al crear la traducción',
      error: error.message
    });
  }
};

// Actualizar traducción
const updateTraduccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { palabra_espanol, palabra_ingles, categoria } = req.body;
    
    // Verificar si existe
    const [existing] = await db.query('SELECT * FROM traducciones WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Traducción no encontrada'
      });
    }
    
    const [result] = await db.query(
      'UPDATE traducciones SET palabra_espanol = ?, palabra_ingles = ?, categoria = ? WHERE id = ?',
      [palabra_espanol.toLowerCase(), palabra_ingles.toLowerCase(), categoria || 'general', id]
    );
    
    res.json({
      success: true,
      message: 'Traducción actualizada exitosamente',
      data: {
        id,
        palabra_espanol,
        palabra_ingles,
        categoria
      }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'La palabra en español ya existe en el diccionario'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la traducción',
      error: error.message
    });
  }
};

// Eliminar traducción
const deleteTraduccion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query('DELETE FROM traducciones WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Traducción no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Traducción eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la traducción',
      error: error.message
    });
  }
};

module.exports = {
  getAllTraducciones,
  getTraduccionById,
  traducirPalabra,
  createTraduccion,
  updateTraduccion,
  deleteTraduccion
};
