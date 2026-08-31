import React, { useState } from 'react';
import { PlusCircle, Save, Trash2, BookPlus, Sparkles, Download, Upload, CheckCircle2 } from 'lucide-react';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { sounds } from '../utils/audioEffects';

export function ContentManager({ onSaveCustomTopic }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState('matematicas');
  const [topicTitle, setTopicTitle] = useState('');
  const [weekBadge, setWeekBadge] = useState('Semana 5');
  const [bookPages, setBookPages] = useState('');
  const [conceptSummary, setConceptSummary] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Preguntas dinámicas para el nuevo tema
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleSaveTopic = (e) => {
    e.preventDefault();
    if (!topicTitle.trim() || !conceptSummary.trim()) {
      alert('Por favor completa al menos el título y el resumen conceptual del tema.');
      return;
    }

    sounds.playCorrect();

    const newTopic = {
      id: `custom-${Date.now()}`,
      title: topicTitle,
      badge: weekBadge,
      bookPages: bookPages || 'Apuntes de clase / Cuaderno',
      conceptSummary: conceptSummary,
      examples: [],
      flashcards: []
    };

    let newQuizQuestion = null;
    if (questionText.trim() && optionA.trim() && optionB.trim()) {
      newQuizQuestion = {
        id: `q-custom-${Date.now()}`,
        question: questionText,
        options: [optionA, optionB, optionC || 'Opción C', optionD || 'Opción D'],
        correctIndex: parseInt(correctIndex, 10),
        explanation: explanation || 'Respuesta configurada por el docente/padre.'
      };
    }

    if (onSaveCustomTopic) {
      onSaveCustomTopic(selectedSubjectId, newTopic, newQuizQuestion);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);

    // Reset fields
    setTopicTitle('');
    setBookPages('');
    setConceptSummary('');
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setExplanation('');
  };

  const handleExportData = () => {
    sounds.playClick();
    const dataStr = JSON.stringify(CURRICULUM_SUBJECTS, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estudio_4to_temas_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Encabezado */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
              ✍️ Gestor de Temas y Preguntas (Modo Tutor / Padre)
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Agrega fácilmente guías de estudio, resúmenes del libro o preguntas de quices que tu hijo vaya viendo en clase.
            </p>
          </div>

          <button onClick={handleExportData} className="btn btn-secondary" style={{ gap: '6px', fontSize: '0.85rem' }}>
            <Download size={16} />
            <span>Exportar Temas (JSON)</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="animate-bounce-in" style={{
            background: '#ecfdf5',
            border: '1.5px solid #10b981',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#065f46',
            fontWeight: 700
          }}>
            <CheckCircle2 size={22} color="#10b981" />
            <span>¡Tema y preguntas agregados con éxito a la plataforma de estudio! 🎉</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSaveTopic} style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px'
        }}>
          {/* Asignatura y Semana */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Asignatura:
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
              >
                {CURRICULUM_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.bookName})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Etiqueta / Semana:
              </label>
              <input
                type="text"
                value={weekBadge}
                onChange={(e) => setWeekBadge(e.target.value)}
                placeholder="Ej. Semana 5, Semana 6..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          {/* Título del Tema */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Título del Tema / Unidad:
            </label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="Ej. Operaciones combinadas con fracciones y problemas del libro"
              style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '1rem' }}
            />
          </div>

          {/* Páginas del Libro */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Páginas del Libro / Guía:
            </label>
            <input
              type="text"
              value={bookPages}
              onChange={(e) => setBookPages(e.target.value)}
              placeholder="Ej. PR1ME CB Págs. 45-52 o Cuaderno de apuntes"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
            />
          </div>

          {/* Resumen Conceptual */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
              Contenido Teórico, Reglas y Explicación para el Estudiante:
            </label>
            <textarea
              rows={6}
              value={conceptSummary}
              onChange={(e) => setConceptSummary(e.target.value)}
              placeholder="Escribe o pega aquí la teoría, reglas, ejemplos o notas del profesor de forma clara y adaptada para 4to de primaria..."
              style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', lineHeight: 1.6 }}
            />
          </div>

          {/* Sección Opcional: Pregunta de Evaluación */}
          <div style={{
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            border: '1px dashed var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
              📝 Agregar Pregunta al Módulo de Evaluación (Opcional)
            </h3>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
                Enunciado de la Pregunta:
              </label>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ej. ¿Cuál es el resultado de la fracción 3/4 + 2/4?"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Opción A:</label>
                <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Opción A" style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Opción B:</label>
                <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Opción B" style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Opción C:</label>
                <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Opción C" style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Opción D:</label>
                <input type="text" value={optionD} onChange={(e) => setOptionD(e.target.value)} placeholder="Opción D" style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Respuesta Correcta:</label>
                <select
                  value={correctIndex}
                  onChange={(e) => setCorrectIndex(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                >
                  <option value={0}>Opción A</option>
                  <option value={1}>Opción B</option>
                  <option value={2}>Opción C</option>
                  <option value={3}>Opción D</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Explicación pedagógica:</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explica brevemente por qué es la correcta..."
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 32px' }}>
              <Save size={18} />
              <span>Guardar Tema en la Plataforma</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
