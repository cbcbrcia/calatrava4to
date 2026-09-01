import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  Save,
  Trash2,
  BookPlus,
  Sparkles,
  Download,
  Upload,
  CheckCircle2,
  Inbox,
  Clock,
  Flag,
  Check,
  X,
  AlertCircle,
  Copy
} from 'lucide-react';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { sounds } from '../utils/audioEffects';
import { getAllFeedbackReports, updateFeedbackReportStatus, deleteFeedbackReport } from '../utils/storage';
import { DualText } from './BilingualText';

export function ContentManager({ onSaveCustomTopic }) {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox', 'editor'
  const [reports, setReports] = useState(getAllFeedbackReports());
  const [copiedId, setCopiedId] = useState(null);

  // Form state
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

  const refreshReports = () => {
    setReports(getAllFeedbackReports());
  };

  const handleStatusChange = (id, newStatus) => {
    sounds.playClick();
    const updated = updateFeedbackReportStatus(id, newStatus);
    setReports(updated);
  };

  const handleDeleteReport = (id) => {
    sounds.playClick();
    if (window.confirm('¿Seguro que deseas eliminar este reporte?')) {
      const updated = deleteFeedbackReport(id);
      setReports(updated);
    }
  };

  const handleCopyReport = (rep) => {
    sounds.playClick();
    const text = `[REPORTE ${rep.type.toUpperCase()}]\nFecha: ${rep.date}\nMateria: ${rep.subjectName}\nTema: ${rep.topicOrQuestion}\nReportó: ${rep.reporterName}\nDetalle: ${rep.description}`;
    navigator.clipboard.writeText(text);
    setCopiedId(rep.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
    a.download = `repaso_4to_temas_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="animate-fade-in" style={{ padding: '30px 0 60px' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Encabezado */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={20} color="#7c3aed" />
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>
                Panel de Administración y Control
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Gestiona los reportes de familias y personaliza contenidos curriculares de Repaso 4to.
            </p>
          </div>

          <button
            onClick={handleExportData}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={16} />
            Exportar Temas (JSON)
          </button>
        </div>

        {/* Pestañas del Panel de Control */}
        <div style={{
          display: 'flex',
          gap: '10px',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '4px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('inbox'); refreshReports(); }}
            style={{
              padding: '10px 20px',
              fontWeight: 800,
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'inbox' ? '#d97706' : '#ffffff',
              color: activeTab === 'inbox' ? '#ffffff' : 'var(--text-secondary)',
              border: activeTab === 'inbox' ? 'none' : '1px solid var(--border-color)',
              boxShadow: activeTab === 'inbox' ? 'var(--shadow-md)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Inbox size={18} />
            <span>Buzón de Solicitudes y Reportes</span>
            {pendingCount > 0 && (
              <span style={{
                background: activeTab === 'inbox' ? '#ffffff' : '#ef4444',
                color: activeTab === 'inbox' ? '#d97706' : '#ffffff',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 900
              }}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('editor'); }}
            style={{
              padding: '10px 20px',
              fontWeight: 800,
              fontSize: '0.95rem',
              borderRadius: 'var(--radius-md)',
              background: activeTab === 'editor' ? '#7c3aed' : '#ffffff',
              color: activeTab === 'editor' ? '#ffffff' : 'var(--text-secondary)',
              border: activeTab === 'editor' ? 'none' : '1px solid var(--border-color)',
              boxShadow: activeTab === 'editor' ? 'var(--shadow-md)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <PlusCircle size={18} />
            <span>Editor de Temas y Preguntas</span>
          </button>
        </div>

        {/* PESTAÑA 1: BUZÓN DE REPORTES Y SOLICITUDES */}
        {activeTab === 'inbox' && (
          <div className="animate-fade-in">
            {reports.length === 0 ? (
              <div style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '48px 24px',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <Inbox size={48} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', marginBottom: '6px' }}>
                  El buzón está vacío
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                  Cuando los padres o estudiantes envíen una solicitud o reporte mediante el botón flotante, aparecerá aquí inmediatamente.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {reports.map((rep) => {
                  const isResolved = rep.status === 'resolved';

                  return (
                    <div
                      key={rep.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: 'var(--radius-md)',
                        border: isResolved ? '1.5px solid #a7f3d0' : '1.5px solid #fed7aa',
                        padding: '20px 24px',
                        boxShadow: 'var(--shadow-sm)',
                        opacity: isResolved ? 0.75 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="badge" style={{
                            background: isResolved ? '#dcfce7' : '#ffedd5',
                            color: isResolved ? '#166534' : '#c2410c',
                            fontWeight: 800,
                            fontSize: '0.78rem'
                          }}>
                            {isResolved ? '✅ RESUELTO' : '⏳ PENDIENTE'}
                          </span>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {rep.subjectName}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Clock size={13} />
                          <span>{rep.date}</span>
                        </div>
                      </div>

                      {/* Contexto y Reportante */}
                      <div style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '10px' }}>
                        <strong>Reportado por:</strong> {rep.reporterName} • <strong>Tema/Pregunta:</strong> {rep.topicOrQuestion}
                      </div>

                      {/* Detalle del Mensaje */}
                      <div style={{
                        background: '#f8fafc',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.92rem',
                        color: 'var(--text-primary)',
                        lineHeight: 1.5,
                        marginBottom: '14px'
                      }}>
                        {rep.description}
                      </div>

                      {/* Acciones del Reporte */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleCopyReport(rep)}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Copy size={13} />
                          <span>{copiedId === rep.id ? '¡Copiado!' : 'Copiar'}</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(rep.id, isResolved ? 'pending' : 'resolved')}
                          className="btn"
                          style={{
                            background: isResolved ? '#e2e8f0' : '#10b981',
                            color: isResolved ? '#475569' : '#ffffff',
                            fontSize: '0.8rem',
                            padding: '6px 14px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Check size={14} />
                          <span>{isResolved ? 'Marcar Pendiente' : 'Marcar Resuelto'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteReport(rep.id)}
                          className="btn"
                          style={{ background: '#fee2e2', color: '#dc2626', fontSize: '0.8rem', padding: '6px 10px' }}
                          title="Eliminar reporte"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 2: EDITOR DE TEMAS Y PREGUNTAS */}
        {activeTab === 'editor' && (
          <div className="animate-fade-in" style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {savedSuccess && (
              <div className="animate-fade-in" style={{
                background: '#ecfdf5',
                border: '1.5px solid #a7f3d0',
                color: '#065f46',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <CheckCircle2 size={24} color="#10b981" />
                <div>
                  <strong style={{ display: 'block' }}>¡Contenido guardado con éxito!</strong>
                  <span style={{ fontSize: '0.88rem' }}>El nuevo tema y la pregunta ya se encuentran disponibles en la materia seleccionada.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveTopic}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  1. Configuración del Tema de Estudio
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                      Materia de Destino
                    </label>
                    <select
                      value={selectedSubjectId}
                      onChange={(e) => setSelectedSubjectId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {CURRICULUM_SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                      Etiqueta / Semana
                    </label>
                    <input
                      type="text"
                      value={weekBadge}
                      onChange={(e) => setWeekBadge(e.target.value)}
                      placeholder="Ej: Semana 5, Refuerzo..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                      Páginas del Libro / Guía
                    </label>
                    <input
                      type="text"
                      value={bookPages}
                      onChange={(e) => setBookPages(e.target.value)}
                      placeholder="Ej: Págs. 45-52"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                    Título del Tema
                  </label>
                  <input
                    type="text"
                    required
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                    placeholder="Ej: Suma y Resta de Fracciones Homogéneas"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                    Resumen Pedagógico y Puntos Clave
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={conceptSummary}
                    onChange={(e) => setConceptSummary(e.target.value)}
                    placeholder="Escribe la explicación clara, conceptos, pasos o reglas importantes que el estudiante debe memorizar..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}
                  />
                </div>
              </div>

              {/* Pregunta de Quiz */}
              <div style={{
                borderTop: '1px dashed var(--border-color)',
                paddingTop: '24px',
                marginBottom: '28px'
              }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                  2. Pregunta de Evaluación / Quiz (Opcional)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Crea una pregunta de opción múltiple alineada al tema.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                    Enunciado de la Pregunta
                  </label>
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ej: ¿Qué ocurre con el denominador en la suma de fracciones homogéneas?"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Opción A</label>
                    <input
                      type="text"
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
                      placeholder="Opción A"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Opción B</label>
                    <input
                      type="text"
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
                      placeholder="Opción B"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Opción C</label>
                    <input
                      type="text"
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                      placeholder="Opción C"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>Opción D</label>
                    <input
                      type="text"
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                      placeholder="Opción D"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Respuesta Correcta
                    </label>
                    <select
                      value={correctIndex}
                      onChange={(e) => setCorrectIndex(e.target.value)}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                    >
                      <option value={0}>Opción A</option>
                      <option value={1}>Opción B</option>
                      <option value={2}>Opción C</option>
                      <option value={3}>Opción D</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                      Explicación Pedagógica
                    </label>
                    <input
                      type="text"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                      placeholder="Razón por la cual esa opción es la correcta..."
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón de Guardado */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontWeight: 700 }}
                >
                  <Save size={18} />
                  <span>Guardar e Incorporar Tema</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
