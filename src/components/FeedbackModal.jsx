import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, CheckCircle2, AlertTriangle, Sparkles, Flag, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audioEffects';
import { saveFeedbackReport } from '../utils/storage';
import { DualText } from './BilingualText';

const REPORT_TYPES = [
  { id: 'error_question', label: '🔴 Error en Pregunta o Respuesta de Quiz', labelEn: 'Error in Quiz Question/Answer' },
  { id: 'text_adjustment', label: '📝 Error de Texto, Redacción o Tema', labelEn: 'Text or Subject Error' },
  { id: 'suggestion', label: '💡 Sugerencia de Mejora o Nuevo Material', labelEn: 'Improvement or Material Suggestion' },
  { id: 'other', label: '❓ Otra Consulta o Ajuste', labelEn: 'Other Request' }
];

const SUBJECTS_LIST = [
  'Matemáticas y Geometría',
  'Natural Sciences / Science',
  'Ciencias Sociales',
  'Castellano y Literatura',
  'English (Fly High 4)',
  'Plan Lector Inglés (Tales of Camelot)',
  'Ajedrez',
  'Cronograma / General'
];

export function FeedbackModal({ isOpen, onClose, initialSubject = '', initialContext = '' }) {
  const [reportType, setReportType] = useState('error_question');
  const [subjectSelected, setSubjectSelected] = useState(initialSubject || SUBJECTS_LIST[0]);
  const [contextDetail, setContextDetail] = useState(initialContext || '');
  const [reporterName, setReporterName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    sounds.playFanfare();
    saveFeedbackReport({
      type: reportType,
      subjectName: subjectSelected,
      topicOrQuestion: contextDetail.trim() || 'General',
      reporterName: reporterName.trim() || 'Papá/Mamá/Estudiante',
      description: description.trim()
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setDescription('');
      setContextDetail('');
      onClose();
    }, 2400);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 3000 }}>
      <div
        className="modal-content animate-bounce-in"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '580px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
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
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Flag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                Solicitar Ajuste o Reportar Error
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#2563eb', margin: 0, fontWeight: 600 }}>
                Request Correction or Report an Issue
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={56} color="#10b981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.3rem', color: '#065f46', marginBottom: '8px' }}>
              ¡Muchas Gracias por tu Reporte!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Hemos registrado la información en nuestro panel para revisar y actualizar el contenido a la brevedad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
              Si encuentras alguna respuesta errónea, enunciado incompleto o tienes una sugerencia de mejora, por favor compártela con nosotros:
            </p>

            {/* Tipo de Reporte */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                📌 Tipo de Solicitud:
              </label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontWeight: 600
                }}
              >
                {REPORT_TYPES.map(rt => (
                  <option key={rt.id} value={rt.id}>{rt.label}</option>
                ))}
              </select>
            </div>

            {/* Materia o Sección */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  📚 Materia / Sección:
                </label>
                <select
                  value={subjectSelected}
                  onChange={e => setSubjectSelected(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  {SUBJECTS_LIST.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  👤 Tu Nombre / Familia (Opcional):
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={e => setReporterName(e.target.value)}
                  placeholder="Ej: Familia Gómez, Mamá de Lucas..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Tema o Pregunta Específica */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                🎯 Tema o Pregunta Específica (Opcional):
              </label>
              <input
                type="text"
                value={contextDetail}
                onChange={e => setContextDetail(e.target.value)}
                placeholder="Ej: Ejercicio 1.b del Review, Pregunta 3 de Ciencias, etc."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Descripción del Ajuste */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--text-primary)' }}>
                ✍️ ¿Cuál es el error o qué corrección sugieres?:
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe claramente qué está incorrecto y cuál debería ser el texto, respuesta o procedimiento adecuado..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Botones de Acción */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ background: '#d97706', padding: '12px 24px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Send size={16} />
                <span>Enviar Reporte</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Botón Flotante Permanente en la esquina inferior
export function FloatingFeedbackButton({ onClick }) {
  return (
    <button
      onClick={() => { sounds.playClick(); onClick(); }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1500,
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#ffffff',
        border: 'none',
        borderRadius: 'var(--radius-full)',
        padding: '12px 20px',
        fontWeight: 800,
        fontSize: '0.88rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      className="btn animate-bounce-in"
      title="Reportar error, corrección o solicitar ajuste de contenido"
    >
      <Flag size={18} fill="#ffffff" color="#ffffff" />
      <span>Reportar Ajuste / Error</span>
    </button>
  );
}
