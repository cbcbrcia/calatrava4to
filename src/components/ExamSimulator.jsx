import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, Clock, Award, AlertCircle, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { sounds } from '../utils/audioEffects';
import { addXp } from '../utils/storage';

export function ExamSimulator({ onOpenSubjectTopic }) {
  // Recopila preguntas de Logro 01 de todas las asignaturas
  const allL1Questions = CURRICULUM_SUBJECTS.flatMap(sub => {
    const l1Unit = sub.units.find(u => u.logroNumber === 1);
    if (!l1Unit || !l1Unit.quiz) return [];
    return l1Unit.quiz.map(q => ({
      ...q,
      subjectName: sub.name,
      subjectColor: sub.color,
      bookName: sub.bookName
    }));
  });

  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [examFinished, setExamFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Iniciar Examen
  const handleStartExam = () => {
    sounds.playFanfare();
    setExamStarted(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswersHistory([]);
    setExamFinished(false);
    setTimerSeconds(0);
  };

  const handleSelectOption = (idx) => {
    sounds.playClick();
    setSelectedOption(idx);
  };

  const handleNext = () => {
    sounds.playClick();
    const currentQ = allL1Questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;
    
    const newAnswers = [
      ...answersHistory,
      {
        question: currentQ.question,
        subject: currentQ.subjectName,
        selected: selectedOption,
        correct: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation
      }
    ];

    setAnswersHistory(newAnswers);

    if (currentIndex < allL1Questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
    } else {
      // Finalizar examen
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const pct = Math.round((correctCount / allL1Questions.length) * 100);
      setExamFinished(true);

      if (pct >= 70) {
        sounds.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        addXp(150); // Bono especial por simulacro
      } else {
        sounds.playWrong();
        addXp(50);
      }
    }
  };

  const currentQ = allL1Questions[currentIndex];
  const correctTotal = answersHistory.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctTotal / allL1Questions.length) * 100);

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        {!examStarted ? (
          /* Pantalla Inicial del Simulacro */
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: '#fee2e2',
              color: '#b91c1c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Shield size={36} />
            </div>

            <span className="badge" style={{ background: '#fef3c7', color: '#92400e', marginBottom: '12px' }}>
              Semana 5 • Evaluación Oficial
            </span>

            <h1 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Simulacro General de Evaluación - Logro 01
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Este simulacro evalúa los temas vistos durante las semanas 2, 3 y 4 en <strong>Matemáticas (PR1ME Singapur), Science, Sociales, Lenguaje e Inglés</strong>. Pon a prueba tus conocimientos antes del examen en el colegio.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              maxWidth: '600px',
              margin: '0 auto 30px',
              textAlign: 'left'
            }}>
              <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preguntas Totales</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{allL1Questions.length} preguntas</div>
              </div>
              <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Materias Incluidas</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4f46e5' }}>5 Asignaturas</div>
              </div>
              <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recompensa</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>+150 XP Extra</div>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="btn btn-primary"
              style={{ fontSize: '1.1rem', padding: '14px 36px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
            >
              🚀 Comenzar Simulacro Logro 01
            </button>
          </div>
        ) : !examFinished ? (
          /* Pregunta Activa del Simulacro */
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Cabecera de la Pregunta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge" style={{ background: currentQ.subjectColor + '20', color: currentQ.subjectColor }}>
                  {currentQ.subjectName}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  📖 {currentQ.bookName}
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Pregunta {currentIndex + 1} de {allL1Questions.length}
              </div>
            </div>

            {/* Barra de Progreso */}
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', marginBottom: '24px', overflow: 'hidden' }}>
              <div style={{
                width: `${((currentIndex + 1) / allL1Questions.length) * 100}%`,
                height: '100%',
                background: currentQ.subjectColor,
                transition: 'width 0.3s ease'
              }} />
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '22px', lineHeight: 1.4 }}>
              {currentQ.question}
            </h3>

            {/* Opciones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    style={{
                      background: isSelected ? 'var(--primary-light)' : 'var(--bg-main)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                      padding: '14px 20px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="btn btn-primary"
                style={{
                  padding: '12px 32px',
                  opacity: selectedOption === null ? 0.5 : 1,
                  cursor: selectedOption === null ? 'not-allowed' : 'pointer'
                }}
              >
                {currentIndex < allL1Questions.length - 1 ? 'Siguiente Pregunta ➡️' : 'Finalizar Simulacro 🏁'}
              </button>
            </div>
          </div>
        ) : (
          /* Reporte Detallado del Simulacro */
          <div className="animate-bounce-in" style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: percentage >= 70 ? '#ecfdf5' : '#fffbeb',
                color: percentage >= 70 ? '#059669' : '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Award size={40} />
              </div>

              <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Resultado del Simulacro Logro 01
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Obtuviste <strong>{correctTotal} de {allL1Questions.length} aciertos ({percentage}%)</strong>
              </p>
            </div>

            {/* Desglose de Respuestas con Explicaciones */}
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              📋 Revisión Pregunta por Pregunta:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {answersHistory.map((ans, idx) => (
                <div
                  key={idx}
                  style={{
                    background: ans.isCorrect ? '#f0fdf4' : '#fff1f2',
                    border: `1px solid ${ans.isCorrect ? '#86efac' : '#fecdd3'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: ans.isCorrect ? '#166534' : '#991b1b' }}>
                      {ans.subject}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: ans.isCorrect ? '#15803d' : '#be123c' }}>
                      {ans.isCorrect ? '✅ Correcta' : '❌ Incorrecta'}
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {ans.question}
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    💡 <strong>Explicación:</strong> {ans.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
              <button onClick={handleStartExam} className="btn btn-secondary">
                Repetir Simulacro
              </button>
              <button onClick={() => setExamStarted(false)} className="btn btn-primary">
                Volver al Menú Principal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
