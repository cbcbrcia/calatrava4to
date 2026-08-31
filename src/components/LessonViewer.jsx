import React from 'react';
import { ArrowLeft, CheckCircle2, Layers, Award } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

export function LessonViewer({
  topic,
  unit,
  subject,
  onBack,
  isCompleted,
  onToggleCompleted,
  onOpenFlashcards,
  onOpenQuiz
}) {
  const isSubjectEnglish = subject.id === 'science' || subject.id === 'ingles' || subject.id === 'pli-camelot';

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 60px' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        
        {/* Barra Superior con Navegación y Acciones */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => { sounds.playClick(); onBack(); }}
            className="btn btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={18} />
            <DualText
              es={`Volver a ${subject.name}`}
              en={`Back to ${subject.nameEn || subject.name}`}
              inline
            />
          </button>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { sounds.playClick(); onOpenFlashcards(); }}
              className="btn btn-secondary"
              style={{ background: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' }}
            >
              <Layers size={16} />
              <DualText es="Fichas de Repaso" en="Flashcards" inline />
            </button>

            <button
              onClick={() => {
                sounds.playCorrect();
                onToggleCompleted(topic.id);
              }}
              className="btn"
              style={{
                background: isCompleted ? '#ecfdf5' : '#4f46e5',
                color: isCompleted ? '#059669' : '#ffffff',
                border: isCompleted ? '1.5px solid #10b981' : 'none',
                fontWeight: 700
              }}
            >
              <CheckCircle2 size={18} />
              <span>
                <DualText
                  es={isCompleted ? '¡Tema Completado! (+50 XP)' : 'Completar Tema (+50 XP)'}
                  en={isCompleted ? 'Topic Completed! (+50 XP)' : 'Complete Topic (+50 XP)'}
                  secondaryStyle={{ color: isCompleted ? '#047857' : '#e0e7ff' }}
                  inline
                />
              </span>
            </button>
          </div>
        </div>

        {/* Encabezado del Tema */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '28px 32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge" style={{ background: subject.bgColor, color: subject.color }}>
              <DualText es={topic.badge} en={topic.badgeEn || topic.badge} inline />
            </span>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              📖 {topic.bookPages}
            </span>
          </div>

          <h1 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            <DualText
              es={topic.title}
              en={topic.titleEn || topic.title}
              primary={isSubjectEnglish ? 'en' : 'es'}
              secondaryStyle={{ color: '#2563eb', fontSize: '0.75em' }}
            />
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            <DualText
              es={`${unit.title} • ${subject.name}`}
              en={`${unit.titleEn || unit.title} • ${subject.nameEn || subject.name}`}
              primary={isSubjectEnglish ? 'en' : 'es'}
              secondaryStyle={{ color: '#2563eb' }}
            />
          </p>
        </div>

        {/* CONTENIDO DE LA LECCIÓN: TEXTO ORIGINAL + TRADUCCIÓN EN AZUL / VERDE DEBAJO */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '2px solid var(--bg-subtle)', paddingBottom: '10px' }}>
            <DualText
              es="📖 Explicación y Conceptos Clave"
              en="📖 Key Concepts & Explanation"
              secondaryStyle={{ color: '#2563eb' }}
              inline
            />
          </h2>

          {topic.bilingualBlocks && topic.bilingualBlocks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {topic.bilingualBlocks.map((block, idx) => {
                const mainText = isSubjectEnglish ? block.en : block.es;
                const translationText = isSubjectEnglish ? block.es : block.en;
                const translationLangLabel = isSubjectEnglish ? '🇪🇸 Traducción al español:' : '🇬🇧 English translation:';
                // Color azul destacado para traducciones al inglés (#1d4ed8) o verde para español (#059669)
                const translationTextColor = isSubjectEnglish ? '#047857' : '#1d4ed8';
                const translationBorderColor = isSubjectEnglish ? '#a7f3d0' : '#bfdbfe';
                const translationBgColor = isSubjectEnglish ? '#f0fdf4' : '#eff6ff';

                return (
                  <div
                    key={idx}
                    style={{
                      background: '#f8fafc',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px 24px',
                      borderLeft: isSubjectEnglish ? '4px solid #10b981' : '4px solid #3b82f6'
                    }}
                  >
                    {/* TEXTO PRINCIPAL (Grande y Nítido) */}
                    <div style={{
                      fontSize: '1.08rem',
                      lineHeight: 1.8,
                      color: '#0f172a',
                      fontWeight: 600,
                      whiteSpace: 'pre-line',
                      marginBottom: '12px'
                    }}>
                      {mainText}
                    </div>

                    {/* TRADUCCIÓN ABAJO (EN AZUL O VERDE PEDAGÓGICO) */}
                    {translationText && (
                      <div style={{
                        fontSize: '0.96rem',
                        lineHeight: 1.65,
                        color: translationTextColor, // Color Azul / Verde destacado
                        background: translationBgColor,
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-sm)',
                        border: `1.5px dashed ${translationBorderColor}`,
                        fontStyle: 'italic',
                        whiteSpace: 'pre-line',
                        fontWeight: 500
                      }}>
                        <div style={{
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: isSubjectEnglish ? '#065f46' : '#1e40af',
                          fontStyle: 'normal',
                          marginBottom: '4px'
                        }}>
                          {translationLangLabel}
                        </div>
                        {translationText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ whiteSpace: 'pre-line', lineHeight: 1.8, fontSize: '1.05rem', color: '#1e293b' }}>
              {topic.conceptSummary}
            </div>
          )}
        </div>

        {/* EJEMPLOS PASO A PASO */}
        {topic.examples && topic.examples.length > 0 && (
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '20px', borderBottom: '2px solid var(--bg-subtle)', paddingBottom: '10px' }}>
              <DualText
                es="✏️ Ejemplos Resueltos Paso a Paso"
                en="✏️ Step-by-Step Worked Examples"
                secondaryStyle={{ color: '#2563eb' }}
                inline
              />
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {topic.examples.map((ex, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    padding: '22px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                      Ejemplo #{idx + 1}: {ex.problem}
                    </div>
                    {(ex.problemEn || ex.problemEs) && (
                      <div style={{ fontSize: '0.94rem', color: '#1d4ed8', fontStyle: 'italic', fontWeight: 500 }}>
                        🌐 {ex.problemEn || ex.problemEs}
                      </div>
                    )}
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: 'var(--radius-sm)', padding: '16px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
                      Paso a Paso:
                    </div>
                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {ex.stepByStep.map((step, sIdx) => (
                        <li key={sIdx} style={{ fontSize: '0.94rem', color: '#334155' }}>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ecfdf5',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#065f46',
                    fontWeight: 700
                  }}>
                    <span>✅ Respuesta:</span>
                    <span style={{ fontSize: '1.02rem', color: '#047857' }}>{ex.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barra Inferior para Iniciar Quiz */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 30px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '4px' }}>
              <DualText
                es="¿Listo para evaluar este logro?"
                en="Ready to take this assessment?"
                secondaryStyle={{ color: '#38bdf8' }}
              />
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem' }}>
              <DualText
                es="Pon a prueba tus conocimientos y gana puntos de experiencia (XP)."
                en="Test your knowledge and earn experience points (XP)."
                secondaryStyle={{ color: '#7dd3fc' }}
              />
            </p>
          </div>

          <button
            onClick={() => { sounds.playClick(); onOpenQuiz(); }}
            className="btn btn-primary"
            style={{ background: '#f59e0b', color: '#000', fontWeight: 800, padding: '12px 24px' }}
          >
            <DualText
              es="⭐ Iniciar Evaluación"
              en="⭐ Start Assessment"
              secondaryStyle={{ color: '#78350f' }}
              inline
            />
          </button>
        </div>

      </div>
    </div>
  );
}
