import React, { useState } from 'react';
import { traducirPalabra } from '../services/api';
import './Traductor.css';

function Traductor() {
  const [palabra, setPalabra] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleTraducir = async (e) => {
    e.preventDefault();
    
    if (!palabra.trim()) {
      setError('Por favor ingresa una palabra');
      return;
    }

    setCargando(true);
    setError('');
    setResultado(null);

    try {
      const response = await traducirPalabra(palabra);
      setResultado(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Palabra no encontrada en el diccionario');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="traductor-container">
      <div className="traductor-card">
        <h2>🔍 Buscar Traducción</h2>
        <p className="subtitle">Ingresa una palabra en español o inglés</p>
        
        <form onSubmit={handleTraducir} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
              placeholder="Escribe aquí..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={cargando}>
              {cargando ? '⏳ Buscando...' : '🔍 Traducir'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {resultado && (
          <div className="resultado-card">
            <div className="traduccion-box">
              <div className="idioma-section">
                <span className="idioma-label">🇪🇸 Español</span>
                <p className="palabra">{resultado.palabra_espanol}</p>
              </div>
              
              <div className="arrow">⇄</div>
              
              <div className="idioma-section">
                <span className="idioma-label">🇺🇸 Inglés</span>
                <p className="palabra">{resultado.palabra_ingles}</p>
              </div>
            </div>
            
            <div className="categoria-badge">
              📂 Categoría: <strong>{resultado.categoria}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Traductor;
