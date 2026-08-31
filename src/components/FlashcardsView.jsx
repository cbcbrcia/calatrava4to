import React, { useState } from 'react';
import { ArrowLeft, RotateCw, Check, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export function FlashcardsView({ flashcards = [], unitTitle = '', onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p>No hay fichas de repaso disponibles para este tema aún.</p>
        <button onClick={onBack} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Volver
        </button>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    sounds.playClick();
    setIsFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Vuelve al inicio
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(flashcards.length - 1);
    }
  };

  const handleMarkKnown = () => {
    sounds.playCorrect();
    setKnownCount(prev => prev + 1);
    handleNext();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 60px' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        {/* Barra Superior */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button onClick={onBack} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={18} />
            <span>Volver</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Ficha {currentIndex + 1} de {flashcards.length}</span>
            <span className="badge" style={{ background: '#ecfdf5', color: '#047857' }}>
              🎯 {knownCount} Aprendidas
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
            🃏 Fichas de Repaso y Memorización
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {unitTitle} • Haz clic sobre la tarjeta para voltearla y ver la respuesta
          </p>
        </div>

        {/* Tarjeta Giratoria 3D */}
        <div className="flip-card-container" style={{ margin: '0 auto 28px', maxWidth: '560px' }}>
          <div
            className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
          >
            {/* Cara Frontal (Pregunta / Concepto) */}
            <div className="flip-card-front">
              <span className="badge" style={{ background: '#e0e7ff', color: '#4338ca', marginBottom: '16px' }}>
                Pregunta / Reto
              </span>
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '20px' }}>
                {currentCard.q}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <RotateCw size={14} />
                <span>Toca para voltear y ver la respuesta</span>
              </div>
            </div>

            {/* Cara Trasera (Respuesta) */}
            <div className="flip-card-back">
              <span className="badge" style={{ background: '#10b981', color: '#ffffff', marginBottom: '16px' }}>
                Respuesta Correcta
              </span>
              <p style={{ fontSize: '1.2rem', fontWeight: 500, color: '#ffffff', lineHeight: 1.6, marginBottom: '20px' }}>
                {currentCard.a}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#c7d2fe' }}>
                <RotateCw size={14} />
                <span>Toca para volver a la pregunta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de Navegación */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handlePrev}
            className="btn btn-secondary"
            style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={handleMarkKnown}
            className="btn"
            style={{ background: '#10b981', color: '#fff', fontWeight: 700, padding: '12px 24px' }}
          >
            <Check size={18} />
            <span>¡Ya me la sé!</span>
          </button>

          <button
            onClick={handleNext}
            className="btn btn-secondary"
            style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
