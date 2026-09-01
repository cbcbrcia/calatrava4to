import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, Sparkles, Clock, AlertCircle, Shuffle, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audioEffects';
import { saveQuizResult, addXp } from '../utils/storage';
import { DualText } from './BilingualText';

// Función para barajar aleatoriamente las opciones (A, B, C, D) preservando la respuesta correcta
function shuffleQuestionOptions(q) {
  if (!q || !q.options || q.options.length === 0) return q;

  const indices = q.options.map((_, i) => i);
  // Algoritmo Fisher-Yates
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const shuffledOptions = indices.map(i => q.options[i]);
  const shuffledOptionsEs = q.optionsEs ? indices.map(i => q.optionsEs[i]) : null;
  const shuffledOptionsEn = q.optionsEn ? indices.map(i => q.optionsEn[i]) : null;
  const newCorrectIndex = indices.indexOf(q.correctIndex);

  return {
    ...q,
    options: shuffledOptions,
    optionsEs: shuffledOptionsEs,
    optionsEn: shuffledOptionsEn,
    correctIndex: newCorrectIndex
  };
}

export function QuizModal({ unit, subject, onClose, onFinish, onReportQuestion }) {
  const [questions, setQuestions] = useState(() => (unit?.quiz || []).map(shuffleQuestionOptions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);

  // Barajar cada vez que cambie la unidad recibida
  useEffect(() => {
    setQuestions((unit?.quiz || []).map(shuffleQuestionOptions));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimerSeconds(0);
    setAnswersLog([]);
  }, [unit]);

  const currentQ = questions[currentQuestionIndex];
  const isEnglishNative = subject?.id === 'science' || subject?.id === 'ingles' || subject?.id === 'pli-camelot' || subject?.id === 'matematicas';

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
      saveQuizResult(unit.id, finalScore, questions.length, subject?.name || 'Materia');
      if (onFinish) onFinish(finalScore, questions.length);
    }
  };

  const handleRestartQuiz = () => {
    sounds.playClick();
    // Al reiniciar, barajar nuevamente las opciones para que varíen las letras
    setQuestions((unit?.quiz || []).map(shuffleQuestionOptions));
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge" style={{ background: subject?.bgColor || '#e0e7ff', color: subject?.color || '#4338ca' }}>
              <DualText es={unit.title.split(':')[0]} en={unit.titleEn?.split(':')[0] || 'Assessment'} inline />
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Clock size={14} />
              <span>{formatTimer(timerSeconds)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onReportQuestion && !quizFinished && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onReportQuestion(`P${currentQuestionIndex + 1}: ${currentQ.questionEn || currentQ.question}`);
                }}
                className="btn btn-secondary"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#d97706',
                  borderColor: '#fde68a',
                  background: '#fffbeb'
                }}
                title="Reportar o sugerir corrección sobre esta pregunta"
              >
                <Flag size={13} />
                <span>Reportar</span>
              </button>
            )}

            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {!quizFinished ? (
          <div>
            {/* Barra de Progreso */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <DualText
                  es={`Pregunta ${currentQuestionIndex + 1} de ${questions.length}`}
                  en={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                  inline
                />
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div style={{
                height: '8px',
                background: '#e2e8f0',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  background: 'var(--gradient-primary)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Enunciado de la Pregunta (En idioma nativo de la materia) */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4, fontWeight: 700 }}>
                {isEnglishNative ? (currentQ.questionEn || currentQ.question) : (currentQ.questionEs || currentQ.question)}
              </h3>
            </div>

            {/* Opciones de Respuesta Barajadas (A, B, C, D) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {currentQ.options.map((opt, idx) => {
                const optLetter = String.fromCharCode(65 + idx); // A, B, C, D
                const optEs = currentQ.optionsEs ? currentQ.optionsEs[idx] : null;
                const optEn = currentQ.optionsEn ? currentQ.optionsEn[idx] : null;
                const displayText = isEnglishNative ? (optEn || opt) : (optEs || opt);

                let btnBg = '#ffffff';
                let btnBorder = 'var(--border-color)';
                let textColor = 'var(--text-primary)';

                if (selectedOption === idx) {
                  btnBg = 'var(--primary-light)';
                  btnBorder = 'var(--primary)';
                  textColor = 'var(--primary-dark)';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnBg = '#ecfdf5';
                    btnBorder = '#10b981';
                    textColor = '#065f46';
                  } else if (selectedOption === idx) {
                    btnBg = '#fef2f2';
                    btnBorder = '#ef4444';
                    textColor = '#991b1b';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${btnBorder}`,
                      background: btnBg,
                      color: textColor,
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: isAnswerSubmitted ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: selectedOption === idx ? 'var(--primary)' : '#f1f5f9',
                      color: selectedOption === idx ? '#fff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0
                    }}>
                      {optLetter}
                    </span>

                    <div style={{ flex: 1, fontSize: '0.95rem', color: 'inherit' }}>
                      {displayText}
                    </div>

                    {isAnswerSubmitted && idx === currentQ.correctIndex && (
                      <CheckCircle2 size={20} color="#10b981" />
                    )}
                    {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                      <XCircle size={20} color="#ef4444" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación Explicativa */}
            {isAnswerSubmitted && (
              <div className="animate-fade-in" style={{
                background: selectedOption === currentQ.correctIndex ? '#ecfdf5' : '#fef2f2',
                border: `1.5px solid ${selectedOption === currentQ.correctIndex ? '#a7f3d0' : '#fecaca'}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                marginBottom: '20px',
                color: selectedOption === currentQ.correctIndex ? '#065f46' : '#991b1b'
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>
                  {selectedOption === currentQ.correctIndex ? (
                    isEnglishNative ? '🎉 Great! Correct Answer' : '🎉 ¡Excelente! Respuesta Correcta'
                  ) : (
                    isEnglishNative ? '💡 Step-by-Step Explanation:' : '💡 Explicación del Razonamiento:'
                  )}
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {isEnglishNative ? (currentQ.explanationEn || currentQ.explanation) : (currentQ.explanationEs || currentQ.explanation)}
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              {!isAnswerSubmitted ? (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  style={{ opacity: selectedOption === null ? 0.5 : 1, padding: '12px 28px', fontWeight: 700 }}
                >
                  <DualText es="Comprobar Respuesta" en="Check Answer" inline />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNextQuestion}
                  style={{ padding: '12px 28px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <DualText
                    es={currentQuestionIndex + 1 < questions.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
                    en={currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
                    inline
                  />
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULTADOS FINALES DEL QUIZ */
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '10px 0' }}>
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
              fontSize: '2.5rem'
            }}>
              {passed ? '🏆' : '📚'}
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
              <DualText
                es={passed ? '¡Felicitaciones! Has Superado el Simulacro' : '¡Buen esfuerzo! Continúa Repasando'}
                en={passed ? 'Congratulations! You Passed the Quiz' : 'Good effort! Keep practicing'}
              />
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              <DualText
                es={`Obtuviste ${score} de ${questions.length} respuestas correctas (${percentScore}%).`}
                en={`You scored ${score} out of ${questions.length} correct answers (${percentScore}%).`}
              />
            </p>

            {/* Puntos XP Ganados */}
            <div style={{
              background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
              border: '1.5px solid #c7d2fe',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
              color: '#3730a3',
              fontWeight: 800
            }}>
              <Sparkles size={20} color="#4f46e5" />
              <span>+{score * 20} Puntos XP de Experiencia Ganados</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                className="btn btn-secondary"
                onClick={handleRestartQuiz}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Shuffle size={16} />
                <DualText es="Intentar de Nuevo (Opciones Aleatorias)" en="Try Again (Shuffled)" inline />
              </button>

              <button
                className="btn btn-primary"
                onClick={onClose}
                style={{ background: '#4f46e5', padding: '10px 24px' }}
              >
                <DualText es="Terminar y Guardar" en="Done & Save" inline />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
