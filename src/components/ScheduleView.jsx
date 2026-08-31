import React, { useState } from 'react';
import { Calendar, AlertCircle, CheckCircle2, ChevronRight, BookOpen, Clock, Filter } from 'lucide-react';
import { ACADEMIC_SCHEDULE } from '../data/scheduleData';
import { sounds } from '../utils/audioEffects';
import { DualText } from './BilingualText';

export function ScheduleView({ onSelectSubjectForLogro, onStartExamModal }) {
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(0); // 0 = Bloque A
  const [filterOnlyEvaluations, setFilterOnlyEvaluations] = useState(false);

  const activeBlock = ACADEMIC_SCHEDULE[selectedBlockIndex];

  const filteredWeeks = filterOnlyEvaluations
    ? activeBlock.weeks.filter(w => w.type === 'evaluation' || w.type === 'control')
    : activeBlock.weeks;

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container">
        
        {/* Banner Semana Actual Bilingüe */}
        <div style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 32px',
          color: '#ffffff',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontWeight: 800 }}>
                <DualText
                  es="🚨 SEMANA ACTUAL EN CURSO"
                  en="CURRENT WEEK IN PROGRESS"
                  secondaryStyle={{ color: '#fee2e2' }}
                  inline
                />
              </span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <DualText
                  es="31 de agosto al 6 de septiembre de 2026"
                  en="August 31 to September 6, 2026"
                  secondaryStyle={{ color: '#38bdf8' }}
                  inline
                />
              </span>
            </div>

            <h2 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '8px' }}>
              <DualText
                es="Semana 5: ¡Evaluaciones Oficiales del Logro 01!"
                en="Week 5: Official Logro 01 Assessments!"
                secondaryStyle={{ color: '#38bdf8', fontSize: '0.72em', marginTop: '4px', fontStyle: 'italic', fontWeight: 600 }}
              />
            </h2>

            <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              <DualText
                es="Esta semana se evalúan los temas vistos en las Semanas 2, 3 y 4 (Valor posicional, redondeo, múltiplos/divisores, primos/compuestos y geometría de ángulos). ¡Repasa ahora y realiza tu simulacro!"
                en="This week evaluates the topics studied in Weeks 2, 3, and 4 (Place value, rounding, multiples/divisors, primes/composites, and angle geometry). Review now and take your simulation!"
                secondaryStyle={{ color: '#7dd3fc', fontSize: '0.92em', marginTop: '6px', fontStyle: 'italic' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => { sounds.playClick(); onStartExamModal('math-logro-01'); }}
                style={{ background: '#f59e0b', color: '#000', fontWeight: 800, padding: '12px 22px' }}
              >
                <DualText
                  es="📝 Simulacro Evaluación Matemáticas (Logro 01)"
                  en="Math Evaluation Simulation (Logro 01)"
                  secondaryStyle={{ color: '#78350f' }}
                />
              </button>

              <button
                className="btn"
                onClick={() => { sounds.playClick(); onSelectSubjectForLogro('matematicas', 'math-logro-01'); }}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <DualText
                  es="📚 Repasar Temas y Fichas"
                  en="Review Topics & Flashcards"
                  secondaryStyle={{ color: '#38bdf8' }}
                />
              </button>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            textAlign: 'center',
            minWidth: '180px'
          }}>
            <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#cbd5e1', marginBottom: '4px' }}>
              <DualText es="Semana 5" en="Week 5" secondaryStyle={{ color: '#38bdf8' }} inline />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b' }}>
              401 / 402
            </div>
            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '4px' }}>
              <DualText
                es="Bloque A (10 semanas)"
                en="Block A (10 weeks)"
                secondaryStyle={{ color: '#7dd3fc' }}
              />
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} />
              <DualText es="Examen en Progreso" en="Exam in Progress" secondaryStyle={{ color: '#bbf7d0' }} inline />
            </div>
          </div>
        </div>

        {/* Selector de Bloques del Año Escolar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
            {ACADEMIC_SCHEDULE.map((b, idx) => {
              const isSelected = selectedBlockIndex === idx;
              return (
                <button
                  key={b.block}
                  onClick={() => { sounds.playClick(); setSelectedBlockIndex(idx); }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    background: isSelected ? b.color : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--border-color)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <span>{b.block}</span>
                  <span style={{ fontSize: '0.75rem', color: isSelected ? '#fde047' : '#2563eb', fontStyle: 'italic', fontWeight: 600 }}>
                    {b.blockEn}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { sounds.playClick(); setFilterOnlyEvaluations(!filterOnlyEvaluations); }}
            className="btn btn-secondary"
            style={{
              background: filterOnlyEvaluations ? '#fef2f2' : '#ffffff',
              color: filterOnlyEvaluations ? '#b91c1c' : 'var(--text-secondary)',
              borderColor: filterOnlyEvaluations ? '#fca5a5' : 'var(--border-color)'
            }}
          >
            <Filter size={16} />
            <DualText
              es="Filtrar solo Evaluaciones"
              en="Filter only Assessments"
              secondaryStyle={{ color: '#2563eb' }}
              inline
            />
          </button>
        </div>

        {/* Lista de Semanas del Bloque */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredWeeks.map((w) => {
            const isCurrent = w.isCurrent;
            const isEval = w.type === 'evaluation';
            const isControl = w.type === 'control';

            return (
              <div
                key={w.weekNumber}
                style={{
                  background: isCurrent ? '#fffbeb' : '#ffffff',
                  border: isCurrent ? '2px solid #f59e0b' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 28px',
                  boxShadow: isCurrent ? '0 8px 20px rgba(245, 158, 11, 0.15)' : 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '20px',
                  position: 'relative'
                }}
              >
                {/* Lado Izquierdo: Número de Semana y Fecha */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: isCurrent ? '#fef3c7' : isEval ? '#fee2e2' : isControl ? '#f3e8ff' : 'var(--bg-subtle)',
                    color: isCurrent ? '#b45309' : isEval ? '#b91c1c' : isControl ? '#7e22ce' : 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Sem</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{w.weekNumber}</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span className="badge" style={{
                        background: isCurrent ? '#ef4444' : isEval ? '#dc2626' : isControl ? '#9333ea' : '#64748b',
                        color: '#ffffff'
                      }}>
                        {isCurrent ? '🚨 SEMANA ACTUAL' : isEval ? '📝 EVALUACIÓN OFICIAL' : isControl ? '📖 CONTROL PLAN LECTOR' : 'CLASES REGULARES'}
                      </span>

                      <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        <DualText
                          es={w.dates}
                          en={w.datesEn}
                          secondaryStyle={{ color: '#2563eb' }}
                          inline
                        />
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                      <DualText
                        es={w.title}
                        en={w.titleEn}
                        secondaryStyle={{ color: '#2563eb', fontSize: '0.82em' }}
                      />
                    </h3>

                    <div style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.55, maxWidth: '650px' }}>
                      <DualText
                        es={w.description}
                        en={w.descriptionEn}
                        secondaryStyle={{ color: '#2563eb', fontSize: '0.9em', marginTop: '3px' }}
                      />
                    </div>

                    {/* Evaluaciones Específicas de la Semana */}
                    {w.evaluations && w.evaluations.length > 0 && (
                      <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          <DualText es="Evaluaciones Programadas:" en="Scheduled Assessments:" secondaryStyle={{ color: '#2563eb' }} inline />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {w.evaluations.map((ev, eIdx) => (
                            <span
                              key={eIdx}
                              style={{
                                background: '#fef2f2',
                                color: '#991b1b',
                                border: '1px solid #fecaca',
                                borderRadius: 'var(--radius-sm)',
                                padding: '4px 10px',
                                fontSize: '0.82rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>📝</span>
                              <DualText
                                es={ev.name}
                                en={ev.nameEn}
                                secondaryStyle={{ color: '#dc2626' }}
                                inline
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lado Derecho: Botón de Acción Directo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'center' }}>
                  {w.logro ? (
                    <button
                      onClick={() => { sounds.playClick(); onSelectSubjectForLogro('matematicas', 'math-logro-01'); }}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.88rem' }}
                    >
                      <BookOpen size={16} />
                      <DualText
                        es="Ver Temas"
                        en="View Topics"
                        secondaryStyle={{ color: '#2563eb' }}
                        inline
                      />
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <DualText es="Sin evaluación" en="No assessment" secondaryStyle={{ color: '#2563eb' }} inline />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
