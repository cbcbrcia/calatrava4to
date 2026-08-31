import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, Sparkles, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audioEffects';
import { saveQuizResult, addXp } from '../utils/storage';
import { DualText } from './BilingualText';

export function QuizModal({ unit, subject, onClose, onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);

  const questions = unit?.quiz || [];
  const currentQ = questions[currentQuestionIndex];
  const isEnglishNative = subject?.id === 'science' || subject?.id === 'ingles' || subject?.id === 'pli-camelot';

  // Temporizador de estudio
  useEffect(() => {
    if (quizFinished) return;
    const interval = setInterval(() => {
      setTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [quizFinished]);

  if (!questions || questions.length === 0) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content animate-bounce-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center', padding: '36px' }}>
          <AlertCircle size={48} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ marginBottom: '8px' }}>
            <DualText es="Próximamente" en="Coming Soon" inline />
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <DualText
              es="Las preguntas de evaluación de este logro se están actualizando."
              en="Assessment questions for this unit are being updated."
            />
          </p>
          <button className="btn btn-primary" onClick={onClose}>
            <DualText es="Cerrar" en="Close" inline />
          </button>
        </div>
      </div>
    );
  }

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    sounds.playClick();
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      sounds.playCorrect();
      setScore(s => s + 1);
    } else {
      sounds.playIncorrect();
    }

    setAnswersLog(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        selected: selectedOption,
        correct: currentQ.correctIndex,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finalizado
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      const passed = finalScore >= Math.ceil(questions.length * 0.7);

      if (passed) {
        sounds.playFanfare();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // Guardar resultados y otorgar XP
      const earnedXp = finalScore * 20;
      addXp(earnedXp);
      saveQuizResult(unit.id, finalScore, questions.length);
      if (onFinish) onFinish(finalScore, questions.length);
    }
  };

  const handleRestartQuiz = () => {
    sounds.playClick();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimerSeconds(0);
    setAnswersLog([]);
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const percentScore = Math.round((score / questions.length) * 100);
  const passed = score >= Math.ceil(questions.length * 0.7);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-bounce-in"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '680px', width: '92%' }}
      >
        {/* Cabecera del Modal */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <span className="badge" style={{ background: subject?.bgColor || '#eff6ff', color: subject?.color || '#3b82f6', marginBottom: '4px' }}>
              <DualText es={subject?.name || ''} en={subject?.nameEn || subject?.name || ''} inline />
            </span>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
              <DualText
                es={unit.title}
                en={unit.titleEn || unit.title}
                primary={isEnglishNative ? 'en' : 'es'}
                secondaryStyle={{ fontSize: '0.8em', color: '#2563eb' }}
              />
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              background: 'var(--bg-subtle)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}>
              <Clock size={14} />
              <span>{formatTimer(timerSeconds)}</span>
            </div>

            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PANTALLA DE RESULTADOS AL TERMINAR */}
        {quizFinished ? (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: passed ? '#dcfce7' : '#fee2e2',
              color: passed ? '#16a34a' : '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <Award size={44} />
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              <DualText
                es={passed ? '¡Excelente Trabajo! 🎉' : '¡Sigue Practicando! 💪'}
                en={passed ? 'Outstanding Work! 🎉' : 'Keep Practicing! 💪'}
                secondaryStyle={{ color: '#2563eb', fontSize: '0.8em' }}
              />
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              <DualText
                es={`Obtuviste ${score} de ${questions.length} respuestas correctas (${percentScore}%)`}
                en={`You scored ${score} out of ${questions.length} correct (${percentScore}%)`}
                secondaryStyle={{ color: '#2563eb' }}
              />
            </p>

            {/* Recompensa XP */}
            <div style={{
              background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
              border: '1px solid #ddd6fe',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              maxWidth: '340px',
              margin: '0 auto 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#6d28d9',
              fontWeight: 800
            }}>
              <Sparkles size={20} color="#8b5cf6" />
              <span>+{score * 20} XP Ganados para tu Perfil</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleRestartQuiz}
                className="btn btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <RotateCcw size={18} />
                <DualText es="Repetir Evaluación" en="Retake Quiz" inline />
              </button>

              <button
                onClick={onClose}
                className="btn btn-primary"
                style={{ background: '#4f46e5' }}
              >
                <DualText es="Finalizar y Continuar" en="Finish & Continue" inline />
              </button>
            </div>
          </div>
        ) : (
          /* PANTALLA DE PREGUNTA ACTIVA */
          <div>
            {/* Barra de Progreso */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <DualText
                  es={`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}
                  en={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                  secondaryStyle={{ color: '#2563eb' }}
                  inline
                />
                <span>{score} correctas</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  height: '100%',
                  background: subject?.color || '#3b82f6',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Texto de la Pregunta Bilingüe */}
            <div style={{
              background: 'var(--bg-main)',
              borderRadius: 'var(--radius-md)',
              padding: '20px 24px',
              marginBottom: '20px',
              border: '1px solid var(--border-color)'
            }}>
              <h4 style={{ fontSize: '1.12rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                <DualText
                  es={currentQ.question}
                  en={currentQ.questionEn || currentQ.question}
                  primary={isEnglishNative ? 'en' : 'es'}
                  secondaryStyle={{ color: '#2563eb', fontSize: '0.88em', marginTop: '4px' }}
                />
              </h4>
            </div>

            {/* Lista de Opciones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {currentQ.options.map((optionText, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrectOption = oIdx === currentQ.correctIndex;
                const optionTextEn = currentQ.optionsEn ? currentQ.optionsEn[oIdx] : null;

                let optionBg = '#ffffff';
                let optionBorder = 'var(--border-color)';
                let optionColor = 'var(--text-primary)';

                if (isAnswerSubmitted) {
                  if (isCorrectOption) {
                    optionBg = '#ecfdf5';
                    optionBorder = '#10b981';
                    optionColor = '#065f46';
                  } else if (isSelected && !isCorrectOption) {
                    optionBg = '#fef2f2';
                    optionBorder = '#ef4444';
                    optionColor = '#991b1b';
                  }
                } else if (isSelected) {
                  optionBg = 'var(--primary-light)';
                  optionBorder = 'var(--primary)';
                  optionColor = 'var(--primary)';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswerSubmitted}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${optionBorder}`,
                      background: optionBg,
                      color: optionColor,
                      textAlign: 'left',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.96rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      cursor: isAnswerSubmitted ? 'default' : 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: isSelected ? 'currentColor' : 'var(--bg-subtle)',
                        color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>

                      <div style={{ flex: 1 }}>
                        <DualText
                          es={optionText}
                          en={optionTextEn || optionText}
                          primary={isEnglishNative ? 'en' : 'es'}
                          secondaryStyle={{ color: '#2563eb', fontSize: '0.85em' }}
                        />
                      </div>
                    </div>

                    {isAnswerSubmitted && isCorrectOption && (
                      <CheckCircle2 size={20} color="#10b981" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrectOption && (
                      <XCircle size={20} color="#ef4444" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación y Explicación Pedagógica */}
            {isAnswerSubmitted && (
              <div
                className="animate-fade-in"
                style={{
                  background: selectedOption === currentQ.correctIndex ? '#ecfdf5' : '#fef2f2',
                  border: `1px solid ${selectedOption === currentQ.correctIndex ? '#a7f3d0' : '#fecaca'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  color: selectedOption === currentQ.correctIndex ? '#065f46' : '#991b1b',
                  marginBottom: '4px'
                }}>
                  <DualText
                    es={selectedOption === currentQ.correctIndex ? '¡Correcto! 🎉' : 'Respuesta Incorrecta 🤔'}
                    en={selectedOption === currentQ.correctIndex ? 'Correct! 🎉' : 'Incorrect Answer 🤔'}
                    inline
                  />
                </div>
                <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                  <DualText
                    es={currentQ.explanation}
                    en={currentQ.explanationEn || currentQ.explanation}
                    primary={isEnglishNative ? 'en' : 'es'}
                    secondaryStyle={{ color: '#2563eb', fontSize: '0.88em', marginTop: '2px' }}
                  />
                </div>
              </div>
            )}

            {/* Botón de Acción Inferior */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="btn btn-primary"
                  style={{
                    opacity: selectedOption === null ? 0.5 : 1,
                    background: subject?.color || '#3b82f6',
                    padding: '12px 26px'
                  }}
                >
                  <DualText es="Comprobar Respuesta" en="Check Answer" inline />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="btn btn-primary"
                  style={{
                    background: '#4f46e5',
                    padding: '12px 26px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <DualText
                    es={currentQuestionIndex + 1 < questions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}
                    en={currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'View Results'}
                    inline
                  />
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
