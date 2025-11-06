import React, { useState } from 'react';
import Traductor from './components/Traductor';
import GestionPalabras from './components/GestionPalabras';
import './App.css';

function App() {
  const [vistaActual, setVistaActual] = useState('traductor');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌐 Traductor Español ⇄ Inglés</h1>
        <nav className="nav-tabs">
          <button 
            className={vistaActual === 'traductor' ? 'active' : ''}
            onClick={() => setVistaActual('traductor')}
          >
            🔄 Traductor
          </button>
          <button 
            className={vistaActual === 'gestion' ? 'active' : ''}
            onClick={() => setVistaActual('gestion')}
          >
            📚 Gestión de Palabras
          </button>
        </nav>
      </header>

      <main className="app-main">
        {vistaActual === 'traductor' ? <Traductor /> : <GestionPalabras />}
      </main>

      <footer className="app-footer">
        <p>© 2025 Traductor ES-EN | Desarrollado con React + Node.js + MySQL</p>
      </footer>
    </div>
  );
}

export default App;
