import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, BookOpen, Layers, Award, PlayCircle, Clock } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

export function SubjectDetail({
  subject,
  onBack,
  onSelectTopic,
  onOpenFlashcardsForUnit,
  onOpenQuizForUnit,
  completedTopics = []
}) {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const activeUnit = subject.units[selectedUnitIndex] || subject.units[0];
  const isEnglishNative = subject.id === 'science' || subject.id === 'ingles' || subject.id === 'pli-camelot';

  // Color de traducción para esta asignatura: Azul pedagógico (#2563eb)
  const translationColor = '#2563eb';

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0 60px' }}>
      <div className="container">
        {/* Botón Volver */}
        <button
          onClick={() => { sounds.playClick(); onBack(); }}
          className="btn btn-secondary"
          style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} />
          <DualText
            es="Volver a todas las Materias"
            en="Back to all Subjects"
            secondaryStyle={{ color: translationColor }}
            inline
          />
        </button>

        {/* Banner de la Asignatura */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '28px 32px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge" style={{ background: subject.bgColor, color: subject.color }}>
                <DualText es={subject.grade} en={subject.gradeEn || subject.grade} inline />
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Docente / Teacher: {subject.teacher}
              </span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              <DualText
                es={subject.name}
                en={subject.nameEn || subject.name}
                primary={isEnglishNative ? 'en' : 'es'}
                secondaryStyle={{ fontSize: '0.65em', color: translationColor }}
              />
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              📖 <strong>Texto Guía / Textbook:</strong> {subject.bookName}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { sounds.playClick(); onOpenFlashcardsForUnit(activeUnit); }}
              className="btn btn-secondary"
              style={{ background: '#f5f3ff', color: '#6d28d9', borderColor: '#ddd6fe' }}
            >
              <Layers size={18} />
              <DualText
                es="Ver Flashcards del Logro"
                en="View Unit Flashcards"
                secondaryStyle={{ color: '#7c3aed' }}
                inline
              />
            </button>

            <button
              onClick={() => { sounds.playClick(); onOpenQuizForUnit(activeUnit); }}
              className="btn btn-primary"
              style={{ background: subject.color }}
            >
              <Award size={18} />
              <DualText
                es="Evaluar Logro 01"
                en="Take Logro 01 Quiz"
                secondaryStyle={{ color: '#ffffff' }}
                inline
              />
            </button>
          </div>
        </div>

        {/* Selector de Unidades / Logros */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '24px'
        }}>
          {subject.units.map((unit, idx) => {
            const isSelected = selectedUnitIndex === idx;
            return (
              <button
                key={unit.id}
                onClick={() => { sounds.playClick(); setSelectedUnitIndex(idx); }}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  background: isSelected ? subject.color : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: isSelected ? 'none' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <DualText
                  es={unit.title}
                  en={unit.titleEn || unit.title}
                  primary={isEnglishNative ? 'en' : 'es'}
                  secondaryStyle={{ color: isSelected ? '#ffffff' : translationColor }}
                />
                {unit.evaluationWeek === 5 && (
                  <span style={{
                    background: isSelected ? 'rgba(255,255,255,0.25)' : '#fee2e2',
                    color: isSelected ? '#ffffff' : '#b91c1c',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    Sem 5
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Resumen del Logro y Temas */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
            <div style={{ maxWidth: '680px' }}>
              {/* Título del Logro con Traducción Bilingüe en Azul */}
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                <DualText
                  es={activeUnit.title}
                  en={activeUnit.titleEn || activeUnit.title}
                  primary={isEnglishNative ? 'en' : 'es'}
                  secondaryStyle={{ fontSize: '0.82em', color: translationColor, marginTop: '3px', fontWeight: 600 }}
                />
              </h2>

              {/* Resumen del Logro con Traducción Bilingüe en Azul */}
              <div style={{ fontSize: '0.96rem', color: '#0f172a', lineHeight: 1.6 }}>
                <DualText
                  es={activeUnit.summary}
                  en={activeUnit.summaryEn || activeUnit.summary}
                  primary={isEnglishNative ? 'en' : 'es'}
                  secondaryStyle={{ fontSize: '0.92em', color: translationColor, marginTop: '5px', fontWeight: 500 }}
                />
              </div>
            </div>

            {/* Fecha Oficial con Traducción Bilingüe Directa */}
            <div style={{
              background: '#fef3c7',
              border: '1px solid #fde68a',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              fontSize: '0.85rem',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0
            }}>
              <Clock size={18} />
              <DualText
                es={`Evaluación Oficial: Semana ${activeUnit.evaluationWeek} (${activeUnit.evaluationDate})`}
                en={`Official Assessment: Week ${activeUnit.evaluationWeek} (${activeUnit.evaluationDateEn || activeUnit.evaluationDate})`}
                secondaryStyle={{ color: '#b45309', fontWeight: 600 }}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', marginTop: '24px' }}>
            <DualText
              es={`📚 Temas de Estudio de este Logro (${activeUnit.topics.length})`}
              en={`📚 Study Topics in this Unit (${activeUnit.topics.length})`}
              secondaryStyle={{ color: translationColor }}
              inline
            />
          </h3>

          {/* Lista de Temas con Traducción Bilingüe en Azul */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeUnit.topics.map((topic) => {
              const isCompleted = completedTopics.includes(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => { sounds.playClick(); onSelectTopic(topic, activeUnit); }}
                  style={{
                    background: isCompleted ? '#f0fdf4' : 'var(--bg-main)',
                    border: isCompleted ? '1.5px solid #86efac' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                    cursor: 'pointer',
                    transition: 'all var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {isCompleted ? (
                      <CheckCircle2 size={24} color="#16a34a" />
                    ) : (
                      <Circle size={24} color="#94a3b8" />
                    )}

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className="badge" style={{ background: subject.bgColor, color: subject.color }}>
                          <DualText es={topic.badge} en={topic.badgeEn || topic.badge} inline />
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          📖 {topic.bookPages}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                        <DualText
                          es={topic.title}
                          en={topic.titleEn || topic.title}
                          primary={isEnglishNative ? 'en' : 'es'}
                          secondaryStyle={{ fontSize: '0.88em', color: translationColor, fontWeight: 500 }}
                        />
                      </h4>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: subject.color, fontWeight: 700, fontSize: '0.88rem' }}>
                    <DualText
                      es={isCompleted ? 'Repasar' : 'Estudiar'}
                      en={isCompleted ? 'Review' : 'Study'}
                      secondaryStyle={{ color: translationColor }}
                      inline
                    />
                    <PlayCircle size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
