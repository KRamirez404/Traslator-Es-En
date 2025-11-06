const { pool } = require('../config/database');

// Get all translations
exports.getAllTranslations = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM translations ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error getting translations:', error);
    res.status(500).json({ error: 'Error fetching translations' });
  }
};

// Get a single translation by ID
exports.getTranslationById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM translations WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error getting translation:', error);
    res.status(500).json({ error: 'Error fetching translation' });
  }
};

// Translate Spanish to English
exports.translateSpanishToEnglish = async (req, res) => {
  try {
    const { word } = req.params;
    const [rows] = await pool.query('SELECT english FROM translations WHERE spanish = ?', [word]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }
    res.json({ spanish: word, english: rows[0].english });
  } catch (error) {
    console.error('Error translating:', error);
    res.status(500).json({ error: 'Error translating word' });
  }
};

// Translate English to Spanish
exports.translateEnglishToSpanish = async (req, res) => {
  try {
    const { word } = req.params;
    const [rows] = await pool.query('SELECT spanish FROM translations WHERE english = ?', [word]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }
    res.json({ english: word, spanish: rows[0].spanish });
  } catch (error) {
    console.error('Error translating:', error);
    res.status(500).json({ error: 'Error translating word' });
  }
};

// Create a new translation
exports.createTranslation = async (req, res) => {
  try {
    const { spanish, english } = req.body;
    
    if (!spanish || !english) {
      return res.status(400).json({ error: 'Spanish and English words are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO translations (spanish, english) VALUES (?, ?)',
      [spanish, english]
    );
    
    res.status(201).json({
      id: result.insertId,
      spanish,
      english,
      message: 'Translation created successfully'
    });
  } catch (error) {
    console.error('Error creating translation:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Translation already exists' });
    }
    res.status(500).json({ error: 'Error creating translation' });
  }
};

// Update a translation
exports.updateTranslation = async (req, res) => {
  try {
    const { spanish, english } = req.body;
    const { id } = req.params;

    if (!spanish || !english) {
      return res.status(400).json({ error: 'Spanish and English words are required' });
    }

    const [result] = await pool.query(
      'UPDATE translations SET spanish = ?, english = ? WHERE id = ?',
      [spanish, english, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }

    res.json({
      id: parseInt(id),
      spanish,
      english,
      message: 'Translation updated successfully'
    });
  } catch (error) {
    console.error('Error updating translation:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Translation already exists' });
    }
    res.status(500).json({ error: 'Error updating translation' });
  }
};

// Delete a translation
exports.deleteTranslation = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM translations WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Translation not found' });
    }

    res.json({ message: 'Translation deleted successfully' });
  } catch (error) {
    console.error('Error deleting translation:', error);
    res.status(500).json({ error: 'Error deleting translation' });
  }
};
