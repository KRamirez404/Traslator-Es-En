import React, { useState, useEffect } from 'react';
import {
  getAllTraducciones,
  createTraduccion,
  updateTraduccion,
  deleteTraduccion
} from '../services/api';
import './GestionPalabras.css';

function GestionPalabras() {
  const [traducciones, setTraducciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [traduccionActual, setTraduccionActual] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  
  const [formData, setFormData] = useState({
    palabra_espanol: '',
    palabra_ingles: '',
    categoria: 'general'
  });

  useEffect(() => {
    cargarTraducciones();
  }, []);

  const cargarTraducciones = async () => {
    setCargando(true);
    setError('');
    try {
      const response = await getAllTraducciones();
      setTraducciones(response.data || []);
    } catch (err) {
      setError('Error al cargar las traducciones');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!formData.palabra_espanol || !formData.palabra_ingles) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      if (modoEdicion && traduccionActual) {
        await updateTraduccion(traduccionActual.id, formData);
        setMensaje('✅ Traducción actualizada correctamente');
      } else {
        await createTraduccion(formData);
        setMensaje('✅ Traducción creada correctamente');
      }
      
      resetForm();
      cargarTraducciones();
      
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la traducción');
    }
  };

  const handleEditar = (traduccion) => {
    setModoEdicion(true);
    setTraduccionActual(traduccion);
    setFormData({
      palabra_espanol: traduccion.palabra_espanol,
      palabra_ingles: traduccion.palabra_ingles,
      categoria: traduccion.categoria
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta traducción?')) {
      return;
    }

    try {
      await deleteTraduccion(id);
      setMensaje('✅ Traducción eliminada correctamente');
      cargarTraducciones();
      setTimeout(() => setMensaje(''), 3000);
    } catch (err) {
      setError('Error al eliminar la traducción');
    }
  };

  const resetForm = () => {
    setFormData({
      palabra_espanol: '',
      palabra_ingles: '',
      categoria: 'general'
    });
    setModoEdicion(false);
    setTraduccionActual(null);
  };

  const traduccionesFiltradas = traducciones.filter(t => 
    t.palabra_espanol.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.palabra_ingles.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="gestion-container">
      <div className="form-section">
        <h2>{modoEdicion ? '✏️ Editar Palabra' : '➕ Agregar Nueva Palabra'}</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        <form onSubmit={handleSubmit} className="palabra-form">
          <div className="form-group">
            <label>🇪🇸 Palabra en Español</label>
            <input
              type="text"
              value={formData.palabra_espanol}
              onChange={(e) => setFormData({...formData, palabra_espanol: e.target.value})}
              placeholder="Ej: casa"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>🇺🇸 Palabra en Inglés</label>
            <input
              type="text"
              value={formData.palabra_ingles}
              onChange={(e) => setFormData({...formData, palabra_ingles: e.target.value})}
              placeholder="Ej: house"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>📂 Categoría</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              className="form-input"
            >
              <option value="general">General</option>
              <option value="saludos">Saludos</option>
              <option value="sustantivos">Sustantivos</option>
              <option value="verbos">Verbos</option>
              <option value="adjetivos">Adjetivos</option>
              <option value="animales">Animales</option>
              <option value="colores">Colores</option>
              <option value="sentimientos">Sentimientos</option>
              <option value="alimentos">Alimentos</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {modoEdicion ? '💾 Actualizar' : '➕ Agregar'}
            </button>
            {modoEdicion && (
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="lista-section">
        <div className="lista-header">
          <h2>📚 Diccionario ({traduccionesFiltradas.length})</h2>
          <input
            type="text"
            placeholder="🔍 Buscar palabra..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-box"
          />
        </div>

        {cargando ? (
          <div className="loading">⏳ Cargando...</div>
        ) : traduccionesFiltradas.length === 0 ? (
          <div className="empty-state">
            📭 No hay palabras en el diccionario
          </div>
        ) : (
          <div className="tabla-container">
            <table className="palabras-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>🇪🇸 Español</th>
                  <th>🇺🇸 Inglés</th>
                  <th>📂 Categoría</th>
                  <th>⚙️ Acciones</th>
                </tr>
              </thead>
              <tbody>
                {traduccionesFiltradas.map((traduccion, index) => (
                  <tr key={traduccion.id}>
                    <td>{index + 1}</td>
                    <td className="palabra-cell">{traduccion.palabra_espanol}</td>
                    <td className="palabra-cell">{traduccion.palabra_ingles}</td>
                    <td>
                      <span className="badge">{traduccion.categoria}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEditar(traduccion)}
                          className="btn-icon btn-edit"
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleEliminar(traduccion.id)}
                          className="btn-icon btn-delete"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default GestionPalabras;
