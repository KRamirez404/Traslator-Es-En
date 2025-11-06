import React, { useState } from 'react';
import Translator from './components/Translator';
import Dictionary from './components/Dictionary';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('translator');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌎 Traductor Español-Inglés / Spanish-English Translator</h1>
      </header>
      
      <nav className="app-nav">
        <button 
          className={`nav-btn ${activeTab === 'translator' ? 'active' : ''}`}
          onClick={() => setActiveTab('translator')}
        >
          🔄 Translator
        </button>
        <button 
          className={`nav-btn ${activeTab === 'dictionary' ? 'active' : ''}`}
          onClick={() => setActiveTab('dictionary')}
        >
          📚 Dictionary
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'translator' ? <Translator /> : <Dictionary />}
      </main>

      <footer className="app-footer">
        <p>Spanish-English Translator App</p>
      </footer>
    </div>
  );
}

export default App;
