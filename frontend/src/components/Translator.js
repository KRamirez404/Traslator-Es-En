import React, { useState } from 'react';
import { translationService } from '../services/translationService';

function Translator() {
  const [inputWord, setInputWord] = useState('');
  const [translatedWord, setTranslatedWord] = useState('');
  const [direction, setDirection] = useState('es-en');
  const [error, setError] = useState('');

  const handleTranslate = async (e) => {
    e.preventDefault();
    setError('');
    setTranslatedWord('');

    if (!inputWord.trim()) {
      setError('Please enter a word to translate');
      return;
    }

    try {
      let result;
      if (direction === 'es-en') {
        result = await translationService.translateSpanishToEnglish(inputWord.trim());
        setTranslatedWord(result.english);
      } else {
        result = await translationService.translateEnglishToSpanish(inputWord.trim());
        setTranslatedWord(result.spanish);
      }
    } catch (err) {
      setError('Translation not found. Please add it to the dictionary first.');
    }
  };

  return (
    <div className="translator-container">
      <h2>🔄 Traductor / Translator</h2>
      <form onSubmit={handleTranslate}>
        <div className="form-group">
          <select 
            value={direction} 
            onChange={(e) => setDirection(e.target.value)}
            className="form-control"
          >
            <option value="es-en">Español → English</option>
            <option value="en-es">English → Español</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder={direction === 'es-en' ? 'Palabra en español' : 'Word in English'}
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Translate
        </button>
      </form>
      {translatedWord && (
        <div className="translation-result">
          <h3>Translation:</h3>
          <p className="result-text">{translatedWord}</p>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Translator;
