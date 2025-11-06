import React, { useState, useEffect } from 'react';
import { translationService } from '../services/translationService';

function Dictionary() {
  const [translations, setTranslations] = useState([]);
  const [spanish, setSpanish] = useState('');
  const [english, setEnglish] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const data = await translationService.getAllTranslations();
      setTranslations(data);
    } catch (err) {
      setError('Error loading translations');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!spanish.trim() || !english.trim()) {
      setError('Both Spanish and English words are required');
      return;
    }

    try {
      if (editingId) {
        await translationService.updateTranslation(editingId, spanish.trim(), english.trim());
        setSuccess('Translation updated successfully!');
        setEditingId(null);
      } else {
        await translationService.createTranslation(spanish.trim(), english.trim());
        setSuccess('Translation added successfully!');
      }
      setSpanish('');
      setEnglish('');
      loadTranslations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error saving translation');
    }
  };

  const handleEdit = (translation) => {
    setSpanish(translation.spanish);
    setEnglish(translation.english);
    setEditingId(translation.id);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this translation?')) {
      try {
        await translationService.deleteTranslation(id);
        setSuccess('Translation deleted successfully!');
        loadTranslations();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Error deleting translation');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setSpanish('');
    setEnglish('');
    setError('');
  };

  return (
    <div className="dictionary-container">
      <h2>📚 Diccionario / Dictionary</h2>
      
      <form onSubmit={handleSubmit} className="dictionary-form">
        <div className="form-row">
          <div className="form-group">
            <label>Español:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Palabra en español"
              value={spanish}
              onChange={(e) => setSpanish(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>English:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Word in English"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update' : 'Add'} Translation
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="translations-list">
        <h3>Translations ({translations.length})</h3>
        {translations.length === 0 ? (
          <p className="no-data">No translations yet. Add your first one above!</p>
        ) : (
          <table className="translations-table">
            <thead>
              <tr>
                <th>Español</th>
                <th>English</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {translations.map((translation) => (
                <tr key={translation.id}>
                  <td>{translation.spanish}</td>
                  <td>{translation.english}</td>
                  <td>
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(translation)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(translation.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
