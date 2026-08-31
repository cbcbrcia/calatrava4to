import React, { useState, useEffect } from 'react';
import { Volume2, Languages, Search, X, Sparkles, BookOpen } from 'lucide-react';
import { BILINGUAL_DICTIONARY, lookupTranslation } from '../utils/bilingualDictionary';
import { sounds } from '../utils/audioEffects';

export function BilingualHelper({ enabled = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWordData, setSelectedWordData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  // Reproducir pronunciación con Web Speech API
  const speakEnglish = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; // Velocidad ligeramente pausada para aprendizaje de 4to
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  // Escuchar selecciones de texto en cualquier parte de la pantalla
  useEffect(() => {
    const handleMouseUp = (e) => {
      if (!enabled) return;
      const selection = window.getSelection().toString().trim();
      if (selection && selection.length > 1 && selection.length < 50) {
        const found = lookupTranslation(selection);
        if (found) {
          setSelectedWordData(found);
          setTooltipPos({
            x: Math.min(Math.max(e.clientX - 100, 20), window.innerWidth - 280),
            y: Math.max(e.clientY - 120, 20)
          });
        }
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [enabled]);

  const handleManualSearch = (term) => {
    setSearchTerm(term);
    const result = lookupTranslation(term);
    setSelectedWordData(result);
  };

  if (!enabled) return null;

  return (
    <>
      {/* Tooltip Emergente al Seleccionar o Hacer Hover */}
      {selectedWordData && (
        <div
          className="animate-bounce-in"
          style={{
            position: 'fixed',
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            zIndex: 999,
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            maxWidth: '300px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#67e8f9' }}>
              🇬🇧 English ➡️ 🇪🇸 Español
            </span>
            <button
              onClick={() => setSelectedWordData(null)}
              style={{ color: '#94a3b8', padding: '2px' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fbbf24', textTransform: 'capitalize' }}>
              {selectedWordData.term}
            </span>
            <button
              onClick={() => speakEnglish(selectedWordData.term)}
              title="Escuchar pronunciación"
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Volume2 size={16} />
            </button>
          </div>

          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>
            {selectedWordData.es}
          </div>

          <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.4 }}>
            💡 {selectedWordData.desc}
          </div>
        </div>
      )}

      {/* Botón Flotante Asistente Bilingüe en la Esquina */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 80 }}>
        {!isWidgetOpen ? (
          <button
            onClick={() => { sounds.playClick(); setIsWidgetOpen(true); }}
            className="btn btn-primary"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '12px 20px',
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)'
            }}
          >
            <Languages size={20} />
            <span>Traductor Bilingüe</span>
          </button>
        ) : (
          <div
            className="animate-fade-in"
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              width: '320px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.95rem' }}>
                <Languages size={18} />
                <span>Glosario Escolar Bilingüe</span>
              </div>
              <button onClick={() => setIsWidgetOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Selecciona cualquier palabra en pantalla o escribe un término en inglés para ver su significado y pronunciación:
            </p>

            {/* Buscador */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleManualSearch(e.target.value)}
                placeholder="Escribe en inglés (ej: cell, lungs, have to)..."
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem'
                }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '12px' }} />
            </div>

            {/* Resultado de Búsqueda Rápida */}
            {selectedWordData ? (
              <div style={{
                background: 'var(--bg-main)',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                    {selectedWordData.term}
                  </span>
                  <button
                    onClick={() => speakEnglish(selectedWordData.term)}
                    style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px', borderRadius: '50%' }}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <div style={{ fontWeight: 700, color: '#16a34a', fontSize: '0.95rem', marginBottom: '6px' }}>
                  {selectedWordData.es}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {selectedWordData.desc}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px 0' }}>
                💡 Tip: Pasa el cursor o subraya cualquier palabra de Science o English para traducir.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
